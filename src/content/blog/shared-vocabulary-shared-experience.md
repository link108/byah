---
title: "Shared Vocabulary, Shared Experience"
date: 2026-08-19
summary: "AI can fragment two different kinds of shared culture — the words we use to describe things, and the things themselves. Those are different problems, with different upsides, and I think we're mostly only talking about one of them."
tags: ["ai", "culture", "standards"]
series:
  name: "Shared Language and AI"
  order: 3
draft: true
---

Say everyone in your office watched the same show last night. There's a version of Monday morning that runs partly on that — someone makes a joke that only lands if you saw it, someone's annoyed about a spoiler, someone who's one episode behind asks people to shut up about it. Small stuff, but it's doing real work. It's a shared object everyone can point at and have an opinion about.

Now imagine there was no show. Everyone got their own, generated overnight, tuned to exactly what a model thinks they personally want. Nobody's behind. Nobody can spoil anything for anyone else, because there's nothing to spoil — there's no "it." The friction is gone, and so is the thing the friction was attached to.

## Two Different Things to Fragment

The last two posts in this series were about shared vocabulary — the words and reference points a group agrees on so they can coordinate, compare, and build on top of each other's work. AI's relationship to that is a real and interesting question. But the TV show version of the problem isn't a vocabulary problem. Nobody's confused about what to call the show. The thing that's missing is the show itself — the shared object, not the shared word for it.

I think those are genuinely different failure modes, and most of what gets written about "AI and culture" collapses them into one thing. It's worth pulling apart.

## The Shared Object Problem

Personalization has been pulling in this direction for a while before generative AI showed up — recommendation algorithms already fragment what people watch, read, and listen to. What's new is the shift from *selecting* content out of a shared pool to *generating* content that never enters a pool at all. A recommended show still exists for other people to stumble into. A generated one doesn't, by construction.

The negative version of this is the one that's easy to see: less common ground, fewer shared references, culture as a set of increasingly private experiences instead of a public one. It's the same worry people had about niche cable channels and algorithmic feeds, just pushed further, because now the content isn't even drawn from a shared catalog — it's synthesized new, for an audience of one.

The more interesting question is whether there's a real upside underneath that, and I think there might be, in a couple of specific ways. One: a shared mainstream always had a cost, and the cost was everyone whose taste didn't fit it. A world with more room for niche and minority taste to get something made *for* it, instead of settling for whatever the majority already wanted, is a real gain for the people who were previously getting nothing. Two: personalization at the content level doesn't necessarily kill shared culture, it might just move where the sharing happens — from the artifact up to the practice. People might stop discussing the specific show they watched and start discussing what they asked for and what they got, the same way people already compare prompts and outputs instead of comparing the outputs directly. The object stops being shared. The activity around it still can be.

I'm not fully sold on that second point solving the problem so much as relocating it — a conversation about "what did your show turn out to be" is thinner than a conversation about a show you both actually watched. But it's not nothing, and it's a different shape of loss than "no more shared culture, full stop."

## The Shared Word Problem

This is the one the source material for this post was actually about, and it's real too, just further downstream. As AI increasingly sits between a person and whatever formal vocabulary a system runs on — a color standard, a database schema, a specific industry's term of art — the person stops needing to learn that vocabulary directly. You describe what you want in plain language; the model translates it into whatever structured thing the underlying system actually needs.

The formal language doesn't disappear when that happens. It moves underneath the interface. Somewhere in the pipeline, "dark military green for outdoor cardboard packaging" still has to become a specific formulation a manufacturer can produce, the same way it always did — the model just does the translating that a person used to do by hand. Which means AI might reduce how much humans need to learn standards, while increasing how much machines need standards that are precise, open, and interoperable, since a model that has to negotiate with other systems and other models can't run on vibes any better than a person could.

That cuts both directions too. On the upside: language could start moving faster than it used to, because millions of people are independently describing the same not-yet-named feeling or concept to the same handful of models, and a model is well positioned to notice the pattern and start suggesting a term for it. Naming has always happened through slow, distributed cultural repetition. This could compress that loop a lot.

The downside is the same mechanism pointed the other way. If enough people are getting their vocabulary suggestions from the same small number of models, the model's preferred terms become the default — not through any standards body, just through repetition at a scale no single publication or institution ever had. Nobody votes on it. It just becomes what a huge number of people say, because it's what they were shown first. That's a genuinely different kind of standard-setting than anything in the first two posts of this series — nobody's in the room, there's no governance, and the people it's happening to mostly won't notice it's happening at all.

## Same Infrastructure, Different Layer

I don't think these two problems have the same fix, because they're not really the same problem. The vocabulary question is about who — or what — gets to define the terms a huge number of people end up using without deciding to. The experience question is about whether there's still a common object underneath the terms at all. You could solve one and not touch the other: a world with perfectly interoperable, well-governed machine standards, where everyone's still watching a show made only for them, would still be a world with less common ground than the one before it.

The thread connecting this back to the rest of the series is the same one from the start: a shared language, in either sense, is infrastructure. It determines who can participate, who gets to build on top of what already exists, and who gets to define what things mean — or, in the experience version, whether there's a "what" there to mean anything at all. Color just made that visible in a way that was easy to see. AI is going to make it visible everywhere else, whether or not we're ready to talk about it in these terms yet.
