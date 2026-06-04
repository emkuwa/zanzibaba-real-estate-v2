"use client";

import trustMetrics from "@/data/trust-metrics.json";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { TestimonialCarousel } from "@/components/funnel/TestimonialCarousel";

export function TrustSection() {
  return (
    <>
      <Section id="trust">
        <SectionHeader
          eyebrow="Investor Confidence"
          title="Licensed advisory. Real people. Local offices."
          description="ZREB & BRELA registered, with permanent offices in Paje and Stone Town and a bilingual advisory team that closes with you — from first enquiry to keys."
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

        <div className="mt-10 md:mt-14">
          <h3 className="mb-2 text-center font-serif text-[1.375rem] font-semibold text-navy md:mb-3 md:text-2xl">
            Meet your advisory team
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-[14px] text-muted md:mb-8">
            Real advisors, on the ground in Zanzibar — speaking your language.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {trustMetrics.team.map((member) => (
              <article
                key={member.id}
                className="luxury-card flex items-start gap-4 p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-deep text-base font-semibold text-white shadow-md ring-2 ring-gold/30">
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[1.125rem] font-semibold leading-snug text-navy-heading">
                    {member.name}
                  </p>
                  <p className="text-[13px] font-semibold text-gold">
                    {member.role}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {member.specialty}
                  </p>
                  <p className="mt-2 text-[12px] font-medium text-navy-heading">
                    Speaks: {member.languages}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <h3 className="mb-4 text-center font-serif text-[1.375rem] font-semibold text-navy md:mb-5 md:text-2xl">
            What our clients say
          </h3>
          <TestimonialCarousel />
        </div>
      </Section>
    </>
  );
}
