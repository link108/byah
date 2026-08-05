---
title: landlordlog
status: active
summary: Rental management application with Next.js, Prisma, tests, Stripe integration, and Docker-backed local infrastructure.
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

`landlordlog` is a rental management app for landlords with a small portfolio, and it reads
like a real line-of-business product rather than a side project pretending to be one. The
platform layer is already substantial — authentication, billing, file storage, background
jobs, transactional email, audit/GDPR flows, rate limiting, health checks, and a full local
Docker setup are in place. What's still being filled in is the landlord-specific domain
layer that sits on top: properties, units, rent tracking, maintenance, document storage,
summaries, entitlements, and owner workflows.

The product direction is intentionally unglamorous: calm, boring, trustworthy UX; a focus
on small landlords rather than portfolio-scale property managers; and a system-of-record
posture over "optimization theater." It's not trying to become a flashy
property-operations platform — it's trying to be the dependable operating record for
someone who owns a handful of rentals.

## Product Shape

The roadmap breaks the domain into distinct, well-scoped pieces — properties and units,
rent tracking, maintenance logs, monthly summaries and export, entitlements, photo
attachments, reminders, notes, graphs, maps, and nearby places — rather than one big
"landlord app" feature dump.

Attachments are a good example of that scope discipline: deliberately limited to photos
for maintenance and property-condition tracking, with no ambition to become a general
document-sharing system. Photos upload directly to S3 with presigned URLs, the backend
never proxies bytes, and access is scoped with short-lived download URLs. Email follows
the same pattern — minimal Resend-powered transactional mail, no marketing layer, no
social-login sprawl, nothing added until it's actually needed.

## Technical Structure

Operationally, this is one of the more thorough setups here: Prisma generate/migrate
flows, Vitest and integration tests, Stripe webhook support, Docker Compose for local
services, worker scripts, OpenAPI generation, and end-to-end verify commands. Bruno
collections cover API exploration, and a k8s layout plus Woodpecker CI hand deployment off
to the `homelab` cluster — the app gets built, tested, containerized, versioned, and
deployed through a real pipeline rather than run ad hoc from a laptop.

## Why It Matters

`landlordlog` doesn't confuse platform completeness with product completeness — the
domain layer is honestly still being built, even while the underlying platform (auth,
billing, storage, jobs) already works. That's a healthier place to be than claiming a
product exists just because auth and billing happen to work. It reads like a practical
business system being built from the inside out, with enough attention on the boring parts
that it should hold up under real use.
