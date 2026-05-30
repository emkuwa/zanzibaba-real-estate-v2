import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { INTELLIGENCE_FEED, INTELLIGENCE_CATEGORIES } from "@/ecosystem/data/intelligence";

export const metadata: Metadata = {
  title: "Zanzibar Intelligence Hub — Market Reports & Investment News",
  description:
    "Stay informed with Zanzibar investment intelligence: market reports, infrastructure project updates, area growth insights, and investment news for international real estate investors.",
  alternates: { canonical: `${SITE.url}/intelligence` },
  openGraph: {
    title: "Zanzibar Intelligence Hub — Market Reports for Property Investors",
    description:
      "Access comprehensive Zanzibar investment intelligence: market trends, infrastructure developments, area growth analysis, and property investment news curated for international buyers.",
  },
};

export default function IntelligencePage() {
  return (
    <EcosystemPageShell
      eyebrow="Intelligence Hub"
      title="Zanzibar investment intelligence"
      description="Market reports, infrastructure updates, area growth insights, and investment news — published for SEO authority and investor decision-making."
    >
      <Breadcrumb crumbs={[{ label: "Intelligence", href: "/intelligence" }]} />
      <div className="mb-8 flex flex-wrap gap-2">
        {INTELLIGENCE_CATEGORIES.map((cat) => (
          <span
            key={cat.id}
            id={cat.id === "infrastructure" ? "infrastructure" : undefined}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-navy-heading"
          >
            {cat.label}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {INTELLIGENCE_FEED.map((item) => (
          <article key={item.id} className="luxury-card p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold uppercase text-gold">
                {item.category.replace("-", " ")}
              </span>
              {item.area && (
                <span className="text-[12px] text-muted">{item.area}</span>
              )}
              <time className="text-[12px] text-muted">{item.publishedAt}</time>
            </div>
            <h2 className="mt-3 font-serif text-xl font-semibold text-navy-heading">{item.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-body">{item.excerpt}</p>
            <Link href={item.href} className="mt-4 inline-block text-[14px] font-semibold text-gold hover:underline">
              Read full insight →
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-[14px] text-muted">
        Full article publishing expands via the{" "}
        <Link href="/insights" className="font-semibold text-gold hover:underline">
          Insights Hub
        </Link>
        .
      </p>
    </EcosystemPageShell>
  );
}
