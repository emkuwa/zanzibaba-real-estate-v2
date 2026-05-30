"use client";

import { RENTAL_EXPERIENCES } from "@/data/seo-content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function RentalExperiencesSection() {
  return (
    <Section id="rentals" className="bg-surface py-7 md:py-10">
      <SectionHeader
        eyebrow="Luxury Rentals"
        title="Premium Zanzibar rental experiences"
        description="Not a booking site — a curated concierge for luxury villa rentals, expat housing, and extended tropical stays."
        align="center"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {RENTAL_EXPERIENCES.map((experience, i) => (
          <article
            key={experience.slug}
            id={experience.slug}
            className={cn(
              "group overflow-hidden rounded-luxury-lg border border-border/70 bg-white shadow-luxury",
              i === 0 && "md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0"
            )}
          >
            <div
              className={cn(
                "relative h-52 overflow-hidden sm:h-56",
                i === 0 ? "lg:h-full lg:min-h-[280px]" : "h-48 sm:h-52"
              )}
            >
              <LuxuryImage
                asset={experience.image}
                overlay="card"
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
                className="transition duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className={cn("flex flex-col justify-center p-5 md:p-6", i === 0 && "lg:p-8")}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold">
                {experience.headline}
              </p>
              <h3 className="mt-2 font-serif text-[1.375rem] font-semibold text-navy-heading md:text-2xl">
                {experience.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{experience.description}</p>
              <button
                type="button"
                onClick={() => scrollToId("qualify")}
                className="mt-5 w-fit rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-white shadow-md transition hover:bg-gold-light"
              >
                {experience.cta} →
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
