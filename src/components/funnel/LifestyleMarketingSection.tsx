"use client";

import { LIFESTYLE_MARKETING } from "@/data/seo-content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LifestyleMarketingSection() {
  return (
    <Section id="lifestyle" className="bg-white py-7 md:py-10">
      <SectionHeader
        eyebrow="Tropical Lifestyle"
        title="Live the Zanzibar dream — invest, own, or rent"
        description="Oceanfront mornings, sunset dining, wellness, and freedom — the emotional lifestyle that draws investors, expats, and luxury travellers to Zanzibar."
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {LIFESTYLE_MARKETING.map((item, i) => (
          <article
            key={item.title}
            className={cn(
              "group overflow-hidden rounded-luxury-lg border border-border/60 bg-white shadow-card",
              i === 0 && "sm:col-span-2 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0"
            )}
          >
            <div
              className={cn(
                "relative aspect-[16/10] overflow-hidden",
                i === 0 && "lg:aspect-auto lg:min-h-[240px]"
              )}
            >
              <LuxuryImage
                asset={item.image}
                overlay="minimal"
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 768px) 100vw, 33vw"}
                className="transition duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className={cn("p-5 md:p-6", i === 0 && "lg:flex lg:flex-col lg:justify-center")}>
              <h3 className="font-serif text-[1.25rem] font-semibold text-navy-heading md:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => scrollToId("qualify")}
          className="rounded-full bg-navy px-8 py-3.5 text-[15px] font-semibold text-white shadow-luxury transition hover:bg-navy-deep"
        >
          Get Matched With Properties →
        </button>
      </div>
    </Section>
  );
}
