import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, BOOK_CALL_URL } from "@/data/site";
import {
  DEVELOPERS,
  DEVELOPER_PROJECTS,
  getProjectsByDeveloper,
} from "@/ecosystem/data/developers";
import { opportunityImagePath } from "@/lib/ecosystem/utils";
import { ProductJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEVELOPERS.map((dev) => ({
    slug: dev.slug,
  }));
}

function getDeveloperBySlug(slug: string) {
  return DEVELOPERS.find((d) => d.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dev = getDeveloperBySlug(slug);
  if (!dev) return {};

  const url = `${SITE.url}/developers/${dev.slug}`;

  return {
    title: `${dev.name} — Verified Zanzibar Developer | Zanzibaba`,
    description: dev.description,
    alternates: { canonical: url },
    keywords: [
      ...dev.specialties,
      ...dev.areas.map((a) => `${a} developer Zanzibar`),
      "Zanzibar property developer",
      "verified developer Zanzibar",
    ],
    openGraph: {
      title: `${dev.name} — ${dev.tagline}`,
      description: dev.description,
      url,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dev.name} — ${dev.tagline}`,
      description: dev.description,
    },
  };
}

export default async function DeveloperDetailPage({ params }: Props) {
  const { slug } = await params;
  const dev = getDeveloperBySlug(slug);
  if (!dev) notFound();

  const projects = getProjectsByDeveloper(dev.id);
  const canonicalUrl = `${SITE.url}/developers/${dev.slug}`;

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateDeveloper",
            name: dev.name,
            description: dev.description,
            url: canonicalUrl,
            knowsAbout: dev.specialties,
            areaServed: dev.areas.map((a) => ({
              "@type": "Place",
              name: `${a}, Zanzibar, Tanzania`,
            })),
          }),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-border bg-navy-deep px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/developers"
              className="text-[14px] font-medium text-gold hover:underline"
            >
              ← Back to Developer Portal
            </Link>

            <nav aria-label="Breadcrumb" className="mt-3">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
                <li>
                  <Link href="/" className="hover:text-gold">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/developers" className="hover:text-gold">Developers</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="truncate text-white/80 max-w-[200px]" aria-current="page">
                  {dev.name}
                </li>
              </ol>
            </nav>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-gold/20 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-gold">
                  {dev.verified ? "✓ Verified Developer" : "Developer"}
                </span>
                <h1 className="mt-3 font-serif text-[2rem] font-semibold md:text-3xl">
                  {dev.name}
                </h1>
                <p className="mt-1 text-[16px] font-medium text-gold">{dev.tagline}</p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">
                  {dev.description}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {dev.areas.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/80"
                >
                  {a}
                </span>
              ))}
              {dev.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-gold/15 px-3 py-1 text-[12px] text-gold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Projects */}
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <section>
            <h2 className="font-serif text-xl font-semibold text-navy-heading">
              Projects & Portfolio
            </h2>
            <p className="mt-2 text-[15px] text-body">
              {projects.length} {projects.length === 1 ? "project" : "projects"} by{" "}
              {dev.name}
            </p>

            {projects.length === 0 ? (
              <p className="mt-6 text-[15px] text-muted">
                No active projects listed. Contact the developer directly for current
                opportunities.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="overflow-hidden rounded-luxury border border-border/70"
                  >
                    <div className="relative h-52">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={opportunityImagePath(proj.gallery[0] ?? "villa-luxury")}
                        alt={proj.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold">
                          {proj.type}
                        </span>
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted">
                          {proj.status}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-lg font-semibold text-navy-heading">
                        {proj.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-muted">{proj.location}</p>
                      <p className="mt-2 text-[14px] text-body line-clamp-2">
                        {proj.description}
                      </p>
                      <div className="mt-3">
                        <p className="font-semibold text-navy-heading">
                          From {proj.priceFrom}
                        </p>
                        {proj.roiEstimate && (
                          <p className="text-[13px] text-gold">{proj.roiEstimate}</p>
                        )}
                      </div>

                      {/* Investor fit */}
                      <div className="mt-4">
                        <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">
                          Best for
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {proj.investorFit.map((fit) => (
                            <span
                              key={fit}
                              className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] text-body"
                            >
                              {fit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mt-3 space-y-1">
                        {proj.highlights.map((h) => (
                          <p key={h} className="text-[13px] text-body">
                            ✓ {h}
                          </p>
                        ))}
                      </div>

                      <Link
                        href="/#qualify"
                        className="mt-4 inline-block rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-gold-light"
                      >
                        Request Investor Briefing
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-luxury-lg bg-navy-deep p-6 text-white md:p-8">
            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              Interested in {dev.name} projects?
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/75">
              Our advisory team coordinates investor introductions, project briefings,
              and site visits. Get matched with the right opportunity.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/#qualify"
                className="rounded-full bg-gold px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
              >
                Get Personalized Recommendations
              </Link>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-gold px-6 py-3 text-[14px] font-semibold text-gold transition hover:bg-gold hover:text-white"
              >
                Book a 30-min Call
              </a>
              <Link
                href="/opportunities"
                className="rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white/90 transition hover:border-gold/40 hover:text-gold"
              >
                Browse All Opportunities
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
