---
title: deckforge
status: active
summary: "Magic: The Gathering deckbuilder with an AI agent that can only use cards from the database, and a rules engine that decides legality."
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

deckforge is a Commander deckbuilder with an AI agent in it. The agent can only put a
card in a deck if it pulled that card from the local database, and it doesn't get to
say whether a deck is legal. A deterministic rules engine does that.

The card data is about 32,000 cards synced from Scryfall into Postgres, with full-text
search and filters for color identity, commander eligibility, format, price, type,
keyword, set, and rarity. The agent works through typed tools against that database
and only sees compact results. While it works, it shows short status lines
("Searching cards…", "Checking legality…") rather than its reasoning. Before it can
call a deck legal, the deck has to pass the `RuleSet` engine.

AI review follows the same order. Deterministic analysis runs first (curve, ramp,
draw, and removal counts, dead cards, price). Then the model suggests changes, every
suggested card gets checked against the database again, and accepting a change makes
a new revision instead of overwriting the deck.

The Playtesting Lab deals seeded Monte Carlo opening hands and shows the exact
hypergeometric odds of hitting your land drops and color sources. The page labels
these as odds, not win rates.

Other things it does:

- You can build without an account. Saving a deck gives your browser an anonymous
  guest identity, and signing in is only for getting to your decks from another
  device.
- It imports plain, MTGO, and Arena lists. If a card name is ambiguous, it shows
  suggestions and makes you pick.
- Public decks get strategy pages (early, mid, and late game plans, win conditions,
  a mulligan guide, weaknesses, upgrades) and 5-star ratings.
- You can mark the cards you own. Deck pages then show what's missing and what it
  would cost, with disclosed TCGplayer and eBay affiliate links for buying only those
  cards.

It's one Next.js app split into modules under `src/modules`. The model sits behind an
`LLMProvider` interface that falls back to a deterministic mock when there's no API
key, so local dev and CI don't need a live model. All five planned phases are done.
