---
title: homelab
status: active
summary: GitOps-oriented k3s homelab repo for cluster composition, app manifests, and deployment automation.
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

`homelab` is the operational backbone behind everything else here — the repo where
application delivery stops being an abstract promise and turns into cluster layout,
bootstrap flows, ingress, secrets, CI exposure, backing services, and deploy sequencing.
It's not modeling a user-facing domain; it's making the environment itself legible and
repeatable.

It's a k3s GitOps layout organized around cluster entrypoints, shared infrastructure, and
app manifests, with `k3s/clusters/homelab` as the source-of-truth entrypoint — cluster
startup, shared infrastructure, and the apps running on top stay as separate, legible
layers instead of one pile of YAML. It also sits at an interesting transition point
between "manual homelab" and disciplined infrastructure, covering manual apply paths, Flux
bootstrap, VPS convergence, Cloudflare access, and day-to-day deploy behavior — a record of
the operational workflows needed to get and keep the environment in shape, not just a pile
of manifests.

## Operational Model

The Hetzner deploy path is a single-run, locked operation: it pulls the latest repo state,
converges the VPS, installs and enables k3s, prepares the kubeconfig, waits for the
network bridge, installs host Postgres/Redis, and emits logs and a summary — real
operations work, not just `kubectl apply` and hope.

CI access follows a split security model: public Cloudflare-exposed endpoints are
narrowed to webhook and OAuth callback paths, while the full CI UI stays reachable only
over Tailscale — letting CI receive the events it needs without making the entire control
plane broadly public.

Deploys are reconciled rather than pushed by hand: application repos build and push
images, this repo pins the tags or digests in overlays, and Flux reconciles the cluster on
commit. That separation is clean — the application repo owns artifact creation, and
`homelab` owns what actually runs.

## Technical Shape

The repo combines Kubernetes manifests, Nix-based machine and bootstrap work, deploy
scripts, and documentation tying them together, laid out under `k3s/clusters`,
`k3s/infra`, and `k3s/apps`. Preflight scripts, sealed-secret rendering, deploy request
flows, and written runbooks are all part of it — built to survive repeated use rather than
a single cluster bootstrap.

## Why It Matters

If the product projects show product intent, `homelab` shows operational intent: it's
where changes become infrastructure truth, and where sloppiness gets paid back immediately
in breakage or drift. It doesn't need to be elegant the way a product does — it needs to
be predictable, inspectable, and safe enough to trust when other projects depend on it.
This is the piece where the rest of the work stops being a pile of codebases and becomes
an actual running environment.
