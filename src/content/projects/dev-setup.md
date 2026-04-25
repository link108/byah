---
title: dev-setup
status: active
summary: Personal macOS setup built to make a working machine easier to rebuild without pretending everything belongs in one tool.
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

**tl;dr**: I built this so my Mac setup is something I can rebuild on purpose instead of reassembling from memory every time a machine changes.

I wanted something more reliable than a pile of dotfiles, but less doctrinaire than forcing every part of a laptop through one tool. So the shared CLI tools, shell config, editor setup, and dev shells live in Nix and Home Manager, while GUI apps stay in Homebrew where that still feels simpler.

What makes it interesting to me is that it treats the machine itself as part of the work. There’s a bootstrap script I can rerun, a few focused dev shells for different kinds of projects, and just enough host-specific config for an older Intel Mac without turning the whole thing into a mess of special cases.

I’m trying to keep the tradeoffs honest. I don’t really care about purity for its own sake here. I care that I can get a shell I like, open Neovim or tmux, install the boring everyday tools, and end up with a setup that feels familiar again without too much ceremony.

This part is still a little rough, which is probably the natural state of a personal setup like this. A few things are split between systems on purpose, and I’m fine with that. I’d rather have something practical that I can maintain than a perfectly clean setup that turns into its own side project.
