"use client";

import { LIFESTYLE_GALLERY } from "@/data/visual-system";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { cn } from "@/lib/utils";

export function LifestyleGallerySection() {
  return (
    <Section className="bg-navy-deep py-8 text-white md:py-12">
      <SectionHeader
        eyebrow="The Zanzibar Lifestyle"
        title="Where luxury living meets investment & rental demand"
        description="International investors, expats, digital nomads, and luxury travellers — the lifestyle that defines Zanzibar property."
        light
      />

      <div
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          "scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-5"
        )}
      >
        {LIFESTYLE_GALLERY.map((asset) => (
          <figure
            key={asset.src}
            className={cn(
              "group relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden rounded-luxury-lg shadow-premium ring-1 ring-white/10",
              "sm:w-auto sm:shrink sm:aspect-[4/5]"
            )}
          >
            <LuxuryImage
              asset={asset}
              overlay="minimal"
              animate={false}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
              className="transition duration-700 group-hover:scale-105"
            />
            <figcaption className="sr-only">{asset.alt}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
