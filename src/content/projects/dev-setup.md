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

This repo is infrastructure for the workstation itself rather than an application.

It captures the machine setup, package configuration, shell environment, and bootstrap
scripts needed to recreate the development environment on a target Mac.

## What it is

`dev-setup` is a reproducible workstation repo for macOS, built around Nix flakes, Home
Manager, and Homebrew for GUI apps. Instead of treating a laptop setup as an accumulation
of manual tweaks, this repo tries to make the machine itself a versioned, rebuildable
system.

That changes the role of the repo entirely. It is not an app and not deployment
infrastructure. It is the personal operating environment that all the other repos are
built from.

## How it is organized

The layout includes shell config, git config, terminal/editor setup, host-specific config,
bootstrap scripts, and flake definitions. There are also separate directories for tools
like tmux, vim, zsh, emacs, and GUI-related app preferences, which suggests the repo is
being used as a full environment spec rather than a partial dotfiles dump.

The README makes the target machine explicit and describes the bootstrap path, which is a
good sign that the repo is meant to be rerun and maintained rather than copied once and
forgotten.

## Why it is interesting

A lot of personal setup repos become hard to trust because they mix one-off fixes with a
few reusable config files. This one looks more disciplined. It is trying to make the
development machine itself reproducible, which is the kind of unglamorous systems work
that pays off across every other project.
