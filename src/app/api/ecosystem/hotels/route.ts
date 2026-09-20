import { NextRequest, NextResponse } from "next/server";
import { createHotel, HOTEL_STATUSES, listHotels, type HotelStatus } from "@/lib/ecosystem/partners-store";
import { verifyAdminKey } from "@/lib/ecosystem/utils";

export async function GET(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const hotels = await listHotels();
  return NextResponse.json({ hotels, count: hotels.length });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    if (!name) {
      return NextResponse.json({ error: "Hotel name required" }, { status: 400 });
    }
    const status = (HOTEL_STATUSES as readonly string[]).includes(body.status)
      ? (body.status as HotelStatus)
      : "active";

    const hotel = await createHotel({
      name,
      area: String(body.area ?? "").trim(),
      contactPerson: String(body.contactPerson ?? "").trim(),
      email: String(body.email ?? "").trim(),
      whatsapp: String(body.whatsapp ?? "").trim(),
      status,
      notes: String(body.notes ?? "").trim(),
    });
    return NextResponse.json({ ok: true, hotel });
  } catch (e) {
    console.error("[partners] createHotel failed", e);
    return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 });
  }
}
