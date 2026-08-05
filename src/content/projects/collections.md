---
title: collections
status: active
summary: Glass collector identity, catalog, and discovery platform built as a Next.js monolith with room for worker and admin workflows.
stack:
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - Redis
links:
  - label: Source
    url: https://github.com/link108/collections
featured: false
---

`collections` is a collector identity, catalog, and discovery platform for glass art —
somewhere in the overlap between display, cataloging, and discovery, rather than plain
inventory software or a social app bolted onto a database. It's display-first,
catalog-capable, privacy-aware, and quality-controlled: collectors get accounts, public or
private collections, item records, wantlists, and discovery features, while makers get
structured profiles that start as platform-managed entries and can later move toward
claimable profiles. Admins and moderators stay in the loop to keep data quality high.

It deliberately rules out marketplace flows, open editing, and automatic AI publishing.
That restraint keeps the scope believable — the goal is to get a single category right,
with glass art as the flagship domain because photography, maker history, provenance, and
collector identity all genuinely matter there.

## Product Shape

The domain model separates collectors, makers, collections, items, media, and wantlists
from the start, rather than blurring them together the way a lot of early product tools
do. The platform is meant to feel like a curated site rather than a spreadsheet, so public
rendering, photography, and the shape of maker information all get real attention — the
goal isn't just "can a user save a record," it's whether those records add up to a
coherent public-facing collection.

AI is scoped narrowly: limited to admin-only maker draft workflows, with explicit review
before anything is published. AI-generated output lands in a pending moderation state
rather than going straight into public records — model output proposes, it doesn't
publish.

## Technical Structure

The app is a Next.js TypeScript monolith with intentional seams: App Router pages, shared
domain types, server-side adapters under `src/lib`, a worker entrypoint under
`src/worker`, health and readiness endpoints, and a media provider boundary. That's a
pragmatic structure — deploy one web app now, split processes later only where the
product actually needs it.

Data lives in Postgres with raw SQL migrations and a small migration runner instead of
hiding everything behind a giant ORM abstraction. Redis is reserved for later job work
rather than used prematurely, and media starts on local or persistent-volume storage
behind a provider interface, leaving room for object storage once it's needed.

## Why It Matters

`collections` is one of the more deliberate product bets here — a specific domain, a
believable scope, and a clear sense of what should stay out of scope. It pairs product
ambition with engineering realism: start as a monolith, keep public pages
server-rendered, keep AI behind admin review, and hold off on marketplace complexity
until the collector and maker data model is solid. It reads like a serious attempt at
building a durable product around a niche where presentation, metadata, and curation
actually matter.
