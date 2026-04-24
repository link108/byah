import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "stable", "archived", "prototype"]),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
        })
      )
      .default([]),
    featured: z.boolean().default(false)
  })
});

const links = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    note: z.string()
  })
});

export const collections = { blog, projects, links };
