import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../lib/api-response";
import { guestEmailHeader, isValidEmail } from "../../../lib/dinner-reservations";
import { cancelReservation } from "../../../lib/dinner-reservations-store";

export const prerender = false;

export const DELETE: APIRoute = async ({ params, request }) => {
  const id = params.id;
  if (!id) return errorResponse("Missing reservation id.", 400);

  const email = request.headers.get(guestEmailHeader)?.trim() ?? "";
  if (!isValidEmail(email)) return errorResponse("Please add a valid email address.", 400);

  const result = await cancelReservation(id, email);
  if (!result.ok) {
    if (result.error === "not_found") return errorResponse("Reservation not found.", 404);
    if (result.error === "forbidden") return errorResponse("That email doesn't match this reservation.", 403);
    return errorResponse("That reservation is already cancelled.", 409);
  }

  return jsonResponse({ ok: true });
};
