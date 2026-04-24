import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getLinks() {
  const links = await getCollection("links");
  return links.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
