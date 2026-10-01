---
title: How It Fits Together
eyebrow: Overview
summary: What runs where across my two k3s clusters, and how a push to main gets to production.
---

Everything public on this site runs on a single Hetzner VPS with 3 vCPUs and 4 GB of
RAM. Everything else (CI builds, metrics, internal tools) runs on three machines in my
house. They're two separate k3s clusters, connected over Tailscale.

```text
                          internet
                             |
                      Cloudflare edge
              (Access login on ci.byah.org,
               except /hook and /authorize)
                             |
                      Cloudflare Tunnel
                             |
+----------------------------|------------------------------+
| hetzner: 1 VPS, 3 vCPU / 4 GB                             |
|                            v                              |
|   cloudflared x2: each hostname goes straight to its      |
|                   app's Service, no ingress controller    |
|                            |                              |
|   byah  deckforge  landlordlog  bodega-bartender          |
|   slopyard  game-theory  reliquary-works  games           |
|   meandering-megan  woodpecker-server                     |
|                            |                              |
|   postgres.backing-services / redis.backing-services      |
|   (Service + EndpointSlice pointing at 10.42.0.1)         |
|                            |                              |
| ===========================|============ VPS host ======= |
|                            v                              |
|   Postgres + Redis, plain systemd services                |
|                                                           |
|   woodpecker agent (deploys only)       vmagent           |
+-----------------------------------------|-----------------+
                                          | remote write
                  Tailscale               | over the tailnet
+-----------------------------------------|-----------------+
| homelab: nuc-a, nuc-b, homelab-mac      v                 |
|                                                           |
|   VictoriaMetrics, vmalert, Alertmanager, Grafana         |
|   Plane, Langfuse                                         |
|   woodpecker agent + BuildKit (every CI build)            |
|   bodega-bartender crawler worker                         |
|   Postgres + Redis StatefulSets (homelab-mac only)        |
|                                                           |
|   Traefik --> grafana.byah.org, plane.byah.org            |
|               tailnet only, resolved by dnsmasq on nuc-b  |
+-----------------------------------------------------------+

   openclaw-gateway: the AI agent, with limited access to both
```

A few details that don't fit in the boxes:

- **There's no ingress controller on hetzner.** The tunnel config maps each hostname
  directly to a ClusterIP Service. It's also where game-theory's `/metrics` gets
  blocked from the public hostname, while vmagent can still scrape it inside the
  cluster.
- **CI is public, but only barely.** GitHub has to be able to reach Woodpecker for
  webhooks and the OAuth callback, so Cloudflare Access lets `/hook` and `/authorize`
  through and sends everything else on `ci.byah.org` to a login page.
- **The databases are the same DNS name, different things.** Every app connects to
  `postgres.backing-services.svc.cluster.local` and
  `redis.backing-services.svc.cluster.local`. On hetzner, those are a Service with no
  selector and a hand-written EndpointSlice pointing at the `cni0` bridge IP, which
  lands on Postgres and Redis running on the VPS host itself. On homelab, they're
  ordinary StatefulSets pinned to the MacBook, the only node allowed to hold data.
- **Metrics leave the VPS.** hetzner runs only vmagent and kube-state-metrics, which
  remote-write over the tailnet to VictoriaMetrics on homelab. There's one metrics
  store and one Grafana, and neither uses up the VPS's 4 GB.
- **Some app pieces run at home.** bodega-bartender's crawler worker runs on homelab,
  while its web app runs on hetzner. Scheduled jobs (deckforge's card sync,
  game-theory's daily news pass) run as CronJobs on hetzner.

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
