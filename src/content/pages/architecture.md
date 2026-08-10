---
title: How It Fits Together
eyebrow: Overview
summary: How the workstation, project repos, CI, and cluster fit together.
---

Most of what I build goes through the same small pipeline. But "the cluster" is
actually two clusters on two very different machines, plus a laptop that does nothing
but run an AI agent with its own scoped access to both. Here's the real shape of it.

```text
   dev-setup (laptop)
        |
        | write, build, commit
        v
   GitHub  (app repos + homelab)
        |
        | CI: test, build image, push, open deploy PR
        v
   homelab repo ----------> Woodpecker (on hetzner)
                                  |
                                  | kubectl apply -k, per app
                                  v
        +---------------------------------------------------+
        |                Tailscale tailnet                    |
        |                                                      |
        v                                                      v
   hetzner (Hetzner VPS, k3s)                     openclaw-node (Mac, k3s)
   byah · deckforge · landlordlog                  Woodpecker build agent
   cutty-bangerz · slopyard                        BuildKit · Grafana mirror
   game-theory-sim · reliquary-works
   host Postgres/Redis · Cloudflare tunnel
        ^
        | ssh, dispatcher-restricted commands only
        |
   openclaw-gateway (headless Linux laptop)
   OpenClaw agent + 6 MCP servers + Slack
```

[dev-setup](/projects/dev-setup/) is the machine I write everything on — nothing here
ever gets deployed itself. Each project lives in its own repo with its own stack, but
they share the same path out: CI tests the code, builds a container image, pushes it,
and opens a deploy PR against [homelab](/projects/homelab/), which holds the k3s
manifests and pins the image tags. Woodpecker auto-merges that PR and applies it to
**hetzner**, the production cluster.

**openclaw-node** is a second, independent k3s cluster — a 2017 MacBook running
Rancher Desktop — that exists purely to take CI load off the VPS: it runs its own
Woodpecker build agent and a BuildKit daemon. And **openclaw-gateway** isn't a cluster
at all — it's a dedicated Linux box running a self-hosted AI agent (OpenClaw) that
operates both clusters, with deliberately different levels of trust for each. That
part — the agent layer, the RBAC split, how an autonomous agent gets to touch
production without a blank check — is its own page:
[how I actually run this](/development).

Not everything runs through this loop. [agents](/projects/agents/) and
[code-practice](/projects/code-practice/) are local tools I never deploy — they're
meant to be run, not visited.
