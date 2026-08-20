# Series: AI velocity requires engineering discipline

Overarching theme (from the ChatGPT planning chat, see `chatgpt-2026-08-19-series-plan.md`):

> AI does not eliminate engineering discipline — it increases the amount of change a team can produce, which makes DevOps, QA, observability, and automation more important than ever.

AI makes producing code cheaper. It doesn't make validating, shipping, or operating that code cheaper — and AI-generated changes are frequently plausible rather than correct. So the bottleneck moves from writing code to confidently validating and shipping it. Each post in the series takes one piece of that validation/delivery system and works through what changes when the volume of AI-generated change goes up.

Candidate series titles (pick one, or riff): *AI Velocity Requires Engineering Discipline* / *The AI Software Factory* / *Why AI Makes DevOps More Important, Not Less* / *From Code Generation to Change Validation*.

## Planned posts

Slugs are proposals — rename freely when drafting. Status tracks whether `src/content/blog/<slug>.md` exists yet.

All seven are now drafted, in `src/content/blog/`, all `draft: true`, all awaiting Cameron's review. Titles below are what actually shipped in the draft, not the original chat's working titles.

1. **`code-isnt-the-expensive-part`** — Code Isn't the Expensive Part. Writing code was never the whole SDLC; AI just makes that obvious.
2. **`confidently-wrong`** — Confidently Wrong. AI fails in a specific, fluent, confident-looking way that doesn't match what most code review was built to catch; treat AI code as an untrusted but highly productive contributor.
3. **`what-counts-as-validated`** — What Counts as Validated. The testing pyramid answers "how many of each test type," not "can I trust this change" — a layered validation system from linting through production verification, with AI building the checks but not grading its own homework.
4. **`ci-cd-is-carrying-more-weight`** — CI/CD Is Carrying More Weight Than It Used To. When AI skips the in-the-head validation a human would normally do, the pipeline absorbs that work instead — smaller, more reversible, more automated deploys.
5. **`observability-is-part-of-qa`** — Observability Is Part of QA. Testing asks whether the system behaved correctly in cases you anticipated; observability asks what it's doing in the cases you didn't.
6. **`guardrails-not-vibes`** — Guardrails, Not Vibes. AI is good at building its own guardrails (tests, rollback plans, dashboards) but the guardrails still need deterministic enforcement, not another AI judgment call.
7. **`designing-an-ai-native-delivery-process`** — Designing an AI-Native Delivery Process. Pulls 1-6 into one operating loop (human sets outcome → AI proposes/implements → automated validation → human reviews intent/risk → progressive rollout → telemetry feeds back into the next change).

Closing idea for the series (from the chat, worth landing on somewhere — probably post 7): the winning teams won't be the ones with the best coding agents, they'll be the ones with the best change-validation and delivery systems around those agents.

## Notes for drafting

- This chat is a planning outline, not source material Cameron wrote in his own words — treat the bullet points here as a skeleton/checklist of things each post *could* cover, not sentences to lift directly. The actual voice, opinions, and any real examples need to come from Cameron per post (see `../../.claude/skills/blog-post/references/voice-guide.md` — don't invent anecdotes or metrics that aren't his).
- If a given post needs post-specific material (a concrete example, a follow-up chat, links), save it alongside this file or in a subfolder here rather than editing this transcript in place.
