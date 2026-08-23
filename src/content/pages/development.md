---
title: How I Actually Run This
eyebrow: Operations
summary: The hosts, clusters, and agent layer behind how these projects actually get built and operated.
---

Most of what's on this site ships through a pipeline that looks unremarkable from the
outside — push to GitHub, CI builds an image, it lands on a VPS. What's underneath
that is less usual: two independent k3s clusters, a self-hosted AI agent with its own
scoped access to both, and a pile of repurposed hardware doing full-time duty as a
build cluster. None of this needed to be this deliberate for a one-person project, but
the agent doing a lot of the day-to-day operating work needed the same kind of
guardrails a team of humans would insist on, so I ended up building them anyway.

This is the part that doesn't fit on a project card: the actual hosts, how the two
clusters differ in what they're trusted to do, and how an agent gets to touch
production without being able to reach `kubectl delete` on a Tuesday afternoon.

## The Hosts

Five machines, three different jobs:

- **hetzner** (`ubuntu-4gb-hil-1`) — a Hetzner Cloud VPS running the production k3s
  cluster: all nine live apps, the Woodpecker CI server, host-level Postgres and
  Redis, the Cloudflare tunnel, and the observability stack.
- **openclaw-gateway** — a headless Ubuntu box (an old Core i7-4500U laptop, 7 GB of
  RAM, repurposed rather than bought) that runs nothing app-related. Its only job is
  the OpenClaw agent gateway — the thing that does a lot of the day-to-day operating.
- **homelab** — a second, independent k3s cluster, and the one that's changed the
  most: two Intel NUCs (`nuc-a`, `nuc-b`) plus the 2017 MacBook Pro (16 GB RAM) that
  used to run this cluster alone via Rancher Desktop, wiped and rebuilt as
  `homelab-mac` running plain Ubuntu Server after that setup died for good. Three
  nodes, ~24 cores / ~47 GB combined. It exists to take CI load off the VPS — a
  Woodpecker build agent, a BuildKit daemon — and now also hosts Plane and the
  Grafana/VictoriaMetrics stack. `homelab-mac` carries the label
  `homelab.link108/role=storage` and is the one node with actual stateful data
  pinned to it, since it's the newest and most reliable of the three.

None of this is cloud-scale hardware. The interesting part isn't the specs — it's how
carefully the boundaries between them are drawn.

```text
                 Tailscale tailnet (private mesh)
                              |
        +----------------------+-----------------------+
        |                                               |
 openclaw-gateway                                homelab (3-node k3s)
 (headless Linux laptop)                         nuc-a · nuc-b · homelab-mac
 OpenClaw agent + Slack                    Woodpecker build agent, BuildKit,
 + 7 MCP servers                           Plane, Grafana/VictoriaMetrics
        |
        | ssh, dispatcher-restricted commands only
        v
 hetzner (Hetzner VPS, k3s)
 byah · deckforge · landlordlog · bodega-bartender
 slopyard · game-theory-sim · reliquary-works
 games · meandering-megan
 Woodpecker server · host Postgres/Redis
 Cloudflare tunnel · observability stack
```

## Two Clusters, Two Trust Levels

hetzner and homelab are both k3s, but the agent's access to each is intentionally
lopsided. On hetzner — the cluster actually running production traffic — the
ServiceAccount OpenClaw authenticates as gets a ClusterRole called `openclaw-reader`:
get/list/watch on pods, services, deployments, jobs, nodes, events, and pod logs, plus
`metrics.k8s.io` for `kubectl top`. No secrets. No write verbs at all. If the agent
needs to actually change something on hetzner, it has to go through a different door
entirely (below).

On homelab, the same ClusterRole name carries real write permissions:
create/update/patch/delete on deployments, statefulsets, services, configmaps, PVCs,
jobs, and ingresses — but still explicitly no Secret access, no Namespace
create/delete, no cluster-admin. That's not an oversight; the RBAC manifest says so
directly in its own comments. homelab is a CI/build cluster with nothing
customer-facing on it (Plane included — it's internal, tailnet-only), so letting the
agent actually deploy things there is a reasonable blast radius. hetzner is not, so it
doesn't get that. One thing the rebuild fixed along the way: the kubeconfig now points
at `nuc-b`'s real Tailscale-issued cert instead of the old Mac cluster's
self-signed one, so this is the one connection that no longer needs
`insecure-skip-tls-verify`.

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

It's wired into seven MCP servers — Grafana, both Kubernetes clusters, Woodpecker,
GitHub, Notion, and Plane — the same ones, as it happens, that the Claude Code session
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
a dnsmasq instance running directly on `nuc-b` rather than inside the cluster — any
homelab node's IP would work equally, since Traefik's ingress runs on all three via
k3s's built-in ServiceLB, but `nuc-b` is a stable-enough anchor. (This replaced the
old openclaw-node/Mac version of the same idea, which existed to work around a
Rancher Desktop host-networking bug that doesn't exist on bare-metal k3s.) Neither
hostname has a public DNS record, and it's not because someone remembered to lock it
down. There's just nothing there to find.

## What's Still Moving

The five-host picture above replaced an earlier one. openclaw-node used to be this
same 2017 MacBook Pro running solo as its own k3s cluster via Rancher Desktop —
including, for a while, the OpenClaw Gateway process itself, running as a LaunchAgent
on the same box that was supposed to be a disposable build node, pending a cutover to
openclaw-gateway once that machine was confirmed healthy. That cluster died for good.
The fix wasn't nursing it back to health; it was wiping the Mac, installing Ubuntu
Server, buying two Intel NUCs, and standing up `homelab` as an actual three-node
cluster with `homelab-mac` as just one member of it. The gateway cutover happened
along the way, by necessity — there's no macOS left on that machine to run a
LaunchAgent on.

Not every trade-off from that rebuild is resolved, just made deliberately. Postgres
and Redis on homelab run as single-instance StatefulSets pinned to `homelab-mac`
rather than anything HA (CloudNativePG, Redis Sentinel) — if that node goes down,
both go down with it until it's back. That's written into the repo's own decision
record, not left implicit, with the explicit call to revisit only if node-reboot
downtime actually becomes painful.

None of that is a problem to hide. A homelab that's honest about which parts are
load-bearing and which parts are still being poured is more useful than one that
pretends to be finished.
