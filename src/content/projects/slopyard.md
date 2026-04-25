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
  - label: Source
    url: https://github.com/link108/slopyard
featured: false
---

**tl;dr**: I built this as a small public utility for tagging websites as AI slop or not, mostly because I wanted a lightweight way to capture that gut-check without turning it into a whole platform.

I kept running into sites that felt weirdly hollow and machine-made, and I wanted something simpler than a forum or a long argument about it. The idea here is pretty narrow: search a host, see the community signal, add your own report, move on.

It’s a plain Go app with server-rendered pages, Postgres underneath, and optional Redis for rate limiting. That part is deliberate. I wanted the whole thing to stay fast and understandable, with no frontend build step and not much between the form and the data.

The part I like most is that it stays opinionated without pretending to be definitive. Everything is framed as reports, not facts. There are no accounts, no comment threads, and not much ceremony around submitting something. That keeps it light, but it also means the abuse prevention has to do more work, so a lot of the real effort is in host normalization, fingerprinting, and keeping repeat voting under control.

It still feels like an MVP, which is probably the right size for it. I’d rather keep it small and a little rough than overbuild it into some giant moderation machine.
