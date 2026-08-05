---
title: dev-setup
status: active
summary: Reproducible macOS development environment built with Nix flakes, Home Manager, and Homebrew.
stack:
  - Nix
  - Home Manager
  - Homebrew
  - Shell
links:
  - label: Source
    url: https://github.com/link108/dev-setup
featured: false
---

`dev-setup` is a reproducible macOS workstation, built around Nix flakes, Home Manager, and
Homebrew for GUI apps. Instead of a laptop setup that accumulates as a pile of manual
tweaks, the whole machine is a versioned, rebuildable system — shell config, git config,
terminal and editor setup, host-specific config, and bootstrap scripts, plus dedicated
config for tools like tmux, vim, zsh, and emacs.

It's not an app and it's not deployment infrastructure — it's the personal operating
environment everything else gets built from, with an explicit target machine and bootstrap
path meant to be rerun and maintained rather than copied once and forgotten.

## Why It's Interesting

A lot of personal setup projects become hard to trust because they mix one-off fixes in
with the reusable config. This one is more disciplined about it — making the development
machine itself reproducible, which is the kind of unglamorous systems work that pays off
across every other project.
