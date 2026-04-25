---
title: agents
status: active
summary: Local CLI and server tooling for running coding agents through a staged, workspace-based workflow.
stack:
  - TypeScript
  - tsx
  - React
  - Dev Containers
links:
  - label: Source
    url: https://github.com/link108/agents
featured: false
---

**tl;dr**: I built this to make coding agents feel more like a normal local development tool instead of a one-off demo glued to a chat window.

I wanted something that could take a real task, spin up a workspace, run through a plan/implement/verify/review loop, and leave behind enough logs and state that I could tell what actually happened.

At the core, this is a CLI and small local server for managing agent-driven tasks. A task gets its own workspace and branch, moves through explicit phases, and can be watched from the terminal or a lightweight web UI. I like that the flow is opinionated instead of magical. If an agent is going to touch code, I want the steps to be visible.

A big part of the project is dealing with the boring operational stuff that usually gets skipped. There is work here around devcontainers, host-backed auth, log streaming, worker resilience, and keeping the CLI thin enough that the server owns the messy parts. That is the stuff that starts to matter as soon as you try to use agents repeatedly instead of treating them like a novelty.

I’m also trying to keep it simple. Most of it is plain TypeScript, some React for the TUI, and a lot of markdown task specs that double as a backlog. It is still rough in places, and some of the interesting work is clearly about making the system survive restarts, retries, and half-finished tasks without turning into a pile of hidden state.
