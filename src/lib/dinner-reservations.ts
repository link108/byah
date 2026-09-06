// Shared between the API routes (Node) and the page's client-side island
// (bundled for the browser) - no `db` import here, this file must stay
// side-effect-free and environment-agnostic.

export const CAPACITY = 24;
// TODO(cameron): set the real per-guest price before launch.
export const PRICE_PER_GUEST = 175;

export const guestEmailHeader = "x-guest-email";
export const maxLeadNameLength = 80;
export const maxNoteLength = 500;

export type ReservationDTO = {
  id: string;
  code: string;
  date: string;
  partySize: number;
  leadName: string;
  email: string;
  note: string;
  createdAt: string;
  cancelledAt: string | null;
};

export type NightAvailability = {
  date: string;
  bookedSeats: number;
  capacity: number;
};

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// --- date helpers (all local-time, no UTC round-trips) ---------------------

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isDateKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
}

export function fmtLong(key: string): string {
  return parseKey(key).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function fmtShort(key: string): string {
  return parseKey(key).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

// --- escaping ----------------------------------------------------------

export function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c
  );
}

// --- validation --------------------------------------------------------

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function newCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `BYAH-${code}`;
}
