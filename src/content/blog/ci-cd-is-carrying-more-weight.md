---
title: "CI/CD Is Carrying More Weight Than It Used To"
date: 2026-08-19
summary: "CI/CD used to run after the real thinking happened. When AI skips that thinking, the pipeline ends up doing more of the trust-building work itself."
tags: ["ai", "devops", "ci-cd"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 4
aiInvolvement: heavy-draft
draft: true
---

CI/CD used to be the thing that ran after the interesting work was done. You wrote the code, CI ran the checks, CD shipped it. Necessary, a little boring, mostly invisible unless it broke.

I think that's changing — not because CI/CD itself got more interesting, but because it's now doing more of the actual safety work in the system. When a human writes a change, a decent chunk of the validation already happened in their head before they opened a PR: they understood the system, thought through the edge cases, had some model of what could go wrong. AI-generated changes skip that step. The validation still has to happen somewhere, and increasingly it happens in the pipeline, because it's not happening upstream in someone's head the way it used to.

## Smaller, More Reversible, More Often

The practical shift is size and reversibility. The faster code gets generated, the smaller and more reversible each deployment should be — which is close to the opposite of a lot of teams' instinct when velocity goes up. It's tempting to bundle more into a release because you can generate more. That's backwards. More generated change means more that could be wrong, which means each individual deployment should carry less risk, not more.

That points to a fairly specific set of practices, most of which aren't new — they just get more load-bearing:

- Small, independently deployable changes, so a bad one is easy to isolate.
- Required automated checks that actually block merge, not checks that exist but get overridden under deadline pressure.
- Reproducible builds, so "works in CI" reliably means "works," full stop.
- Preview environments, so a change gets exercised somewhere real before production.
- Deployment approvals that scale with risk instead of applying uniformly — a copy change doesn't need the same gate as a payments migration.
- Progressive delivery — feature flags, canaries — so a bad change affects a fraction of traffic, briefly, instead of everyone, immediately.
- Automatic rollback, triggered by signal rather than by someone noticing.
- Deployment verification that actually checks the deployment worked, not just that it completed.

## The Pipeline Is Where Trust Gets Built

None of that is exotic. Most mature engineering orgs already do some of it. The difference is what happens if you don't, now, versus five years ago. A weak pipeline used to mean occasional pain. A weak pipeline combined with a much higher volume of AI-generated change means the pipeline is the only thing standing between confident-and-wrong and production, and it's standing there a lot more often.

I don't think this means CI/CD needs to get more complicated. If anything the opposite — the pipeline needs to be simple enough that it's actually trustworthy, because it's earning a kind of trust that used to live partly in a person's head. That's a different job than "run the tests and deploy." It's closer to being the thing that decides, mechanically, whether a change gets to exist in production at all.
