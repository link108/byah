import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getSeriesPosts(seriesName: string) {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && data.series?.name === seriesName
  );
  return posts.sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0));
}

/** Total post count for a series, including drafts — the series' full planned length. */
export async function getSeriesLength(seriesName: string) {
  const posts = await getCollection("blog", ({ data }) => data.series?.name === seriesName);
  return posts.length;
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.title.localeCompare(b.data.title));
}
