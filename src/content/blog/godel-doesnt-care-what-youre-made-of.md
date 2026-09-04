---
title: "Gödel Doesn't Care What You're Made Of"
date: 2026-08-19
summary: "A silicon mind built from binary switches should be bounded by Gödel's incompleteness theorem in a way ours isn't — that was my first instinct, anyway. It's directionally right, for the wrong reason, and the real answer is stranger than the intuition."
tags: ["philosophy", "math", "ai"]
aiInvolvement: heavy-draft
draft: true
---

I've been reading Terry Bisson's [*They're Made Out of Meat*](https://www.eastoftheweb.com/short-stories/UBooks/TheyMade.shtml) — it's short, you should just read it, but the setup is: two alien surveyors have found Earth and are trying to figure out if there's anyone here worth contacting. There is. The problem is us. Specifically, the problem is that we're made of meat, and the aliens cannot get past that. "The brain does the thinking. The meat," one finally explains. "Thinking meat! You're asking me to believe in thinking meat!" They go back and forth like this for the whole story, genuinely unable to accept that a sentient mind could be built out of something as unglamorous as fat and salt water, and they eventually decide the whole thing is too strange to deal with. Erase the records. Pretend there's no one home.

It's a joke about us, obviously — about how easy it is to mistake substrate for a meaningful fact about mind. But it got me stuck on the reverse version of the question. Say there's a species out there whose minds run on something like transistors instead of neurons — binary, on or off, at the lowest level. Does that tell you anything about how they'd think? My first instinct was: yes, quite a lot, actually. Binary logic gates suggested formal, axiomatic reasoning to me, and formal axiomatic systems have a famous limit — Gödel's incompleteness theorem — so a mind built that way should be bounded in a specific way ours isn't. I wasn't sure if that was a real insight or just Gödel-shaped pattern-matching. Turns out it's a bit of both.

## Where the Intuition Actually Holds

The Gödel part, if you haven't run into it, goes roughly like this. Take any formal system powerful enough to express ordinary arithmetic — a fixed set of axioms plus rules for deriving new statements from them — and as long as it's consistent (it never proves something and its opposite) and effectively specified (you can mechanically check whether a proof is valid), there will be true statements about numbers that the system cannot prove from inside itself. Not statements that happen to be hard. Statements that are structurally, permanently out of reach of that particular system, no matter how long you run it.

The frustrating part is you can't just patch it. Add the missing statement as a new axiom — fine, now you have a more powerful system. But that new system has exactly the same problem, one level up: some other true statement it still can't reach. Bolt that one on too, and you get a third gap. It's an infinite ladder. There is no final, complete, consistent formal system that captures every arithmetic truth, and there never will be, for structural reasons that have nothing to do with anyone not being clever enough. (There's a cousin limit worth knowing about too — Turing's halting problem, same family of self-referential argument, different flavor of unreachability. It'll matter later.)

If a silicon mind actually reasoned this way — fixed axioms, mechanical derivation, nothing else — Gödel would absolutely apply to it. That much of my original intuition holds up completely.

## Where It Breaks

Here's the part that doesn't: a transistor being effectively 0 or 1 doesn't mean a mind built out of transistors reasons in axioms. A neuron is also, at one level of description, a discrete on/off event — it fires or it doesn't. Nobody concludes from that alone that a brain is a formal proof system, because it obviously isn't; "neuron equals proposition, firing equals logical inference" doesn't survive contact with what brains actually do. The same non-implication holds on the silicon side. Bit doesn't mean belief. A CPU doesn't mean axiomatic reasoning.

The proof, if you want one, is sitting on your desk: the exact same binary hardware runs a theorem prover and also runs Doom. One of those is doing anything remotely like formal deduction. The other is not, and nobody would say a copy of Doom is quietly proving theorems about itself between frames. Gödel doesn't show up because a system happens to be built from switches. It shows up only if the cognition running on those switches can actually be modeled as that specific kind of thing — a fixed, consistent, arithmetic-capable formal system — and most computation, including probably most of what a sufficiently alien mind would be doing most of the time, almost certainly isn't that.

So: directionally right, wrong mechanism. Silicon doesn't buy you Gödel for free. You'd have to actually be doing formal axiomatic reasoning, and that's a fact about the kind of computation happening, not about the material underneath it.

## The Better Question

Once you take the substrate out of the Gödel argument, a better version of the original question shows up, and I think it's a genuinely more interesting one: would a mind that evolved on a completely different physical substrate end up with fundamentally different intuitions about what thought even is — not because the substrate imposes different logical limits, but because it produces a different lived experience of thinking?

I think the honest answer is probably yes, and the interesting cases aren't subtle. Take memory. We get "I think I remember it happening something like this," reconstructed and half-confabulated every time we retrieve it. A mind running natively on something like storage and checksums could plausibly get exact recall instead — replaying a memory the way you'd read back a file, not the way you relive an afternoon. What does the concept of truth even mean, as a felt thing rather than an abstract one, for something that can verify its own past bit-for-bit instead of trusting a fuzzy impression of it?

Or take identity. Copy a human, and you don't really have a copy — you have a very good simulation of one that immediately starts diverging the moment it opens its eyes, and even then it's not obvious you'd call it "you." Copy a process, and five minutes later you plausibly do have two people, in the ordinary sense of two things you'd hold separately accountable — and now you've got a problem nobody in our species has ever actually had to solve: which one owns the house, which one is married, which one is responsible for something the shared original did before the fork. That's not a hypothetical for a species built that way. That's just Tuesday.

## The Reversal

Push this a little further and you land somewhere I think is the actual good version of the idea. Imagine a civilization that thinks of itself as computation the way we think of ourselves as, I don't know, alive — foundationally, not metaphorically. For most of its history it might genuinely believe that everything true is, in principle, something it could eventually compute. Then it discovers Gödel and Turing, and finds out that isn't so — that there are truths no fixed system of reasoning it could ever build will reach, structurally, forever. For a species that built its whole self-conception on computation being total, that could be a real wound. Not "why are we mortal." Something closer to: why is there a limit to reason itself, and why were we built in a way that makes it impossible to see past it?

And here's the part that loops back to Bisson. That civilization, encountering us, discovering that we're the ones who evolved from animals whose brains conveniently forget where the keys are and misremember arguments in their own favor, might reasonably conclude that we were, in some sense, built to be at peace with incompleteness in a way they weren't — that our unreliable, imprecise, constantly-confabulating meat had already made its truce with a limit they're still reeling from. Which would make them the ones staring at us the way Bisson's aliens stare at meat: unable to quite believe something so sloppy turned out fine with a limit they find unbearable.

## What's Actually True

The deepest version of this isn't "silicon minds are bounded by Gödel and biological ones aren't." It's closer to the opposite. Gödel and Turing's limits don't appear to care what you're made of. A meat mathematician and a silicon mathematician, doing sufficiently powerful formal reasoning, run into exactly the same wall, for exactly the same structural reason, regardless of what's underneath either of them. The dividing line was never carbon versus silicon. It's formal system versus not — and the actual question worth sitting with isn't what a silicon mind could reach that we can't, or the other way around. It's which properties of thought are just facts about our particular meat, and which ones are facts about thought itself, that anything doing enough of it would eventually run into, no matter what it's made of.
