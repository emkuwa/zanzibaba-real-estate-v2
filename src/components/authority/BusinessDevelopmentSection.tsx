"use client";

import { BUSINESS_DEVELOPMENT, TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { InternalTopicLinks } from "./TopicClusterHub";

export function BusinessDevelopmentSection() {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === "business")!;

  return (
    <Section id="business" dark className="py-8 md:py-12">
      <SectionHeader
        eyebrow={BUSINESS_DEVELOPMENT.eyebrow}
        title={BUSINESS_DEVELOPMENT.title}
        description={BUSINESS_DEVELOPMENT.intro}
        light
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {BUSINESS_DEVELOPMENT.sectors.map((sector) => (
          <article
            key={sector.title}
            className="luxury-card-dark group overflow-hidden p-0 hover:border-gold/25"
          >
            <div className="relative h-36 overflow-hidden">
              <LuxuryImage asset={sector.image} overlay="card" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-serif text-[1.125rem] font-semibold text-white">{sector.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{sector.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => scrollToId("qualify")}
          className="rounded-full bg-gold px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-gold-light"
        >
          Discuss Business Opportunities →
        </button>
      </div>

      <InternalTopicLinks links={cluster.related} label="Related investment topics" />
    </Section>
  );
}
