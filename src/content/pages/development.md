---
title: How I Actually Run This
eyebrow: Operations
summary: The machines, and what the AI agent that helps run them can and can't do on each cluster.
---

A lot of the day-to-day ops on these clusters goes through an AI agent I talk to in
Slack. It can check pod status, read logs, look at Grafana, restart a deployment, and
run read-only SQL against production. On the production cluster, that's about all it
can do. Most of this page is about how that's enforced.

## The machines

- **hetzner** is a 4 GB Hetzner Cloud VPS. It runs the production k3s cluster: the
  nine public apps, the Woodpecker server, the Cloudflare tunnel, observability, and
  Postgres and Redis on the host itself.
- **nuc-a** and **nuc-b** are Intel NUCs, two of the three homelab nodes.
- **homelab-mac** is a 2017 MacBook Pro (16 GB) running Ubuntu Server. It's the third
  homelab node and the only one stateful workloads are allowed to schedule on.
- **openclaw-gateway** is an old laptop (i7-4500U, 7 GB) running headless Ubuntu. It
  runs the OpenClaw agent and nothing else.

The homelab cluster (about 24 cores and 47 GB across the three nodes) runs the
Woodpecker build agent, BuildKit, Plane, and Grafana/VictoriaMetrics. It used to be
just the MacBook running k3s under Rancher Desktop. When that broke for good, I wiped
the Mac, installed Ubuntu Server, added the two NUCs, and rebuilt it as a three-node
cluster.

Everything is on one Tailscale tailnet.

## The agent

The agent is OpenClaw, running on `openclaw-gateway`. It routes
between three models. `deepseek-v4-flash` takes every message first and handles the
simple stuff itself. It hands multi-step debugging and reasoning to `deepseek-v4-pro`,
and anything over about 15k tokens of input to a Kimi long-context model. The handoff
is just an exec call: the orchestrator runs `openclaw agent --agent <id>` on itself.

It has seven MCP servers: Grafana, one per Kubernetes cluster, Woodpecker, GitHub,
Notion, and Plane.

## What it can do on production

On hetzner, the agent's kubeconfig is bound to a ClusterRole called `openclaw-reader`.
It can get, list, and watch most things (pods, deployments, jobs, nodes, events), read
pod logs, and use `kubectl top`. It has no write verbs and can't read Secrets.

Anything that changes state goes over SSH instead. The agent has one key on the VPS,
and `authorized_keys` pins that key to a `command=` that runs a dispatcher script, so
it never gets a shell. The dispatcher looks at `SSH_ORIGINAL_COMMAND`, logs it, and
only accepts seven operations:

```text
cluster-status                         node + pod summary
pod-logs <namespace> <pod> [lines]     recent log lines
disk-usage                             host disk usage
woodpecker-health                      Woodpecker pods and service
victoria-health                        VictoriaMetrics stack
rollout-restart <namespace> <deploy>   restart, allowlisted deployments only
db-ro <database> <sql>                 read-only query
```

Anything else is denied and logged.

`rollout-restart` checks the namespace and deployment against a hardcoded list: the
app deployments plus the three Woodpecker components. It can restart `deckforge`. It
can't restart `coredns`.

`db-ro` has two checks. The script rejects any SQL containing INSERT, UPDATE, DELETE,
DROP, ALTER, GRANT, COPY, BEGIN, SET ROLE, and a handful of others. Then it connects as
`openclaw_ro`, a Postgres role with no write grants. The regex is easy to get around
and the role alone would probably be enough. I have both anyway, so one mistake in
either place doesn't open up writes.

## What it can do on homelab

The homelab cluster uses the same ClusterRole name with a lot more in it. On top of
reading, the agent can create, update, patch, and delete deployments, statefulsets,
services, configmaps, PVCs, jobs, and ingresses. It still can't read Secrets, create
or delete namespaces, or do anything cluster-admin. Secrets and namespaces stay manual.

Homelab is where the builds and internal tools live. Nothing public runs there, so if
the agent breaks something, I lose some CI time and Plane is down for a while.

## Network

Both cluster APIs, the Woodpecker UI, and Grafana are only reachable from the tailnet.
The Cloudflare tunnel exposes the public apps and `ci.byah.org`, and nginx in front of
Woodpecker only passes `/hook` and `/authorize`. Everything else on that hostname 404s.

`grafana.byah.org` and `plane.byah.org` have no public DNS records. Tailscale Split DNS
sends those lookups to dnsmasq running as a systemd service on `nuc-b`, which answers
with a homelab node IP. Traefik runs on all three nodes through k3s's ServiceLB, so
any node IP works.

## Things that have broken

A custom CoreDNS rule once broke every deploy without an obvious error. The rule only
matched `IN A` queries. `kubectl` asks for both A and AAAA, and the AAAA query fell
through to a plugin that answered NXDOMAIN instead of NODATA. NXDOMAIN means "this
name doesn't exist," so the lookup failed, over a record type nothing used.

## Known gaps

On homelab, Postgres and Redis are single StatefulSets on `homelab-mac`. No
CloudNativePG, no Sentinel. If that node goes down, they go down with it. That's a
written-down decision in the repo, to revisit if reboot downtime ever actually becomes
a problem.

The `rollout-restart` allowlist is behind. reliquary-works, games, and meandering-megan
aren't on it, so the agent can see them but can't restart them.
