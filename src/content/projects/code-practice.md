---
title: code-practice
status: stable
summary: Python CLI for practicing LeetCode problems locally with a small Typer-based workflow.
stack:
  - Python
  - Typer
  - httpx
  - Rich
links:
  - label: Source
    url: https://github.com/link108/code-practice
featured: false
---

`code-practice` is a small Python CLI for practicing LeetCode problems locally instead of
in the browser — a compact `lc` package, a Typer-based CLI entrypoint, and local
`problems/` directories for stored exercises.

It gets useful by cutting friction rather than by growing features: a repeatable local
workflow for auth, fetching problems, organizing files, and running code that feels closer
to normal development than to a coding-challenge website.

## How It's Built

The dependency set is intentionally small — Typer for the CLI, `httpx` for network access,
Rich for output formatting — which fits a terminal-first tool and avoids unnecessary
machinery. Problems land in their own folders (`0001-two-sum`, `0002-add-two-numbers`, and
so on), so the tool supports an actual local practice loop with per-problem workspace
structure, not just fetching metadata.

## Why It's Interesting

This is a clean example of solving a narrow personal workflow problem well. No web UI,
database, or service architecture needed — just a tool that makes practice easier to do
locally and easier to keep organized over time.
