---
title: deckforge
status: active
summary: "AI-assisted Magic: The Gathering deckbuilding platform with deterministic Commander legality, strategy pages, and a playtesting simulator."
stack:
  - Next.js
  - TypeScript
  - Tailwind
  - PostgreSQL
  - Prisma
  - Anthropic API
links:
  - label: Live
    url: https://deckforge.byah.org
  - label: Source
    url: https://github.com/link108/deckforge
featured: false
---

**tl;dr**: I built this because I wanted an AI deckbuilder for Magic that isn't allowed to make cards up — every suggestion has to come from a real, searchable card database, and every legality claim has to pass an actual rules engine before it counts.

It searches a real database — 32k+ Scryfall-synced cards with full-text and filter support — and builds Commander decks through an agent that can only reference cards it actually retrieved. I didn't want to trust the model's word on whether a deck is legal, so a deterministic `RuleSet` engine makes that call instead, and nothing gets saved as legal without passing it. Saving a deck doesn't even require an account: the editor, importer, and AI chat all work behind an anonymous guest cookie, and signing in is just how you carry a deck to another device.

```text
 user request
        |
        v
 AI agent --tool calls--> card database (32k+ cards)
        |
        v
 proposed deck
        |
        v
 RuleSet engine (deterministic legality)
        |
    legal? --no--> rejected
        |
       yes
        |
        v
 saved deck (guest cookie or account)
```

The part I'm proudest of is the Playtesting Lab — seeded Monte Carlo opening hands next to exact hypergeometric land and color-source odds, labeled as odds and not win rates, because that distinction actually matters. AI deck review works the same way in reverse: deterministic analysis runs first, and any AI suggestion gets re-verified against the database before it's offered, with accepted changes landing as a new revision instead of an overwrite.

Under the hood it's a modular monolith — cards, decks, legality, chat, collections, pricing, and affiliates each own their own slice of `src/modules`, and the AI only ever sees compact results from typed tools querying the local database. The Anthropic integration falls back to a deterministic mock when there's no key configured, so local dev and CI don't depend on a live model.

It's MVP-complete — card data, legality, the AI agent, affiliates, and collections/simulations are all live, and I've just added email verification and password reset. What I care about most is that the agent gets to propose, but it never gets to decide what's true.
