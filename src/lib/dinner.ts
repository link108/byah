import { db } from "./db";

// Server-side helpers for the /dinner-reservations booking flow. Same wiring
// as the beernbbq pages: Postgres via Prisma, manual request validation in the
// API handlers, friend-group trust model (an email address is the whole
// identity story - trivially spoofable, accepted tradeoff).
//
// Capacity is 24 seats per date, and because it's the *sum* of party sizes
// across non-cancelled rows (no single row carries it), there's no DB
// constraint that can express it - so it's enforced in createReservation
// inside the same transaction as the insert. Read-committed means two truly
// simultaneous bookings could both pass the check and overflow by a seat or
// two; same pragmatic tradeoff the beernbbq handlers make instead of locking.

export const DINNER_CAPACITY = 24;

const dateKeyRe = /^\d{4}-\d{2}-\d{2}$/;
const monthRe = /^\d{4}-\d{2}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// No 0/O/1/I - reservation codes get read aloud over the phone.
const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const maxLeadName = 80;
const maxEmail = 200;
const maxNote = 500;

export class CapacityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CapacityError";
  }
}

export function isValidDateKey(key: string): boolean {
  if (!dateKeyRe.test(key)) return false;
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

export function isValidMonth(month: string): boolean {
  if (!monthRe.test(month)) return false;
  const [y, m] = month.split("-").map(Number);
  return y >= 2020 && y <= 2100 && m >= 1 && m <= 12;
}

// Server-side "today" in UTC. The client disables past dates by its own local
// clock; this is just the coarse guard against clock-skewed clients booking
// yesterday. A date that is today in the user's timezone but yesterday in UTC
// is rejected near midnight - rare and harmless.
export function todayKeyUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function generateCode(): string {
  let out = "BYAH-";
  for (let i = 0; i < 4; i++) {
    out += codeAlphabet[Math.floor(Math.random() * codeAlphabet.length)];
  }
  return out;
}

export type DinnerInput = {
  date: string;
  partySize: number;
  leadName: string;
  email: string;
  note: string | null;
};

export type ParseResult =
  | { ok: true; value: DinnerInput }
  | { ok: false; error: string };

export function parseDinnerInput(body: unknown): ParseResult {
  const b = (body ?? {}) as Record<string, unknown>;
  const date = typeof b.date === "string" ? b.date.trim() : "";
  const partySize =
    typeof b.partySize === "number" ? b.partySize : Number(b.partySize);
  const leadName = typeof b.leadName === "string" ? b.leadName.trim() : "";
  const email =
    typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  const note = typeof b.note === "string" ? b.note.trim() : "";

  if (!isValidDateKey(date)) return { ok: false, error: "Pick a valid date." };
  if (date < todayKeyUtc())
    return { ok: false, error: "That date is in the past." };
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > DINNER_CAPACITY)
    return {
      ok: false,
      error: `Party size must be 1-${DINNER_CAPACITY} guests.`
    };
  if (!leadName || leadName.length > maxLeadName)
    return {
      ok: false,
      error: `Lead guest name must be 1-${maxLeadName} characters.`
    };
  if (!email || email.length > maxEmail || !emailRe.test(email))
    return { ok: false, error: "Please add a valid email address." };
  if (note.length > maxNote)
    return { ok: false, error: `Note must be ${maxNote} characters or fewer.` };

  return { ok: true, value: { date, partySize, leadName, email, note: note || null } };
}

export async function seatsTaken(date: string): Promise<number> {
  const agg = await db.dinnerReservation.aggregate({
    where: { date, cancelledAt: null },
    _sum: { partySize: true }
  });
  return agg._sum.partySize ?? 0;
}

export async function seatsTakenByMonth(
  month: string
): Promise<Record<string, number>> {
  const rows = await db.dinnerReservation.groupBy({
    by: ["date"],
    where: { date: { startsWith: month }, cancelledAt: null },
    _sum: { partySize: true }
  });
  const out: Record<string, number> = {};
  for (const row of rows) out[row.date] = row._sum.partySize ?? 0;
  return out;
}

export async function createReservation(input: DinnerInput) {
  // Count-then-insert in one transaction: whichever write lands second sees
  // the first one's seats, so freed seats (cancellations) and taken seats
  // (other bookings) both get respected.
  return db.$transaction(async (tx) => {
    const agg = await tx.dinnerReservation.aggregate({
      where: { date: input.date, cancelledAt: null },
      _sum: { partySize: true }
    });
    const already = agg._sum.partySize ?? 0;
    if (already + input.partySize > DINNER_CAPACITY) {
      const left = DINNER_CAPACITY - already;
      throw new CapacityError(
        `Only ${left} ${left === 1 ? "seat" : "seats"} left that night.`
      );
    }
    return tx.dinnerReservation.create({
      data: { ...input, code: generateCode() }
    });
  });
}

export async function findReservationByCode(code: string) {
  return db.dinnerReservation.findUnique({ where: { code } });
}

export async function listReservationsByEmail(email: string) {
  return db.dinnerReservation.findMany({
    where: { email, cancelledAt: null },
    orderBy: { date: "asc" }
  });
}

export async function cancelReservationByCode(code: string): Promise<boolean> {
  const res = await db.dinnerReservation.updateMany({
    where: { code, cancelledAt: null },
    data: { cancelledAt: new Date() }
  });
  return res.count > 0;
}
