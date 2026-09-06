import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../lib/api-response";
import {
  CapacityError,
  createReservation,
  findReservationByCode,
  listReservationsByEmail,
  parseDinnerInput
} from "../../../lib/dinner";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxEmail = 200;

// Create a booking. The client only calls this from the checkout step, i.e.
// after the demo payment button - so a successful response *is* the
// "payment succeeded" moment. Capacity is enforced server-side (409 when the
// night filled up between picking a date and paying).
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const parsed = parseDinnerInput(body);
  if (!parsed.ok) return errorResponse(parsed.error, 400);

  try {
    const reservation = await createReservation(parsed.value);
    return jsonResponse({ reservation }, 201);
  } catch (err) {
    if (err instanceof CapacityError) return errorResponse(err.message, 409);
    throw err;
  }
};

// Lookups: ?code=BYAH-XXXX (single reservation, e.g. the confirmation page -
// includes cancelled ones so a stale confirmation link still resolves) or
// ?email=you@example.com (active reservations for the "my reservations" list).
export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get("code")?.trim().toUpperCase();
  const email = url.searchParams.get("email")?.trim().toLowerCase();

  if (code) {
    const reservation = await findReservationByCode(code);
    if (!reservation) return errorResponse("Reservation not found.", 404);
    return jsonResponse({ reservation });
  }

  if (email) {
    if (!emailRe.test(email) || email.length > maxEmail)
      return errorResponse("Email looks invalid.", 400);
    const reservations = await listReservationsByEmail(email);
    return jsonResponse({ reservations });
  }

  return errorResponse("Pass ?code= or ?email=.", 400);
};
