import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// Project subdomains served over the same cloudflared tunnel as byah.org
// (see homelab/k3s/infra/cloudflared/base/manifest.yaml). Only hostnames
// that are already linked as "Live" from a project page are listed here —
// internal tools (ci.byah.org) and duplicate alias hostnames are left out.
const liveProjectSubdomains = [
  "https://game-theory.byah.org/",
  "https://slopyard.byah.org/",
  "https://drank.byah.org/",
  "https://deckforge.byah.org/",
  "https://reliquary-works.byah.org/"
];

export default defineConfig({
  site: "https://byah.org",
  output: "static",
  // Required the moment any route opts out of prerendering (see
  // src/pages/beernbbq/{beers,food,results}.astro) — the rest of the site
  // still prerenders to static HTML as before. See homelab deploy notes
  // before merging: this changes dist/'s shape and the current
  // Dockerfile/nginx.conf don't run a Node process yet.
  adapter: node({ mode: "standalone" }),
  integrations: [
    mdx(),
    sitemap({
      customPages: liveProjectSubdomains,
      filter: (page) => !page.includes("/beernbbq")
    })
  ]
});
