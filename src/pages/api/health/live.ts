import type { APIRoute } from "astro";

import { jsonResponse } from "../../../lib/api-response";

export const prerender = false;

// Liveness probe: the process is up and serving requests. No dependencies checked.
export const GET: APIRoute = () => jsonResponse({ status: "ok" });
