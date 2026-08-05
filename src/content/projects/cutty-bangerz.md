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

`cutty-bangerz` is a mobile-first drink generator, but the interesting part is how much
care goes into keeping it grounded in real, purchasable products instead of inventing
plausible-sounding cocktails. The repo ships with a 200-product research catalog,
deterministic safety validation, ingredient substitutions, and store-aware availability
confidence, so a generated drink is tied to something a user could actually go buy.

The Create tab supports fully manual, catalog-backed drinks in personal/solo and
Chug Jug sizes, and missing products can be submitted into a database-backed review
queue before they become eligible recipe ingredients. That review gate shows up
everywhere in the product: nothing enters the public catalog without passing through an
explicit approval step.

## Product Shape

The generation model is more disciplined than a typical "ask the model for a drink"
flow. Each generation starts from a reproducible seed and a catalog-derived inspiration
pack — available flavors, tags, texture, mood, color, and a wildcard. DeepSeek is asked
for four distinct grounded candidates, which are ranked for inspiration coverage,
product variety, and novelty against recent recipes, then one of the strongest three is
picked with weighted randomness. If AI is unavailable, a metadata-driven assembly step
runs before a legacy hardcoded pairing fallback, and the seed, inspiration pack,
candidate scores, and selected strategy are all stored with the recipe.

Community features stay intentionally lightweight: an anonymous per-session UUID backs
one updatable 1–5 star rating per recipe, and human recipe submissions go through the
same product, strength, ABV, mixer, and alcohol/energy-drink validation as generated
ones before publishing. The UI is also careful about availability language, explicitly
distinguishing live partner inventory, session-confirmed products, chain-level
estimates, and unknown inventory rather than presenting sample data as real stock.

## Technical Structure

The private admin area can crawl structured commerce websites for sub-750 mL drinks and
small candy or garnishes. Crawls run in a durable PostgreSQL-backed worker that honors
`robots.txt`, stays on the submitted public origin, rejects private-network targets and
unsafe redirects, and reads schema.org `Product`/`Offer` JSON-LD. Eligibility is
strict — drinks must be 1–749 mL, candy and solid garnishes capped by weight or piece
count, alcohol not publishable until ABV is backed by source evidence — and UPC,
canonical URL, normalized identity/package, and fuzzy name matching prevent duplicates
before anything reaches the catalog.

Known retailer ingestion covers several liquor, convenience, and candy sources through
public structured data, with a Walmart Marketplace API adapter that activates once OAuth
credentials are configured and a set of policy-gated adapters that stay blocked until
retailer authorization is recorded. Admin access itself has no public link: sign-in is
allowlisted to a single operator email via a Resend-delivered magic link, and the app and
worker deploy as the same immutable image, split into a web process and a k3s worker
Deployment.

## Why It Matters

`cutty-bangerz` reads like a small, fun idea — generate me a drink — that got a
surprisingly rigorous data backbone. The generator does not get to hallucinate a product
that does not exist, the ingestion pipeline does not get to publish anything without
review, and the UI does not get to blur the line between confirmed and estimated
availability. That combination of a playful surface and a genuinely careful data layer is
what keeps it from being just another AI toy demo.
