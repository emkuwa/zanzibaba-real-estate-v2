import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";

export const metadata: Metadata = {
  title: "Zanzibar Accommodation Concierge",
  description:
    "Find luxury stays in Zanzibar: beachfront villas, boutique hotels, and private retreats. Personalised matching service for international travelers, expats, and digital nomads.",
  alternates: { canonical: `${SITE.url}/stays` },
  openGraph: {
    title: "Zanzibar Accommodation Concierge",
    description:
      "Luxury accommodation finder for Zanzibar — villas, hotels, and private stays matched to your dates, budget, and preferences.",
  },
};

export default function StaysPage() {
  return (
    <EcosystemPageShell
      eyebrow="Accommodation Concierge"
      title="Find your perfect Zanzibar stay"
      description="From beachfront villas to boutique hotels — tell us your dates, guests, and budget. Our concierge team will hand-pick properties unavailable on booking sites."
    >
      <Breadcrumb crumbs={[{ label: "Stays", href: "/stays" }]} />
      
      <div className="mt-8 text-center">
        <p className="text-[16px] text-body">
          Our accommodation concierge service connects you with verified luxury properties across Zanzibar.
          We handle the search, vetting, and booking coordination — so you get the best options without the hassle.
        </p>
        
        <Link
          href="/#qualify"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-white hover:bg-navy-deep transition"
        >
          Find My Stay
        </Link>
      </div>
    </EcosystemPageShell>
  );
}