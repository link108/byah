---
title: games
status: active
summary: Site for BYAH Games, currently home to CA Idle, an idle game built on cellular automata.
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

games.byah.org is a small Astro site for the games I'm making. Right now that's one
game: **CA Idle**, an idle game built on cellular automata. It's still in development.

Each game is an entry in a typed array in `src/data/games.ts` (slug, name, tagline,
status, platforms, tags). The homepage feature slot, the games grid, each game's page,
and the sitemap are all generated from that list. A game without screenshots gets a
cellular automaton pattern seeded from its slug instead of placeholder art.

"BYAH Games" doesn't have a brand yet. Everything about the studio's identity is in
one config file for whenever it does.
