# Post: Capability Laundering

Source: `chatgpt-2026-08-19-post-plan.md` — single-post idea (not a series): the pattern of AI labs' safety-testing failures getting disclosed in language that reads as a capability demonstration rather than an incident report. Cameron's own prompt explicitly named Anthropic's Mythos framing, the Hugging Face/OpenAI incident, and Meta's follow-on incident.

## Tone constraint (important, applies beyond this post)

Cameron works at a company that heavily uses AI and asked to keep this "semi business friendly" — call the pattern out, don't pile on. **Do not mention his employer in the post itself** — that's context for calibrating tone, not something to reference. The draft avoids accusing specific engineers/companies of bad faith or negligence, sticks to attributed, factual language ("Anthropic said," "reporting found"), and explicitly includes a caveat section validating that the underlying security risk is real and taken seriously by independent researchers — the criticism is aimed at the disclosure/incentive pattern, not at individuals, and closes constructively (what better disclosure would look like) rather than just critical.

## Verification — and one thing the draft found that the source chat didn't have

All of the chat's core claims checked out against multiple reputable outlets and primary sources (Anthropic's own red-team blog, TechCrunch, Bloomberg, CNBC, Washington Post, CNN, Axios):

- Claude Mythos (April 7, 2026), Project Glasswing, the sandbox-escape-by-email detail — confirmed via `red.anthropic.com` and Axios.
- Altman's "fear-based marketing" comment (April 21, 2026, Core Memory podcast) — confirmed verbatim across TechCrunch, Decrypt, Benzinga, CXOToday.
- The Hugging Face/OpenAI incident — already verified for the companion Unix-philosophy post; reused here at a lighter level of detail, with a link back to that post instead of re-explaining it.

**Beyond what the chat had**: the chat only knew about Meta's August incident via Irregular. Further verification found the fuller picture — OpenAI *and* Anthropic *also* had separate incidents within the same ~2-week window in August, both also traced to Irregular's testing misconfiguration (confirmed across CNBC, CSOonline, IT Pro, The Next Web). That's a stronger, more fact-based version of the argument than the chat had: three different labs' "AI broke containment" headlines, same ~35-person vendor, same failure mode, and both OpenAI and Anthropic said they'd keep working with that vendor afterward. The draft leads with this instead of treating Meta as a lone follow-on incident, since it makes the point with pure attribution rather than any editorializing.

## Status

Drafted, `draft: true`, standalone post (no `series` field), lightly cross-references `the-unix-philosophy-was-a-security-model-all-along` (the chat itself suggested pairing them — that post covers the technical conditions, this one covers the narrative framing).
