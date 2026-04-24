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

`homelab` is the operational gravity well for the rest of the workspace. It is the repo
where application delivery stops being an abstract promise and turns into cluster layout,
bootstrap flows, ingress, secrets, CI exposure, backing services, and deploy sequencing.
That makes it fundamentally different from the product repos. It is not trying to model a
user-facing domain. It is trying to make the environment itself legible and repeatable.

The README sets that tone immediately: this is a k3s GitOps layout organized around
cluster entrypoints, shared infrastructure, and app manifests, with `k3s/clusters/homelab`
as the source-of-truth entrypoint. That is the right level of abstraction. Instead of
burying everything in one pile of YAML, the repo separates where a cluster starts, what
infrastructure is shared, and what apps get laid on top.

The repo also sits at an interesting transition point between “manual homelab” and
“something closer to disciplined infrastructure.” The docs cover manual apply paths, Flux
bootstrap, VPS convergence, Cloudflare access, and day-to-day deploy behavior. In other
words, this is not only a manifest repo. It is also a record of the operational workflows
needed to get and keep the environment in shape.

## Operational Model

The Hetzner deploy flow is particularly revealing. The `apply.sh` path is documented as a
single-run locked operation that can pull the latest repo state, converge the VPS,
install/enable k3s, prepare kubeconfig, wait for the network bridge, install host
Postgres/Redis, and then emit logs and summaries. That is real operations work, not just
“kubectl apply and hope.”

The Woodpecker documentation is similarly concrete. It lays out a split security model
where public Cloudflare-exposed endpoints are narrowed to webhook and OAuth callback paths,
while the full UI remains available only over Tailscale. That is a thoughtful compromise:
allow CI to receive the events it needs without pretending the entire control plane should
be broadly public.

This repo also acts as the place where application deployments become reconciled state.
The documented workflow has app repos building and pushing images, this repo pinning tags
or digests in overlays, and Flux reconciling on commit. That separation is clean. It means
the application repo is responsible for artifact creation, while `homelab` is responsible
for declaring what actually runs.

## Technical Shape

Technically, the repo combines Kubernetes manifests, Nix-based machine/bootstrap work,
deploy scripts, and documentation that ties them together. The layout under `k3s/clusters`,
`k3s/infra`, and `k3s/apps` gives the repo a clear structure, while the `docs/` and
`scripts/` directories explain how the manifests relate to the actual host and operator
workflow.

That matters because many homelab repos are really just snapshots of local decisions. This
one is trying harder to become a maintained system. The presence of preflight scripts,
sealed secret rendering, deploy request flows, and written runbooks suggests the repo is
intended to survive repeated use rather than a single cluster bootstrap.

## Why It Matters

If the application repos show product intent, `homelab` shows operational intent. It is
the repo where changes become infrastructure truth and where the cost of sloppiness is
paid immediately in breakage or drift. That gives it a different kind of importance. It
does not need to be elegant in the same way a product repo does. It needs to be
predictable, inspectable, and safe enough to trust when other repos depend on it.

That makes `homelab` one of the more consequential repos in the group. It is where the
workspace stops being a collection of codebases and becomes an actual running environment.
