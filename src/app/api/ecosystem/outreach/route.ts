import { NextRequest, NextResponse } from "next/server";
import {
  bulkUpdateStatus,
  getOutreachStats,
  listOutreach,
  OUTREACH_STATUSES,
  type OutreachStatus,
} from "@/lib/ecosystem/outreach-store";
import { listScored } from "@/lib/ecosystem/discovery-store";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

const VALID_VIEWS = [
  "all",
  "top50",
  "not_contacted",
  "contacted",
  "interested",
  "trial",
  "subscriber",
] as const;
type ViewName = (typeof VALID_VIEWS)[number];

function statusForView(view: ViewName): OutreachStatus | null {
  switch (view) {
    case "not_contacted":
      return "Not Contacted";
    case "contacted":
      return "Contacted";
    case "interested":
      return "Interested";
    case "trial":
      return "Trial";
    case "subscriber":
      return "Subscriber";
    default:
      return null;
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const view = (url.searchParams.get("view") ?? "all") as ViewName;
  const area = url.searchParams.get("area") ?? undefined;

  // Top-50 comes from scored discovery, not outreach.
  if (view === "top50") {
    const all = await listScored(area ?? undefined);
    const top50 = all.slice(0, 50);
    return NextResponse.json({
      view,
      area: area ?? "all",
      hotels: top50.map((s) => ({
        id: s.hotel.id,
        name: s.hotel.name,
        area: s.hotel.area,
        website: s.hotel.website,
        phone: s.hotel.phone,
        rating: s.hotel.googleRating,
        reviewsCount: s.hotel.reviewsCount,
        score: s.score,
        tier: s.tier,
        contactStatus: "Discovered",
        lastContactDate: "",
        source: s.hotel.source,
      })),
      count: top50.length,
      statuses: OUTREACH_STATUSES,
    });
  }

  const [hotels, stats] = await Promise.all([listOutreach(), getOutreachStats()]);
  const filtered = hotels
    .filter((h) => !area || h.area === area)
    .filter((h) => {
      const target = statusForView(view);
      return !target || h.contactStatus === target;
    });

  return NextResponse.json({
    view,
    area: area ?? "all",
    hotels: filtered,
    count: filtered.length,
    stats,
    statuses: OUTREACH_STATUSES,
  });
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const ids: string[] = Array.isArray(body.ids) ? body.ids.map(String) : [];
    const status = String(body.status ?? "") as OutreachStatus;
    if (ids.length === 0) {
      return NextResponse.json({ error: "No ids provided" }, { status: 400 });
    }
    if (!(OUTREACH_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${OUTREACH_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }
    const updated = await bulkUpdateStatus(ids, status);
    return NextResponse.json({ ok: true, updatedCount: updated.length, status });
  } catch (e) {
    console.error("[outreach] bulk update failed", e);
    return NextResponse.json({ error: "Bulk update failed" }, { status: 500 });
  }
}
