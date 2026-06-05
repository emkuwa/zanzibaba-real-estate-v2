"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";
import { trackCtaClick } from "@/lib/gtag";
import { VISUAL_SYSTEM } from "@/data/visual-system";

const FEATURED_OPPORTUNITIES = [
  {
    id: "luxury-villas",
    title: "Luxury Beachfront Villas",
    description: "Turnkey investment properties with professional Airbnb management and 12-15% gross yields.",
    image: VISUAL_SYSTEM.propertyTypes.villas,
    tag: "Premium ROI",
    cta: "Explore Villas",
  },
  {
    id: "hospitality-assets",
    title: "Hospitality & Resort Assets",
    description: "Boutique hotels, resort residences, and hospitality investments with established operations.",
    image: VISUAL_SYSTEM.propertyTypes.hotels,
    tag: "Hospitality",
    cta: "View Hotels",
  },
  {
    id: "off-plan",
    title: "Off-Plan Development",
    description: "Early access to master-planned communities with flexible payment plans and pre-completion pricing.",
    image: VISUAL_SYSTEM.offerings.offPlan,
    tag: "Early Access",
    cta: "Off-Plan Info",
  },
  {
    id: "commercial",
    title: "Commercial & Mixed-Use",
    description: "Institutional-grade commercial assets in growth corridors with strong rental demand.",
    image: VISUAL_SYSTEM.areas["stone-town"],
    tag: "Institutional",
    cta: "Commercial Portfolio",
  },
];

export function FeaturedOpportunitiesSection() {
  return (
    <Section id="opportunities" className="py-8 md:py-12">
      <SectionHeader
        eyebrow="Featured Investment Themes"
        title="Premium Zanzibar Investment Opportunities"
        description="Curated investment themes for discerning international investors — from luxury villas to hospitality assets and development projects."
        align="center"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_OPPORTUNITIES.map((opportunity) => (
          <article
            key={opportunity.id}
            className="group relative overflow-hidden rounded-luxury-lg border border-border bg-white shadow-sm transition-all hover:shadow-premium hover:-translate-y-1"
          >
            <div className="relative h-52 overflow-hidden sm:h-56">
              <LuxuryImage
                asset={opportunity.image}
                overlay="minimal"
                sizes="(max-width: 768px) 100vw, 25vw"
                className="transition duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {opportunity.tag}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">
                {opportunity.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">
                {opportunity.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => {
                  trackCtaClick(opportunity.cta, "featured_opportunities");
                  scrollToId("qualify");
                }}
              >
                {opportunity.cta}
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="gold"
          size="lg"
          onClick={() => {
            trackCtaClick("Get Personalized Investment Recommendations", "featured_opportunities_bottom");
            scrollToId("qualify");
          }}
          className="px-8"
        >
          Get Personalized Investment Recommendations
        </Button>
        <p className="mt-3 text-sm text-muted">
          Our concierge team matches you with opportunities based on your investment profile
        </p>
      </div>
    </Section>
  );
}
