import { NextRequest, NextResponse } from "next/server";
import { getAccommodationLeads } from "@/lib/ecosystem/investor-crm";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await getAccommodationLeads();
  return NextResponse.json({ leads, count: leads.length });
}