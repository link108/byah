---
title: collections
status: active
summary: Image-first site for glass art collectors, with collector profiles, collections, wantlists, and maker pages. Not deployed yet.
stack:
  - Next.js
  - TypeScript
  - PostgreSQL
  - AI
featured: false
---

This is a catalog and discovery site for glass art. Collectors get a profile,
collections, items with images, and a wantlist. Makers get their own pages, and items
link back to whoever made them. The plan is for v1 to live at `collections.byah.org`,
but it isn't deployed yet.

It's a single Next.js app on Postgres, using raw SQL migrations and a small TypeScript
migration runner. Uploaded images go to local or persistent-volume storage behind a
media provider interface, so S3 can be added later. A separate worker process
handles background jobs.

AI is only on the admin side. An admin can ask for a draft of a maker's profile. The
worker sends the request to a model through OpenRouter and saves the result as a maker
submission marked `pending_review`, and it only goes public once an admin approves it
in moderation.

There's no marketplace, pricing, or social layer, and none of those are planned.
