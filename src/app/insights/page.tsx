import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT_HUB, TOPIC_CLUSTERS } from "@/data/authority";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Zanzibar Insights — Investment, Tourism & Relocation Guides",
  description:
    "SEO authority publishing from Zanzibaba — investment insights, tourism guides, area reports, market trends, and foreign ownership guides for Zanzibar.",
  alternates: { canonical: `${SITE.url}/insights` },
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
          <h2 className="font-serif text-xl font-semibold text-navy-heading">Topic clusters</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TOPIC_CLUSTERS.map((cluster) => (
              <Link
                key={cluster.id}
                href={`/${cluster.href}`}
                className="rounded-luxury border border-border p-4 transition hover:border-gold/40 hover:shadow-luxury"
              >
                <h3 className="font-semibold text-navy-heading">{cluster.title}</h3>
                <p className="mt-1 text-[14px] text-body">{cluster.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-navy-heading">Featured guides</h2>
          <div className="mt-4 space-y-4">
            {CONTENT_HUB.featured.map((article) => (
              <article key={article.slug} className="luxury-card p-5">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-gold">
                  {article.category}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy-heading">
                  {article.title}
                </h3>
                <p className="mt-2 text-[15px] text-body">{article.excerpt}</p>
                <Link href={article.href} className="mt-3 inline-block text-[14px] font-semibold text-gold hover:underline">
                  Read on homepage →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center text-[14px] text-muted">
          Full article publishing launches incrementally.{" "}
          <Link href="/#qualify" className="font-semibold text-gold hover:underline">
            Get matched with an advisor
          </Link>{" "}
          for personalised guidance today.
        </p>
      </div>
    </main>
  );
}
