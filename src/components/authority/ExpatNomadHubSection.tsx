"use client";

import { EXPAT_NOMAD_HUB, TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { InternalTopicLinks } from "./TopicClusterHub";

export function ExpatNomadHubSection() {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === "relocation")!;

  return (
    <Section id="expat-hub" className="bg-surface py-7 md:py-10">
      <SectionHeader
        eyebrow={EXPAT_NOMAD_HUB.eyebrow}
        title={EXPAT_NOMAD_HUB.title}
        description={EXPAT_NOMAD_HUB.intro}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {EXPAT_NOMAD_HUB.topics.map((topic) => (
          <article
            key={topic.title}
            className="luxury-card group overflow-hidden p-0 hover:shadow-premium"
          >
            <div className="relative h-36 overflow-hidden">
              <LuxuryImage
                asset={topic.image}
                overlay="minimal"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-serif text-[1.125rem] font-semibold text-navy-heading">
                {topic.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{topic.description}</p>
              <button
                type="button"
                onClick={() => scrollToId(topic.href.replace("#", ""))}
                className="mt-3 text-[14px] font-semibold text-gold hover:underline"
              >
                Learn more →
              </button>
            </div>
          </article>
        ))}
      </div>

      <InternalTopicLinks links={cluster.related} />
    </Section>
  );
}
