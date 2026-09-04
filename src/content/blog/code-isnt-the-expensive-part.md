---
title: "Code Isn't the Expensive Part"
date: 2026-08-19
summary: "AI made writing code cheaper. It didn't make reviewing, testing, deploying, or operating that code any cheaper — and that's where the real cost of software always lived."
tags: ["ai", "devops", "qa"]
series:
  name: "AI Velocity Requires Engineering Discipline"
  order: 1
aiInvolvement: heavy-draft
draft: true
---

AI is making it dramatically cheaper to produce code. But code was never the only expensive part of software.

That's easy to miss right now, because the code-writing part is the part that's visibly changing. You can watch it happen — describe a feature, get a working implementation back in a couple of minutes, iterate again. It's genuinely impressive, and it's easy to walk away from that experience thinking the hard part of software is basically solved.

I don't think it is. I think it moved.

## Code Isn't the Expensive Part

Writing code was never the whole software development lifecycle. It's the part everyone likes to talk about, because it feels like the "real work," but a working feature also has to be reviewed, tested, integrated with everything else that exists, deployed without breaking anything, and then operated — monitored, debugged, and eventually changed again by someone who didn't write it.

None of that got cheaper because an AI wrote the diff. If anything, it got more expensive, because now there's more diff.

## The Bottleneck Moves

Here's the part I keep coming back to: when the cost of producing a change falls, the value of determining whether that change is safe goes up. Not because the code is worse — sometimes it's fine, sometimes it's better than what a tired engineer would've written at 4pm on a Friday — but because there's more of it, and someone still has to decide whether to trust it.

A team that gets five times faster at generating implementations but doesn't get any faster at reviewing, testing, and shipping them safely isn't actually five times faster. It's accumulating unreviewed change. That backlog has to go somewhere — it turns into a review bottleneck, or it turns into production incidents, or, the quietly worse option, it turns into code nobody fully understands that just sits there working until it doesn't.

Engineers can now explore more ideas per hour, generate more implementations, and poke at systems they don't have deep context on, faster than before. That's a real capability increase. But it's a capability increase in production, not in judgment — and judgment is what the rest of the lifecycle runs on.

## The Volume Problem

I don't think this is really an AI story. I think AI is just the thing currently increasing the volume of change flowing into a system, and volume has always been the thing that breaks under-invested delivery pipelines. Weak code review breaks under volume. Manual QA breaks under volume. "We'll just be careful" breaks under volume, every time, regardless of who or what wrote the code.

Teams that already had decent review processes, CI, test coverage, and observability are going to feel AI as a genuine speedup, because the rest of their pipeline can absorb more input. Teams that didn't have that are going to feel AI as chaos — more surface area, more incidents, no faster time-to-actually-shipped, and a growing pile of code that passed a vibe check and nothing else.

Same tool, opposite outcome. The difference isn't the AI.

## Where This Goes

That's the thesis for this series: AI doesn't remove the need for DevOps, QA, and automation, it raises the stakes on all three, because it's very good at producing plausible-looking work at a volume no human review process was sized for. The next few posts go through the pieces of that — what AI actually gets wrong (it's not the same shape of mistake a human makes), what a validation system needs to look like when the input volume goes up, why CI/CD ends up doing more load-bearing work than it used to, and why observability starts to matter earlier in the lifecycle instead of only after something breaks.

If generating code keeps getting cheaper, I suspect the valuable engineering work moves toward understanding systems, validating changes, and deciding what should exist in the first place. That's not a smaller job. It might be the job that was always underneath the code-writing job, just harder to see back when writing code was still the bottleneck.
