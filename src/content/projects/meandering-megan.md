---
title: meandering-megan
status: active
summary: A slow-travel journal site — wanderings, a loose route map, and field notes — built for someone else's travels.
stack:
  - Astro
  - TypeScript
links:
  - label: Live
    url: https://meandering-megan.byah.org
  - label: Source
    url: https://github.com/link108/meandering-megan
featured: false
---

**tl;dr**: I built this as a real place for someone else's travel journal to live, instead of scattered notes-app entries and camera-roll captions.

It's a static Astro site built around the actual shape of that kind of travel — wanderings, a loose route map, and short field notes — rather than a generic blog template with dates bolted on. No database or backing services; it's just content and a build step, deployed the same way as the other small sites here: push to `main`, Woodpecker builds an image, a deploy PR lands against homelab, and it rolls out to `meandering-megan.byah.org`.

```text
   markdown content
        |
        v
   astro build (static)
        |
        v
   Docker image --> homelab deploy PR
        |
        v
   meandering-megan.byah.org
```

It's small on purpose — no comments, no accounts, nothing to moderate. Just somewhere the writing looks like it actually belongs to whoever wrote it.
