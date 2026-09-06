import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../lib/api-response";
import {
  DINNER_CAPACITY,
  isValidMonth,
  seatsTakenByMonth,
  todayKeyUtc
} from "../../../lib/dinner";

export const prerender = false;

// Seats-taken per day for one month (YYYY-MM). Days with no bookings are
// simply absent; the client treats a missing day as fully open.
export const GET: APIRoute = async ({ url }) => {
  const month = url.searchParams.get("month") ?? todayKeyUtc().slice(0, 7);
  if (!isValidMonth(month)) return errorResponse("Month must be YYYY-MM.", 400);
  const days = await seatsTakenByMonth(month);
  return jsonResponse({ month, capacity: DINNER_CAPACITY, days });
};
