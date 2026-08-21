---
description: Turn raw material (a ChatGPT chat link/export, notes, an outline, a rough draft) into a byah.org blog post written in Cameron's voice, versioned in this repo. Use when Cameron shares source material for a blog post or asks to draft/write/edit a blog post.
---

Full voice and editorial guide: `references/voice-guide.md`. Read it before drafting or rewriting any post — it is the actual editorial spec (tone, argument structure, what to avoid, the internal review passes to run). This file only covers the repo-specific mechanics around it: where source material lives, where the post goes, and how versioning works here.

## 1. Capture the source material first

Before writing any prose, save whatever Cameron shares — verbatim, unedited — into `blog-sources/<slug>/` at the repo root (create the folder if it doesn't exist). `<slug>` is a short kebab-case handle for the post topic (this becomes the blog post's filename later, so pick something you'd be happy to reuse).

- **ChatGPT share link**: `WebFetch` on a `chatgpt.com/share/...` URL only returns the page `<title>` — the conversation is client-rendered and not present in the fetched HTML. Instead run `python3 .claude/skills/blog-post/scripts/fetch_chatgpt_share.py <url> blog-sources/<slug>/chatgpt-<date>.md`. It downloads the page, decodes the embedded React Router data payload, and writes the full user/assistant transcript verbatim. If it ever fails (ChatGPT changed the page format), fall back to `WebFetch` and note in the saved file that it's a lossy summary, not a verbatim transcript.
- **Export file** (e.g. a ChatGPT data-export `.json`/`.html`, pasted notes, a doc): save it into the same folder under a descriptive name, as-is.
- **Multiple sessions for the same post** (follow-ups, edits, additional research): add more files to the folder rather than overwriting what's there. The raw material is the permanent record of what Cameron actually said — never edit it in place.

`blog-sources/` is intentionally outside `src/`, so nothing in it is built or served by Astro. It's git-tracked like the rest of the repo (this is "not for serving to public, just for this repo / blog writing docs" — Cameron's framing, not a `.gitignore` exclusion).

## 2. Read everything before drafting

Read all files in the source folder in full before writing. Per the voice guide, the source material — not your own judgment — determines the thesis, arguments, examples, caveats, and conclusions. Your job is editorial, not idea-generation.

## 3. Write the post

Output goes to `src/content/blog/<slug>.md` (or `.mdx` if the post needs it). Frontmatter must match the schema in `src/content.config.ts`:

```yaml
---
title: "..."
date: YYYY-MM-DD
summary: "One or two sentences — shows on the blog index card."
tags: []
aiInvolvement: heavy-draft
draft: true
---
```

- Use the `currentDate` from context for `date` unless Cameron says otherwise.
- Default `draft: true`. Draft posts are excluded from the blog index and don't get a generated page at all (`getStaticPaths` in `src/pages/blog/[slug].astro` filters on `!data.draft`), so it's safe to commit early or rough drafts without publishing them. Only flip to `draft: false` when Cameron says the post is ready.
- `aiInvolvement` is a required, public-facing disclosure of roughly how much AI input the post had — displayed as a badge on the post page and its index card (`src/lib/format.ts`'s `formatAiInvolvement`). One of:
  - `heavy-draft` — AI produced the first full prose draft from Cameron's notes/outline/source material; he edited. This is the default for posts made through this skill's normal flow (source captured, then drafted here) — use it unless Cameron says the post diverged from that.
  - `co-written` — substantial back-and-forth shaping the actual argument and text together, beyond a single draft-then-edit pass.
  - `light-assist` — AI mainly helped organize/structure; the prose is mostly Cameron's own.
  - Don't silently pick `co-written` or `light-assist` on a hunch — if the session doesn't clearly match `heavy-draft`, ask Cameron which tier applies rather than guessing.
- Follow the voice guide's output expectations: after writing the file, give Cameron the post content to review plus a short `Editorial Notes` section in chat (verification-worthy claims, unclear parts of the source argument, anything you intentionally reorganized). Don't write the editorial notes into the post file itself.

## 4. Versioning

This repo already versions posts through git: `src/lib/history.ts` walks `git log --follow` on the post's file path, and `VersionHistory.astro` renders every prior revision on the live page. "Keep it versioned" is satisfied by normal commits — no extra tooling needed.

That means, whenever Cameron does ask you to commit:
- Commit the post file on its own (don't bundle it with unrelated repo changes).
- Write a real commit message describing what changed in that revision (e.g. "Tighten the middle section, add the CI cost example"), not "wip" — each commit becomes a visible, dated entry in the post's public version history once the post ships.
- Iterating on a draft across a conversation is fine as multiple small commits; squashing isn't necessary and would defeat the point of `VersionHistory`.

Per standing repo rules: only commit when Cameron explicitly asks. Drafting and saving the file is not, by itself, a request to commit.
