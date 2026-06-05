/** Resolve image key to luxury visual path */
export function opportunityImagePath(imageKey: string): string {
  const map: Record<string, string> = {
    "villa-luxury": "/images/luxury/offerings/villa-luxury.png",
    "holiday-home-luxury": "/images/luxury/offerings/holiday-home-luxury.png",
    "airbnb-investment": "/images/luxury/offerings/airbnb-investment.png",
    "beachfront-land": "/images/luxury/offerings/beachfront-land.png",
    "boutique-hotel": "/images/luxury/offerings/boutique-hotel.png",
    "premium-tourism": "/images/luxury/lifestyle/premium-tourism.png",
    "apartment-luxury": "/images/luxury/offerings/apartment-luxury.png",
    "off-plan-investment": "/images/luxury/offerings/off-plan-investment.png",
    "commercial-luxury": "/images/luxury/offerings/commercial-luxury.png",
    paje: "/images/luxury/areas/paje.png",
    nungwi: "/images/luxury/areas/nungwi.png",
    jambiani: "/images/luxury/areas/jambiani.png",
    kiwengwa: "/images/luxury/areas/kiwengwa.png",
    matemwe: "/images/luxury/areas/matemwe.png",
    "stone-town": "/images/luxury/areas/stone-town.png",
    fumba: "/images/luxury/areas/fumba.png",
    kendwa: "/images/luxury/areas/kendwa.png",
  };
  return map[imageKey] ?? "/images/luxury/offerings/villa-luxury.png";
}

export function verifyAdminKey(request: Request): boolean {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return false;
  const header = request.headers.get("x-admin-key") ?? request.headers.get("authorization")?.replace("Bearer ", "");
  return header === key;
}
