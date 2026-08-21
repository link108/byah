---
title: "What Counts as Validated"
date: 2026-08-19
summary: "The testing pyramid answers 'how many of each test type.' It doesn't answer 'can I trust this change' — and AI-generated code makes that gap expensive."
tags: ["ai", "qa", "testing"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 3
aiInvolvement: heavy-draft
draft: true
---

The testing pyramid is a fine model for a specific problem: how much of each test type you should write, relative to cost and speed. Lots of fast unit tests, fewer integration tests, a handful of end-to-end tests. It's a useful shape when the bottleneck is writing tests.

It's a worse model when the bottleneck is deciding whether to trust a change, which is closer to where a lot of teams actually are now. The pyramid tells you about test types. It doesn't tell you whether a change is safe to ship, and those used to have similar-enough answers that nobody had to separate the two questions.

## A Validation System Is Bigger Than a Test Suite

If the actual question is "can I trust this change," a test suite is one input, not the whole answer. The fuller list looks something like:

- Formatting, linting, and static analysis — the cheapest possible check, and still worth running first.
- Type checking, where the language supports it, which catches a good chunk of the AI-invented-API mistake almost for free.
- Unit and property-based tests — the classic layer, still necessary, just not sufficient.
- Contract and API compatibility tests — does this change break an assumption some other part of the system was relying on.
- Integration tests against real dependencies, where that's practical, because a mock will happily validate a call to a method that doesn't exist.
- Migration validation, specifically — schema changes are one of the places "confident and wrong" gets expensive fast.
- Security and dependency scanning.
- Performance regression checks.
- End-to-end tests for the handful of journeys that actually matter.
- Production verification, which is really its own thing and gets its own post later in this series.

That's not a pyramid. It's closer to a set of gates, and different gates are answering different questions. "Does this compile" and "does this violate a security policy" and "does this break checkout" aren't the same kind of check, and treating them as interchangeable rungs on one ladder undersells how different their failure modes are.

## Who Grades the Homework

Here's the part that actually matters for AI-assisted work specifically: AI is genuinely good at building all of the above. It'll write your unit tests, draft a lint config, generate a migration test, sketch a contract test against an API spec. Use it for that — it's a legitimate multiplier on the boring, mechanical parts of building a validation system.

What it shouldn't be is the only thing deciding whether its own change passes. If the same process writes the implementation and writes the tests that check the implementation, you've built a system that's very good at agreeing with itself. That's the same failure mode from the last post — tests that check the code does what the code does — just moved up a level, into the validation system itself instead of one test file.

The fix isn't complicated, it's just a discipline: the checks that decide whether a change ships need to be specified independently of the change, ideally before the change exists — acceptance criteria, contracts, tests written against the desired behavior rather than against the implementation. AI can write the checks. It shouldn't be the one deciding the checks passed, at least not alone.
