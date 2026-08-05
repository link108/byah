---
title: project-planner
status: stable
summary: Python tool that turns a project overview document into structured planning bundles and decomposition artifacts.
stack:
  - Python
  - CLI
  - Markdown
  - Tests
links:
  - label: Source
    url: https://github.com/link108/project-planner
featured: false
---

**tl;dr**: I built this because "ask the model for a plan" kept producing plans I couldn't actually act on, so I turned planning into a repeatable file-to-files transformation instead.

The core loop is narrow on purpose: feed it a `project-overview.md`, run a structured decomposition, and it emits a full planning bundle — projects, subprojects, tasks, prompts, and run artifacts — under `project-bundles/<NN>-<slug>/`. Because it's just files, I can version it, rerun it, and compare bundles across iterations instead of losing the plan in chat history.

The prompt library is really the product here — templates for breaking down an overview, inventorying a repo, detailing and finalizing subprojects and tasks, and reviewing the result. It's provider-agnostic too: Anthropic's API or CLI runners like Claude, Opencode, and Codex can all drive it, since the planning process is what I actually care about, not which model executes it.

It's a modest tool by design — Python, a CLI, tests, and emitted bundles, nothing that needs a server. After a run, the original overview gets moved into the bundle, so every run leaves behind a clean snapshot instead of an ambiguous root directory.
