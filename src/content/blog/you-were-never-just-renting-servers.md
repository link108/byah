---
title: "You Were Never Just Renting Servers"
date: 2026-08-19
summary: "Cloud pricing was never mostly about the hardware. It was about not having to staff the team that operates hardware well. AI is making that team smaller, which means the premium is starting to buy a lot less than it used to."
tags: ["ai", "infrastructure", "cloud"]
aiInvolvement: heavy-draft
draft: false
---

In October 2022, DHH announced that 37signals was leaving the cloud. Their AWS bill had hit $3.2 million a year. They spent about $700,000 on Dell servers, moved seven applications off AWS over six months, and that first year's savings paid for the hardware outright. By 2025 they'd finished the job, pulling 18 petabytes off S3 and onto owned storage, dropping a $1.5 million-a-year hosting line to under $200,000. DHH's own estimate: [more than $10 million saved over five years](https://world.hey.com/dhh/we-have-left-the-cloud-251760fb) — without hiring anyone new to run it.

That last part is the detail that matters. They didn't need a bigger team to operate owned hardware than they needed to operate their AWS footprint. The team they already had was enough. Which raises an obvious question: if a small, already-competent team could run this without adding headcount in 2023, what happens once AI is doing a meaningful share of that team's work for them?

## Two Different Things Are Getting Cheap

Most of the conversation about AI and infrastructure is about code: AI writes the application, the migration script, the config file. That's real, and it's not what this post is about. There's a second thing happening at the same time, mostly discussed separately, that I think matters just as much: AI is also making it cheaper to *operate* infrastructure — not just build it.

Provisioning and configuring systems. Generating and maintaining the actual infrastructure-as-code. Investigating incidents. Reading through logs and metrics to find the thing that's actually wrong. Patching and upgrading clusters. Writing the runbook nobody had time to write. Reviewing a security configuration before it ships. A lot of what used to require a dedicated, experienced platform team is now something a much smaller team can do with agents and automation doing a chunk of the legwork.

A useful way to put the distinction: AI doesn't make hardware cheap. Racks, power, networking, real estate — none of that got cheaper because a model can write Terraform. What got cheaper is *owning* hardware, because the specialist labor required to run it well is increasingly something a small team can do with leverage instead of headcount.

## What the Sticker Price Actually Included

Cloud pricing has always included a premium over the raw cost of the underlying machines, and the premium was never really a mystery — it was buying you out of hiring, training, and coordinating the people who'd otherwise have to provision servers, manage the cluster, respond to pages, and keep the whole thing patched and secure. Even when the sticker price looked expensive, it was routinely cheaper than the alternative, because the alternative was a payroll line, not a monthly bill.

AI doesn't touch most of what cloud actually sells. It doesn't create burst capacity, put a server closer to your customers, or manufacture specialized accelerator hardware. What it erodes is specifically the operational-expertise piece — the part of the value proposition that was about labor, not physical infrastructure. Elastic capacity, geographic reach, specialized hardware nobody wants to source and maintain themselves: those advantages are grounded in actual atoms and actual capital, and AI doesn't change the economics of atoms. It changes the economics of the operational knowledge that used to be the reason renting made more sense than owning.

That's not a fringe story anymore, either — [Barclays' Q4 2024 CIO survey found 86% of respondents planning to move at least some workload back from public cloud](https://andreafortuna.org/2026/03/09/cloud-repatriation/), the highest figure the survey's ever recorded. Worth being precise about what that means: "some workload," not "everything," and plenty of that shift is plain cost optimization that has nothing to do with AI specifically. But it's the same underlying math 37signals ran in 2022, now showing up across enough companies to call it a trend instead of one blog's opinion.

## Hybrid Becomes the Default, Not the Compromise

None of this points toward "leave the cloud entirely," and I don't think that's what's actually going to happen at scale. What it points toward is hybrid infrastructure stopping being the awkward, half-migrated state a company is embarrassed to be in, and becoming a deliberate default.

Owned or colocated infrastructure starts making sense for the workloads that are steady and predictable — the stuff running at consistently high utilization, where you're not paying for elasticity you never use. CI runners, batch processing, model inference, data storage, the internal tools nobody outside the company will ever touch.

Public cloud keeps winning everywhere the requirement is genuinely physical instead of operational: launching something before you know if it'll need to scale, absorbing a demand spike you can't forecast, serving users on the other side of the planet with reasonable latency, reaching for hardware you have no interest in sourcing yourself. Those are capital and geography problems, not labor problems, and nothing about AI makes them go away.

The shape that falls out of that isn't "cloud" or "own it." It's cloud as the elastic, globally distributed layer wrapped around a base of infrastructure a company actually owns — sized for what's predictable, with the public cloud absorbing what isn't.

## The Catch Is the Same One From Everywhere Else in This Series

I'd be skeptical of this argument too if it stopped here, because "just let AI write your Terraform and fire half the platform team" is a bad plan, for exactly the reason AI-generated application code needs more review, not less: it's confident, plausible, and wrong in ways that don't announce themselves. An infrastructure change that looks correct and quietly opens a security group to the world doesn't fail loudly. It fails the day someone finds it.

So the honest version of this thesis isn't "AI replaces your ops team." It's closer to what's been true throughout the rest of what I've been writing about AI and delivery systems: the leverage is real, but it raises the bar on guardrails instead of lowering it. Declarative infrastructure instead of scripts nobody can diff. Automated tests for the infrastructure changes themselves, not just the application. Policy enforcement that doesn't depend on a human remembering to check. Gradual rollouts for infra changes the same way you'd want them for a feature. A small, AI-leveraged team can absolutely run more infrastructure than a small team could before — but only if what makes it small is better tooling, not less discipline.

## Where This Leaves the Build-vs-Buy Question

I think the honest shape of this is: public cloud remains the right default for anything that needs speed to market, unpredictable scaling, or physical presence somewhere you don't want to build. Owning infrastructure becomes the right default for anything steady enough that you're not paying for elasticity you don't use, now that running it well doesn't require the team it used to. The interesting work isn't picking a side. It's actually knowing, workload by workload, which one you're looking at — and that was always a product and architecture decision. AI just made it cheap enough to be worth making deliberately, instead of defaulting to whichever platform was easiest to start on five years ago.
