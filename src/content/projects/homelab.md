---
title: homelab
status: active
summary: Personal k3s setup for keeping a small cluster and a Hetzner box understandable, repeatable, and not too mysterious.
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

**tl;dr**: I built this to keep my k3s setup and VPS deploy flow understandable enough that I can bring it back without a bunch of guesswork.

I wanted one place for the unglamorous infrastructure work: cluster layout, app manifests, bootstrap scripts, secrets, and the steps that turn a side project into something I can actually run again after a bad change or a fresh machine.

Most of it is a GitOps-style k3s layout with separate cluster entrypoints, shared infra, and app overlays. What makes it feel useful to me is that it does not stop at Kubernetes YAML. It also includes the day-to-day ops glue around it: bootstrapping a Hetzner VPS, getting k3s running, wiring in Cloudflare and Tailscale, and keeping deploys simple enough that I can still tell what is happening.

I’ve been trying to keep the automation opinionated but not magical. There’s a repeatable converge path for the VPS, but the cluster apply is still pretty manual on purpose. Part of that is caution, and part of it is taste. I’d rather have a setup that is a little rough than one that hides too much when something breaks.

There are also a few choices in here that feel very personal-homelab to me, like running Postgres and Redis on the host and exposing them back into the cluster instead of pretending every layer needs to be containerized. It is not the cleanest model in the world, but it keeps the stack smaller and matches what I actually need.

This is still in progress. Secrets are still in that "good enough for now" phase, the Hetzner path is more polished than the home setup, and some workflows are still settling down. That’s fine. The point is to have something I can keep tightening up as the rest of my projects change.
