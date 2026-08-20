# Series: AI velocity requires engineering discipline

Overarching theme (from the ChatGPT planning chat, see `chatgpt-2026-08-19-series-plan.md`):

> AI does not eliminate engineering discipline — it increases the amount of change a team can produce, which makes DevOps, QA, observability, and automation more important than ever.

AI makes producing code cheaper. It doesn't make validating, shipping, or operating that code cheaper — and AI-generated changes are frequently plausible rather than correct. So the bottleneck moves from writing code to confidently validating and shipping it. Each post in the series takes one piece of that validation/delivery system and works through what changes when the volume of AI-generated change goes up.

Candidate series titles (pick one, or riff): *AI Velocity Requires Engineering Discipline* / *The AI Software Factory* / *Why AI Makes DevOps More Important, Not Less* / *From Code Generation to Change Validation*.

## Second planning chat

`chatgpt-2026-08-19-alt-series-plan.md` is a second, independent ChatGPT outline for essentially the same series concept ("Move Fast Without Breaking Things"). Heavy overlap with the plan below (6 of its 8 articles are near-duplicates of posts 1-5 and 7), but it contributed two things the first chat didn't:

- Two genuinely new post ideas, now folded in below as post 6 (agent-friendly repo) and a new section in post 8 (delivery metrics) — see the per-post notes.
- Pointers to real external research (METR, GitHub, Stack Overflow, DORA). All four were verified via web search before use — see the citations inline in `confidently-wrong.md` and `designing-an-ai-native-delivery-process.md`. One claim from that chat (that "later research" showed the METR slowdown improving with newer tools) could **not** be verified and was deliberately left out.

Its series tagline is worth keeping in mind even though we didn't rename the series: *"AI makes code cheap. Engineering makes it trustworthy."*

## Planned posts

Slugs are proposals — rename freely when drafting. Status tracks whether `src/content/blog/<slug>.md` exists yet.

All eight are now drafted, in `src/content/blog/`, all `draft: true`, all awaiting Cameron's review. Titles below are what actually shipped in the draft, not either chat's working titles. The series grew from 7 to 8 posts after reviewing the second planning chat above.

1. **`code-isnt-the-expensive-part`** — Code Isn't the Expensive Part. Writing code was never the whole SDLC; AI just makes that obvious.
2. **`confidently-wrong`** — Confidently Wrong. AI fails in a specific, fluent, confident-looking way that doesn't match what most code review was built to catch; treat AI code as an untrusted but highly productive contributor. Now includes the METR/GitHub/Stack Overflow data point (developers are also confidently wrong about their own AI-assisted speed).
3. **`what-counts-as-validated`** — What Counts as Validated. The testing pyramid answers "how many of each test type," not "can I trust this change" — a layered validation system from linting through production verification, with AI building the checks but not grading its own homework.
4. **`ci-cd-is-carrying-more-weight`** — CI/CD Is Carrying More Weight Than It Used To. When AI skips the in-the-head validation a human would normally do, the pipeline absorbs that work instead — smaller, more reversible, more automated deploys.
5. **`observability-is-part-of-qa`** — Observability Is Part of QA. Testing asks whether the system behaved correctly in cases you anticipated; observability asks what it's doing in the cases you didn't.
6. **`the-repo-is-an-api-now`** — The Repo Is an API Now. *New, from the second chat.* An agent starts every session from zero context; knowledge that's enforced (types, tests, lint) survives, knowledge that's merely written down (docs, wikis) rots. Placed here, right before Guardrails, as a pair: make the environment hard to get wrong, then make AI help build the per-change safety net.
7. **`guardrails-not-vibes`** — Guardrails, Not Vibes. AI is good at building its own guardrails (tests, rollback plans, dashboards) but the guardrails still need deterministic enforcement, not another AI judgment call.
8. **`designing-an-ai-native-delivery-process`** — Designing an AI-Native Delivery Process. Pulls 1-7 into one operating loop (human sets outcome → AI proposes/implements → automated validation → human reviews intent/risk → progressive rollout → telemetry feeds back into the next change). Now includes a "Measuring the Loop" section (DORA's 5th metric, rework rate, plus a proposed metric of our own: % of AI-generated code substantially rewritten) — this absorbed the second chat's "measure delivery, not lines of code" idea rather than getting its own post.

Closing idea for the series (worth landing on somewhere — it's post 8 currently): the winning teams won't be the ones with the best coding agents, they'll be the ones with the best change-validation and delivery systems around those agents.

## Notes for drafting

- Both chats are planning outlines, not source material Cameron wrote in his own words — treat the bullet points as a skeleton/checklist of things each post *could* cover, not sentences to lift directly. The actual voice, opinions, and any real examples need to come from Cameron per post (see `../../.claude/skills/blog-post/references/voice-guide.md` — don't invent anecdotes or metrics that aren't his). Verified external research (like the METR/DORA data) is the one exception to "no outside evidence" — cite it, link it, and verify it first.
- If a given post needs post-specific material (a concrete example, a follow-up chat, links), save it alongside this file or in a subfolder here rather than editing either transcript in place.
