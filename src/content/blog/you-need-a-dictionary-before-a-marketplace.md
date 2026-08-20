---
title: "You Need a Dictionary Before You Get a Marketplace"
date: 2026-08-19
summary: "A marketplace can't scale if every transaction starts with negotiating what the product even is. Shared vocabulary isn't a nice-to-have around a market — it's the precondition for one existing at all."
tags: ["standards", "infrastructure", "markets"]
series:
  name: "Shared Language and AI"
  order: 2
draft: true
---

Pantone is one example of a pattern that shows up constantly once you start looking for it: file formats, shipping container dimensions, electrical connectors, MIDI, web protocols, package interfaces, the terminology on the back of a trading card, dice notation in a tabletop game. Wildly different domains, same underlying move — a group of people agreed on a vocabulary before they agreed on anything you'd call a market.

That ordering isn't an accident. A marketplace can't scale if every transaction starts with two people negotiating what the product even is.

## What a Shared Vocabulary Actually Buys You

Once a category has agreed-on terms, a handful of things become possible that weren't before:

- **Discovery.** Buyers can search for a known category instead of describing what they want from scratch.
- **Comparison.** Products can be evaluated against the same attributes.
- **Compatibility.** Third parties can build things that plug into the existing ecosystem without asking permission.
- **Reputation.** Participants can actually agree on what "quality" means, well enough to argue about it.
- **Automation.** Software can process a structured description instead of a paragraph.
- **Specialization.** People can work on one piece of the system without understanding all of it.

That last one is easy to undersell. Specialization is the whole reason an economy can have someone who only does color matching, or only does connector manufacturing, or only writes MIDI sequencers. None of those roles are viable if every participant also has to independently reinvent the shared context to do their one job.

## Open Doesn't Automatically Win

There's a tempting, slightly smug version of this argument that says open standards are obviously better than proprietary ones, full stop. I don't think that holds up. Open standards are powerful specifically because people can build against them without asking anyone — that part's true. But openness alone doesn't get you adoption, and a technically excellent standard that nobody actually uses is worth less, economically, than a mediocre one that's embedded throughout an entire industry.

Proprietary standards can bootstrap trust and adoption faster than open ones, precisely because someone's on the hook for maintaining them and has a reason to. The risk isn't that a standard has an owner. It's what happens when an entire ecosystem becomes dependent on a standard with no meaningful portability and no shared governance — which is exactly the setup that made the Pantone/Adobe dispute from the last post possible in the first place. The vocabulary worked fine for decades. The problem only showed up once the people who controlled it had a reason to change the terms, and everyone downstream discovered they had no leverage at all.

So the useful version of this isn't "open good, proprietary bad." It's: the pattern (vocabulary → coordination → interoperability → specialization → ecosystem → marketplace) works either way, but who controls the first step determines who has leverage over every step after it.

## Where This Gets Interesting

All of that assumes the vocabulary is something humans learn and use directly — you know a Pantone number, or a file format spec, or the term of art in your industry, because you took the time to learn it. That assumption is exactly what starts to wobble once a model is willing to sit between you and the vocabulary, translating your vague request into the formal version on your behalf. Which is the actual subject of this series.
