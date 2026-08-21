export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

const aiInvolvementLabels = {
  "heavy-draft": "AI: heavy draft",
  "co-written": "AI: co-written",
  "light-assist": "AI: light assist"
} as const;

export function formatAiInvolvement(value: keyof typeof aiInvolvementLabels) {
  return aiInvolvementLabels[value];
}
