---
title: "Confidently Wrong"
date: 2026-08-19
summary: "AI doesn't fail the way people fail — it fails confidently, fluently, and in ways that look exactly like correct code. That changes what code review actually needs to catch."
tags: ["ai", "qa", "code-review"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 2
draft: true
---

Ask an AI coding tool to do something it doesn't actually know how to do, and it usually won't tell you that. It'll produce something that looks like the answer — a method call, a config flag, a library behavior — confident and syntactically perfect, and sometimes just not real.

That's the part that took me a while to adjust to. Not that AI-generated code has bugs. Human code has bugs too, obviously. It's that the bugs are shaped differently, and the instinct you've built up over years of reviewing human code doesn't transfer cleanly.

## What a Human Mistake Looks Like

A human mistake usually announces itself somehow. Someone rushes a change and leaves a TODO. Someone doesn't fully understand a system and it shows — extra defensive checks, a comment saying "not sure why this is here but don't touch it." The code looks like what it is: a person working at the edge of their own understanding.

## What an AI Mistake Looks Like

AI mistakes don't look uncertain. They look finished. The naming is good, the structure is exactly what you'd expect from someone who knew what they were doing, because it's pattern-matched against a huge amount of code written by people who did. The confidence of the output has nothing to do with whether it's correct.

That shows up in a few specific ways:

- It invents things — a method that doesn't exist on the library you're using, a config option that sounds plausible but isn't there, an argument order borrowed from a different version of an API.
- It solves the case you described and quietly skips the ones you didn't — the timeout, the retry, the empty list, the concurrent write.
- It writes tests that check that the code does what the code does, not that the code does what you actually wanted. Those will pass. Every time. That's the trap.
- It reproduces patterns that used to be right — deprecated APIs, workarounds for problems that got fixed years ago — because that's what a lot of the training data looked like at the time.

None of that makes AI output bad. Most of it is quite good, which is exactly what makes it dangerous to skim.

## Untrusted, Not Useless

I don't think the right response is treating AI output as probably wrong. I think the right frame is: it's an untrusted but highly productive contributor. You wouldn't merge a stranger's PR without review just because the diff looked clean and the tests passed — especially knowing that stranger also wrote the tests. AI-generated code deserves the same posture, minus the part where you'd normally build trust with a contributor over time. There isn't really an "over time" here. Every diff resets to zero.

That has a practical implication for the rest of this series: if the failure mode is confident-and-wrong rather than obviously-broken, a validation system has to be built to catch confident-and-wrong specifically. A lot of teams' existing test suites were built to catch the kind of mistakes humans make. Not this kind.
