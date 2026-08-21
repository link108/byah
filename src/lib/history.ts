import { readFileSync } from "node:fs";
import path from "node:path";

const HISTORY_FILE = path.join(process.cwd(), "src/generated/history.json");

export interface HistoryEntry {
  hash: string;
  shortHash: string;
  date: Date;
  message: string;
  isCurrent: boolean;
  /** Rendered HTML of this revision's body, or null for the current revision (already rendered via <Content />). */
  html: string | null;
}

interface RawHistoryEntry {
  hash: string;
  shortHash: string;
  date: string;
  message: string;
  html: string | null;
}

type HistoryFile = Record<string, RawHistoryEntry[]>;

let cache: HistoryFile | null = null;

/**
 * Reads src/generated/history.json, produced ahead of time by
 * `npm run history:generate` (see scripts/generate-history.ts) from git log.
 * Missing file just means history hasn't been generated in this environment -
 * pages degrade gracefully to showing no version history rather than throwing.
 */
function loadHistoryFile(): HistoryFile {
  if (!cache) {
    try {
      cache = JSON.parse(readFileSync(HISTORY_FILE, "utf-8")) as HistoryFile;
    } catch {
      cache = {};
    }
  }
  return cache;
}

export function buildHistory(repoRelativePath: string | undefined): HistoryEntry[] {
  if (!repoRelativePath) return [];

  const revisions = loadHistoryFile()[repoRelativePath] ?? [];
  return revisions.map((revision, index) => ({
    ...revision,
    date: new Date(revision.date),
    isCurrent: index === 0
  }));
}
