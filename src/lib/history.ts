import { execFileSync } from "node:child_process";
import matter from "gray-matter";
import { marked } from "marked";

const REPO_ROOT = process.cwd();
const UNIT_SEPARATOR = "\x1f";

export interface Revision {
  hash: string;
  shortHash: string;
  date: Date;
  message: string;
}

export interface HistoryEntry extends Revision {
  isCurrent: boolean;
  /** Rendered HTML of this revision's body, or null for the current revision (already rendered via <Content />). */
  html: string | null;
}

/**
 * Commit history for a content file, newest first. Requires full git history
 * (fetch-depth: 0 in CI, .git present in the Docker build context) — returns
 * an empty list rather than throwing if git isn't available, so pages degrade
 * gracefully in environments without repo history.
 */
export function getRevisions(repoRelativePath: string): Revision[] {
  let output: string;
  try {
    output = execFileSync(
      "git",
      ["log", "--follow", `--format=%H${UNIT_SEPARATOR}%ad${UNIT_SEPARATOR}%s`, "--date=iso-strict", "--", repoRelativePath],
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
      return { hash, shortHash: hash.slice(0, 7), date: new Date(date), message };
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

/**
 * Full version history for a content-collection entry: the current revision
 * (unrendered — the page already has HTML for it via <Content />) plus every
 * earlier committed revision, rendered from its raw markdown at that commit.
 */
export function buildHistory(repoRelativePath: string | undefined): HistoryEntry[] {
  if (!repoRelativePath) return [];

  return getRevisions(repoRelativePath).map((revision, index) => {
    const isCurrent = index === 0;
    if (isCurrent) {
      return { ...revision, isCurrent, html: null };
    }

    const raw = getContentAtRevision(revision.hash, repoRelativePath);
    if (!raw) {
      return { ...revision, isCurrent, html: null };
    }

    const { content } = matter(raw);
    return { ...revision, isCurrent, html: marked.parse(content, { async: false }) as string };
  });
}
