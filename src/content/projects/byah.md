---
title: byah
status: active
summary: Personal site built with Astro, Markdown content collections, and a minimal Docker/nginx deploy path.
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

**tl;dr**: I built this to have a personal site that feels like editing a few text files, not maintaining a whole publishing system.

I wanted a place for project notes, blog posts, a now page, and a small pile of links without dragging in a CMS or a backend I would eventually resent.

It’s Astro, Markdown/MDX, and plain CSS. Most of the content just lives in collections, which means adding something new is basically writing a file and rebuilding the site. That is much closer to how I want a personal site to work.

The part I like most is what is missing. There is no database, no auth, and no admin UI. The deploy path is intentionally boring too: build static files, serve them with nginx, move on. I think personal sites usually get worse when they start acting like platforms.

I’m trying to keep the whole thing light enough that I can come back to it after a few months, remember how it works, and change it without friction. Some of it is still rough, but I’d rather have that than something polished and annoying to maintain.
