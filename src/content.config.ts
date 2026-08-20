import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    series: z
      .object({
        name: z.string(),
        order: z.number().int().positive()
      })
      .optional()
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

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().default("Overview"),
    summary: z.string()
  })
});

export const collections = { blog, projects, pages };
