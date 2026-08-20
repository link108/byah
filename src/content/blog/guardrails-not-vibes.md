---
title: "Guardrails, Not Vibes"
date: 2026-08-19
summary: "AI is good at building the guardrails it needs, not just the features that need guarding. The catch: the guardrails still have to be enforced by something deterministic."
tags: ["ai", "devops", "automation"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 7
draft: true
---

So far this series has mostly been about why AI-generated change needs more validation, not less. This post is the more optimistic half: AI is also genuinely good at building the validation system itself, if you point it at that instead of only at features.

That's worth saying plainly, because it's easy to read the rest of this series as "be more careful, add more process" and stop there. Adding process by hand, the old way, is exactly the kind of work that gets more expensive as change volume goes up. The better move is using the same tool that's producing the volume to also produce the guardrails.

## What This Actually Looks Like

Concretely, that's things like:

- Generating tests directly from acceptance criteria, instead of from the implementation — which sidesteps the "tests that prove the code does what the code does" trap from earlier in this series, because the criteria exist independently of the change.
- Identifying missing edge cases in a diff — not writing the fix, just naming the gap, which is a much easier thing to get right and a much easier thing for a human to check.
- Reviewing diffs specifically for operational risk — what does this change if it's wrong, not just whether it compiles.
- Drafting rollout and rollback plans alongside a change, instead of after an incident makes clear one was needed.
- Generating dashboards and alerts as part of shipping a feature, not as a follow-up ticket that never gets prioritized.
- Analyzing failed CI runs and summarizing production regressions, which is genuinely tedious work that AI is well suited to and most engineers are happy to hand off.
- Comparing implementation behavior against a spec, which is the acceptance-criteria idea from a different angle.
- Maintaining runbooks and deployment docs, which normally rot the instant someone's too busy to update them.
- Proposing chaos or failure-injection scenarios — the "what happens if this dependency times out" questions that are easy to skip under time pressure.

## The Guardrails Still Have to Be Deterministic

Here's the caveat that matters, and it's the same shape of problem this whole series keeps circling back to: AI should accelerate the creation and operation of guardrails, but the guardrails themselves need to be enforced by something deterministic. A CI check that an AI reviewed and approved is not the same thing as a CI check that mechanically passed or failed. If the enforcement layer is itself just another AI judgment call, you haven't added a guardrail — you've added a second opinion, and a second opinion from a system with the same blind spots as the first one isn't worth much.

So: let AI write the test. Let AI draft the rollback plan. Let AI flag the missing edge case. Don't let AI be the thing standing between a bad change and production with nothing deterministic behind it. The guardrail has to be a gate, not a suggestion — otherwise it's not a guardrail, it's just vibes with extra steps.
