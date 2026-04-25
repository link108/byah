---
title: collections
status: active
summary: Collection-focused app for glass art profiles, items, wantlists, and maker pages with structured discovery.
stack:
  - Next.js
  - TypeScript
  - PostgreSQL
  - AI
featured: false
---

**tl;dr**: I’m building a glass collecting site that feels more like curating a gallery than managing inventory, with enough structure to make discovery and maker info actually useful.

I started this because most collection tools feel either too generic or too transactional. I wanted something that treated glass art the way collectors actually do: image-first, a little obsessive, and centered on taste, context, and the people who make the work.

Right now it’s a Next.js app for collector profiles, collections, items, wantlists, and maker pages. The interesting part to me is the balance between personal collection pages and shared structure. I want collectors to have room to present things their own way, but I also want the data to be solid enough that discovery works and maker information doesn’t turn into a mess.

I’ve been pretty strict about scope. This is not trying to be a marketplace, and I’m avoiding the usual social and pricing detours too. Even the AI stuff is boxed in on purpose. It can help draft maker research for admins, but it does not get to publish anything on its own. That line feels important here.

The whole thing is still a bit rough, which is fine. I’m keeping it as a pragmatic monolith for now, with a worker off to the side where it’s useful, and trying not to add complexity before the core collecting flow feels good.
