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

`project-planner` turns an LLM-shaped workflow into a real file-driven tool instead of a
chat habit. The core idea is narrow and strong: take a `project-overview.md`, run a
structured decomposition process, and emit a planning bundle — projects, subprojects,
tasks, prompts, and run artifacts — under `project-bundles/<NN>-<slug>/`.

That constraint is what makes it useful. It isn't trying to replace project management,
and it doesn't treat "ask the model for a plan" as good enough — planning is a repeatable
transformation from one kind of artifact into a richer set of artifacts, so the output can
be versioned, reviewed, rerun, and compared across iterations. It supports multiple
providers, including Anthropic and CLI runners like Claude, Opencode, and Codex — the
planning system is the product, and the model is just the engine that executes it.

## Workflow Design

A run starts from a top-level overview and expands into a bundle containing a copy of the
original overview, a project breakdown, per-project plans, subproject decomposition, and
actionable markdown files like `SUBPROJECT.md` — a shape that preserves hierarchy so later
work can target the right granularity, rather than one flat generated doc.

The prompt library backs a real planning protocol rather than a one-shot prompt:
templates for project-overview breakdown, repo inventory, subproject
detail/finalization/listing, task detail/finalization/listing, next-task prompts, and
review prompts. A maintained repo-inventory file means the planner isn't working from a
blank slate — it reuses repository context across runs, so plans stay connected to the
actual codebase being planned against.

## Technical Shape

The tool itself is modest on purpose: Python, a CLI entrypoint, tests, prompt files, and
emitted planning bundles — no web app or background worker needed to be useful, just
something inspectable, scriptable, and easy to rerun. After a run, `project-overview.md`
moves into the run bundle, so planning runs produce snapshots instead of leaving root
state ambiguous.

## Why It Matters

There's a useful middle ground between brittle one-off prompting and heavyweight PM
software, and `project-planner` sits right in it — planning stays in the repo, artifacts
stay reviewable, and the decomposition process has enough structure to improve over time.
In practice, that's the most valuable part: instead of losing strategy work in chat
history, it turns that work into files with names, paths, and an audit trail.
