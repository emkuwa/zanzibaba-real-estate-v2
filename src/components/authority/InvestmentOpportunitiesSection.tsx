"use client";

import { INVESTMENT_OPPORTUNITIES, TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { InternalTopicLinks } from "./TopicClusterHub";

export function InvestmentOpportunitiesSection() {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === "investment")!;

  return (
    <Section id="invest" className="bg-white py-7 md:py-10">
      <SectionHeader
        eyebrow="Investment Opportunities"
        title="Invest in Zanzibar across multiple sectors"
        description="Real estate, hotels, tourism businesses, land banking, and Airbnb assets — curated for international investors and developers."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
        {INVESTMENT_OPPORTUNITIES.map((item) => (
          <article
            key={item.slug}
            className="luxury-card group overflow-hidden p-0 hover:shadow-premium"
          >
            <div className="relative h-32 overflow-hidden">
              <LuxuryImage
                asset={item.image}
                overlay="minimal"
                sizes="(max-width: 768px) 100vw, 25vw"
                className="transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-[1.0625rem] font-semibold text-navy-heading">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-body">
                {item.description}
              </p>
              <button
                type="button"
                onClick={() => scrollToId(item.href.replace("#", ""))}
                className="mt-3 text-[14px] font-semibold text-gold hover:underline"
              >
                Explore →
              </button>
            </div>
          </article>
        ))}
      </div>

      <InternalTopicLinks links={cluster.related} />
    </Section>
  );
}
