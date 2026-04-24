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

This repo is a local developer utility rather than a web app.

The package metadata describes it as a LeetCode CLI, and the file layout suggests a
compact command-line tool for fetching, organizing, and running practice problems locally.

## What it is

`code-practice` is a small Python CLI for practicing LeetCode problems locally instead of
inside the browser. The package metadata is clear about the goal, and the repo layout backs
that up: a compact `lc` package, a Typer-based CLI entrypoint, and local `problems/`
directories for stored exercises.

This is the kind of repo that gets useful by reducing friction rather than by growing a lot
of features. The value is in having a repeatable local workflow for auth, fetching
problems, organizing files, and running code in a way that feels closer to normal
development than to a coding-challenge website.

## How it is organized

The dependency set is intentionally small: Typer for the CLI, `httpx` for network access,
and Rich for output formatting. That combination makes sense for a terminal-first tool and
avoids a lot of unnecessary machinery.

The repo also includes concrete problem folders like `0001-two-sum` and
`0002-add-two-numbers`, which suggests the tool is not only for fetching metadata. It is
designed to support an actual local practice loop with per-problem workspace structure.

## Why it is interesting

This is one of the cleaner examples in the repo set of solving a narrow personal workflow
problem well. It does not need a web UI, database, or service architecture. It just needs
to make practice easier to do locally and easier to keep organized over time.
