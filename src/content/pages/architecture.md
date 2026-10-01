---
title: How It Fits Together
eyebrow: Overview
summary: What runs where across my two k3s clusters, and how a push to main gets to production.
---

Everything public on this site runs on a single Hetzner VPS with 3 vCPUs and 4 GB of
RAM. Everything else (CI builds, metrics, internal tools) runs on three machines in my
house. They're two separate k3s clusters, connected over Tailscale.

Here's how requests and data move inside the production cluster:

```text
       Cloudflare Tunnel
              │
              ▼
       cloudflared ×2     routes each hostname straight
              │           to the app's Service, no Ingress
              ├──▶ byah ──────────────────────┐
              ├──▶ deckforge ─────────────────┤
              │       ▲ CronJob 04:00 curls   │
              │         /api/admin/cards/sync │
              ├──▶ game-theory ───────────────┤
              │    CronJob 12:00, same image ─┤
              ├──▶ bodega-bartender ──────────┤
              ├──▶ landlordlog ───────────────┤
              ├──▶ reliquary-works ───────────┤
              ├──▶ slopyard ──────────────────┼───────────┐
              ├──▶ games, meandering-megan    │           │
              └──▶ woodpecker-server          │           │
                                              ▼           ▼
                                     postgres Svc     redis Svc
                                     no selector; EndpointSlice → 10.42.0.1
                                              │           │
 ═════════════════════ VPS host ══════════════╪═══════════╪════
                                              ▼           ▼
                                      Postgres :5432 Redis :6379
                                      systemd, one database + role per app
```

A few things in there that aren't obvious:

- **No ingress controller.** cloudflared maps each hostname directly to a ClusterIP
  Service. The tunnel config also blocks game-theory's `/metrics` on the public
  hostname, while vmagent can still scrape it from inside the cluster.
- **The databases aren't in the cluster.** `postgres.backing-services` and
  `redis.backing-services` are Services with no selector. Hand-written
  EndpointSlices point them at `10.42.0.1`, the node's `cni0` bridge, where Postgres
  and Redis run as plain systemd units on the VPS. On homelab, the same two names are
  ordinary StatefulSets, so apps don't know or care which cluster they're on.
- **The CronJobs work two different ways.** deckforge's card sync is a `curl`
  container that hits an admin endpoint on the running app, so the sync runs in the
  web process. game-theory's daily news pass runs the app's own image with a
  different command.
- games, meandering-megan, and woodpecker-server don't touch either database. The
  first two are static sites behind nginx, and Woodpecker keeps its data in SQLite on
  a volume.

Not shown: the outside APIs the apps call (DeepSeek, Anthropic, Stripe, Resend,
Scryfall), and `ci.byah.org`, which sits behind a Cloudflare Access login except for
the `/hook` and `/authorize` paths GitHub needs.

Several things cross between the two clusters, all over Tailscale:

```text
  hetzner                              homelab
  ───────                              ───────
  vmagent ──── remote write ─────────▶ VictoriaMetrics ──▶ Grafana
    scrapes each app's http                │
    port, plus cloudflared                 └──▶ vmalert ──▶ Alertmanager

  woodpecker-server ◀──── gRPC ─────── woodpecker agent + BuildKit
  woodpecker agent                       (runs every build)
    (deploys only)

  Postgres on the host ◀───────────── bodega-bartender crawler worker
```

hetzner only runs a metrics agent. Storage, alerting, and the single Grafana are all
at home, which keeps them off the VPS's 4 GB. Every CI build also runs at home, while
the agent on hetzner only applies deploys. And bodega-bartender's crawler worker runs
on homelab but writes to the production database, connecting to the VPS's Postgres
directly over the tailnet.

The AI agent on `openclaw-gateway`, and exactly what it's allowed to do on each
cluster, is on [How I Actually Run This](/development).

## How a deploy works

App CI can build an image and push it to Docker Hub, but it never touches a cluster.
To get an image running, it has to open a pull request:

1. Woodpecker runs the app's pipeline on the homelab agent: install, lint, typecheck,
   test, build the image, push it to Docker Hub tagged with the short commit SHA.
2. The last step clones the [homelab](/projects/homelab/) repo, changes the image tag
   in that app's kustomize overlay, and opens a PR called `deploy(app):<sha>`.
3. Woodpecker checks the PR. If it only touches image-tag overlays and every tag in it
   exists on Docker Hub, it squash-merges itself. Anything else (a new manifest, a
   config change) waits for me.
4. The merge kicks off the deploy pipeline on the hetzner agent. It reads the
   `deploy(...)` entries out of the commit message, runs migrations for those apps,
   and applies the manifests.

So the homelab repo's history is a list of every deploy, and no app pipeline ever gets
a kubeconfig.

## Not part of this

[agents](/projects/agents/), [code-practice](/projects/code-practice/), and
[dev-setup](/projects/dev-setup/) run on my laptop. [buildings](/projects/buildings/)
is a script. [collections](/projects/collections/) isn't deployed yet.
