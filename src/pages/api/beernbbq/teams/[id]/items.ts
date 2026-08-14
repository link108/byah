import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../../../lib/api-response";
import { db } from "../../../../../lib/db";
import { raterNameFromHeaders } from "../../../../../lib/rater";

export const prerender = false;

const maxLabelLength = 60;

export const POST: APIRoute = async ({ params, request }) => {
  const raterName = raterNameFromHeaders(request.headers);
  if (!raterName) return errorResponse("Enter your name first.", 400);

  const teamId = params.id;
  if (!teamId) return errorResponse("Missing team id.", 400);

  const team = await db.bbqTeam.findUnique({ where: { id: teamId } });
  if (!team) return errorResponse("BBQ team not found.", 404);

  const body = await request.json().catch(() => null);
  const label = typeof body?.label === "string" ? body.label.trim() : "";
  if (!label || label.length > maxLabelLength) {
    return errorResponse(`Item name must be 1-${maxLabelLength} characters.`, 400);
  }

  const item = await db.foodItem.upsert({
    where: { teamId_label: { teamId, label } },
    update: {},
    create: { teamId, label, addedBy: raterName }
  });

  return jsonResponse(item, 201);
};
