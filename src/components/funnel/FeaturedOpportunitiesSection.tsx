"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import Link from "next/link";

const FEATURED_PROPERTIES = [
  {
    id: "luxury-villa",
    title: "Beachfront Villa — Nungwi",
    type: "Beachfront Villa",
    location: "Nungwi",
    price: "$420,000",
    features: "4 Bedrooms · Private Pool · Beachfront",
    image: VISUAL_SYSTEM.propertyTypes.villas,
  },
  {
    id: "investment-land",
    title: "Development Land — Paje",
    type: "Investment Land",
    location: "Paje",
    price: "$85,000",
    features: "50×100m · Beach Access · Clear Title",
    image: VISUAL_SYSTEM.areas.paje,
  },
  {
    id: "off-plan",
    title: "Off-Plan Residence — East Coast",
    type: "Off-Plan",
    location: "East Coast",
    price: "From $180,000",
    features: "Staged Payments · Early Entry Pricing",
    image: VISUAL_SYSTEM.offerings.offPlan,
  },
];

export function FeaturedOpportunitiesSection() {
  return (
    <Section id="featured" className="py-10 md:py-16">
      <SectionHeader
        eyebrow="Current Listings"
        title="Featured Opportunities in Zanzibar"
        description="Curated properties with local advisory support — beachfront villas, development land, and investment opportunities."
        align="center"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROPERTIES.map((property) => (
          <Link
            key={property.id}
            href="/opportunities"
            className="group block overflow-hidden"
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-luxury-lg">
                <LuxuryImage
                  asset={property.image}
                  overlay="minimal"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-navy backdrop-blur-sm">
                  {property.location}
                </span>
                <span className="absolute right-3 top-3 rounded-sm bg-navy-deep/80 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                  {property.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <h3 className="font-serif text-lg font-semibold text-navy-heading transition-colors group-hover:text-gold">
                  {property.title}
                </h3>
                <p className="mt-1 font-serif text-base font-semibold text-gold">
                  {property.price}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {property.features}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-navy/60 transition-colors group-hover:text-gold">
                  View Property →
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/opportunities"
          className="inline-flex items-center justify-center rounded-sm border border-navy px-8 py-3.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
        >
          View All Properties
        </Link>
      </div>
    </Section>
  );
}
