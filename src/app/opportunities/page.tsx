import type { Metadata } from "next";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { OpportunityBrowser } from "@/components/ecosystem/OpportunityBrowser";

export const metadata: Metadata = {
  title: "Investment Opportunities — Land, Villas, Hotels & Resorts",
  description:
    "Curated Zanzibar investment opportunities tagged Luxury, ROI, Airbnb, Beachfront, and Foreign Buyer ready.",
};

export default function OpportunitiesPage() {
  return (
    <EcosystemPageShell
      eyebrow="Opportunity Database"
      title="Discover Zanzibar investment opportunities"
      description="Land, luxury villas, hotels, resorts, and commercial assets — filtered by type, area, and investor tags."
    >
      <OpportunityBrowser />
    </EcosystemPageShell>
  );
}
