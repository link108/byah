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

`deckforge` is a deckbuilding tool for Magic: The Gathering, built around a real card
database rather than an AI chat window that happens to talk about cards. It searches
32k+ Scryfall-synced cards with full-text and filter support, builds Commander decks
through an AI agent that is only allowed to reference cards it actually retrieved, and
backs every legal-deck claim with a deterministic rules engine rather than trusting the
model's judgment. All five planned phases are live: card data, decks and legality, AI
agent and review, affiliates, and collections/simulations.

Saving a deck does not require an account: the editor, importer, and AI chat all
auto-assign an anonymous, cookie-scoped guest identity that shows up under "My decks"
like any other deck, and signing in is only needed to carry that deck to another device.

## Product Shape

The AI deckbuilder at `/build` is a tool-calling agent that streams concise status
("Searching cards…", "Checking legality…") instead of chain-of-thought, and it must pass
the deterministic Commander legality engine before a deck can be presented as legal. AI
deck review works the same way in reverse: deterministic analysis (curve, ramp/draw/
removal counts, dead cards, price) runs first, then AI suggestions are re-verified
against the database before being offered, and accepted changes become a new revision
rather than an overwrite. Public deck pages carry structured strategy guides —
early/mid/late-game plans, win conditions, a mulligan guide, weaknesses, and an upgrade
path — plus 5-star ratings that don't require login.

The Playtesting Lab is a good example of the project's general instinct toward rigor
over vibes: it runs seeded Monte Carlo opening hands alongside exact hypergeometric land
and color-source odds, explicitly labeled as odds rather than win rates. Affiliate
purchasing (TCGplayer and eBay) sits behind a disclosed provider interface with click
tracking and no stored payment credentials, and the Collections feature marks owned
cards so a deck page can show exactly what's missing and what it costs to complete.

## Technical Structure

The app is a modular monolith: domain logic lives in `src/modules/*` (cards, decks,
legality, deck-analysis, deck-strategy, chat, users, collections, pricing, affiliates,
simulations), each exposing a public API via `index.ts`, with routes and server actions
as thin Zod-validated adapters that never let modules import UI. The AI only sees compact
results from typed tools querying the local database, a pure `RuleSet` engine gates every
save so the agent cannot bypass legality, games and formats are data rows keyed to
rule-set implementations for future extensibility, and guest identity is handled with a
single `df_guest` cookie mapped lazily to a real (passwordless) `User` row so guest and
signed-in ownership share the same code paths.

The AI provider itself is an abstraction over the Anthropic API with a deterministic
mock fallback when no key is configured, which keeps local development and CI from
depending on a live model. Test coverage (146+ tests) is weighted toward the parts that
actually carry risk: the Commander legality suite, decklist parsing, simulation math with
known hypergeometric values, agent-loop behavior under a scripted mock provider
(including a test that an illegal deck cannot be saved as valid), and a full Playwright
journey from signup through import, publish, affiliate redirect, and hand simulation.

## Why It Matters

`deckforge` is a strong example of putting an LLM inside real guardrails instead of
letting it own the source of truth. The agent can propose, but a deterministic legality
engine and a re-verification pass decide what's actually true, and the guest-identity
model means the product works well before anyone creates an account. That combination —
real grounding, real rules enforcement, and a low-friction path to the core feature — is
what separates it from a chatbot with card art bolted on.
