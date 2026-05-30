import { NextRequest, NextResponse } from "next/server";
import { OPPORTUNITIES, filterOpportunities } from "@/ecosystem/data/opportunities";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") ?? undefined;
  const area = searchParams.get("area") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const results =
    type || area || tag || status
      ? filterOpportunities({ type, area, tag, status })
      : OPPORTUNITIES;

  return NextResponse.json({ count: results.length, opportunities: results });
}
