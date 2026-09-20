/** Resolve image key to luxury visual path */
export function opportunityImagePath(imageKey: string): string {
  const map: Record<string, string> = {
    "villa-luxury": "/images/editorial/villa-daylight.webp",
    "holiday-home-luxury": "/images/editorial/villa-daylight.webp",
    "airbnb-investment": "/images/editorial/villa-daylight.webp",
    "beachfront-land": "/images/editorial/investment-land-daylight.webp",
    "boutique-hotel": "/images/editorial/hotel-resort-daylight.webp",
    "premium-tourism": "/images/editorial/hotel-resort-daylight.webp",
    "apartment-luxury": "/images/editorial/off-plan-daylight.webp",
    "off-plan-investment": "/images/editorial/off-plan-daylight.webp",
    "commercial-luxury": "/images/editorial/off-plan-daylight.webp",
    paje: "/images/editorial/paje-daylight.webp",
    nungwi: "/images/editorial/nungwi-daylight.webp",
    jambiani: "/images/editorial/jambiani-daylight.webp",
    kiwengwa: "/images/editorial/matemwe-daylight.webp",
    matemwe: "/images/editorial/matemwe-daylight.webp",
    "stone-town": "/images/editorial/stone-town-daylight.webp",
    fumba: "/images/editorial/fumba-daylight.webp",
    kendwa: "/images/editorial/nungwi-daylight.webp",
  };
  return map[imageKey] ?? "/images/editorial/villa-daylight.webp";
}

export function verifyAdminKey(request: Request): boolean {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return false;
  const header = request.headers.get("x-admin-key") ?? request.headers.get("authorization")?.replace("Bearer ", "");
  return header === key;
}
