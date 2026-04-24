---
title: byah-next.js
status: prototype
summary: Early Next.js version of the personal site stack, kept as a lightweight React-based alternative to the Astro build.
stack:
  - Next.js
  - React
  - TypeScript
links:
  - label: Source
    url: https://github.com/link108/byah-next.js
featured: false
---

This repo appears to be a straightforward Next.js app scaffold for the same general site
space as BYAH.

It is much thinner on documentation than the Astro repo, so this entry is based mainly on
the project manifest and file layout.

## What it is

`byah-next.js` looks like an earlier or alternate implementation path for the personal
site. The repo is very small, with a minimal Next.js dependency set and a simple `src/pages`
structure rather than a large amount of product code or documentation.

Because the repo is sparse, the strongest conclusion is architectural rather than product
level: it is a lightweight React-based site skeleton, probably kept around as a comparison
point or previous attempt before the Astro version became the clearer fit.

## What stands out

The absence of a large doc trail or supporting infrastructure is actually useful signal.
It suggests this was not trying to become a platform. It was closer to a simple static-ish
site built on familiar Next.js tooling.

Compared with the current Astro setup, this repo represents the heavier end of the
decision: React, Next.js, and the usual app framework ergonomics even for a mostly content
driven site. That makes it a useful contrast project even if it is not the current system.
