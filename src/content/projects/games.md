---
title: games
status: active
summary: Site for BYAH Games, a small indie studio built out of simple rules — starting with CA Idle, an incremental game grown from cellular automata.
stack:
  - Astro
  - TypeScript
links:
  - label: Live
    url: https://games.byah.org
  - label: Source
    url: https://github.com/link108/games
featured: false
---

**tl;dr**: I built this because I wanted a real place to ship small games instead of leaving them as one-off repos nobody would ever find.

The site itself is deliberately simple: games are data, not pages. Add an entry to one typed array — slug, tagline, status, platforms, tags — and the homepage feature slot, the games grid, the per-game detail page, and the sitemap all fall out of that single list. The first entry is **CA Idle**, an incremental game grown from cellular automaton rules rather than hand-tuned progression curves.

```text
 src/data/games.ts (typed array)
        |
        +--> homepage feature slot (if featured)
        +--> /games/ grid
        +--> /games/<slug>/ detail page
        +--> sitemap
```

Until a game has real screenshots, its card and hero fall back to a deterministic pattern generated from its own slug instead of stock placeholder art — which felt more honest for something that's still mostly a prototype. "BYAH Games" is a placeholder studio identity for now; there's no separate brand yet, just a config file waiting for one to be worth building.
