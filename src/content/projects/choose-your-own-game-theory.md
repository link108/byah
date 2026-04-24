---
title: choose-your-own-game-theory
status: active
summary: Interactive game-theory simulation app with Next.js, Prisma, and Docker-managed local infrastructure.
stack:
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - Docker
links:
  - label: Source
    url: https://github.com/link108/choose-your-own-game-theory
featured: false
---

`choose-your-own-game-theory` is one of the more ambitious repos in the set because it is
trying to build an actual simulation system, not just a content editor with AI sprinkled
on top. The core idea is a choose-your-own-adventure strategy simulator where a user
defines actors, incentives, and world conditions, then advances through page-based turns
that combine structured simulation state with narrative output.

The product docs make a critical distinction that a lot of AI-heavy projects miss:
simulation is the truth layer, and narrative is the presentation layer. Pages are
player-facing artifacts. State is canonical data. The LLM can propose choices, narrative,
or semantic consequences, but it does not own the underlying world model. That is a much
stronger conceptual foundation than letting model output become the de facto game engine.

The repo also has unusually rich planning material. There are top-level overviews for the
main product, conversational scenario creation, and the deterministic resolver system,
plus numbered project plans for foundation work, editor flow, simulation engine, LLM
integration, game UI, resolver work, and integration. Even before reading the app code,
you can tell the repo is wrestling with hard questions about authoring, state, choice
generation, and turn resolution.

## Product Shape

The main user experience is page-driven rather than freeform. Each turn produces a
rendered page with narrative, a state summary, and a set of choices. That design matters
because it keeps the product legible. The user reads what happened, sees what changed, and
selects from grounded next actions. The docs explicitly reject cosmetic or incoherent
choices, which suggests the project is trying to keep interaction meaningful instead of
just branching for its own sake.

The conversational scenario creation work is especially interesting. Instead of forcing a
user to manually define every actor and variable from scratch, the repo is pushing toward a
builder that can analyze requirements, generate a draft scenario package, regenerate
sections, and then persist the accepted draft into the canonical scenario model. That is a
much better use of LLM assistance than handing the entire simulation loop to the model.

Then there is the resolver system, which is probably the most technically important part of
the product. The docs describe a two-stage approach where the model emits semantic effects
like `military_escalation` at `moderate` intensity, and a deterministic backend resolver
maps those effects into bounded numeric state changes. That gives the product tuning
control, validation hooks, and a way to keep the world model from drifting into nonsense.

## Technical Structure

The app itself is a modern Next.js + React + Prisma + Postgres system with a substantial
amount of structure under `app/src`. There are distinct layers for the scenario editor, the
game UI, the LLM provider/prompt system, the simulation runtime, the older resolver path,
the scenario DSL, and the draft-oriented builder flow. That is a lot of moving parts, but
the repo organization suggests those parts are being separated with intent.

The API layer also mirrors the product architecture closely. There are routes for scenario
CRUD, package validation, draft generation, requirement analysis, draft-to-scenario
persistence, session creation, turn resolution, and choice regeneration. That means the
repo is not just a UI experiment; it is building a service boundary around authoring and
runtime concerns.

The tests reinforce where the actual risk lives. They are focused on simulation resolution
and integration behavior, which is exactly right. In a project like this, the hard part is
not rendering a page or posting a form. It is whether the scenario system stays coherent
over repeated turns.

## Why It Matters

This repo is interesting because it takes the hard route on purpose. It does not trust the
LLM with truth, it does not flatten state into prose, and it does not pretend simulation
is just storytelling. Instead it is trying to combine authored structure, deterministic
resolution, and generated narrative in a way that still lets a player understand what is
happening.

That makes it a genuinely richer systems problem than most AI application repos. If it
works, the value will come from the seam between structured simulation and generated
presentation, not from either one in isolation.
