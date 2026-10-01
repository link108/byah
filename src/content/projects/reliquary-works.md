---
title: reliquary-works
status: active
summary: Storefront for configurable deckboxes for sleeved cards, connected to a CadQuery worker that generates the print files for each order.
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

Reliquary Works sells 3D-printed deckboxes for sleeved trading cards. You configure a
box in the browser and see it in 3D. After you pay, a Python worker generates the
STL and STEP files for that exact configuration.

The options are all in `product_catalog.json`, which is versioned:

- Two footprints: Standard (sleeves up to 66 × 92 mm) and Japanese (up to 62 × 89 mm).
- Three capacities: 60, 75, or 100 double-sleeved cards. The stack depths for those
  (48.8, 60.5, and 80 mm) are marked as calibration targets until they pass physical
  fit tests with printed coupons.
- Two surfaces: Wayfarer (plain) and Dungeon Stone (a rock-cell texture).
- Separate body and lid colors. Each color has a preview value for the browser and a
  material code for production.

The catalog describes physical sizes, not games, so nothing in it is tied to a
particular card game's brand.

When checkout completes, Stripe's webhook records the selection, and it can't be
changed after that. The CadQuery worker runs in its own Conda environment, separate
from the web app's devcontainer and deploy pipeline, and the web app calls it over an
authenticated API. Jobs go through an idempotent ledger, so a retried request can't
produce an order twice. Each job writes a manifest with the catalog version, the
resolved dimensions, and checksums of the output files. An `/operations` page shows
the ledger.

```text
 configure + 3D preview (React Three Fiber)
                |
                v
 Stripe checkout --webhook--> selection saved, immutable
                |
                v
 job ledger (idempotent) --> CadQuery worker (Conda)
                                    |
                                    v
                    STL + STEP + manifest.json
                    (catalog version, dimensions, checksums)
```

Without Stripe keys, checkout ends on a page clearly labeled as a demo, and no payment
is taken. Custom names and artwork aren't supported yet.
