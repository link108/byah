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

`reliquary-works` is a configurable storefront for sleeved-card deckboxes that connects
a browser-based product configurator directly to a physical manufacturing pipeline.
Customers choose a card footprint, capacity, surface, and separate body/lid colors;
Stripe captures the immutable selection, and a Python worker turns it into production
STL/STEP files plus a checksummed manifest. The catalog deliberately describes physical
dimensions rather than game brands, and custom names or artwork aren't supported yet —
a scope decision that keeps the manufacturing side tractable.

## Product Shape

The product catalog (`product_catalog.json`) is the versioned source of truth: two
sleeve footprints, each offered in 60-, 75-, and 100-card double-sleeve capacity presets
with documented stack depths, plus named surface finishes like `Wayfarer` and `Dungeon
Stone` that map to specific geometry and seeded textures. The storefront itself is
rendered with React Three Fiber so customers can preview the configured box in 3D before
checkout, and if Stripe environment variables are left blank, checkout falls back to a
clearly labeled demo confirmation rather than silently taking payment — a sensible
default for a product that's still validating its physical tolerances.

The stack depths in the catalog are explicitly marked as calibration targets "until they
have passed documented physical fit tests," which is an unusually honest thing to encode
directly in product data rather than leaving as tribal knowledge. A separate
`/operations` page, gated behind a bearer token, proxies the worker's job ledger so
production status is visible without exposing the worker directly.

## Technical Structure

The manufacturing side is isolated from the web app on purpose. CadQuery generation runs
in its own Conda environment (or an isolated Docker container) and communicates with the
Next.js app over an authenticated HTTP worker listening on port 8090. It stores an
idempotent SQLite job ledger under `production_orders/` and processes one build at a
time, so a retried or duplicated request doesn't double-manufacture an order. Each
completed job produces separate body/lid and combined STL/STEP files alongside a
`manifest.json` that records the catalog and generator versions, resolved dimensions,
material codes, file sizes, and SHA-256 checksums — enough provenance to trust a file
came from a specific, reproducible configuration rather than a one-off script run.

The web app itself is a fairly conventional Next.js/Drizzle/Postgres storefront, with
Stripe webhooks handling `checkout.session.completed` and
`checkout.session.async_payment_succeeded`. Verification spans both halves of the stack:
`npm test`/`lint`/`build` for the storefront and a separate `python3 -m unittest
discover` for the CadQuery generation logic, reflecting the repo's split between a
web product and a small manufacturing service.

## Why It Matters

`reliquary-works` is one of the few projects here where the code has to answer to a
physical object at the end of the pipeline, not just a database row. That constraint
shows up everywhere: a versioned catalog instead of hardcoded dimensions, a checksummed
manifest per order, an idempotent job ledger, and an explicit acknowledgment that the
current measurements are calibration targets rather than guarantees. It's a storefront,
but the discipline it borrows from manufacturing is what makes it worth watching.
