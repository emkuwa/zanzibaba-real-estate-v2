import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { SITE, BOOK_CALL_URL, whatsappUrl } from "@/data/site";
import { COUNTRY_PAGES, type CountryPage } from "@/data/country-pages";
import { AREA_GUIDES } from "@/data/authority/area-guides";
import { OPPORTUNITIES } from "@/ecosystem/data/opportunities";
import { opportunityImagePath } from "@/lib/ecosystem/utils";
import { ROI_HIGHLIGHTS } from "@/data/seo-content";
import trustMetrics from "@/data/trust-metrics.json";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface Props {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return Object.keys(COUNTRY_PAGES).map((country) => ({ country }));
}

function getCountry(slug: string): CountryPage | undefined {
  return COUNTRY_PAGES[slug];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const c = getCountry(slug);
  if (!c) return {};

  const url = `${SITE.url}/for/${c.slug}`;
  const title = `${c.hero.title} | Zanzibar Property for ${c.name} Investors`;
  const description = `${c.hero.subtitle} Curated Zanzibar property investment opportunities for ${c.name} investors: beachfront villas, off-plan developments, heritage apartments, and hospitality assets. Foreign-buyer advisory with offices in Paje and Stone Town.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      "Zanzibar property investment",
      "Zanzibar property for sale",
      `Invest in Zanzibar from ${c.name}`,
      "Zanzibar real estate investment",
      "Zanzibar beachfront property",
      `${c.name} Zanzibar property`,
      `buy property Zanzibar ${c.region}`,
      "Zanzibar investment property",
      "Zanzibar villas for sale",
      "Zanzibar land for sale",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function buildBreadcrumbSchema(c: CountryPage) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "For Investors", item: `${SITE.url}/#qualify` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${c.name} Investors`,
        item: `${SITE.url}/for/${c.slug}`,
      },
    ],
  };
}

