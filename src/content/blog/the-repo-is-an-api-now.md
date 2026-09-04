---
title: "The Repo Is an API Now"
date: 2026-08-19
summary: "An AI agent starts every session from zero context. What it can actually learn about your system depends on whether that knowledge lives in prose it might skim, or in something that fails loudly when violated."
tags: ["ai", "devops", "tooling"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 6
aiInvolvement: heavy-draft
draft: true
---

Every AI agent that touches your codebase starts from zero. It doesn't remember the incident from six months ago that's the actual reason for that odd retry logic. It doesn't know your team's opinion about where business logic lives versus where it doesn't. All of that has to get reconstructed, every session, from whatever's actually sitting in the repo.

That's a familiar problem — it's the same one a new hire has on day one. The difference is a new hire has three months of ambient onboarding to close the gap, asks questions in Slack, and eventually builds a mental model that persists. An agent gets one shot at inferring all of that from the files in front of it, every single time, with no memory of having done it before.

## Context That Rots, Context That Doesn't

Most of what teams write down for "onboarding" is prose — architecture docs, READMEs, a wiki page somebody wrote two reorgs ago. Prose degrades. Nobody's paged when a doc goes stale, so it just sits there, wrong, looking exactly as authoritative as it did the day it was accurate. A human skims it and has some intuition for which parts to distrust. An AI agent, by default, doesn't have that intuition — it'll treat a three-year-old architecture doc with the same confidence as a lint rule that runs on every commit.

The stuff that stays true is the stuff that's enforced. A type signature can't go stale without the build breaking. A test that pins down a specific behavior can't quietly drift out of sync with that behavior without failing. A lint rule either runs or it doesn't. None of that requires anyone to remember to update a doc, because the system won't let it lie to you.

I don't think this means throw out the docs. It means: if a piece of knowledge actually matters — this boundary shouldn't be crossed, this pattern is the one we use, this dependency direction is intentional — the version of that knowledge worth trusting is the one a machine enforces, not the one a machine (or a person) merely reads.

## What This Looks Like in Practice

Some of this is mechanical and cheap:

- One command to set up the repo from nothing, one command to run the tests — not a wiki page describing eleven manual steps.
- A fast, targeted test suite an agent can actually run in a loop, not just a slow full suite reserved for CI.
- Types and schemas doing double duty as both correctness checks and documentation of what a function actually expects.
- Architectural tests that fail the build when a boundary gets crossed, instead of a diagram nobody's looked at since it was drawn.
- A couple of real examples of "this is the pattern we use here," living next to the code, not in a separate docs site.

None of that is new advice, exactly. Good repos have mostly looked like this for a while, because it was already good for onboarding humans. What's changed is the cost of *not* having it. A human who hits a stale doc or a missing setup script loses twenty minutes and asks a coworker. An agent that hits the same gap doesn't ask — it guesses, confidently, in exactly the way this series talked about a couple of posts back, and now you're reviewing a plausible-looking change built on a wrong assumption about how your system works.

## The Repo Is Doing More Work Than It Used To

I think the honest way to describe this shift is: the repository stopped being just a place code lives and started being an interface — something other systems, human and otherwise, integrate against. APIs that are well-specified and enforce their own contracts get used correctly more often than APIs that are "documented" in a doc nobody reads. Repos work the same way now, except the caller asking "what am I allowed to do here" might be an agent instead of a person, running that question a hundred times a day instead of once during onboarding.

None of this replaces the validation work from earlier in this series — a well-structured repo doesn't mean you can skip review, and it's not a substitute for the guardrails an AI-generated change still needs before it ships. What it does is make every one of those downstream checks cheaper and more accurate, because the thing generating the change had less room to guess wrong in the first place.
