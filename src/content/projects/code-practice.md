---
title: code-practice
status: stable
summary: Small Python CLI for doing LeetCode problems in Neovim instead of the browser.
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

`lc` is a little Typer CLI for working LeetCode problems locally:

```text
lc login            save LeetCode session cookies
lc list             browse problems
lc get 1            fetch a problem and create its folder
lc open 1           open the solution and README side by side in Neovim
lc test 1           run the examples locally (--remote runs them on LeetCode)
lc submit 1         submit
```

Each problem gets its own folder with the problem statement as a README and a
solution file. The local test runner loads your solution and runs it against the cases in
the problem's `tests.json`, so most of the time you don't need to hit LeetCode until you submit.

It depends only on Typer, httpx, and Rich.
