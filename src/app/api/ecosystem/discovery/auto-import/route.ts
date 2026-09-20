import { NextRequest, NextResponse } from "next/server";
import { autoImportToOutreach, listScored } from "@/lib/ecosystem/discovery-store";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

/**
 * POST /api/ecosystem/discovery/auto-import
 * Body: { minScore?: number, areas?: string[] }
 * Default minScore = 70 (high priority only).
 *
 * GET — returns scored list (for the recommended-order report).
 */
export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const scored = await listScored();
  return NextResponse.json({
    total: scored.length,
    byTier: {
      high: scored.filter((s) => s.tier === "high").length,
      medium: scored.filter((s) => s.tier === "medium").length,
      low: scored.filter((s) => s.tier === "low").length,
    },
    top20: scored.slice(0, 20).map((s) => ({
      name: s.hotel.name,
      area: s.hotel.area,
      score: s.score,
      tier: s.tier,
      rating: s.hotel.googleRating,
      reviews: s.hotel.reviewsCount,
      website: !!s.hotel.website,
      phone: !!s.hotel.phone,
      reasons: s.reasons,
    })),
  });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const minScore = typeof body.minScore === "number" ? body.minScore : 70;
    const areas = Array.isArray(body.areas) ? body.areas.filter((a: unknown) => typeof a === "string") : undefined;
    const result = await autoImportToOutreach(minScore, areas);
    return NextResponse.json({ ok: true, minScore, areas: areas ?? "all", ...result });
  } catch (e) {
    console.error("[discovery] auto-import failed", e);
    return NextResponse.json({ error: "Auto-import failed" }, { status: 500 });
  }
}
