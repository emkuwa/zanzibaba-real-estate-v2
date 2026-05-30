import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { OPPORTUNITIES } from "@/ecosystem/data/opportunities";
import { getDeveloperById } from "@/ecosystem/data/developers";
import { opportunityImagePath } from "@/lib/ecosystem/utils";
import { ProductJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OPPORTUNITIES.map((opp) => ({
    slug: opp.slug,
  }));
}

function getOpportunityBySlug(slug: string) {
  return OPPORTUNITIES.find((o) => o.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const opp = getOpportunityBySlug(slug);
  if (!opp) return {};

  const url = `${SITE.url}/opportunities/${opp.slug}`;

  return {
    title: `${opp.title} — Zanzibar Investment Opportunity | Zanzibaba`,
    description: opp.description,
    alternates: { canonical: url },
    keywords: [
      ...opp.tags.map((t) => `${t} Zanzibar property`),
      `${opp.area} ${opp.type}`,
      `buy ${opp.type} Zanzibar`,
      `Zanzibar investment opportunity ${opp.area}`,
    ],
    openGraph: {
      title: `${opp.title} — From ${opp.priceFrom}`,
      description: opp.description,
      url,
      type: "website",
      images: [
        {
          url: `${SITE.url}${opportunityImagePath(opp.imageKey)}`,
          alt: opp.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${opp.title} — From ${opp.priceFrom}`,
      description: opp.description,
      images: [`${SITE.url}${opportunityImagePath(opp.imageKey)}`],
    },
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const opp = getOpportunityBySlug(slug);
  if (!opp) notFound();

  const canonicalUrl = `${SITE.url}/opportunities/${opp.slug}`;
  const developer = opp.developerId ? getDeveloperById(opp.developerId) : null;

  const statusColors: Record<string, string> = {
    available: "bg-green-100 text-green-800",
    reserved: "bg-yellow-100 text-yellow-800",
    "under-offer": "bg-orange-100 text-orange-800",
  };

  return (
    <>
      <ProductJsonLd
        name={opp.title}
        description={opp.description}
        imageUrl={`${SITE.url}${opportunityImagePath(opp.imageKey)}`}
        price={opp.priceFrom === "On Request" ? undefined : opp.priceFrom}
        url={canonicalUrl}
      />

      <main className="min-h-screen bg-white">
        {/* Hero image */}
        <header className="relative">
          <div className="relative h-64 md:h-80 lg:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opportunityImagePath(opp.imageKey)}
              alt={opp.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/opportunities"
                className="text-[14px] font-medium text-gold hover:underline"
              >
                ← Back to Opportunities
              </Link>

              <nav aria-label="Breadcrumb" className="mt-2">
                <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
                  <li>
                    <Link href="/" className="hover:text-gold">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/opportunities" className="hover:text-gold">Opportunities</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="truncate text-white/80 max-w-[200px]" aria-current="page">
                    {opp.title}
                  </li>
                </ol>
              </nav>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gold/20 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-gold">
                  {opp.type}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wider ${
                    statusColors[opp.status] ?? "bg-gray-100 text-gray-800"
                  }`}
                >
                  {opp.status.replace("-", " ")}
                </span>
              </div>

              <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-white md:text-[2.25rem] lg:text-3xl">
                {opp.title}
              </h1>
              <p className="mt-1 text-[15px] text-white/70">{opp.location}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="font-serif text-xl font-semibold text-navy-heading">
                  Overview
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  {opp.description}
                </p>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="font-serif text-xl font-semibold text-navy-heading">
                  Investment Highlights
                </h2>
                <ul className="mt-3 space-y-2">
                  {opp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-[15px] text-body"
                    >
                      <span className="mt-0.5 text-gold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tags */}
              <section>
                <h2 className="font-serif text-xl font-semibold text-navy-heading">
                  Tags & Categories
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-[13px] text-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Developer */}
              {developer && (
                <section className="rounded-luxury border border-border bg-surface p-5">
                  <h2 className="font-serif text-lg font-semibold text-navy-heading">
                    Developer
                  </h2>
                  <p className="mt-2 font-semibold text-navy-heading">
                    {developer.name}
                  </p>
                  <p className="mt-1 text-[14px] text-body">{developer.description}</p>
                  <Link
                    href={`/developers/${developer.slug}`}
                    className="mt-3 inline-block text-[14px] font-semibold text-gold hover:underline"
                  >
                    View developer profile →
                  </Link>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Pricing card */}
              <div className="rounded-luxury border border-border bg-surface p-5">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">
                  Price
                </p>
                <p className="mt-1 font-serif text-[1.5rem] font-semibold text-navy-heading">
                  {opp.priceFrom}
                </p>

                {opp.roiEstimate && (
                  <>
                    <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-muted">
                      ROI Estimate
                    </p>
                    <p className="mt-1 text-[15px] font-medium text-gold">
                      {opp.roiEstimate}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      *Indicative estimate — subject to market conditions and management
                      quality
                    </p>
                  </>
                )}

                <Link
                  href="/#qualify"
                  className="mt-5 block rounded-full bg-gold py-3 text-center text-[14px] font-semibold text-white transition hover:bg-gold-light"
                >
                  Enquire About This Property
                </Link>
                <p className="mt-2 text-center text-[12px] text-muted">
                  Our advisory team will respond within 24 hours
                </p>
              </div>

              {/* Quick facts */}
              <div className="rounded-luxury border border-border p-5">
                <h3 className="font-semibold text-navy-heading">Quick Facts</h3>
                <dl className="mt-3 space-y-3">
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-wider text-muted">
                      Location
                    </dt>
                    <dd className="text-[14px] text-body">{opp.location}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-wider text-muted">
                      Area
                    </dt>
                    <dd className="text-[14px] text-body">{opp.area}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-wider text-muted">
                      Type
                    </dt>
                    <dd className="capitalize text-[14px] text-body">{opp.type}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold uppercase tracking-wider text-muted">
                      Status
                    </dt>
                    <dd className="capitalize text-[14px] text-body">
                      {opp.status.replace("-", " ")}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="rounded-luxury bg-navy-deep p-5 text-white">
                <h3 className="font-serif text-lg font-semibold">
                  Not quite right?
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                  Tell us your preferences and we&apos;ll match you with the perfect
                  opportunity.
                </p>
                <Link
                  href="/#qualify"
                  className="mt-4 block rounded-full border border-white/20 px-4 py-2.5 text-center text-[14px] font-semibold text-white transition hover:border-gold/40 hover:text-gold"
                >
                  Get Personalized Matches
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
