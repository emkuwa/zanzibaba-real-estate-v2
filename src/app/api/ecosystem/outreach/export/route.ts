import { NextRequest, NextResponse } from "next/server";
import { listOutreach } from "@/lib/ecosystem/outreach-store";
import { listScored } from "@/lib/ecosystem/discovery-store";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

function escapeCsv(value: string | number | undefined | null): string {
  if (value == null) return "";
  const s = String(value);
  // Prefix phones/IDs with a tab-safe character to prevent formula injection in Excel.
  // Any value starting with =, +, -, @ gets a leading apostrophe (CSV-safe) or quoted.
  if (/^[=+\-@]/.test(s)) {
    return `"'${s.replace(/"/g, '""')}"`;
  }
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const view = url.searchParams.get("view") ?? "all";
  const area = url.searchParams.get("area") ?? undefined;
  const filename = `outreach-${view}${area ? `-${area}` : ""}.csv`;

  let headers: string[];
  let rows: string[][];

  if (view === "top50") {
    headers = ["Rank", "Hotel", "Area", "Score", "Tier", "Rating", "Reviews", "Website", "Phone", "Address", "Source"];
    const scored = await listScored(area);
    rows = scored.slice(0, 50).map((s, i) => [
      String(i + 1),
      s.hotel.name,
      s.hotel.area,
      String(s.score),
      s.tier,
      s.hotel.googleRating,
      s.hotel.reviewsCount,
      s.hotel.website,
      s.hotel.phone,
      s.hotel.address,
      s.hotel.source,
    ]);
  } else {
    headers = ["Hotel", "Area", "Website", "Phone", "Rating", "Contact Status", "Last Contact Date", "Discovery Date", "Source", "Notes"];
    const all = await listOutreach();
    const filtered = all
      .filter((h) => !area || h.area === area)
      .filter((h) => {
        if (view === "all") return true;
        if (view === "not_contacted") return h.contactStatus === "Not Contacted" || h.contactStatus === "Discovered";
        if (view === "contacted") return h.contactStatus === "Contacted";
        if (view === "interested") return h.contactStatus === "Interested";
        if (view === "trial") return h.contactStatus === "Trial";
        if (view === "subscriber") return h.contactStatus === "Subscriber";
        return true;
      });
    rows = filtered.map((h) => [
      h.name,
      h.area,
      h.website,
      h.phone,
      h.rating,
      h.contactStatus,
      h.lastContactDate,
      h.discoveryDate,
      h.source,
      h.notes,
    ]);
  }

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
