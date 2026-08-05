---
title: byah
status: active
summary: Static personal site built with Astro, Markdown content collections, and a minimal Docker/nginx deploy path.
stack:
  - Astro
  - TypeScript
  - Markdown
  - Docker
links:
  - label: Live
    url: https://byah.org
  - label: Source
    url: https://github.com/link108/byah
featured: false
---

This is that site — a small, static personal site built from Markdown and MDX content, a
handful of Astro layouts, and a Docker/nginx deploy that comes down to two commands and a
rebuild. There's no CMS, no database, and no admin panel. Content lives as files in the
repo, and publishing is just editing a file and redeploying.

That simplicity is deliberate. The design leans toward plain text and basic HTML behavior
rather than an app-shell feel, on the theory that a personal site should still be easy to
touch years from now without relearning a stack.

## Design

Blog posts, project pages, and links each live under `src/content` as their own Astro
content collection, with routes generated straight from those files. Adding a new post or
project page means adding a file, not touching a database or an editor UI.

Shipping it is just as small: build to static files, copy them into an nginx image, and
serve them. A Woodpecker pipeline and a `justfile` keep the local and CI paths in sync, but
there's no runtime backend to operate or patch.

## Why it's here

This site is less about technical novelty and more about restraint — a working example of
"easy to modify and hard to break" over "feature-rich publishing platform."
