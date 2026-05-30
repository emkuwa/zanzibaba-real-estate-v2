import Link from "next/link";
import { CONTENT_HUB } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";

export function ContentHubSection() {
  return (
    <Section id="insights" className="bg-surface py-7 md:py-10">
      <SectionHeader
        eyebrow={CONTENT_HUB.eyebrow}
        title={CONTENT_HUB.title}
        description={CONTENT_HUB.intro}
        align="center"
      />

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {CONTENT_HUB.categories.map((cat) => (
          <span
            key={cat.slug}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-navy-heading"
          >
            {cat.title}
            <span className="ml-1.5 text-muted">· {cat.count}</span>
          </span>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {CONTENT_HUB.featured.map((article) => (
          <article
            key={article.slug}
            className="luxury-card flex flex-col p-5 transition hover:shadow-premium md:p-6"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">
              {article.category}
            </span>
            <h3 className="mt-2 font-serif text-[1.25rem] font-semibold leading-snug text-navy-heading md:text-xl">
              {article.title}
            </h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{article.excerpt}</p>
            <Link
              href={article.href}
              className="mt-4 text-[14px] font-semibold text-gold hover:underline"
            >
              Read guide →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/insights"
          className="inline-flex rounded-full border border-navy/20 bg-white px-8 py-3.5 text-[15px] font-semibold text-navy transition hover:border-gold/50 hover:text-gold"
        >
          View Insights Hub →
        </Link>
      </div>
    </Section>
  );
}
