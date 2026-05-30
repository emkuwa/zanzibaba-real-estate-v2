import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT_HUB, TOPIC_CLUSTERS } from "@/data/authority";
import { ARTICLES, ARTICLE_CATEGORIES } from "@/data/articles";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Zanzibar Insights & Guides — Investment, Tourism & Relocation",
  description:
    "Expert Zanzibar insights and guides: real estate investment tips, tourism guides, area reports, market trends, foreign ownership information, and relocation advice for international audiences.",
  alternates: { canonical: `${SITE.url}/insights` },
  openGraph: {
    title: "Zanzibar Insights — Expert Guides for Investors, Tourists & Expats",
    description:
      "Comprehensive Zanzibar guides covering real estate investment, tourism destinations, expat relocation, digital nomad living, and market intelligence from the Zanzibaba advisory team.",
  },
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-border bg-navy-deep px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="text-[14px] font-medium text-gold hover:underline">
            ← Back to Zanzibaba Authority Hub
          </Link>
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
            {CONTENT_HUB.eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-[2rem] font-semibold md:text-4xl">
            {CONTENT_HUB.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/80">
            {CONTENT_HUB.intro}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-navy-heading">Content categories</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/insights?category=${encodeURIComponent(cat.id)}`}
                className="rounded-luxury border border-border p-4 transition hover:border-gold/40 hover:shadow-luxury"
              >
                <h3 className="font-semibold text-navy-heading">{cat.id}</h3>
                <p className="mt-1 text-[14px] text-body">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-navy-heading">Topic clusters</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {TOPIC_CLUSTERS.map((cluster) => (
              <Link
                key={cluster.id}
                href={`/${cluster.href}`}
                className="rounded-full border border-border px-4 py-2 text-[14px] font-medium text-body transition hover:border-gold/40 hover:text-gold"
              >
                {cluster.title}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-navy-heading">Articles & guides</h2>
          <div className="mt-4 space-y-5">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="block luxury-card p-5 transition hover:shadow-premium hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold">
                    {article.category}
                  </span>
                  <span className="text-[12px] text-muted">{article.readingTime}</span>
                  {article.featured && (
                    <span className="rounded-full bg-navy-deep/10 px-2.5 py-0.5 text-[11px] font-semibold text-navy-deep">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy-heading group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {article.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full border border-border bg-white px-2 py-0.5 text-[11px] text-muted"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <span className="mt-3 inline-block text-[14px] font-semibold text-gold">
                  Read full article →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-luxury-lg bg-navy-deep p-6 text-white md:p-8">
          <h2 className="font-serif text-xl font-semibold md:text-2xl">
            Ready to invest in Zanzibar?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">
            Our advisory team matches international investors with verified
            opportunities aligned to your budget, timeline, and investment goals.
            Get personalized recommendations, browse current listings, or start
            your investment journey today.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#qualify"
              className="rounded-full bg-gold px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
            >
              Get Personalized Recommendations
            </Link>
            <Link
              href="/opportunities"
              className="rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white/90 transition hover:border-gold/40 hover:text-gold"
            >
              Browse Opportunities
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
