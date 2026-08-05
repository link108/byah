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

**tl;dr**: I built this because practicing in the browser always felt like the wrong environment — I wanted it to feel like normal local development instead.

It's a small Typer-based CLI (`lc`) for fetching, organizing, and running practice problems without leaving the terminal. Each problem gets its own folder — `0001-two-sum`, `0002-add-two-numbers`, and so on — so I end up with an actual workspace instead of a pile of scratch files.

The dependency list is intentionally tiny: Typer for the CLI, `httpx` for network calls, Rich for output. I didn't want this to become its own project to maintain — just something that removes friction from a habit I actually want to keep up.
