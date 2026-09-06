import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../../lib/api-response";
import { cancelReservationByCode } from "../../../../lib/dinner";

export const prerender = false;

// Soft-cancel: keeps the row (a stale confirmation link still resolves, and
// there's an audit trail) but frees the seats by stamping cancelledAt.
export const POST: APIRoute = async ({ params }) => {
  const code = params.code?.trim().toUpperCase();
  if (!code) return errorResponse("Missing reservation code.", 400);
  const cancelled = await cancelReservationByCode(code);
  if (!cancelled)
    return errorResponse("Reservation not found or already cancelled.", 404);
  return jsonResponse({ ok: true });
};
