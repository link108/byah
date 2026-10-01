---
title: How It Fits Together
eyebrow: Overview
summary: How a push to main ends up running in production, and what runs where.
---

Every app on this site deploys the same way, and none of them can deploy themselves.
An app's CI can build an image and push it to Docker Hub. To get that image running,
it has to open a pull request.

Here's what happens after a push to `main`:

1. Woodpecker runs the app's pipeline on a build agent in my homelab: install, lint,
   typecheck, test, build the image, push it to Docker Hub tagged with the short
   commit SHA.
2. The last step clones the [homelab](/projects/homelab/) repo, changes the image tag
   in that app's kustomize overlay, and opens a PR called `deploy(app):<sha>`.
3. Woodpecker checks the PR. If it only touches image-tag overlays and every tag in it
   exists on Docker Hub, it squash-merges itself. Anything else (a new manifest, a
   config change) sits there until I merge it.
4. The merge kicks off the deploy pipeline on a second Woodpecker agent that lives in
   the production cluster. It reads the `deploy(...)` entries out of the commit
   message, runs migrations for those apps, and applies the manifests.

```text
 push to main
      |
      v
 [homelab agent]  test, build, push image ---------> Docker Hub
      |
      v
 PR to homelab repo: deploy(app):<sha>
      |
      | tag-only change + tag exists?  yes -> auto-merge
      |                                no  -> wait for me
      v
 [hetzner agent]  migrate, kubectl apply -k
      |
      v
 running in production
```

So the homelab repo's commit history is a list of every deploy, and no app pipeline
ever gets a kubeconfig.

## Two clusters

**hetzner** is a single 4 GB Hetzner VPS running k3s. Everything public runs there:
this site, deckforge, landlordlog, bodega-bartender, slopyard, game-theory,
reliquary-works, games, and meandering-megan. Traffic comes in through a Cloudflare
tunnel.

**homelab** is three machines in my house: two Intel NUCs and a 2017 MacBook Pro
running Ubuntu Server. It does the CI builds (Woodpecker agent plus BuildKit) and runs
internal tools like Plane and Grafana. Builds go there because the VPS only has 4 GB
and is busy serving production. And yes, the cluster has the same name as the repo.

## Databases

Every app connects to `postgres.backing-services.svc.cluster.local` and
`redis.backing-services.svc.cluster.local`, and doesn't know what's behind them. On
hetzner, those names point at Postgres and Redis running as ordinary systemd services
on the VPS host, wired into the cluster with a Service that has no selector and a
hand-written EndpointSlice. On homelab, they're StatefulSets pinned to the MacBook,
which is the only node allowed to hold data.

## Not part of this

[agents](/projects/agents/), [code-practice](/projects/code-practice/), and
[dev-setup](/projects/dev-setup/) run on my laptop. [buildings](/projects/buildings/)
is a script. [collections](/projects/collections/) isn't deployed yet.

There's also an AI agent with limited access to both clusters. What it can and can't
do is on [How I Actually Run This](/development).
