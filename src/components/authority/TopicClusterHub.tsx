"use client";

import { TOPIC_CLUSTERS } from "@/data/authority";
import { ARTICLES } from "@/data/articles";
import { Section, SectionHeader } from "@/components/ui/Section";
import { scrollToId } from "@/lib/utils";
import Link from "next/link";

export function TopicClusterHub() {
  return (
    <Section id="discover" className="border-b border-border/60 py-7 md:py-10">
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

      {/* Internal links to featured articles */}
      <div className="mt-6 border-t border-border/40 pt-6">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
          Featured articles
        </span>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="rounded-luxury border border-border/70 p-3 text-left transition hover:border-gold/40 hover:shadow-sm"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                {article.category}
              </span>
              <h4 className="mt-1 font-serif text-[14px] font-semibold text-navy-heading line-clamp-2">
                {article.title}
              </h4>
            </Link>
          ))}
        </div>
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
