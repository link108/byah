# Post: You Were Never Just Renting Servers

Source: `chatgpt-2026-08-19-post-plan.md` — single-post idea (not a series): AI doesn't just make code cheap, it makes *operating* infrastructure cheap, which shifts the build-vs-buy calculus toward owning predictable, steady-state compute and using public cloud for what's genuinely elastic, geographically distributed, or physical.

Unlike the previous chats, this one didn't cite any external sources at all (no browsing citations) — it's pure reasoning from the model, not sourced argument. The draft adds two real, verified anchors that weren't in the chat:

- **37signals/DHH's 2022-2025 AWS exit** — verified across multiple outlets (The Register, DataCenterDynamics) plus DHH's own post (`world.hey.com/dhh/we-have-left-the-cloud-...`): $3.2M/year AWS bill, ~$700K in Dell servers paid back in year one, later moved 18PB off S3 saving ~$1.5M/year, DHH's own $10M-over-5-years estimate, all without adding headcount. Used as the concrete opener — it predates AI-driven ops tooling, so it's framed as the pre-AI baseline proving the underlying economics, not attributed to AI.
- **Barclays Q4 2024 CIO survey, 86% planning to move some workload back from public cloud** — traced to its actual primary source (not just the marketing-blog posts repeating it) before using it, and deliberately caveated in the draft ("some workload," not full repatriation) rather than presented as a dramatic cloud exodus, since a lot of the sites citing it have an incentive to oversell the trend.

## Status

Drafted, `draft: true`, standalone post (no `series` field). No personal-experience gaps this time — the source chat didn't ask for a personal angle, so the draft stays in the same general-argument register as the AI-velocity and Shared Language series.

## Title

The chat's own suggested title, "The Cloud Premium Was Paying for People," was used at first but Cameron flagged it as reading aggressive/dismissive — it frames operational expertise as a cost line being eliminated, which lands colder than the post itself. Retitled to "You Were Never Just Renting Servers," which keeps the reframing hook without the personhood-as-overhead undertone. The body's first section heading was also renamed (it had gone from "Cloud Was Never Just Renting Compute" to nearly duplicating the new title) to "What the Sticker Price Actually Included."
