import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../lib/api-response";
import {
  CAPACITY,
  dateKey,
  isDateKey,
  isValidEmail,
  maxLeadNameLength,
  maxNoteLength
} from "../../../lib/dinner-reservations";
import { createReservation } from "../../../lib/dinner-reservations-store";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body: Record<string, unknown> | null = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return errorResponse("Invalid request body.", 400);

  const date = body.date;
  if (!isDateKey(date)) return errorResponse("date must be a yyyy-mm-dd string.", 400);
  // Server's own local date, as a loose sanity check only - the calendar UI
  // is the source of truth for which nights are actually bookable.
  if (date < dateKey(new Date())) return errorResponse("That date has already passed.", 400);

  const partySize = Number(body.partySize);
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > CAPACITY) {
    return errorResponse(`Party size must be 1-${CAPACITY}.`, 400);
  }

  const leadName = typeof body.leadName === "string" ? body.leadName : "";
  if (!leadName.trim() || leadName.trim().length > maxLeadNameLength) {
    return errorResponse(`Lead guest name must be 1-${maxLeadNameLength} characters.`, 400);
  }

  const email = typeof body.email === "string" ? body.email : "";
  if (!isValidEmail(email)) return errorResponse("Please add a valid email address.", 400);

  const note = typeof body.note === "string" ? body.note : "";
  if (note.length > maxNoteLength) return errorResponse(`Note must be ${maxNoteLength} characters or fewer.`, 400);

  const result = await createReservation({ date, partySize, leadName, email, note });
  if (!result.ok) {
    return errorResponse("Sorry - that night's remaining seats changed. Pick again.", 409);
  }

  return jsonResponse(result.reservation, 201);
};
