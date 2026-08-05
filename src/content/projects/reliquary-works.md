---
title: reliquary-works
status: active
summary: Pixel-fantasy storefront and CadQuery-based parametric manufacturing pipeline for sleeved-card deckboxes, from Stripe checkout to production-ready STL/STEP files.
stack:
  - Next.js
  - React Three Fiber
  - Drizzle ORM
  - PostgreSQL
  - Stripe
  - Python
  - CadQuery
links:
  - label: Live
    url: https://reliquary-works.byah.org
  - label: Source
    url: https://github.com/link108/reliquary-works
featured: false
---

**tl;dr**: I built this to connect an actual storefront to an actual manufacturing pipeline — pick a configuration in the browser, and a Python worker turns it into a real, checksummed STL/STEP file.

You configure a sleeved-card deckbox — footprint, capacity, surface finish, body and lid color — and preview it in 3D with React Three Fiber before checkout. The catalog (`product_catalog.json`) is the versioned source of truth for every dimension and finish, and I've been honest about it directly in the data: stack depths are marked as calibration targets until they've passed physical fit tests, not guarantees.

The manufacturing side runs isolated on purpose. CadQuery generation happens in its own environment, talks to the web app over an authenticated worker, and keeps an idempotent job ledger so a retried request can't double-manufacture an order. Every finished job produces a manifest with the catalog version, resolved dimensions, and checksums, so I can trust a file actually came from the configuration it claims to.

If Stripe isn't configured, checkout falls back to a clearly labeled demo confirmation instead of silently taking payment — a sensible default while I'm still validating tolerances on the physical side. This is the one project here where the code has to answer to a physical object at the end, not just a database row, and that constraint shows up everywhere in how careful the catalog data has to be.
