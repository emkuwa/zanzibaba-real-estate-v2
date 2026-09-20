import { NextRequest, NextResponse } from "next/server";
import { listDiscovered, updateDiscovery } from "@/lib/ecosystem/discovery-store";
import { createHotel } from "@/lib/ecosystem/partners-store";
import { addToOutreach } from "@/lib/ecosystem/outreach-store";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function POST(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const all = await listDiscovered();
    const approved = all.filter((h) => h.approvalStatus === "approved");

    if (approved.length === 0) {
      return NextResponse.json({ ok: true, imported: 0, skipped: 0, message: "No approved hotels to import." });
    }

    let imported = 0;
    const errors: string[] = [];
    for (const h of approved) {
      try {
        await createHotel({
          name: h.name,
          area: h.area,
          contactPerson: "",
          email: h.email,
          whatsapp: h.phone,
          status: "onboarding",
          notes: `Imported from discovery (source: ${h.source}, website: ${h.website || "n/a"}, rating: ${h.googleRating || "n/a"}).`,
        });
        await addToOutreach({
          name: h.name,
          area: h.area,
          website: h.website,
          phone: h.phone,
          rating: h.googleRating,
          source: h.source,
          initialStatus: "Discovered",
          notes: `Auto-added from discovery import (${h.source}).`,
        });
        await updateDiscovery(h.id, { approvalStatus: "imported" });
        imported++;
      } catch (e) {
        errors.push(`${h.name}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    return NextResponse.json({
      ok: true,
      imported,
      considered: approved.length,
      errors,
    });
  } catch (e) {
    console.error("[discovery] import failed", e);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
