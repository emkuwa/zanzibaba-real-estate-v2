export const SITE = {
  name: "Zanzibaba Real Estate",
  brandLine: "Zanzibar Investment Ecosystem",
  tagline:
    "The primary platform foreigners use to discover, invest in, relocate to, and experience Zanzibar — luxury real estate, intelligence, and AI concierge.",
  legalName: "Zanzibaba Co. Ltd",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://realestate.zanzibaba.com",
  email: "info@zanzibaba.com",
  phone: "+255 716 002 790",
  phoneLocal: "0716 002 790",
  phoneTel: "+255716002790",
  whatsapp: "255716002790",
  offices: [
    { name: "East Coast Office", location: "Paje, Zanzibar" },
    { name: "Town Office", location: "Mlandege, Stone Town, Zanzibar" },
  ],
} as const;

export const SEO_KEYWORDS = [
  // Primary real estate
  "Zanzibar real estate",
  "Zanzibar property",
  "property for sale Zanzibar",
  "luxury villas Zanzibar",
  "off-plan property Zanzibar",
  "land investment Zanzibar",
  "beachfront property Zanzibar",
  "Zanzibar investment property",
  "Zanzibar villas",
  "beachfront land Zanzibar",
  "Zanzibar investment opportunities",
  // Tourism & travel
  "best places in Zanzibar",
  "luxury travel Zanzibar",
  "Zanzibar beaches",
  "Zanzibar holiday guide",
  "things to do in Zanzibar",
  "Zanzibar luxury resorts",
  "Zanzibar tourism 2026",
  // Investment & business
  "invest in Zanzibar",
  "Zanzibar business opportunities",
  "tourism investment Zanzibar",
  "hotel investment Zanzibar",
  "real estate ROI Zanzibar",
  "Zanzibar Airbnb investment",
  "Zanzibar investment ecosystem",
  "Zanzibar foreign ownership",
  "buy property in Zanzibar as foreigner",
  // Relocation & expat
  "living in Zanzibar",
  "moving to Zanzibar",
  "expat life Zanzibar",
  "digital nomad Zanzibar",
  "long-term stay Zanzibar",
  "expat housing Zanzibar",
  "relocate to Zanzibar",
  "Zanzibar retirement",
  // Rentals
  "luxury villa rental Zanzibar",
  "Zanzibar beachfront rental",
  "monthly rental Zanzibar",
  "digital nomad Zanzibar accommodation",
  "Zanzibar holiday villa",
  // Business & development
  "developments in Zanzibar",
  "infrastructure projects Zanzibar",
  "hotel development opportunities",
  "Zanzibar economy",
  "Zanzibar off-plan investment",
  // Area-specific
  "Paje Zanzibar real estate",
  "Nungwi luxury property",
  "Stone Town investment",
] as const;

export const NAV_LINKS = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/insights", label: "Insights" },
  { href: "/rentals", label: "Rentals" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/#qualify", label: "Concierge" },
] as const;

export const FOOTER_AUTHORITY_LINKS = [
  { href: "/ecosystem", label: "Investment Ecosystem" },
  { href: "/opportunities", label: "Opportunity Database" },
  { href: "/developers", label: "Developer Portal" },
  { href: "/intelligence", label: "Intelligence Hub" },
  { href: "/rentals", label: "Rentals & Relocation" },
  { href: "/insights", label: "Insights" },
  { href: "/#why-zanzibar", label: "Why Zanzibar" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const WHATSAPP_MESSAGE =
  "Hello Zanzibaba, I am exploring the Zanzibar Investment Ecosystem — property, investment, or relocation.";

export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? WHATSAPP_MESSAGE);
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

export const BOOK_CALL_URL =
  process.env.NEXT_PUBLIC_BOOK_CALL_URL || "https://cal.com/zanzibaba/investor-call";

export const TARGET_COUNTRIES = [
  { code: "GB", label: "United Kingdom" },
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "AE", label: "United Arab Emirates" },
  { code: "ZA", label: "South Africa" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "NL", label: "Netherlands" },
  { code: "IT", label: "Italy" },
  { code: "OTHER", label: "Other" },
] as const;

export const BUDGET_TIERS = [
  "Under $150k",
  "$150k – $350k",
  "$350k – $750k",
  "$750k – $1.5M",
  "$1.5M+",
  "Researching",
] as const;
