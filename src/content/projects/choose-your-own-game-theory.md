---
title: choose-your-own-game-theory
status: active
summary: AI-assisted strategy sim built around turn pages, structured state, and a pretty strict separation between simulation truth and narrative.
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

**tl;dr**: I’m building this as a choose-your-own-adventure strategy sim where the interesting part is making AI-generated narrative sit on top of real simulation rules instead of replacing them.

I wanted something that felt more structured than "chat with a story" but still had some of the flexibility that makes LLM-driven stuff fun. The basic idea is simple: define a world, its actors, and its tensions, then move through it one turn-page at a time.

The part I care about most is the split between simulation and presentation. The state is supposed to be the truth. The page is the experience. So each turn produces narrative, a state summary, and a set of choices, but the model is mostly there to propose outcomes and write them up. It is not supposed to quietly become the game engine.

That constraint is what makes it interesting to me. There is a scenario editor, a draft-first builder, and a play loop, but a lot of the real work is around validation, turn resolution, and making sure choices are actually grounded in the current state. I would rather this be a little rigid than have it drift into nonsense after three turns.

It is still pretty in-progress. There are debug panels, runtime notes, a bunch of integration tests, and obvious signs that I am still feeling out where structured mechanics should end and model inference should begin. That is probably the project, honestly.
