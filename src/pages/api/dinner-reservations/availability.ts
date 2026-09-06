import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../lib/api-response";
import { availabilityForMonth } from "../../../lib/dinner-reservations-store";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const year = Number(url.searchParams.get("year"));
  const month = Number(url.searchParams.get("month"));
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 0 || month > 11) {
    return errorResponse("year and month (0-11) query params are required.", 400);
  }

  const nights = await availabilityForMonth(year, month);
  return jsonResponse({ nights });
};
