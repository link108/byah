---
title: "You Need a Dictionary Before You Get a Marketplace"
date: 2026-08-19
summary: "A marketplace can't scale if every transaction starts with negotiating what the product even is. Shared vocabulary isn't a nice-to-have around a market — it's the precondition for one existing at all."
tags: ["standards", "infrastructure", "markets"]
series:
  name: "Shared Language and AI"
  order: 2
aiInvolvement: heavy-draft
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

## Two Real Tradeoffs, Not One Verdict

It's tempting to shortcut this to "open standards are obviously better than proprietary ones, full stop." That skips past what's actually being traded off, and both sides of it are real.

The case for open is straightforward: nobody has to ask anyone's permission to build against it, adoption isn't gated by a business relationship with whoever owns the standard, and no single company can later change the terms on everyone downstream.

The case for proprietary is less obvious but just as real, and it's more than "they get to charge for it": being able to make money on a standard is often what pays for maintaining it. Someone has to keep the reference tooling working, staff the group that resolves disputes, defend the trademark, and fund updating a decades-old spec for a material or format that didn't exist when it was written. None of that happens for free just because a spec is published under an open license — it happens because someone has an ongoing financial reason to keep doing it. Pantone's whole physical-reference-and-dispute-resolution apparatus from the last post exists because Pantone gets paid to run it, not despite that.

The risk isn't that a standard has an owner. It's what happens when an entire ecosystem becomes dependent on a standard with no meaningful portability and no shared governance, and the owner later has a reason to change the terms on everyone who built around it. That's exactly the setup that made the Pantone/Adobe dispute possible: the vocabulary worked fine for decades, right up until the people who controlled it decided to change how people paid for it, and everyone downstream discovered they had no leverage at all.

So the useful version of this isn't "open good, proprietary bad" — and it isn't "proprietary good, open bad" either. It's: the pattern (vocabulary → coordination → interoperability → specialization → ecosystem → marketplace) can work under either governance model, and monetization is a real reason a standard gets sustained rather than abandoned. What actually matters is who controls the first step, and whether the people depending on it have any recourse if that control gets used against them later.

## Where This Gets Interesting

All of that assumes the vocabulary is something humans learn and use directly — you know a Pantone number, or a file format spec, or the term of art in your industry, because you took the time to learn it. That assumption is exactly what starts to wobble once a model is willing to sit between you and the vocabulary, translating your vague request into the formal version on your behalf. Which is the actual subject of this series.
