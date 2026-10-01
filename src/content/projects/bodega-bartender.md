---
title: bodega-bartender
status: active
summary: Drink generator that can only use products from a real store catalog, plus the review pipeline that controls what gets into that catalog.
stack:
  - Next.js
  - TypeScript
  - PostgreSQL
  - Auth.js
  - Leaflet
links:
  - label: Live
    url: https://bodega-bartender.byah.org
  - label: Source
    url: https://github.com/link108/cutty-bangerz
featured: false
---

Bodega Bartender makes up drinks from things you can buy at a liquor store, a
convenience store, or a gas station. The model can get creative with combinations,
but every ingredient has to be a specific product that's in the catalog.

To generate a drink, the app:

1. Picks a random seed and builds an "inspiration pack" from the catalog: some
   flavors, a texture, a mood, a color, and one wildcard.
2. Asks DeepSeek for four different drinks. It finds products through
   `search_products` and `get_product_details` tools.
3. Validates each candidate in code: the products exist, and strength, ABV, mixers,
   and the no-alcohol-with-energy-drinks rule all check out.
4. Scores what's left on how well it uses the inspiration pack, how varied the
   products are, and how different it is from recent recipes. Then it picks one of
   the top three, weighted by score.

The seed, the pack, and all the scores are saved with the recipe. Without a DeepSeek
key, it assembles drinks from catalog metadata instead.

Those catalog tools changed recently. They used to filter an in-memory copy of the
whole active catalog on every tool call. That was fine with 293 active products. It
stopped being fine when activating everything under 500 mL pushed the count to about
4,900. Now the tools come from a real MCP server doing a bounded Postgres search
(at most 20 results). DeepSeek only does OpenAI-style function calling, so the
generator connects to that MCP server in-process and translates between the two.

## The catalog

Most of the work in this project is on the catalog side. Products come in from a few
places:

- A crawler that reads schema.org `Product`/`Offer` data from retailer sites. It
  honors `robots.txt`, stays on the site you gave it, and refuses private network
  targets and sketchy redirects.
- A Walmart Marketplace API adapter, which turns on when OAuth credentials are set.
- Open Food Facts.
- People submitting a product that's missing.

A few retailers (BevMo, World Market, K&L) have adapters that stay disabled until I've
recorded that the retailer has authorized it.

All of it lands in a review queue. Duplicates get caught by UPC, canonical URL,
normalized package size, and fuzzy name matching. Anything oversized or unidentifiable
stays in the queue, and alcohol can't be published until its ABV is backed by a
source or I confirm it by hand. The queue is exposed over MCP too, and a batch job
sends candidates to an agent for triage and fact-checking. It tries Open Food Facts
first because that's free, and paid model calls are capped at 20 a day across both
jobs. Nothing reaches the recipe catalog unless it's explicitly published.

## Everything else

You can rate recipes (one 1-5 rating per anonymous browser session) and submit your
own, which go through the same validation as generated ones. There's a "Chug Jug"
size. The admin area has no public link. You sign in with a magic link sent to one
allowlisted email address, and it expires after ten minutes. The web app and the
crawler worker ship as the same image, run as two deployments.
