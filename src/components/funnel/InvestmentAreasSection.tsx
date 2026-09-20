"use client";

import { INVESTMENT_AREAS } from "@/data/seo-content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import Link from "next/link";

export function InvestmentAreasSection() {
  return (
    <Section id="areas">
      <SectionHeader
        eyebrow="Locations"
        title="Explore Zanzibar"
        description="Each area offers a different character — from lively east coast to quiet north-east and heritage Stone Town."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {INVESTMENT_AREAS.map((area) => (
          <Link
            key={area.slug}
            href={`/areas#${area.slug}`}
            className="group block overflow-hidden"
          >
            <article className="relative aspect-[3/2] overflow-hidden rounded-luxury-lg">
              <LuxuryImage
                asset={area.image}
                overlay="card"
                animate={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-gold/90">
                  {area.headline}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-white">
                  {area.name}
                </h3>
                <p className="mt-1 text-xs text-white/70 line-clamp-2">
                  {area.description}
                </p>
                <span className="mt-3 text-xs font-medium uppercase tracking-wider text-white/60 transition-colors group-hover:text-gold">
                  Explore Area →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </Section>
  );
}
