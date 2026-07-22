---
title: choose-your-own-game-theory
status: active
summary: AI game master for playable dilemmas, with hidden state, validated turns, and a growing library of strategy scenarios.
stack:
  - FastAPI
  - React
  - SwiftUI
  - PostgreSQL
  - DeepSeek
links:
  - label: Source
    url: https://github.com/link108/choose-your-own-game-theory
featured: false
---

**tl;dr**: I’m building this as a choose-your-own-adventure game master for decisions where the interesting part is not just what happens, but what everyone else wanted and knew when it happened.

You can start from a library scenario or describe your own idea: an engineering-management dilemma, a negotiation, a diplomatic crisis, a D&D one-shot, whatever. The app turns that setup into a role-based playthrough with a narrative, a visible state summary, and a few grounded choices at each step. You can also suggest an action the game did not offer.

The boundary I care about most is between what the player sees and what the game knows. Every model response has to pass a typed schema, then the turn is stored as two separate things: a safe `player_view` for play and a `gm_state` containing hidden facts, actor intentions, and private reasoning. That is a real storage and API boundary, not a prompt asking the model to please avoid spoilers.

```text
 Browser / iOS app
        |
        v
     FastAPI <----- scenario snapshot + player choice
        |
        v
 prompt + hidden state -----> DeepSeek
        ^                         |
        |    invalid output       v
        +---------------- Pydantic validation
                                  |
                    +-------------+-------------+
                    |                           |
               player_view                  gm_state
              (shown now)            (revealed in review)
                    |                           |
                    +-------------+-------------+
                                  |
                              PostgreSQL
                                  |
                              next turn
```

That split makes the post-game review the payoff. Once a run ends, you can go behind the curtain, inspect what the other actors were trying to do on each turn, and generate an analysis of which decisions mattered. The app can also compare completed runs to show how your approach changes over time.

The project has grown into more of a product than the first prototype. There is a React web app and a SwiftUI client on the same FastAPI API, guest sessions that can be claimed by an account, rotating refresh tokens, Sign in with Apple, and a committed OpenAPI contract. Playthroughs snapshot their scenario at the start, so editing a scenario later cannot quietly rewrite a game already in progress.

There is also a curated scenario catalog spanning game-theory classics, engineering leadership, negotiations, diplomacy, mysteries, and smaller everyday conflicts. A few “living” scenarios can follow real news: a scheduled job gathers sources across the political spectrum, drafts an update, and leaves it for human approval before anything reaches players. Existing playthroughs still keep their original snapshot.

It is actively in progress. The core loop, web experience, API, tests, observability, deployment pipeline, and first iOS client are real; subscriptions and more ambitious authoring and branching ideas are not. The tension I’m still working through is the useful one: how much freedom the model should get without giving up predictable rules, information boundaries, or the ability to explain why a run unfolded the way it did.
