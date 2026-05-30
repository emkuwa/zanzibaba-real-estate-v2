"use client";

import { TOURISM_LIFESTYLE, TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { InternalTopicLinks } from "./TopicClusterHub";

export function TourismLifestyleSection() {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === "tourism")!;

  return (
    <Section id="tourism" className="bg-white py-7 md:py-10">
      <SectionHeader
        eyebrow={TOURISM_LIFESTYLE.eyebrow}
        title={TOURISM_LIFESTYLE.title}
        description={TOURISM_LIFESTYLE.intro}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {TOURISM_LIFESTYLE.categories.map((cat) => (
          <article
            key={cat.title}
            className="luxury-card group overflow-hidden p-0 hover:shadow-premium"
          >
            <div className="relative h-36 overflow-hidden">
              <LuxuryImage
                asset={cat.image}
                overlay="minimal"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-serif text-[1.125rem] font-semibold text-navy-heading">
                {cat.title}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-body">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <InternalTopicLinks links={cluster.related} />
    </Section>
  );
}
