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

`collections` is one of the strongest examples in the repo set of a product with a clear
point of view. The project is framed as a collector identity, catalog, and discovery
platform for glass art, and that wording matters. It is not just “inventory software” and
not just a “social app for collectors.” The product idea sits in the overlap between
display, cataloging, and discovery. That gives the repo a much more interesting shape than
another generic CRUD dashboard.

The product overview is unusually explicit about what the platform is trying to become. It
is display-first, catalog-capable, privacy-aware, and quality-controlled. Collectors get
accounts, public or private collections, item records, wantlists, and discovery features.
Makers get structured profiles that start as platform-managed entries and can later move
toward claimable profiles. Admins and moderators sit in the loop to keep data quality
high. That model is much closer to a curated knowledge platform than to an open wiki or
marketplace.

Just as important are the non-goals. The docs repeatedly rule out marketplace flows, open
editing, and automatic AI publishing. That restraint makes the rest of the architecture
easier to believe. The repo is not promising everything at once. It is trying to get a
single category right, with glass art as the flagship domain because photography, maker
history, provenance, and collector identity all actually matter there.

## Product Shape

The product model breaks cleanly into collectors, makers, collections, items, media, and
wantlists. That sounds obvious when written down, but many early product repos fail
because they blur those concepts together. Here the domain objects are separated from the
start, which gives the app a better chance of surviving beyond the first internal demo.

There is a strong editorial sensibility baked into the planning docs. The platform should
feel more like a curated site than a spreadsheet. That means public rendering matters,
photography matters, and the shape of maker information matters. The repo is not just
optimizing for “can a user save a record.” It is optimizing for whether those records can
become a coherent public-facing collection experience.

The AI boundary is also better thought through than usual. AI is limited to admin-only
maker draft workflows, with explicit review requirements before anything is published. The
worker writes AI-generated output into pending moderation states rather than straight into
public records. That is a much healthier pattern than pretending model output is a source
of truth.

## Technical Structure

Technically, the repo starts as a Next.js TypeScript monolith, but it is a monolith with
intentional seams. The architecture note calls out App Router pages, shared domain types,
server-side adapters under `src/lib`, a worker entrypoint under `src/worker`, health and
readiness endpoints, and a media provider boundary. That is a pragmatic structure: deploy
one web app now, split processes later only where the product actually needs it.

Data lives in Postgres with raw SQL migrations and a small migration runner instead of
hiding everything behind a giant ORM-only abstraction. Redis is reserved for later jobs,
not used prematurely. Media begins with local or persistent-volume storage behind a
provider interface, which keeps the project honest about current needs while still leaving
room for object storage later.

The repo docs are a major asset here. There are separate notes for architecture, database,
auth, media, deployment, and admin behavior, plus a numbered implementation plan covering
repo foundations, schema work, authentication, admin dashboard foundations, collector
flows, discovery, moderation, AI jobs, and operations. That makes the repo readable as a
system under construction rather than just a pile of features.

## Why It Matters

Out of all the repos in the group, `collections` feels like one of the clearest product
bets. It has a specific domain, a believable scope, and a disciplined sense of what should
stay out of scope. The repo also balances product ambition with engineering realism: start
as a monolith, preserve server-rendered public pages, keep AI behind admin review, and
avoid marketplace complexity until the underlying collector and maker data model is
actually solid.

If the lighter repos are experiments or workflow tools, this one reads like a serious
attempt to build a durable product around a niche where presentation, metadata, and
curation all genuinely matter.
