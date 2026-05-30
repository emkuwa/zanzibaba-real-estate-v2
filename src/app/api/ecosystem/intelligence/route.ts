import { NextResponse } from "next/server";
import { INTELLIGENCE_FEED, INTELLIGENCE_CATEGORIES } from "@/ecosystem/data/intelligence";

export async function GET() {
  return NextResponse.json({
    categories: INTELLIGENCE_CATEGORIES,
    items: INTELLIGENCE_FEED,
  });
}
