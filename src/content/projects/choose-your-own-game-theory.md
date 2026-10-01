---
title: choose-your-own-game-theory
status: active
summary: Choose-your-own-adventure games run by an LLM, where every other character has hidden goals you only see after the game ends.
stack:
  - FastAPI
  - React
  - SwiftUI
  - PostgreSQL
  - DeepSeek
links:
  - label: Live
    url: https://game-theory.byah.org
  - label: Source
    url: https://github.com/link108/choose-your-own-game-theory
featured: false
---

You describe a scenario (a tough conversation with a report, a negotiation, a
diplomatic standoff, a D&D one-shot) or pick one from the library, and then play it
turn by turn. An LLM runs the game. Each turn it writes what happens, gives you three
to five options, and plays every other character. You can also type in something it
didn't offer.

The other characters have their own agendas, and you don't get to see them during
play. Each turn the model returns one strictly validated JSON object with two parts.
The `player_view` is the narrative and your options. The `gm_state` is everything
else: what each character is trying to do and why, hidden facts, and progress toward
the goal. The play endpoints only ever send `player_view`. `gm_state` comes back from
a separate review endpoint once the game is over. If the model returns something that
doesn't validate, it gets retried with the validation errors included.

```text
 player choice + scenario snapshot + last gm_state
                     |
                     v
                  DeepSeek
                     |
                     v
         schema validation --fail--> retry with errors
                     |
            +--------+--------+
            |                 |
       player_view         gm_state
       sent now            stored, used for the next turn,
                           shown only in the post-game review
```

After a game you can read through the hidden state turn by turn and generate a
coaching report on which decisions mattered and what to try next time. You can also
compare finished runs against each other.

A few other details:

- A scenario is mostly free-text fields (premise, setting, tone, goal, roles with
  private info, characters with hidden agendas, GM notes). The model interprets them,
  so the same schema works for a D&D one-shot and a budget meeting. The builder can
  draft all of it from one sentence.
- Every LLM call is cached by prompt hash, so replaying is free and every generation
  can be looked at later.
- A playthrough snapshots its scenario when it starts. Editing the scenario later
  doesn't change a game in progress.
- The library comes from a list of one-line concepts. A script expands each into a
  full scenario, and the results are committed as JSON fixtures after I review them.
- Some scenarios start with a short intake, asking follow-up questions and then using
  your answers in every turn. The higher-risk ones come with extra guardrails and
  disclosures.

Some scenarios are "living" and follow a real news story. Once a day a job pulls
headlines from RSS feeds across the political spectrum (left, center, right,
international), asks the model whether the story has moved, and if it has, updates
the scenario and adds a sourced entry to its situation log. It can add new
characters when new parties get involved. Those updates publish automatically now.
Games already in progress keep their snapshot.

It's a FastAPI backend with a React web app and a SwiftUI iOS app, and a committed
OpenAPI spec between them. Accounts are optional: you start as a guest, and
registering or using Sign in with Apple carries your guest history over.
