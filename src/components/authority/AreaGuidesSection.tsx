"use client";

import { useState } from "react";
import { AREA_GUIDES, TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { InternalTopicLinks } from "./TopicClusterHub";

export function AreaGuidesSection() {
  const [active, setActive] = useState(0);
  const area = AREA_GUIDES[active];
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === "real-estate")!;

  return (
    <Section id="areas" dark>
      <SectionHeader
        eyebrow="Zanzibar Area Guides"
        title="Premium destination intelligence"
        description="Lifestyle, investment potential, tourism appeal, rental demand, and property opportunities — authoritative guides for Paje, Nungwi, Kendwa, and every major corridor."
        light
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {AREA_GUIDES.map((a, i) => (
          <button
            key={a.slug}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition",
              i === active
                ? "bg-gold text-white shadow-md"
                : "border border-white/20 bg-white/5 text-white/80 hover:border-gold/40"
            )}
          >
            {a.name}
          </button>
        ))}
      </div>

      <article
        id={`area-${area.slug}`}
        className="overflow-hidden rounded-luxury-lg border border-white/10 bg-white/[0.04] shadow-premium"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[220px] lg:min-h-[360px]">
            <LuxuryImage
              asset={area.image}
              overlay="card"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 md:p-7 lg:p-8">
            <p className="text-[14px] font-semibold text-gold">{area.headline}</p>
            <h3 className="mt-2 font-serif text-[1.5rem] font-semibold text-white md:text-2xl">
              {area.name} Area Guide
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">{area.description}</p>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Lifestyle", area.lifestyle],
                ["Investment", area.investmentPotential],
                ["Tourism", area.tourismAppeal],
                ["Properties", area.propertyOpportunities],
                ["Rentals", area.rentalDemand],
                ["Beach", area.beachQuality],
                ["Atmosphere", area.atmosphere],
              ].map(([label, value]) => (
                <div key={label} className="rounded-luxury border border-white/10 bg-white/[0.04] p-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-white/75">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                Nearby attractions
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {area.attractions.map((attr) => (
                  <li
                    key={attr}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[12px] text-white/70"
                  >
                    {attr}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AREA_GUIDES.filter((_, i) => i !== active)
          .slice(0, 4)
          .map((a) => (
            <button
              key={a.slug}
              type="button"
              onClick={() => setActive(AREA_GUIDES.findIndex((x) => x.slug === a.slug))}
              className="rounded-luxury border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-gold/30"
            >
              <span className="font-serif text-[1rem] font-semibold text-white">{a.name}</span>
              <p className="mt-1 line-clamp-2 text-[13px] text-white/60">{a.headline}</p>
            </button>
          ))}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => scrollToId("qualify")}
          className="text-[15px] font-semibold text-gold hover:underline"
        >
          Match me with {area.name} opportunities →
        </button>
      </div>

      <InternalTopicLinks links={cluster.related} label="Related property topics" />
    </Section>
  );
}
