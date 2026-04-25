# BYAH

Lightweight self-hosted personal blog and bio site built with Astro, TypeScript, Markdown/MDX, and plain CSS.

## Commands

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
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

Add a new link:

1. Create `src/content/links/my-link.json`.
2. Add `title`, `url`, `date`, `tags`, and `note`.

## Notes

- Update `src/site.config.ts` to change the site title, author, description, base URL, accent color, email, and GitHub link.
- Draft blog posts are excluded from generated blog pages and indexes.
