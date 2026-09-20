import { NextRequest, NextResponse } from "next/server";
import { bulkUpdateStatus, OUTREACH_STATUSES, type OutreachStatus } from "@/lib/ecosystem/outreach-store";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const status = String(body.status ?? "") as OutreachStatus;
    if (!(OUTREACH_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${OUTREACH_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }
    const updated = await bulkUpdateStatus([id], status);
    if (updated.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, hotel: updated[0] });
  } catch (e) {
    console.error("[outreach] single update failed", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
