---
title: How I Actually Run This
eyebrow: Operations
summary: The hosts, clusters, and agent layer behind how these projects actually get built and operated.
---

Most of what's on this site ships through a pipeline that looks unremarkable from the
outside — push to GitHub, CI builds an image, it lands on a VPS. What's underneath
that is less usual: two independent k3s clusters, a self-hosted AI agent with its own
scoped access to both, and a laptop doing full-time duty as a build node. None of this
needed to be this deliberate for a one-person project, but the agent doing a lot of
the day-to-day operating work needed the same kind of guardrails a team of humans
would insist on, so I ended up building them anyway.

This is the part that doesn't fit on a project card: the actual hosts, how the two
clusters differ in what they're trusted to do, and how an agent gets to touch
production without being able to reach `kubectl delete` on a Tuesday afternoon.

## The Hosts

Three machines, three different jobs:

- **hetzner** (`ubuntu-4gb-hil-1`) — a Hetzner Cloud VPS running the production k3s
  cluster: all seven live apps, the Woodpecker CI server, host-level Postgres and
  Redis, the Cloudflare tunnel, and the observability stack.
- **openclaw-gateway** — a headless Ubuntu box (an old Core i7-4500U laptop, 7 GB of
  RAM, repurposed rather than bought) that runs nothing app-related. Its only job is
  the OpenClaw agent gateway — the thing that does a lot of the day-to-day operating.
- **openclaw-node** — a 2017 MacBook Pro (16 GB RAM) running a second, independent
  k3s cluster via Rancher Desktop. It exists to take CI load off the VPS: a
  Woodpecker build agent, a BuildKit daemon, and a Grafana/VictoriaMetrics mirror.

None of this is cloud-scale hardware. The interesting part isn't the specs — it's how
carefully the boundaries between them are drawn.

```text
                 Tailscale tailnet (private mesh)
                              |
        +----------------------+-----------------------+
        |                                               |
 openclaw-gateway                                openclaw-node
 (headless Linux laptop)                         (2017 MacBook Pro)
 OpenClaw agent + Slack                    k3s: Woodpecker build agent,
 + 6 MCP servers                           BuildKit, Grafana mirror
        |
        | ssh, dispatcher-restricted commands only
        v
 hetzner (Hetzner VPS, k3s)
 byah · deckforge · landlordlog · cutty-bangerz
 slopyard · game-theory-sim · reliquary-works
 Woodpecker server · host Postgres/Redis
 Cloudflare tunnel · observability stack
```

## Two Clusters, Two Trust Levels

hetzner and openclaw-node are both k3s, but the agent's access to each is
intentionally lopsided. On hetzner — the cluster actually running production traffic
— the ServiceAccount OpenClaw authenticates as gets a ClusterRole called
`openclaw-reader`: get/list/watch on pods, services, deployments, jobs, nodes,
events, and pod logs, plus `metrics.k8s.io` for `kubectl top`. No secrets. No write
verbs at all. If the agent needs to actually change something on hetzner, it has to
go through a different door entirely (below).

On openclaw-node, the same ClusterRole name carries real write permissions:
create/update/patch/delete on deployments, statefulsets, services, configmaps, PVCs,
jobs, and ingresses — but still explicitly no Secret access, no Namespace
create/delete, no cluster-admin. That's not an oversight; the RBAC manifest says so
directly in its own comments. openclaw-node is a CI/build box with nothing
customer-facing on it, so letting the agent actually deploy things there is a
reasonable blast radius. hetzner is not, so it doesn't get that.

## Getting Code Out the Door

The actual shipping path — GitHub Actions building and pushing an image, opening a
deploy PR against homelab, Woodpecker auto-merging and applying it — is laid out on
the [architecture page](/architecture). It's mostly boring, which is the point, but
the mesh it runs on isn't always forgiving: a CoreDNS rule scoped to `IN A` only
recently broke every deploy silently, because `kubectl`'s dual-stack resolver also
queries `AAAA`, and an unmatched AAAA query fell through to a plugin that answered
NXDOMAIN instead of NODATA — a hard failure on a record type nothing was even using.
That's the kind of bug that only shows up once you've built enough infrastructure to
have DNS plugins with fallthrough semantics in the first place.

