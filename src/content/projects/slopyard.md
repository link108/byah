---
title: slopyard
status: prototype
summary: Small Go app for anonymous community reports on whether a website host is “AI Slop” or “Not Slop”.
stack:
  - Go
  - PostgreSQL
  - Redis
  - SQL
links:
  - label: Live
    url: https://slopyard.byah.org
  - label: Source
    url: https://github.com/link108/slopyard
featured: false
---

`slopyard` is a deliberately small web app for anonymous reports on whether a site is "AI
Slop" or "Not Slop." The idea is lightweight and a little sharp-edged, and the
implementation matches it: server-rendered HTML, Go HTTP handlers, SQL migrations, and a
small operational footprint — no frontend build step, no modern frontend stack, just a
plain Go web architecture that refuses that complexity on purpose.

## How It's Built

Separate commands handle setup, migration, seeding, and running the server, with a clean
split between internal domain/server/store packages and a `web` directory for templates
and static assets — enough structure to grow without dragging in a frontend build
pipeline. Postgres holds sites, reports, and aggregates; Redis is optional, used only for
rate limiting.

## Why It's Interesting

This one stands out because it's opinionated in both product and implementation. The
premise is narrow and internet-native, and the technical approach matches: Go, HTML
rendered on the server, a simple data model, and no frontend toolchain unless it earns its
place.
