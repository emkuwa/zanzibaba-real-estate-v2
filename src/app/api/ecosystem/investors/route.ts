import { NextRequest, NextResponse } from "next/server";
import { getAllInvestors, getInvestorStats } from "@/lib/ecosystem/investor-crm";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [investors, stats] = await Promise.all([getAllInvestors(), getInvestorStats()]);
  return NextResponse.json({ stats, investors });
}
