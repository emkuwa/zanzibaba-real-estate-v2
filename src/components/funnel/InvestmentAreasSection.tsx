"use client";

import { INVESTMENT_AREAS } from "@/data/seo-content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";

export function InvestmentAreasSection() {
  return (
    <Section id="areas" dark>
      <SectionHeader
        eyebrow="Popular Investment Areas"
        title="Where international buyers invest"
        description="From Paje's Airbnb corridor to Stone Town heritage — explore Zanzibar's premier property markets."
        light
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {INVESTMENT_AREAS.map((area) => (
          <article
            key={area.slug}
            id={area.slug}
            className="luxury-card-dark group overflow-hidden p-0 transition hover:border-gold/25 hover:shadow-premium"
          >
            <div className="relative h-40 overflow-hidden sm:h-52">
              <LuxuryImage
                asset={area.image}
                overlay="card"
                animate={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition duration-700 group-hover:scale-105"
              />
              <h3 className="absolute bottom-3 left-4 z-10 font-serif text-[1.25rem] font-semibold text-white drop-shadow-lg md:text-xl">
                {area.name}
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <p className="text-[14px] font-semibold text-gold">{area.headline}</p>
              <p className="mt-2 line-clamp-2 text-[15px] leading-[1.65] text-white/75">
                {area.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {area.highlights.slice(0, 2).map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[13px] text-white/70"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center md:mt-7">
        <button
          type="button"
          onClick={() => scrollToId("qualify")}
          className="text-[15px] font-semibold text-gold hover:underline"
        >
          Match me with opportunities →
        </button>
      </div>
    </Section>
  );
}
