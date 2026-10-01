---
title: byah
status: active
summary: "This site: Astro, nearly all static, with a small Node server and Postgres for a couple of interactive pages."
stack:
  - Astro
  - TypeScript
  - Markdown
  - Docker
links:
  - label: Live
    url: https://byah.org
  - label: Source
    url: https://github.com/link108/byah
featured: false
---

This is the site you're reading. It's Astro with plain CSS, and the content (projects,
blog posts, the overview pages) is markdown in content collections. Nearly every page
is prerendered to static HTML at build time.

It isn't purely static anymore. A couple of unlisted pages for specific events need
to save things (beer and food ratings, dinner reservations), so the Docker image now
runs Astro's Node server, which serves the static pages and handles those few API
routes. They store data in Postgres through Prisma. Migrations run as a separate CI
step, never when the container starts.

Pages like this one have a version dropdown. In CI, after a full clone, a script walks
the git history of every content file and writes all the past versions to a JSON file,
and the build reads from that. Doing it in CI means the Docker image never needs git
or the `.git` directory.

It deploys like everything else here. See [How It Fits Together](/architecture).
