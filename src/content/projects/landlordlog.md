---
title: landlordlog
status: active
summary: Rental management app for small landlords, with a calm system-of-record approach and a lot of the boring infrastructure already in place.
stack:
  - Next.js
  - TypeScript
  - Prisma
  - PostgreSQL
  - Stripe
links:
  - label: Source
    url: https://github.com/link108/landlordlog
featured: false
---

**tl;dr**: I’m building this as a calmer way to keep track of a small rental portfolio without turning it into a bloated property-management circus.

I wanted something that felt more like a dependable record than a “platform.” Most landlord software seems to either sprawl into a giant suite or stay weirdly shallow. I was more interested in the boring middle: properties, units, rent, maintenance, notes, photos, summaries, and the handful of things that actually matter month to month.

At this point it has real shape. There’s a signed-in app for tracking rent, maintenance, summaries, maps, late fees, notes, photos, and documents, plus all the less glamorous plumbing underneath like auth, billing, email, background jobs, storage, and tests. A lot of the work here is really about making the operational stuff solid enough that the domain features can stay simple.

The part I like most is that I’ve tried to keep the scope opinionated. Photos are for property condition and maintenance, not a generic file dump. The UX is meant to be calm and pretty boring on purpose. I’m not trying to build software for huge property managers with twenty dashboards and a fake sense of productivity.

It’s still uneven, which feels honest. The public-facing homepage is basically a waitlist page, while the actual app has more of the real product thinking in it. Some features are clearly further along than others, but that is part of the project: I’d rather build the useful, durable parts first than make it look finished before it is.
