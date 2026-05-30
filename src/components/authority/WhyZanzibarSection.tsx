"use client";

import { WHY_ZANZIBAR } from "@/data/authority";
import { TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { InternalTopicLinks } from "./TopicClusterHub";

export function WhyZanzibarSection() {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === "tourism")!;

  return (
    <Section id="why-zanzibar" className="bg-surface py-7 md:py-10">
      <SectionHeader
        eyebrow={WHY_ZANZIBAR.eyebrow}
        title={WHY_ZANZIBAR.title}
        description={WHY_ZANZIBAR.intro}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {WHY_ZANZIBAR.pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="luxury-card group overflow-hidden p-0 hover:shadow-premium"
          >
            <div className="relative h-36 overflow-hidden sm:h-40">
              <LuxuryImage
                asset={pillar.image}
                overlay="minimal"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-serif text-[1.125rem] font-semibold text-navy-heading md:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-body">{pillar.description}</p>
            </div>
          </article>
        ))}
      </div>

      <InternalTopicLinks links={cluster.related} label="Explore Zanzibar topics" />
    </Section>
  );
}
