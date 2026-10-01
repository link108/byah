---
title: slopyard
status: prototype
summary: Small Go app where people anonymously report whether a website is AI slop.
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

You enter a website and see how many people have reported it as "AI Slop" or "Not
Slop," and you can add your own report. There are no accounts and no comments.

It's a Go server that renders HTML, with no frontend build step. Postgres stores sites,
reports, and precomputed totals, and Redis does rate limiting when it's configured.

Since anyone can report without signing up, most of the code is about making the
reports mean something. Hosts get normalized before anything is stored: lowercased,
internationalized names converted to punycode, `www.` stripped, IP addresses
rejected, and the registrable domain worked out from the public suffix list. That way
different spellings of the same site count as one site. Submissions are also
fingerprinted and rate-limited so one person can't pile on votes.

Everything on the site is framed as reports from users, not a ruling on the site.
