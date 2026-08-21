// Snapshots every content-collection file's git history into
// src/generated/history.json, rendered once here (rather than at request
// time) so the Astro build never needs to shell out to git itself. Run this
// wherever `.git` has full history available - a dev machine, or a CI step
// right after a full (non-shallow) clone - then ship the resulting JSON into
// the Docker build context. See src/lib/history.ts for the reader side.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const REPO_ROOT = process.cwd();
const CONTENT_ROOT = path.join(REPO_ROOT, "src/content");
const OUTPUT_FILE = path.join(REPO_ROOT, "src/generated/history.json");
const UNIT_SEPARATOR = "\x1f";

interface RawRevision {
  hash: string;
  shortHash: string;
  date: string;
  message: string;
}

interface RawHistoryEntry extends RawRevision {
  html: string | null;
}

function findContentFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findContentFiles(full));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function toRepoRelative(absPath: string): string {
  return path.relative(REPO_ROOT, absPath).split(path.sep).join("/");
}

function getRevisions(repoRelativePath: string): RawRevision[] {
  let output: string;
  try {
    output = execFileSync(
      "git",
      [
        "log",
        "--follow",
        `--format=%H${UNIT_SEPARATOR}%ad${UNIT_SEPARATOR}%s`,
        "--date=iso-strict",
        "--",
        repoRelativePath
      ],
      { cwd: REPO_ROOT, encoding: "utf-8" }
    );
  } catch {
    return [];
  }

  return output
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [hash, date, message] = line.split(UNIT_SEPARATOR);
      return { hash, shortHash: hash.slice(0, 7), date, message };
    });
}

function getContentAtRevision(hash: string, repoRelativePath: string): string | null {
  try {
    return execFileSync("git", ["show", `${hash}:${repoRelativePath}`], {
      cwd: REPO_ROOT,
      encoding: "utf-8"
    });
  } catch {
    return null;
  }
}

const files = findContentFiles(CONTENT_ROOT);
const history: Record<string, RawHistoryEntry[]> = {};

for (const file of files) {
  const relPath = toRepoRelative(file);
  history[relPath] = getRevisions(relPath).map((revision, index) => {
    // Index 0 (current) is rendered by Astro's own <Content /> - no need to
    // duplicate that render here.
    if (index === 0) return { ...revision, html: null };

    const raw = getContentAtRevision(revision.hash, relPath);
    if (!raw) return { ...revision, html: null };

    const { content } = matter(raw);
    return { ...revision, html: marked.parse(content, { async: false }) as string };
  });
}

mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
writeFileSync(OUTPUT_FILE, JSON.stringify(history, null, 2));
console.log(`history: wrote ${files.length} content files' revisions to ${toRepoRelative(OUTPUT_FILE)}`);
