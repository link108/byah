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
  - label: Source
    url: https://github.com/link108/byah
featured: false
---

This repo is the site you are looking at now.

It keeps content in the repo, builds to static files, and stays intentionally small so it
is easy to edit and redeploy without a CMS or database.

## What it is

`byah` is the pared-down personal site in this repo: a static Astro site with Markdown and
MDX content, light structure, and a Docker/nginx deploy path. The design direction has
been deliberately pulled toward plain text and basic HTML behavior rather than a polished
app-shell feel.

That simplicity is the point. The site is meant to be edited directly in the repo,
rebuilt, and redeployed without introducing a database, CMS, auth layer, or runtime
backend that would make a personal publishing setup heavier than it needs to be.

## How it is organized

The content model is driven by Astro content collections. Blog posts, project pages, and
links all live under `src/content`, and the route structure is generated from those files.
That gives the site a clear separation between authored content and layout code without
requiring any admin interface.

The deployment path is equally small: build static files, copy them into an nginx image,
and serve them. There is also a small Woodpecker pipeline and `justfile` support around
the project, which keeps local and CI workflows aligned.

## Why it is interesting

This repo is less about technical novelty and more about restraint. It is a useful example
of what a self-hosted personal site looks like when the design goal is “easy to modify and
hard to break” instead of “feature-rich publishing platform.”
