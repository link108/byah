---
title: cutty-bangerz
status: active
summary: Mobile-first drink generator grounded in a real liquor and convenience-store catalog, with a review-gated retailer ingestion pipeline and a community recipe library.
stack:
  - Next.js
  - TypeScript
  - PostgreSQL
  - Auth.js
  - Leaflet
links:
  - label: Live
    url: https://drank.byah.org
  - label: Source
    url: https://github.com/link108/cutty-bangerz
featured: false
---

**tl;dr**: I built this because I wanted a drink generator that's actually tied to things you can buy, not an AI making up a plausible-sounding cocktail.

The idea is mobile-first and a little silly on purpose — generate me a drink — but I didn't want it hallucinating a product that doesn't exist. So every generation starts from a real, researched catalog (200+ products), gets checked against deterministic safety rules, and only suggests substitutions that are actually in the data. DeepSeek proposes a few grounded candidates from a seeded inspiration pack, they get ranked for variety and novelty against recent recipes, and one gets picked with some weighted randomness — the seed and scores are stored with the recipe, so a generation is reproducible.

Getting new products into the catalog is its own small pipeline. There's a private admin crawler that reads structured commerce data, honors `robots.txt`, and stays on the retailer's own domain, plus a Walmart Marketplace API adapter for retailers that support it. Nothing reaches the public catalog without going through review first — I didn't want the ingestion side able to publish anything on its own.

Community features stay deliberately light: an anonymous per-session rating, and human recipe submissions run through the same validation as generated ones. Admin access has no public link at all — sign-in is allowlisted to a single email via a magic link, and the app and its background worker deploy as the same image, split across a web process and a k3s worker.
