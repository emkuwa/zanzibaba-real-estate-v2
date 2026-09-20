import { NextRequest, NextResponse } from "next/server";
import { getAllInvestors, getAccommodationLeads } from "@/lib/ecosystem/investor-crm";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") ?? "all";

  const leads = type === "accommodation" ? await getAccommodationLeads() : await getAllInvestors();

  const csv = [
    ["id", "createdAt", "name", "email", "phone", "country", "source", "intent", "leadType", "budgetPerNight", "checkInDate", "checkOutDate", "guests", "area", "leadScore", "priority", "assignedAgent", "funnelStage"],
    ...leads.map((l) => [
      l.id,
      l.createdAt,
      l.name,
      l.email,
      l.phone,
      l.country ?? "",
      l.source,
      l.intent ?? "",
      l.leadType ?? "",
      l.qualification?.budgetPerNight ?? "",
      l.qualification?.checkInDate ?? "",
      l.qualification?.checkOutDate ?? "",
      l.qualification?.guests ?? "",
      l.qualification?.area ?? "",
      String(l.leadScore),
      l.priority,
      l.assignedAgent,
      l.funnelStage,
    ]),
  ]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="zanzibaba-${type}-leads.csv"`,
    },
  });
}