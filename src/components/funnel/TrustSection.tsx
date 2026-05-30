"use client";

import trustMetrics from "@/data/trust-metrics.json";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { StatsBar } from "@/components/funnel/StatsBar";
import { TestimonialCarousel } from "@/components/funnel/TestimonialCarousel";

export function TrustSection() {
  return (
    <>
      <Section className="border-y border-border/60 bg-surface py-8 md:py-10">
        <StatsBar />
        <p className="mt-4 text-center text-[13px] text-muted md:mt-5">
          {trustMetrics.disclaimer}
        </p>
      </Section>

      <Section id="trust">
        <SectionHeader
          eyebrow="Investor Confidence"
          title="Trusted by international buyers worldwide"
          description="Local expertise across Paje and Stone Town — international-standard advisory for diaspora investors and luxury buyers."
        />

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <MotionReveal>
            <div className="luxury-card overflow-hidden p-0">
              <div className="relative h-40 md:h-44">
                <LuxuryImage
                  asset={VISUAL_SYSTEM.lifestyle.investors}
                  overlay="minimal"
                  animate={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-serif text-[1.375rem] font-semibold text-navy md:text-2xl">
                  Local expertise, global standards
                </h3>
                <ul className="mt-4 space-y-3 md:space-y-3.5">
                  {[
                    "Title verification and due diligence coordination",
                    "Bilingual advisory for international buyers",
                    "Offices in Paje and Stone Town",
                    "WhatsApp-first for global time zones",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug text-muted md:text-[14px]">
                      <span className="mt-0.5 shrink-0 text-gold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="luxury-card bg-sand-light/50">
              <h3 className="font-serif text-[1.375rem] font-semibold text-navy md:text-2xl">
                Visit our offices
              </h3>
              <div className="mt-4 aspect-video overflow-hidden rounded-luxury bg-navy/5 md:mt-5">
                <iframe
                  title="Zanzibar map — Zanzibaba Real Estate offices"
                  src="https://maps.google.com/maps?q=Paje+Zanzibar&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-[14px] text-muted">
                East Coast Office — Paje · Town Office — Stone Town
              </p>
            </div>
          </MotionReveal>
        </div>

        <div className="mt-6 md:mt-8">
          <h3 className="mb-4 text-center font-serif text-[1.375rem] font-semibold text-navy md:mb-5 md:text-2xl">
            What our clients say
          </h3>
          <TestimonialCarousel />
        </div>
      </Section>
    </>
  );
}
