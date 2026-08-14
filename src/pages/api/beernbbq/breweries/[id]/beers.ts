import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../../../lib/api-response";
import { db } from "../../../../../lib/db";
import { raterNameFromHeaders } from "../../../../../lib/rater";

export const prerender = false;

const maxNameLength = 60;

export const POST: APIRoute = async ({ params, request }) => {
  const raterName = raterNameFromHeaders(request.headers);
  if (!raterName) return errorResponse("Enter your name first.", 400);

  const breweryId = params.id;
  if (!breweryId) return errorResponse("Missing brewery id.", 400);

  const brewery = await db.brewery.findUnique({ where: { id: breweryId } });
  if (!brewery) return errorResponse("Brewery not found.", 404);

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name || name.length > maxNameLength) {
    return errorResponse(`Beer name must be 1-${maxNameLength} characters.`, 400);
  }

  const beer = await db.beer.upsert({
    where: { breweryId_name: { breweryId, name } },
    update: {},
    create: { breweryId, name, addedBy: raterName }
  });

  return jsonResponse(beer, 201);
};
