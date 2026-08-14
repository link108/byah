import type { APIRoute } from "astro";

import { errorResponse, jsonResponse } from "../../../../../lib/api-response";
import { db } from "../../../../../lib/db";
import { raterNameFromHeaders } from "../../../../../lib/rater";
import { parseScore } from "../../../../../lib/rating";

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  const raterName = raterNameFromHeaders(request.headers);
  if (!raterName) return errorResponse("Enter your name first.", 400);

  const beerId = params.id;
  if (!beerId) return errorResponse("Missing beer id.", 400);

  const beer = await db.beer.findUnique({ where: { id: beerId } });
  if (!beer) return errorResponse("Beer not found.", 404);

  const body = await request.json().catch(() => null);
  const score = parseScore(body?.score);
  if (score === null) return errorResponse("Score must be an integer 1-5.", 400);

  const rating = await db.beerRating.upsert({
    where: { beerId_raterName: { beerId, raterName } },
    update: { score },
    create: { beerId, raterName, score }
  });

  const agg = await db.beerRating.aggregate({
    where: { beerId },
    _avg: { score: true },
    _count: { score: true }
  });

  return jsonResponse({
    rating,
    averageRating: agg._avg.score ?? 0,
    ratingCount: agg._count.score
  });
};
