# BYAH

Lightweight self-hosted personal blog and bio site built with Astro, TypeScript, Markdown/MDX, and plain CSS.

## Development environment

This repo uses the shared [dev-platform](https://github.com/link108/dev-platform)
Dev Container base image. No database or other backing services, so the
Dev Container references the image directly - no Docker Compose, no
generated secrets. Requirements on the host: Git, Docker, and the
[Dev Container CLI](https://github.com/devcontainers/cli) (or a compatible
editor, e.g. VS Code's Dev Containers extension). No local Node install needed.

```bash
devcontainer up --workspace-folder .
```

Inside the Dev Container, `mise install` runs automatically (pinning Node
to `20`, matching `Dockerfile`); continue with `just setup`.

## Commands

```bash
just                 # list every command
just setup           # install dependencies
just dev             # local dev server
just build           # build the static site
just lint            # astro check
just typecheck       # astro check
just check           # lint + typecheck + build — same as CI (alias: just ci)
```

## Docker

Build the image:

```bash
docker build -t byah-site .
```

Run the container:

```bash
docker run --rm -p 8080:80 byah-site
```

## Content

Add a new blog post:

1. Create `src/content/blog/my-post.md` or `src/content/blog/my-post.mdx`.
2. Add `title`, `date`, `summary`, `tags`, and `draft` in frontmatter.

Add a new project:

1. Create `src/content/projects/my-project.md`.
2. Add `title`, `status`, `summary`, `stack`, `links`, and `featured` in frontmatter.

## Notes

- Update `src/site.config.ts` to change the site title, author, description, base URL, accent color, email, and GitHub link.
- Draft blog posts are excluded from generated blog pages and indexes.
