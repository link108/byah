---
title: dev-setup
status: active
summary: The Brewfile, dotfiles, and setup scripts for my Mac.
stack:
  - Homebrew
  - zsh
  - Neovim
  - tmux
links:
  - label: Source
    url: https://github.com/link108/dev-setup
featured: false
---

This is how I set up a new Mac. `setup` runs three scripts:

- `install` runs `brew bundle` and installs a couple of Mac App Store apps with `mas`.
- `copy` copies the zsh, git, vim, and emacs dotfiles into my home directory.
- `clone-repos` reads a list of `org:repo` lines and clones them all into
  `~/git-repos`.

The Brewfile is about 160 lines: languages and version managers, Kubernetes and cloud
CLIs, a few JDKs, editors, and everyday command-line tools. `config/` holds the setup for Neovim (lazy.nvim), tmux, Ghostty,
kitty, and AeroSpace.
