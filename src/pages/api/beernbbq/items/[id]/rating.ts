import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../../../lib/api-response";
import { db } from "../../../../../lib/db";
import { raterNameFromHeaders } from "../../../../../lib/rater";
import { parseScore } from "../../../../../lib/rating";

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  const raterName = raterNameFromHeaders(request.headers);
  if (!raterName) return errorResponse("Enter your name first.", 400);

  const foodItemId = params.id;
  if (!foodItemId) return errorResponse("Missing item id.", 400);

  const item = await db.foodItem.findUnique({ where: { id: foodItemId } });
  if (!item) return errorResponse("Food item not found.", 404);

  const body = await request.json().catch(() => null);
  const score = parseScore(body?.score);
  if (score === null) return errorResponse("Score must be an integer 1-5.", 400);

  const rating = await db.foodRating.upsert({
    where: { foodItemId_raterName: { foodItemId, raterName } },
    update: { score },
    create: { foodItemId, raterName, score }
  });

  const agg = await db.foodRating.aggregate({
    where: { foodItemId },
    _avg: { score: true },
    _count: { score: true }
  });

  return jsonResponse({
    rating,
    averageRating: agg._avg.score ?? 0,
    ratingCount: agg._count.score
  });
};
