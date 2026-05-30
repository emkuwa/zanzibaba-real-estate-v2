"use client";

import { PROPERTY_TYPES, OFF_PLAN } from "@/data/seo-content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { PropertyBadge } from "@/components/ui/PropertyBadge";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";

export function PropertyTypesSection() {
  return (
    <>
      <Section id="opportunities" className="py-7 md:py-10">
        <SectionHeader
          eyebrow="Types of Properties"
          title="Curated Zanzibar investment opportunities"
          description="Luxury villas, beachfront land, and hospitality assets — verified and advisory-led for international investors."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {PROPERTY_TYPES.map((type, i) => (
            <MotionReveal key={type.slug} delay={i * 0.04}>
              <article className="luxury-card group flex h-full flex-col overflow-hidden p-0 transition-shadow hover:shadow-premium">
                <div className="relative h-48 overflow-hidden sm:h-52">
                  <LuxuryImage
                    asset={type.image}
                    overlay="minimal"
                    animate={false}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 z-10">
                    <PropertyBadge variant={type.badge} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-serif text-[1.3125rem] font-semibold leading-tight text-navy-heading md:text-xl">
                    {type.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold text-gold">
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {type.location}
                  </p>
                  <p className="mt-3 flex-1 line-clamp-2 text-[15px] leading-[1.7] text-body">
                    {type.description}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/70 pt-4">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wide text-body/70">
                        From
                      </p>
                      <span className="font-serif text-[1.25rem] font-semibold text-navy-heading">
                        {type.priceFrom.replace(/^From /, "")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToId("qualify")}
                      className="shrink-0 rounded-full bg-gold px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-gold-light"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section id="off-plan" dark className="relative overflow-hidden py-7 md:py-10">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <LuxuryImage
            asset={OFF_PLAN.image}
            overlay="dark"
            animate={false}
            sizes="100vw"
          />
        </div>
        <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <MotionReveal>
            <p className="luxury-eyebrow">{OFF_PLAN.eyebrow}</p>
            <h2 className="mt-2 font-serif text-[1.875rem] font-semibold leading-tight md:text-4xl">
              {OFF_PLAN.title}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.7] text-white/90 md:mt-4">
              {OFF_PLAN.description}
            </p>
            <Button
              variant="gold"
              size="lg"
              className="mt-5 w-full sm:w-auto md:mt-7"
              onClick={() => scrollToId("qualify")}
            >
              Explore Off-Plan Opportunities
            </Button>
          </MotionReveal>

          <div className="relative aspect-[16/10] overflow-hidden rounded-luxury-lg shadow-premium md:aspect-[4/3] lg:h-72">
            <LuxuryImage
              asset={OFF_PLAN.image}
              overlay="minimal"
              animate={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute left-4 top-4 z-10">
              <PropertyBadge variant="investment" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2 lg:gap-4">
            {OFF_PLAN.benefits.map((benefit, i) => (
              <MotionReveal key={benefit.title} delay={i * 0.08}>
                <div className="h-full rounded-luxury-lg border border-white/15 bg-navy-deep/80 p-4 backdrop-blur-sm md:p-5">
                  <h3 className="font-serif text-[1.0625rem] font-semibold text-gold md:text-lg">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-white/90">
                    {benefit.text}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
