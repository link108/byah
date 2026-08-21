---
title: "Cheaper Code, Scarcer Judgment"
date: 2026-08-19
summary: "AI made it dramatically cheaper to build software. It didn't reduce how much work there is — it moved the work from implementation to deciding what's actually worth implementing."
tags: ["ai", "product", "design"]
aiInvolvement: heavy-draft
draft: false
---

My homelab is the clearest version of this I actually have. It's a real k3s cluster running on a Hetzner box — the same box this exact post is being served from, along with a handful of other side projects — and AI has been a huge part of getting it as far as it has. The YAML, the bootstrap scripts, the hours of debugging why two services won't talk to each other: a lot of that got dramatically faster.

None of that made the homelab simpler. It made the interesting decisions more central, not less. I still run Postgres and Redis directly on the host instead of pretending every layer needs its own container, because that's what actually fits a one-person setup, not because it's the architecturally correct answer. I still leave the cluster apply mostly manual on purpose, even though more of it could be automated, because I'd rather have something a little rough that I can still reason about than something smooth that hides what's happening the day it breaks. AI didn't make either of those calls for me. It just got me to the point of having to make them faster.

There's a name for this, and it's older than software. Jevons paradox: when you make a resource more efficient to use, total consumption of that resource often goes *up*, not down. It's originally about coal — better steam engines made coal more efficient per unit of work, and coal consumption exploded anyway, because now coal was worth using for things that hadn't been worth it before. Efficiency didn't shrink the appetite. It fed it.

## Software Is Having Its Coal Moment

Swap "coal" for "the cost of building software" and the pattern holds up disturbingly well. AI doesn't just make existing software cheaper to build. It makes previously-not-worth-it software worth building: the internal tool nobody had time for, the fourth prototype of an idea that probably won't work, the niche product for an audience too small to have justified a team six months ago.

That's the part I think gets missed when people frame this as "AI replaces developers." The more likely outcome isn't the same amount of software getting built by fewer people. It's a lot more software getting attempted by roughly the same number of people, because the threshold for "worth trying" just dropped. More features, more internal automations, more AI-generated decisions embedded in more places, more total surface area — produced by teams that didn't necessarily get any bigger.

None of that reduces the total amount of work. It relocates it. The bottleneck stops being "can we build this" and starts being "should we, what exactly should it do, and how do we know it's actually right."

## Building the Wrong Thing Has Never Been Easier

This is the uncomfortable corollary. AI is very good at turning a vague idea into something that looks finished — has a UI, runs, does roughly what you described. Speed doesn't discriminate between a good idea and a bad one. It just gets you to the polished, plausible-looking version of either one faster.

Before, a bad idea had to survive the friction of actually getting built, which killed off a decent number of bad ideas by default — nobody bothered finishing them. That friction is mostly gone now. Which means the ideas that used to die from neglect now make it all the way to a working demo, and "it works" starts getting mistaken for "it's right," because the two used to correlate a lot more than they do now.

## Quality Becomes the Limiting Factor

Once implementation stops being the bottleneck, the bottleneck moves to everything that determines whether what got implemented should exist: tests, review, deployment systems, metrics, the whole apparatus for catching a plausible-looking mistake before it ships. That's the same argument from the AI-and-DevOps series I've been writing — more generated change means the validation system around it matters more, not less. This is that argument's product-side twin: it's not just "is this code correct," it's "is this the right thing to have built at all."

UX ends up part of that correctness question too, in a way it wasn't as obviously before. A feature that technically does what it's supposed to, but can't communicate what it's doing, when it's uncertain, or how to correct it when it's wrong, isn't actually finished — it's just fast. For anything AI-assisted or AI-generated specifically, the interface has to carry some of the trust-building work that used to happen implicitly, because the thing behind it is less predictable than hand-written logic used to be.

## Taste Doesn't Come From the Codebase

Here's the part of this I actually think is underrated. When building things gets cheap, the scarce resource stops being "someone who can implement this" and starts being "someone who knows this is actually worth implementing." And that second kind of knowledge doesn't come from being a better engineer. It comes from having spent real time inside a domain that has nothing to do with software.

Tabletop games. Aquariums. Backpacking. Whatever it actually is for you, the value isn't the Wikipedia-level facts — AI already has those, fluently, on demand. The value is knowing which of the fifty things it just told you actually matters to the people who live in that world. Which frustrations are real versus which ones just sound like problems from the outside. What people already do to work around the annoying parts, which tells you where the real opportunity is instead of where it only looks like one. Which "obvious" fix the actual community would reject on sight, because you'd reject it too.

That's not information. It's closer to taste, and taste gets built from time spent, not from a model retrieving the right fact on request. In a world where implementing an idea is basically free, recognizing which idea is worth implementing gets a lot more valuable — and that ability is disproportionately built somewhere other than inside a codebase.

## The Combination That Actually Matters

I don't think this adds up to "domain expertise beats technical skill" — that's a different, weaker version of the argument. Technical depth still matters, just for a different reason than it used to: it's what lets you recognize when generated output is nonsense, understand what a choice actually costs architecturally, know what shouldn't get delegated to a model, and turn a working prototype into something dependable enough to actually ship.

The version of this that holds up is closer to: technical leverage, plus real familiarity with some domain outside software, plus the judgment to tell a good problem from a plausible-sounding one, plus the systems to make sure what gets built is actually correct. Ideas alone were never the scarce part — everyone has ideas. The scarce part was always recognizing which ones are worth the effort, and then having a way to make sure the effort produces something trustworthy. AI changed how cheap the effort is. It didn't touch either of those two things at all.
