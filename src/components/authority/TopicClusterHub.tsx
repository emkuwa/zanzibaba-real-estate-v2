"use client";

import { TOPIC_CLUSTERS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { scrollToId } from "@/lib/utils";

export function TopicClusterHub() {
  return (
    <Section id="discover" className="border-b border-border/60 bg-white py-7 md:py-10">
      <SectionHeader
        eyebrow="Zanzibar Authority Hub"
        title="Your definitive guide to Zanzibar"
        description="Real estate, tourism, investment, relocation, and business — one premium ecosystem for foreigners researching Zanzibar online."
        align="center"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {TOPIC_CLUSTERS.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            onClick={() => scrollToId(cluster.href.replace("#", ""))}
            className="group rounded-luxury-lg border border-border/70 bg-surface/50 p-4 text-left transition hover:border-gold/40 hover:bg-white hover:shadow-luxury md:p-5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
              {cluster.tagline}
            </span>
            <h3 className="mt-1.5 font-serif text-[1.125rem] font-semibold text-navy-heading group-hover:text-navy md:text-xl">
              {cluster.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-body">
              {cluster.keywords.slice(0, 3).join(" · ")}
            </p>
          </button>
        ))}
      </div>
    </Section>
  );
}

export function InternalTopicLinks({
  links,
  label = "Related topics",
}: {
  links: readonly string[];
  label?: string;
}) {
  return (
    <nav aria-label={label} className="mt-5 flex flex-wrap gap-2">
      <span className="w-full text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      {links.map((href) => {
        const id = href.replace("#", "");
        const labelText = id.replace(/-/g, " ");
        return (
          <button
            key={href}
            type="button"
            onClick={() => scrollToId(id)}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-navy-heading capitalize transition hover:border-gold/50 hover:text-gold"
          >
            {labelText}
          </button>
        );
      })}
    </nav>
  );
}
