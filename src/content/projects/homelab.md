---
title: homelab
status: active
summary: The Kubernetes manifests, CI pipelines, and host setup for both of my k3s clusters.
stack:
  - Kubernetes
  - k3s
  - Nix
  - Python
  - YAML
links:
  - label: Source
    url: https://github.com/link108/homelab
featured: false
---

This repo holds everything that runs the other projects: k3s manifests for both
clusters, the Woodpecker pipelines that deploy to them, and the scripts that set up
the machines underneath. [How It Fits Together](/architecture) covers how a deploy
moves through it, and [How I Actually Run This](/development) covers the machines and
the agent.

Each cluster has one kustomize entrypoint under `k3s/clusters/`, which pulls in
shared infrastructure from `k3s/infra/` and per-app overlays from `k3s/apps/`. The
image tag in each app overlay is the line that app deploy PRs change.

```text
k3s/
  clusters/
    hetzner/     apps + woodpecker, cloudflared, coredns-custom,
                 sealed-secrets, backing-services
    homelab/     woodpecker agent, buildkit, backing-services
                 (Plane and monitoring are applied separately)
  infra/         shared pieces, with per-cluster overlays
  apps/          one directory per app, base + overlays/<cluster>
```

Outside `k3s/` there's the rest of it: converging the Hetzner VPS, installing k3s,
Cloudflare Tunnel and Tailscale setup, the dnsmasq resolver on `nuc-b`, scripts for
creating app databases on each cluster, and the config, RBAC, and SSH dispatcher for
the OpenClaw agent.

Some things are done differently on each cluster. On the VPS, Postgres and Redis run
as systemd services on the host, and the cluster reaches them through a Service with
no selector and a hand-written EndpointSlice. On homelab they're StatefulSets on the
one node that's allowed to hold data. Apps use the same DNS names on both and can't
tell the difference.

Secrets are partway through a move to Sealed Secrets. Some apps have sealed secrets
committed already. The rest, along with the homelab database credentials, still get
created by hand with a cluster-admin kubeconfig from the templates in the repo.
