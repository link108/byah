---
title: "Observability Is Part of QA"
date: 2026-08-19
summary: "Testing checks the cases you thought of. Observability is what catches the ones you didn't — and that's increasingly where AI-generated changes go wrong."
tags: ["ai", "devops", "observability"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 5
aiInvolvement: heavy-draft
draft: false
---

Testing and observability get lumped together sometimes, as if observability is just testing that happens to run in production. I don't think that's quite right, and the difference matters more now than it used to.

Testing asks a fundamentally bounded question: did the system behave correctly in the cases we thought to check? Observability asks a fundamentally unbounded one: what is the system actually doing, including in the cases nobody thought to check? Those are different questions, and AI-generated change is very good at landing in the second category — the case nobody anticipated, because nobody who deeply understood the system wrote the change.

## Passing Tests, Wrong Behavior

A change can pass every test you have and still be wrong, in the specific sense that it does something nobody intended, in a case nobody tested for, without throwing an exception or a crash — it's just quietly incorrect. That's a semantic failure: the system is technically healthy. Nothing is erroring. The dashboards are green. It's just not doing the right thing, and "the right thing" was never fully specified as a test case to begin with.

That's the case observability exists for. Not "is the server up," but "is the system behaving the way we actually intended," which is a much harder and much more useful question — one testing alone structurally can't answer, because testing only checks what someone thought to write down in advance.

## What That Actually Looks Like

In practice that's less about having "more monitoring" and more about a specific set of things:

- Structured logs and metrics that capture business behavior, not just technical health — conversions, not just CPU.
- Distributed traces, so you can actually follow a request through a system that's now changing faster than any one person can hold in their head.
- Deployment markers on everything, so when a metric moves, "what shipped right before that" is a five-second lookup, not an investigation.
- Error and latency budgets, and release health comparisons — this deploy versus the last one, not just this deploy versus some absolute threshold.
- Synthetic tests running continuously in production, which is really testing wearing an observability costume, and that's fine.
- Monitoring for the specific shape of semantic failure — outputs that are correct-looking but wrong, which is exactly the failure mode from a couple posts back in this series.

## QA Doesn't End at Deploy Anymore

The old model had QA ending before production and operations picking up after. I think that boundary was already getting blurry, and AI-generated change mostly finishes the job of erasing it. If the thing most likely to go wrong is a case nobody anticipated, the validation work that matters most is the kind that keeps running after deploy, watching for exactly that. Observability isn't downstream of QA anymore. At this point it's just the part of QA that covers everything testing structurally can't.
