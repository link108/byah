---
title: landlordlog
status: active
summary: Rent, maintenance, and records for landlords with 1-20 units, plus a tenant portal and per-job links for vendors.
stack:
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - Stripe
links:
  - label: Live
    url: https://landlordlog.com
  - label: Source
    url: https://github.com/link108/landlordlog
featured: false
---

LandLordLog is property management for people with a handful of units, roughly 1 to
20. The product doc's ground rules are "calm, boring, trustworthy UX" and "system of
record over optimization," and it lists explicit non-goals alongside the features.

Landlords track properties and units, rent, late fees (which can be overridden per rent record),
maintenance, notes, photos, and documents, and get a monthly summary. Reminders
nudge them when something needs attention.

Two other kinds of people can use it:

- **Tenants** get an invite, log in to their own portal, and submit and follow
  maintenance requests.
- **Vendors** don't get accounts. They get a link to one specific job, showing the
  property, unit, urgency, and entry permission, where they can accept or decline it
  and post updates.

Properties can also get an unlisted public page (behind a token and excluded from
search engines) that lists nearby restaurants, cafes, bars, groceries, and parks.

There's also the start of AI-assisted search: a retrieval module that chunks and
embeds documents into Qdrant, exposed through API routes so far.

Under all of that is a lot of plumbing: auth, organizations, Stripe billing, S3
storage with presigned uploads, email, BullMQ background workers, audit logging,
feature flags, rate limiting, and data retention.
