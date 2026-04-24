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

`project-planner` is one of the clearest examples in the workspace of taking an LLM-shaped
workflow and turning it into a real file-driven tool instead of a chat habit. The core
idea is narrow and strong: take a `project-overview.md`, run a structured decomposition
process, and emit a planning bundle with projects, subprojects, tasks, prompts, and run
artifacts under `project-bundles/<NN>-<slug>/`.

That constraint is what makes the repo interesting. It is not trying to replace project
management, and it is not pretending that “ask the model for a plan” is enough. It treats
planning as a repeatable transformation from one kind of artifact to a richer set of
artifacts. Because of that, the output can be versioned, reviewed, rerun, and compared
across iterations.

The README is explicit that the tool supports different providers, including Anthropic and
CLI runners like Claude, Opencode, and Codex. That matters less as a feature checklist and
more as a sign that the repo is trying to abstract the planning workflow from any single
model vendor. The planning system is the product. The model is just the engine that helps
execute it.

## Workflow Design

The workflow starts with a top-level overview, then expands into a bundle containing a copy
of the original overview, a project breakdown, per-project plans, subproject decomposition,
and actionable markdown files like `SUBPROJECT.md`. That output shape is much better than a
single generated doc because it preserves hierarchy and lets later work target the right
granularity.

The prompt library is also more serious than it first appears. There are templates for
project-overview breakdown, repo inventory, subproject detail/finalization/listing, task
detail/finalization/listing, next-task prompts, and review prompts. That means the repo is
really encoding a planning protocol, not just a one-shot prompt.

The presence of `project-bundles/repo-inventory.md` is especially telling. The planner is
not operating in a vacuum. It can maintain and reuse repository context across runs, which
makes the resulting plans less generic and better connected to the actual codebase or repo
set being worked on.

## Technical Shape

Technically, the repo is modest on purpose: Python, a CLI entrypoint, tests, prompt files,
and emitted planning bundles. That is a good match for the problem. The tool does not need
a web app or background worker to be useful. It needs to be inspectable, scriptable, and
easy to rerun.

The one-shot behavior is a good example of intentional design. After a run,
`project-overview.md` is moved into the run bundle. That sounds small, but it enforces a
useful discipline: planning runs produce snapshots, and those snapshots become artifacts
instead of leaving the root repo state ambiguous.

## Why It Matters

There is a nice middle ground here between brittle one-off prompting and heavyweight PM
software. `project-planner` occupies that middle ground well. It lets planning stay in the
repo, keeps the artifacts reviewable, and gives the decomposition process enough structure
that it can be improved over time.

In practice, that may be the most valuable thing about the repo. It makes planning legible.
Instead of losing strategy work in chat history, it turns that work into files with names,
paths, and an audit trail.
