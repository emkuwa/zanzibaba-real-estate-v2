import type { Metadata } from "next";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { OpportunityBrowser } from "@/components/ecosystem/OpportunityBrowser";
import { SITE } from "@/data/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Zanzibar Investment Opportunities — Luxury Villas, Land & Hotels",
  description:
    "Discover curated Zanzibar investment opportunities: beachfront villas, off-plan developments, hospitality assets, and commercial property. Tagged by ROI potential, Airbnb readiness, and foreign buyer suitability.",
  alternates: { canonical: `${SITE.url}/opportunities` },
  openGraph: {
    title: "Zanzibar Investment Opportunities — Browse Luxury Property & Land",
    description:
      "Browse verified Zanzibar real estate investment opportunities: luxury beachfront villas, off-plan developments, hotel assets, land banking, and commercial property for international investors.",
  },
};

export default function OpportunitiesPage() {
  return (
    <EcosystemPageShell
      eyebrow="Opportunity Database"
      title="Discover Zanzibar investment opportunities"
      description="Land, luxury villas, hotels, resorts, and commercial assets — filtered by type, area, and investor tags."
    >
      <Breadcrumb crumbs={[{ label: "Opportunities", href: "/opportunities" }]} />
      <OpportunityBrowser />
    </EcosystemPageShell>
  );
}
