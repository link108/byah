import { db } from "./db";
import { CAPACITY, newCode, normalizeEmail, type NightAvailability, type ReservationDTO } from "./dinner-reservations";

import type { DinnerReservationModel } from "../generated/prisma/models";

function toDTO(r: DinnerReservationModel): ReservationDTO {
  return {
    id: r.id,
    code: r.code,
    date: r.date,
    partySize: r.partySize,
    leadName: r.leadName,
    email: r.email,
    note: r.note,
    createdAt: r.createdAt.toISOString(),
    cancelledAt: r.cancelledAt?.toISOString() ?? null
  };
}

export async function availabilityForMonth(year: number, month: number): Promise<NightAvailability[]> {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const keys: string[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(first.getFullYear(), first.getMonth(), day);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }

  const nights = await db.dinnerNight.findMany({
    where: { date: { in: keys } }
  });
  const byDate = new Map(nights.map((n) => [n.date, n]));

  return keys.map((date) => {
    const night = byDate.get(date);
    return {
      date,
      bookedSeats: night?.bookedSeats ?? 0,
      capacity: night?.capacity ?? CAPACITY
    };
  });
}

export type CreateInput = {
  date: string;
  partySize: number;
  leadName: string;
  email: string;
  note: string;
};

export type CreateResult =
  | { ok: true; reservation: ReservationDTO }
  | { ok: false; error: "full" };

// Guarded UPDATE with the capacity check baked into the WHERE clause - a
// single atomic statement, so two concurrent bookings (including the very
// first booking on a date, before any DinnerNight row exists) can never both
// succeed past capacity. See the DinnerNight comment in schema.prisma.
export async function createReservation(input: CreateInput): Promise<CreateResult> {
  const email = normalizeEmail(input.email);

  return db.$transaction(async (tx) => {
    await tx.dinnerNight.upsert({
      where: { date: input.date },
      update: {},
      create: { date: input.date, capacity: CAPACITY, bookedSeats: 0 }
    });

    const updated = await tx.$executeRaw`
      UPDATE "DinnerNight"
      SET "bookedSeats" = "bookedSeats" + ${input.partySize}
      WHERE "date" = ${input.date}
        AND "bookedSeats" + ${input.partySize} <= "capacity"
    `;
    if (updated === 0) {
      return { ok: false, error: "full" };
    }

    const reservation = await tx.dinnerReservation.create({
      data: {
        code: newCode(),
        date: input.date,
        partySize: input.partySize,
        leadName: input.leadName.trim(),
        email,
        note: input.note.trim()
      }
    });

    return { ok: true, reservation: toDTO(reservation) };
  });
}

export type CancelResult = { ok: true } | { ok: false; error: "not_found" | "forbidden" | "already_cancelled" };

// The cancelledAt guard lives in the UPDATE's WHERE clause, not a preceding
// SELECT - a plain SELECT doesn't lock the row, so two concurrent cancels of
// the same reservation could otherwise both pass an "already cancelled?"
// check before either commits, and both decrement bookedSeats. Same failure
// mode createReservation's guarded UPDATE avoids, applied symmetrically here.
export async function cancelReservation(id: string, email: string): Promise<CancelResult> {
  const normalized = normalizeEmail(email);

  return db.$transaction(async (tx) => {
    const reservation = await tx.dinnerReservation.findUnique({ where: { id } });
    if (!reservation) return { ok: false, error: "not_found" };
    if (reservation.email !== normalized) return { ok: false, error: "forbidden" };

    const updated = await tx.$executeRaw`
      UPDATE "DinnerReservation"
      SET "cancelledAt" = NOW()
      WHERE "id" = ${id} AND "cancelledAt" IS NULL
    `;
    if (updated === 0) return { ok: false, error: "already_cancelled" };

    await tx.$executeRaw`
      UPDATE "DinnerNight"
      SET "bookedSeats" = GREATEST("bookedSeats" - ${reservation.partySize}, 0)
      WHERE "date" = ${reservation.date}
    `;

    return { ok: true };
  });
}

export async function reservationsForEmail(email: string): Promise<ReservationDTO[]> {
  const normalized = normalizeEmail(email);
  const reservations = await db.dinnerReservation.findMany({
    where: { email: normalized },
    orderBy: { date: "asc" }
  });
  return reservations.map(toDTO);
}
