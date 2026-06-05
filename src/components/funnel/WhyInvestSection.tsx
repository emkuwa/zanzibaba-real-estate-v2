"use client";

import { WHY_INVEST, ROI_HIGHLIGHTS } from "@/data/seo-content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { MotionReveal, AnimatedCounter } from "@/components/ui/MotionReveal";

export function WhyInvestSection() {
  return (
    <Section id="why-invest" className="py-7 md:py-10">
      <SectionHeader
        eyebrow={WHY_INVEST.eyebrow}
        title={WHY_INVEST.title}
        description={WHY_INVEST.intro}
      />

      <div className="mb-6 grid grid-cols-3 gap-3 md:mb-8 md:gap-4">
        {ROI_HIGHLIGHTS.map((item, i) => (
          <MotionReveal key={item.label} delay={i * 0.06}>
            <div className="luxury-card px-3 py-4 text-center md:px-5 md:py-5">
              <p className="font-serif text-[1.5rem] font-semibold text-navy-heading sm:text-2xl md:text-3xl">
                <AnimatedCounter value={parseInt(item.value, 10)} suffix={item.suffix} />
              </p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug text-navy-heading sm:text-[14px]">
                {item.label}
              </p>
              <p className="mt-1 text-[12px] text-body">{item.detail}</p>
            </div>
          </MotionReveal>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {WHY_INVEST.pillars.map((pillar, i) => (
          <MotionReveal key={pillar.title} delay={i * 0.05}>
            <article className="luxury-card group overflow-hidden p-0 hover:shadow-premium">
              <div className="relative h-44 overflow-hidden sm:h-52">
                <LuxuryImage
                  asset={pillar.image}
                  overlay="minimal"
                  animate={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-serif text-[1.125rem] font-semibold text-navy-heading md:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[15px] leading-[1.7] text-body">
                  {pillar.description}
                </p>
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
