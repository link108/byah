---
title: "Pantone Is a Protocol"
date: 2026-08-19
summary: "Pantone doesn't own colors. It sells the reduction of ambiguity — a shared reference everyone in a supply chain can point at and mean the same physical result. That's worth more than the swatch."
tags: ["standards", "design", "infrastructure"]
series:
  name: "Shared Language and AI"
  order: 1
draft: true
---

What color is red?

You can answer that emotionally, no problem. Crimson. Brick. Blood red. Warm red. Faded red like an old stop sign. None of those answers are wrong, and none of them are remotely sufficient if someone needs to manufacture twenty thousand packages, in three countries, and have them all come out the same color.

That's the actual product Pantone sells. Not colors — colors aren't ownable, whatever the internet arguments imply. What Pantone sells is the reduction of ambiguity. A designer, a printer, a manufacturer, and a customer can all point at "PMS 186 C" and expect approximately the same physical result, on approximately the same substrate, out of approximately any compliant vendor. The swatch book is just the artifact. The actual product is everyone agreeing to mean the same thing.

## A Protocol, Not a Palette

Once you see it that way, the list of what Pantone actually provides looks less like a product and more like infrastructure:

- A vocabulary, so people can refer to a color without describing it.
- A numbering system that doesn't depend on translation or subjective naming.
- Physical reference objects, because a monitor lies to you and a printed swatch mostly doesn't.
- Explicit expectations about how a color reproduces across materials.
- A dispute-resolution mechanism, for when "close enough" isn't.
- An ecosystem of vendors who've all agreed to hit the same targets.

None of the individual symbols matter much on their own. A number like 186 is arbitrary. What makes it useful is that a huge number of people, independently, agreed to interpret it the same way. That's what a standard actually is — not a value, a shared interpretation of a value. Standards function like languages for exactly that reason, and like languages, they're worth roughly nothing to the first person who adopts them and everything once enough people have.

## What Happens When the Dictionary Has an Owner

In 2022, Adobe and Pantone got into a licensing dispute, and Pantone's color libraries started getting phased out of Creative Cloud apps. By the [October 2023 release, they were gone from Illustrator entirely](https://helpx.adobe.com/illustrator/kb/pantone-color-books-illustrator.html) — files that referenced Pantone colors would open with a blacked-out box telling you the color had been removed. Getting them back now costs a separate Pantone Connect subscription.

Nobody lost the ability to make similar-looking colors. FREETONE and Open Color both exist as free alternatives, and CSS Color 4 gives you an open, technical way to represent color on the web without touching Pantone at all. What people actually lost was convenient access to a shared vocabulary that had been embedded in their workflow for decades — the thing every printer, every vendor, every spec sheet already spoke.

That's the real tension, and it's not really about paying for colors. It's that a foundational coordination layer — something an entire industry uses to talk to itself — can become a toll road the moment two companies disagree about licensing terms. The people paying the toll aren't Adobe or Pantone. They're everyone downstream who built a workflow assuming the shared language would just keep working.

## The Part That Generalizes

I don't think this is really a story about color. It's a story about what a standard actually is: not a list of values someone published, but a live agreement — vocabulary, physical or technical reference points, tooling, governance, trust — that a whole supply chain depends on without usually noticing it does. Color just makes it visible, because color feels universal and personal at the same time, right up until you need twenty thousand packages to match.

Where this gets more interesting is everywhere else the same pattern shows up — and what happens to that pattern once a machine is doing a meaningful share of the talking.