function buildServiceSchema(c: CountryPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Zanzibar Property Investment Advisory for ${c.name} Investors`,
    serviceType: "Real Estate Investment Advisory",
    provider: {
      "@type": "RealEstateAgent",
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      telephone: SITE.phoneTel,
      email: SITE.email,
      areaServed: [
        { "@type": "Place", name: "Zanzibar, Tanzania" },
        { "@type": "Country", name: c.name },
      ],
    },
    areaServed: { "@type": "Country", name: c.name },
    description: `Foreign-buyer property investment advisory in Zanzibar for ${c.name} investors: title verification, due diligence, developer vetting, residency pathways, and acquisition support.`,
  };
}

function buildFaqSchema(c: CountryPage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const c = getCountry(slug);
  if (!c) notFound();

  const canonicalUrl = `${SITE.url}/for/${c.slug}`;
  const popularAreaGuides = c.popularAreas
    .map((pa) => AREA_GUIDES.find((a) => a.slug === pa.slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const relatedOpportunities = OPPORTUNITIES.filter((o) =>
    c.popularAreas.some((pa) => pa.slug === o.area.toLowerCase())
  ).slice(0, 4);
  const breadcrumbSchema = buildBreadcrumbSchema(c);
  const serviceSchema = buildServiceSchema(c);
  const faqSchema = buildFaqSchema(c);
  const founder = trustMetrics.founder;
  const whatsappHref = whatsappUrl(
    `Hello Emmanuel, I am a ${c.name} investor interested in Zanzibar property. Please send me a brief.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />
      <main className="bg-white">
        <header className="relative overflow-hidden border-b border-border bg-navy-deep text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep opacity-95" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <Breadcrumb
              variant="on-dark"
              crumbs={[
                { label: "Home", href: "/" },
                { label: "For Investors", href: "/#qualify" },
                { label: `${c.name} Investors`, href: `/for/${c.slug}` },
              ]}
            />
            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
              {c.hero.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[2rem] font-semibold leading-[1.1] md:text-5xl">
              {c.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-white/85 md:text-lg">
              {c.hero.subtitle}
            </p>

            <dl className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Flight time", value: c.flightTime },
                { label: "Time zone", value: c.timeZone },
                { label: "Currency", value: c.currency },
                { label: "Region", value: c.region },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-luxury border border-white/15 bg-white/[0.04] p-3.5"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/80">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[13px] font-medium text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#1ebe57]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382a.68.68 0 0 1-.33.22c-.27.09-.57.14-.86.14-.78 0-1.46-.3-2.05-.66-.96-.58-2.031-1.58-3.171-2.72-1.14-1.14-2.14-2.21-2.72-3.17-.36-.59-.66-1.27-.66-2.05 0-.29.05-.59.14-.86a.68.68 0 0 1 .22-.33c.15-.16.34-.24.54-.24h.74c.2 0 .4.09.51.25.27.4.65 1.12.89 1.68a.48.48 0 0 1-.07.49c-.12.16-.27.35-.42.51l-.28.28c.22.58.7 1.19 1.24 1.73s1.15 1.02 1.73 1.24l.28-.28c.16-.15.35-.3.51-.42a.48.48 0 0 1 .49-.07c.56.24 1.28.62 1.68.89.16.11.25.31.25.51v.74c0 .2-.08.39-.24.54z" />
                  <path d="M12.004 1.998c-5.514 0-10 4.486-10 10 0 1.878.52 3.633 1.412 5.132l-1.404 4.686 4.87-1.402a9.95 9.95 0 0 0 5.122 1.584c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.367a8.35 8.35 0 0 1-4.272-1.18l-.306-.183-3.003.866.877-2.936-.2-.321a8.353 8.353 0 0 1-1.294-4.596c0-4.63 3.767-8.397 8.397-8.397s8.397 3.767 8.397 8.397-3.767 8.397-8.397 8.397z" />
                </svg>
                WhatsApp us
              </a>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-gold-light"
              >
                Book Consultation
              </a>
              <Link
                href="/#qualify"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-[15px] font-semibold text-white transition hover:border-gold hover:text-gold"
              >
                Get investment brief
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Why {c.name} investors choose Zanzibar
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              A premium Indian Ocean market — practical from {c.name}
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body">
              {c.fxNote} {c.timeZoneNote}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {c.whyChoose.map((w) => (
                <article key={w.title} className="luxury-card p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-heading">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-body">
                    {w.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Property investment opportunities
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Curated for {c.name} investors
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {c.propertyTypes.map((p) => {
                const area = p.areaSlug
                  ? AREA_GUIDES.find((a) => a.slug === p.areaSlug)
                  : undefined;
                return (
                  <article
                    key={p.title}
                    className="luxury-card flex flex-col p-5"
                  >
                    <h3 className="font-serif text-lg font-semibold text-navy-heading">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body">
                      {p.description}
                    </p>
                    {area && (
                      <Link
                        href={`/areas/${area.slug}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-gold hover:underline"
                      >
                        Explore {area.name} property →
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Rental income potential
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              How Zanzibar rental income works
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {ROI_HIGHLIGHTS.map((roi) => (
                <div
                  key={roi.label}
                  className="luxury-card px-4 py-5 text-center"
                >
                  <p className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                    {roi.value}
                    {roi.suffix}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-navy-heading">
                    {roi.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">{roi.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-body">
              {c.rentalIncome.description}
            </p>
          </section>

          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Lifestyle & relocation
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Beyond the investment
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.lifestyle.map((l) => (
                <article key={l.title} className="luxury-card p-5">
                  <h3 className="font-serif text-lg font-semibold text-navy-heading">
                    {l.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-body">
                    {l.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {relatedOpportunities.length > 0 && (
            <section className="mb-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Live opportunities
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                Available Zanzibar properties right now
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedOpportunities.map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/opportunities/${opp.slug}`}
                    className="luxury-card group block overflow-hidden p-0 transition hover:shadow-premium"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={opportunityImagePath(opp.imageKey)}
                        alt={opp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {opp.status.replace("-", " ")}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">
                        {opp.type} · {opp.area}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-navy-heading">
                        {opp.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[14px] text-body">
                        {opp.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-serif text-base font-semibold text-navy-heading">
                          From {opp.priceFrom}
                        </p>
                        {opp.roiEstimate && (
                          <p className="text-[12px] font-medium text-gold">
                            {opp.roiEstimate}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-[14px] text-muted">
                Not the right fit?{" "}
                <Link
                  href="/opportunities"
                  className="font-semibold text-gold hover:underline"
                >
                  Browse all {OPPORTUNITIES.length} opportunities →
                </Link>
              </p>
            </section>
          )}

          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Popular investment areas
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Where {c.name} investors buy in Zanzibar
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularAreaGuides.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="luxury-card group block p-5 transition hover:shadow-premium"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">
                    {a.name}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-navy-heading">
                    {c.popularAreas.find((pa) => pa.slug === a.slug)?.angle}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-body">
                    {a.description}
                  </p>
                  <span className="mt-3 inline-block text-[13px] font-semibold text-gold group-hover:underline">
                    Read {a.name} investor guide →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Meet the founder
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Speak directly with Emmanuel Mkuwa
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body">
              Founder-led advisory for {c.name} investors. Every enquiry is handled by the
              person who built the business.
            </p>
            <div className="mt-6 max-w-3xl">
              <article className="luxury-card flex flex-col overflow-hidden p-0 md:flex-row">
                <div className="relative flex w-full shrink-0 items-center justify-center bg-surface p-8 sm:p-10 md:h-auto md:min-h-[24rem] md:w-64 md:p-6 lg:w-72">
                  {founder.photo ? (
                    <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full ring-[4px] ring-gold/60 shadow-luxury sm:h-72 sm:w-72 md:h-56 md:w-56 md:ring-2 lg:h-64 lg:w-64">
                      <Image
                        src={founder.photo}
                        alt={founder.name}
                        fill
                        sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 224px"
                        className="object-cover object-[center_30%]"
                        priority
                      />
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                    {founder.role}
                  </p>
                  <h3 className="mt-1.5 font-serif text-[1.625rem] font-semibold leading-tight text-navy-heading md:text-2xl">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-navy-heading">
                    {founder.company}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.7] text-body">
                    {founder.bio}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1ebe57]"
                    >
                      WhatsApp Emmanuel
                    </a>
                    <a
                      href={BOOK_CALL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-gold-light"
                    >
                      Book Consultation
                    </a>
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-heading px-5 py-2.5 text-[14px] font-semibold text-navy-heading transition hover:bg-navy-heading hover:text-white"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              {c.name} investor FAQ
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Common questions from {c.name} buyers
            </h2>
            <div className="mt-5 space-y-3">
              {c.faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-luxury border border-border bg-white shadow-luxury"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
                    <h3 className="font-serif text-[17px] font-semibold leading-snug text-navy-heading md:text-lg">
                      {f.question}
                    </h3>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-xl font-light text-gold ring-1 ring-gold/20 transition group-open:bg-gold group-open:text-white">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-border/60 px-5 pb-5 pt-3 text-[15px] leading-[1.75] text-body md:px-6 md:pb-6 md:pt-4">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-luxury-lg bg-navy-deep p-6 text-center md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
              Ready to invest in Zanzibar from {c.name}?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">
              Tell us your budget and timeline. We&apos;ll send a curated Zanzibar brief
              within 24 hours — areas, budget fit, ROI, and next steps.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1ebe57]"
              >
                WhatsApp us
              </a>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
              >
                Book Consultation
              </a>
              <Link
                href="/#qualify"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3 text-[14px] font-semibold text-white transition hover:border-gold hover:text-gold"
              >
                Get matched →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
