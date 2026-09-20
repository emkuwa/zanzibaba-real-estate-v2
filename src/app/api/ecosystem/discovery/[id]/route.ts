import { NextRequest, NextResponse } from "next/server";
import { updateDiscovery } from "@/lib/ecosystem/discovery-store";
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
    const updated = await updateDiscovery(id, {
      approvalStatus: body.approvalStatus,
      contactedStatus: body.contactedStatus,
    });
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, hotel: updated });
  } catch (e) {
    console.error("[discovery] update failed", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
