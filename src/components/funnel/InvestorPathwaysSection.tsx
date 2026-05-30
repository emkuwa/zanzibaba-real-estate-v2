"use client";

import { INVESTOR_PATHWAY_VISUALS } from "@/data/visual-system";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function InvestorPathwaysSection() {
  return (
    <Section id="pathways" className="bg-white py-7 md:py-10">
      <SectionHeader
        eyebrow="Your Zanzibar Journey"
        title="Invest, buy, or rent luxury property"
        description="A premium concierge for investors, holiday home buyers, expats, digital nomads, and luxury travellers."
      />

      <div
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          "scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0 xl:grid-cols-3"
        )}
      >
        {INVESTOR_PATHWAY_VISUALS.map((pathway) => (
          <article
            key={pathway.id}
            className={cn(
              "group relative h-[340px] w-[88vw] shrink-0 snap-center overflow-hidden rounded-luxury-lg shadow-luxury ring-1 ring-navy/5",
              "sm:h-[360px] lg:h-[380px] lg:w-auto lg:shrink"
            )}
          >
            <LuxuryImage
              asset={pathway.image}
              overlay="none"
              sizes="(max-width: 1024px) 88vw, 33vw"
              className="transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/15" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-6">
              <span className="mb-2 inline-flex w-fit rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/25">
                {pathway.tag}
              </span>
              <span className="mb-2 inline-flex w-fit rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
                {pathway.mood}
              </span>
              <h3 className="font-serif text-[1.375rem] font-semibold leading-tight text-white drop-shadow-md md:text-2xl">
                {pathway.title}
              </h3>
              <button
                type="button"
                onClick={() => scrollToId(pathway.href.replace("#", ""))}
                className="mt-4 w-fit rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-white shadow-md transition hover:bg-gold-light"
              >
                Explore →
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
