---
title: agents
status: active
summary: Devcontainer and CLI tooling for running coding agents with host-backed credentials and local workflow support.
stack:
  - TypeScript
  - tsx
  - Dev Containers
links:
  - label: Source
    url: https://github.com/link108/agents
featured: false
---

`agents` is a working environment for using coding agents as an everyday development tool
rather than an occasional novelty — a TypeScript CLI plus a devcontainer setup that reuses
host Claude credentials inside the container, so the environment stays close to the
machine it runs on.

Most agent setups break down at the edges: credentials live on the host, shells behave
differently in containers, and session state gets fragmented. This project is aimed
squarely at tightening those seams so an agent workflow needs less manual setup and less
duplicated configuration.

## How It's Built

The CLI sits alongside a small, opinionated task library — markdown task documents for
things like shell completions, streaming logs, TUI work, resilient workers, and codebase
audits — so it doubles as executable tooling and as a running notebook for the features an
agent workflow actually needs.

The devcontainer side matters just as much: host Claude credentials get exported into
Linux container paths, a pragmatic fix for the usual OAuth-and-Keychain mismatch between a
macOS host and a Linux container.

## Why It's Interesting

A lot of "AI coding" projects stop at demo quality. This one is closer to internal tooling
for making agent workflows survivable in normal, daily development — the interesting part
isn't the model integration itself, it's the surrounding work: task orchestration, shell
behavior, auth reuse, and the rough edges that only show up once an agent gets used every
day instead of once in a while.
