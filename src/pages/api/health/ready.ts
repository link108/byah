import type { APIRoute } from "astro";

import { jsonResponse } from "../../../lib/api-response";
import { db } from "../../../lib/db";

export const prerender = false;

// Readiness probe: returns 503 until PostgreSQL is reachable.
export const GET: APIRoute = async () => {
  try {
    await db.$queryRaw`SELECT 1`;
    return jsonResponse({ status: "ok" });
  } catch (error) {
    return jsonResponse(
      { status: "unavailable", error: error instanceof Error ? error.message : String(error) },
      503
    );
  }
};
