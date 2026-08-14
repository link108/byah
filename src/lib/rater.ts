// Identity here is just a freely-typed nickname, sent by the client on every
// write (see src/lib/beernbbq-client.ts) - no auth, trivially spoofable by
// anyone with curl, same trust model as cutty-bangerz's session header
// (src/lib/session.ts there). Fine for a small friend-group app: two people
// who happen to type the same name will collide (upsert overwrites), which
// is an accepted tradeoff, not a bug.

const raterHeader = "x-rater-name";
const maxLength = 40;

export function raterNameFromHeaders(headers: Headers): string | null {
  const value = headers.get(raterHeader)?.trim();
  return value && value.length > 0 && value.length <= maxLength ? value : null;
}

export const raterNameHeader = raterHeader;
export const raterNameMaxLength = maxLength;
