import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../lib/content";
import { siteConfig } from "../site.config";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: `${siteConfig.title} Blog`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`
    }))
  });
}