## The Agent Layer

OpenClaw is the thing actually running on openclaw-gateway: three routed models
behind one Slack-facing identity. The default agent (`deepseek-v4-flash`) triages
everything — status checks, quick kubectl calls, memory recall — and delegates out
for anything heavier: `deepseek-v4-pro` for multi-step reasoning and debugging,
`kimi-k2` for anything over roughly 15k tokens or a full repo dropped into chat.
Routing is just an exec call the orchestrator makes to itself, not a separate
service.

It's wired into six MCP servers — Grafana, both Kubernetes clusters, Woodpecker,
GitHub, and Notion — the same ones, as it happens, that the Claude Code session
writing this page has access to. Same backends, same scopes, two different front
doors.

## Letting an Agent Touch Production

hetzner doesn't hand out a kubeconfig with write access at all. Instead there's a
single SSH key, installed with a `command=` restriction in `authorized_keys` that
routes everything through a dispatcher script — no interactive shell, ever.
`SSH_ORIGINAL_COMMAND` gets parsed against an explicit case statement with seven
named operations: cluster-status, pod-logs, disk-usage, woodpecker-health,
victoria-health, db-ro, and rollout-restart. Anything else is denied and logged.

Two of those are worth calling out. `rollout-restart` checks the namespace/deployment
pair against a hardcoded allowlist — the seven production apps plus the three
Woodpecker components — so the agent can restart `deckforge` but not `coredns`.
`db-ro` enforces read-only twice over: a regex blocklist rejects anything that looks
like INSERT/UPDATE/DELETE/DROP/ALTER/GRANT/COPY before it ever reaches Postgres, and
the connection itself authenticates as `openclaw_ro`, a role with no write grants at
all. Belt and suspenders — either check alone would probably be enough, but the point
of giving an agent SSH access is not having to trust that one clever prompt won't
find the gap in the other.

```text
 OpenClaw agent --ssh hetzner "<cmd> <args>"--> dispatcher
                                                  (command= restricted,
                                                   no shell, ever)
                        |
        +----------------------+----------------------------+
        |                                                    |
  read-only ops                                      rollout-restart
  cluster-status, pod-logs,                    hardcoded allowlist: the
  disk-usage, woodpecker-health,                7 production apps + the
  victoria-health                               3 Woodpecker components
        |
        v
  db-ro <database> <sql>
  regex blocklist + read-only
  Postgres role (openclaw_ro)
```

## Networking as the Trust Boundary

Tailscale is what actually makes this workable. Every private surface — the
Woodpecker UI, both clusters' APIs, Grafana — sits only on the tailnet, reachable by
device identity rather than by anything resembling a public port. The only thing
Cloudflare's tunnel exposes is `ci.byah.org`, and even that's narrowed at the nginx
layer to `/hook` and `/authorize`; everything else 404s before it reaches Woodpecker.

Internal-only hostnames get the same treatment through Tailscale's Split DNS:
`grafana.byah.org` and `plane.byah.org` resolve only for tailnet devices, answered by
a dnsmasq instance running directly on openclaw-node rather than inside its cluster —
Rancher Desktop only forwards one LoadBalancer service's ports to the Mac's real
network interfaces, found that the hard way. Neither hostname has a public DNS
record, and it's not because someone remembered to lock it down. There's just nothing
there to find.

## What's Still Moving

The three-host picture above is closer to a snapshot than a finished design.
openclaw-node is currently running the OpenClaw Gateway role itself — a LaunchAgent
on the same Mac that's supposed to be a disposable build box — while
openclaw-gateway, the machine actually meant for that job, gets bootstrapped and
verified. The cutover only happens once the Linux gateway is confirmed healthy
end-to-end; until then, nobody touches the Mac's OpenClaw process. Plane got pulled
off openclaw-node the day before this was written, purely to free up capacity for the
build workload it actually exists for.

None of that is a problem to hide. A homelab that's honest about which parts are
load-bearing and which parts are still being poured is more useful than one that
pretends to be finished.
