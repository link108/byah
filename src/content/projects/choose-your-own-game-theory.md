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
  - label: Live
    url: https://game-theory.byah.org
  - label: Source
    url: https://github.com/link108/choose-your-own-game-theory
featured: false
---

`choose-your-own-game-theory` is a choose-your-own-adventure strategy simulator: a user
defines actors, incentives, and world conditions, then advances through page-based turns
that combine structured simulation state with narrative output. It's one of the more
ambitious projects here because it's building an actual simulation system, not just a
content editor with AI sprinkled on top.

The core design principle is that simulation is the truth layer and narrative is the
presentation layer. Pages are player-facing artifacts; state is canonical data. The LLM
can propose choices, narrative, or semantic consequences, but it doesn't own the
underlying world model — a much sturdier foundation than letting model output become the
de facto game engine.

## Product Shape

The experience is page-driven rather than freeform: each turn produces a rendered page
with narrative, a state summary, and a set of choices, so the player reads what happened,
sees what changed, and picks from grounded next actions rather than cosmetic or
incoherent options.

Scenario creation is conversational rather than a blank form — instead of making a user
define every actor and variable from scratch, a builder analyzes requirements, generates a
draft scenario package, regenerates sections on request, and persists the accepted draft
into the canonical scenario model.

The resolver is probably the most technically important piece: the model emits semantic
effects like `military_escalation` at `moderate` intensity, and a deterministic backend
resolver maps those effects into bounded numeric state changes. That gives the simulation
tuning control, validation hooks, and a way to keep the world model from drifting into
nonsense.

## Technical Structure

The app is a Next.js + React + Prisma + Postgres system with distinct layers for the
scenario editor, the game UI, the LLM provider/prompt system, the simulation runtime, the
scenario DSL, and the draft-oriented builder flow. The API mirrors that shape: routes for
scenario CRUD, package validation, draft generation, requirement analysis,
draft-to-scenario persistence, session creation, turn resolution, and choice
regeneration — a real service boundary around authoring and runtime, not just a UI
experiment.

Tests focus on simulation resolution and integration behavior, which is where the actual
risk lives — the hard part isn't rendering a page or posting a form, it's whether the
scenario stays coherent over repeated turns.

## Why It Matters

This project takes the hard route on purpose: it doesn't trust the LLM with truth, doesn't
flatten state into prose, and doesn't treat simulation as just storytelling. It combines
authored structure, deterministic resolution, and generated narrative in a way that still
lets a player understand what's happening — a genuinely richer systems problem than most
AI application projects take on, with the value sitting in the seam between structured
simulation and generated presentation rather than in either half alone.
