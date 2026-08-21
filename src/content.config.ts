import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
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
      .optional(),
    aiInvolvement: z.enum(["heavy-draft", "co-written", "light-assist"])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "stable", "archived", "prototype"]),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.url()
        })
      )
      .default([]),
    featured: z.boolean().default(false)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().default("Overview"),
    summary: z.string()
  })
});

export const collections = { blog, projects, pages };
