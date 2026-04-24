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
  - label: Source
    url: https://github.com/link108/landlordlog
featured: false
---

`landlordlog` reads like a real line-of-business product, not a side-project pretending to
be one. The repo inventory is explicit about what is already built at the platform layer:
authentication, billing, file storage, background jobs, transactional email, audit/GDPR
flows, rate limiting, health checks, local Docker infrastructure, tests, and deployment
skeletons. What is missing is not “the app.” What is missing is the landlord-specific
domain layer that sits on top of a fairly complete platform foundation.

That distinction matters because it changes how the repo should be read. This is not a
fresh Next.js app where every feature still has to be invented from scratch. It is a repo
that already has the boring but expensive infrastructure pieces in place, so product work
can focus on the actual rental-management problem: properties, units, rent tracking,
maintenance, document storage, summaries, entitlements, and owner workflows.

The product direction is also more opinionated than generic landlord software. The project
overview emphasizes calm, boring, trustworthy UX; small-landlord focus; system-of-record
behavior over optimization theater; and careful non-goals. The app is not trying to become
a flashy “property operations platform.” It is trying to be the dependable operating
record for landlords with a relatively small portfolio.

## Product Shape

The implementation plan makes the domain scope very legible. There are distinct projects
for domain modeling, properties and units, rent tracking, maintenance logs, monthly
summary and export, entitlement layers, signup, photo attachments, reminders, notes,
graphs, maps, and nearby places. That roadmap feels grounded rather than aspirational.

The attachment spec is a good example of the repo’s product discipline. It is deliberately
limited to photos for maintenance and property condition tracking. It explicitly rules out
becoming a generic document-sharing system. Photos upload directly to S3 with presigned
URLs, the backend never proxies bytes, and access is tightly scoped with short-lived
download URLs. That is not glamorous, but it is exactly the kind of scope control that
makes business software survivable.

The email signup flow has the same tone. Minimal Resend-powered transactional mail, no
marketing layer, no social-login sprawl, no drip campaigns unless they become necessary.
The product docs consistently push the repo toward boring correctness instead of feature
creep.

## Technical Structure

Technically, `landlordlog` is one of the most operationally mature repos in the group. The
script surface alone tells the story: Prisma generate/migrate flows, Vitest and
integration tests, Stripe webhook support, Docker Compose local services, worker scripts,
OpenAPI generation, and end-to-end verify commands. There is enough infrastructure here to
support real iteration without every change becoming manual setup work.

The repo also includes Bruno collections for API exploration, a k8s layout, Woodpecker CI,
and deployment patterns that hand off into the separate `homelab` infra repo. That means
the app is being treated as something that gets built, tested, containerized, versioned,
and deployed through a broader operations system rather than run ad hoc from a laptop.

What I like most is that the repo does not confuse platform completeness with product
completeness. The docs are honest that the domain layer still needs to be built in places,
even while the platform layer is already substantial. That is a healthier posture than
claiming the entire product exists because auth and billing happen to work.

## Why It Matters

`landlordlog` stands out because it combines domain seriousness with operational maturity.
It is not just “a SaaS app” and not just “a property manager.” It is a repo where product
scope, billing, security, attachments, deploy pipelines, and local developer experience
are all being shaped together. That makes it one of the more believable long-running
application repos in the workspace.

If a lot of personal projects stop at a polished shell, `landlordlog` feels like the
opposite: a practical business system being built from the inside out, with enough
attention on the boring parts that it might actually hold up under real use.
