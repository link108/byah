import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../lib/api-response";
import { guestEmailHeader, isValidEmail } from "../../../lib/dinner-reservations";
import { reservationsForEmail } from "../../../lib/dinner-reservations-store";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const email = request.headers.get(guestEmailHeader)?.trim() ?? "";
  if (!isValidEmail(email)) return errorResponse("Please add a valid email address.", 400);

  const reservations = await reservationsForEmail(email);
  return jsonResponse({ reservations });
};
