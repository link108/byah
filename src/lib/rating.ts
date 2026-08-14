export function parseScore(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5
    ? value
    : null;
}
