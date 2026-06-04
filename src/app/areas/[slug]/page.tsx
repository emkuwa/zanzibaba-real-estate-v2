import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, BOOK_CALL_URL } from "@/data/site";
import { AREA_GUIDES, type AreaGuide } from "@/data/authority/area-guides";
import { AREA_FAQS } from "@/data/authority/area-faqs";
import { OPPORTUNITIES } from "@/ecosystem/data/opportunities";
import { ROI_HIGHLIGHTS } from "@/data/seo-content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

const SLUG_TITLES: Record<string, string> = {
  paje: "Paje Property for Sale & Investment | Beachfront Real Estate Zanzibar",
  nungwi: "Nungwi Luxury Villas & Beachfront Property for Sale | Zanzibar",
  kendwa: "Kendwa Beach Property for Sale | Zanzibar Real Estate Investment",
  jambiani: "Jambiani Land & Villas for Sale | Zanzibar Investment Property",
  matemwe: "Matemwe Boutique Hotels & Villas | Zanzibar Real Estate",
  kiwengwa: "Kiwengwa Resort Property & Holiday Homes | Invest in Zanzibar",
  "stone-town": "Stone Town Heritage Apartments & Property for Sale | Zanzibar",
  fumba: "Fumba Off-Plan Villas & Marina Residences | Zanzibar Investment",
};

const SLUG_DESCRIPTIONS: Record<string, string> = {
  paje:
    "Buy beachfront villas, off-plan programmes, and Airbnb-ready investment property in Paje, Zanzibar. Foreign-buyer compliant, 10–15% gross yields, vetted developers.",
  nungwi:
    "Luxury beachfront villas and resort-managed residences in Nungwi, Zanzibar. Premium pricing, capital appreciation, and HNW holiday-rental demand.",
  kendwa:
    "Boutique villas, beachfront land, and small hotels in Kendwa, Zanzibar. Premium coastal asset class for international investors and hospitality buyers.",
  jambiani:
    "Beachfront land, villa development plots, and authentic-coast investment property in Jambiani, Zanzibar. Value entry pricing for early-mover investors.",
  matemwe:
    "Boutique hotels, luxury villas, and hospitality investment in Matemwe, Zanzibar. Mnemba Atoll proximity, 10–14% gross yields, established operations.",
  kiwengwa:
    "Resort residences, family holiday homes, and hotel investment in Kiwengwa, Zanzibar. Consistent occupancy, walkable resort infrastructure.",
  "stone-town":
    "Heritage apartments, urban rental yield, and diaspora-buyer property in Stone Town, Zanzibar. UNESCO-adjacent districts, walkable Old Town.",
  fumba:
    "Off-plan villas, marina residences, and capital-growth property in Fumba Peninsula, Zanzibar. Master-planned community, milestone payments.",
};

export function generateStaticParams() {
  return AREA_GUIDES.map((a) => ({ slug: a.slug }));
}

function getAreaBySlug(slug: string): AreaGuide | undefined {
  return AREA_GUIDES.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};

  const url = `${SITE.url}/areas/${area.slug}`;
  const title = SLUG_TITLES[area.slug] ?? `${area.name} Property & Investment | Zanzibar`;
  const description =
    SLUG_DESCRIPTIONS[area.slug] ??
    `${area.headline}. ${area.description} Buy verified Zanzibar property for sale with international advisory, due diligence, and foreign-buyer guidance.`;

  return {
    title,
    description,
    keywords: [
      `${area.name} property for sale`,
      `${area.name} real estate`,
      `${area.name} Zanzibar investment`,
      `Zanzibar property for sale`,
      `Zanzibar real estate`,
      `Zanzibar investment property`,
      `Beachfront property Zanzibar`,
      `Invest in Zanzibar`,
      ...area.highlights,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: `${SITE.url}${area.image.src}`, alt: `${area.name}, Zanzibar` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}${area.image.src}`],
    },
  };
}

function buildPlaceSchema(area: AreaGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${area.name}, Zanzibar`,
    description: area.description,
    image: `${SITE.url}${area.image.src}`,
    containedInPlace: {
      "@type": "Place",
      name: "Zanzibar, Tanzania",
    },
    touristType: ["Real Estate Investors", "Luxury Travellers", "Digital Nomads", "Expats"],
    additionalProperty: [
      { "@type": "PropertyValue", name: "Lifestyle", value: area.lifestyle },
      { "@type": "PropertyValue", name: "Investment Potential", value: area.investmentPotential },
      { "@type": "PropertyValue", name: "Rental Demand", value: area.rentalDemand },
      { "@type": "PropertyValue", name: "Beach Quality", value: area.beachQuality },
    ].map((p) => ({
      ...p,
      "@type": "PropertyValue",
    })),
  };
}

function buildBreadcrumbSchema(area: AreaGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Areas", item: `${SITE.url}/#areas` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${area.name} Property`,
        item: `${SITE.url}/areas/${area.slug}`,
      },
    ],
  };
}

function buildFaqSchema(area: AreaGuide) {
  const faqs = AREA_FAQS[area.slug] ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function buildServiceSchema(area: AreaGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${area.name} Property Investment Advisory`,
    serviceType: "Real Estate Investment Advisory",
    provider: {
      "@type": "RealEstateAgent",
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      telephone: SITE.phoneTel,
      email: SITE.email,
      areaServed: { "@type": "Place", name: `${area.name}, Zanzibar` },
    },
    areaServed: { "@type": "Place", name: `${area.name}, Zanzibar` },
    description: `Foreign-buyer advisory for ${area.name} property: title verification, due diligence, developer vetting, and acquisition support.`,
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const faqs = AREA_FAQS[area.slug] ?? [];
  const canonicalUrl = `${SITE.url}/areas/${area.slug}`;
  const areaOpportunities = OPPORTUNITIES.filter(
    (o) => o.area.toLowerCase() === area.name.toLowerCase()
  );
  const otherAreas = AREA_GUIDES.filter((a) => a.slug !== area.slug).slice(0, 6);

  const placeSchema = buildPlaceSchema(area);
  const breadcrumbSchema = buildBreadcrumbSchema(area);
  const faqSchema = buildFaqSchema(area);
  const serviceSchema = buildServiceSchema(area);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Navbar />
      <main className="bg-white">
        <header className="relative border-b border-border bg-navy-deep text-white">
          <div className="relative h-64 md:h-80 lg:h-96">
            <LuxuryImage
              asset={area.image}
              overlay="cinematic"
              priority
              sizes="100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-4 pb-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Breadcrumb
                crumbs={[
                  { label: "Home", href: "/" },
                  { label: "Areas", href: "/#areas" },
                  { label: area.name, href: `/areas/${area.slug}` },
                ]}
                variant="on-dark"
              />
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
                Zanzibar Property · Investor Guide
              </p>
              <h1 className="mt-2 font-serif text-[1.875rem] font-semibold leading-tight md:text-4xl">
                {area.name} Property for Sale & Investment
              </h1>
              <p className="mt-2 text-[15px] font-medium text-gold md:text-base">
                {area.headline}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="mb-10">
            <p className="text-[16px] leading-[1.75] text-body md:text-[17px]">
              {area.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {area.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-navy-heading"
                >
                  {h}
                </span>
              ))}
            </div>
          </section>

          <div className="mb-10 grid gap-3 md:grid-cols-3">
            {ROI_HIGHLIGHTS.map((roi) => (
              <div
                key={roi.label}
                className="luxury-card px-4 py-4 text-center md:px-5 md:py-5"
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

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              {area.name} investment potential
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-body md:text-[16px]">
              {area.investmentPotential}
            </p>
          </section>

          <section className="mb-10 grid gap-6 md:grid-cols-2">
            <article className="luxury-card p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">
                Property opportunities
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-body">
                {area.propertyOpportunities}
              </p>
            </article>
            <article className="luxury-card p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">
                Rental demand
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-body">
                {area.rentalDemand}
              </p>
            </article>
            <article className="luxury-card p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">
                Tourism appeal
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-body">
                {area.tourismAppeal}
              </p>
            </article>
            <article className="luxury-card p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">
                Lifestyle & atmosphere
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-body">
                {area.lifestyle}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-body">
                <strong className="text-navy-heading">Beach quality:</strong> {area.beachQuality}
              </p>
            </article>
          </section>

          {area.attractions.length > 0 && (
            <section className="mb-10 rounded-luxury-lg border border-border bg-surface p-5 md:p-6">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">
                What to do in {area.name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {area.attractions.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-navy-heading ring-1 ring-border"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              {area.name} property & investment opportunities
            </h2>
            {areaOpportunities.length > 0 ? (
              <>
                <p className="mt-2 text-[15px] leading-relaxed text-body">
                  Verified {area.name} listings, ready for international investors.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {areaOpportunities.map((opp) => (
                    <Link
                      key={opp.id}
                      href={`/opportunities/${opp.slug}`}
                      className="luxury-card group block overflow-hidden p-0 transition hover:shadow-premium"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <LuxuryImage
                          asset={{
                            src: `/images/opportunities/${opp.imageKey}.jpg`,
                            fallback: `/images/opportunities/${opp.imageKey}.jpg`,
                            alt: opp.title,
                          }}
                          overlay="minimal"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="transition duration-700 group-hover:scale-105"
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
                        <span className="mt-3 inline-block text-[14px] font-semibold text-gold">
                          View opportunity →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="mt-5 text-[14px] text-muted">
                  Need a different budget or asset class?{" "}
                  <Link
                    href="/opportunities"
                    className="font-semibold text-gold hover:underline"
                  >
                    Browse all {OPPORTUNITIES.length} opportunities →
                  </Link>
                </p>
              </>
            ) : (
              <div className="mt-4 rounded-luxury-lg border border-border bg-surface p-6">
                <p className="text-[15px] leading-relaxed text-body">
                  {area.name} opportunities are released on a deal-by-deal basis as we
                  complete developer due diligence. Speak to a specialist to be notified when
                  new {area.name} listings become available.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/#qualify"
                    className="rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-gold-light"
                  >
                    Get notified about {area.name} opportunities
                  </Link>
                  <a
                    href={BOOK_CALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-gold px-5 py-2.5 text-[14px] font-semibold text-gold transition hover:bg-gold hover:text-white"
                  >
                    Book a 30-min call
                  </a>
                </div>
              </div>
            )}
          </section>

          <section className="mb-10 rounded-luxury-lg bg-navy-deep p-6 text-white md:p-8">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              Buy property in {area.name} as a foreigner
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85 md:text-[16px]">
              Foreign investors can acquire {area.name} property through Zanzibar-approved
              acquisition structures. Our advisory team coordinates legal review, title
              verification, due diligence, and developer vetting for buyers from the UK, US,
              EU, UAE, Canada, and South Africa.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "ZREB & BRELA registered advisory",
                "Bilingual deal team (English · Arabic · Swahili · French · German)",
                "Title verification and due diligence coordination",
                "On-the-ground presence in Paje and Stone Town",
                "Off-plan milestone payment structuring",
                "Post-purchase concierge and management introductions",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[14px] leading-snug text-white/85"
                >
                  <span className="mt-1 text-gold">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#qualify"
                className="rounded-full bg-gold px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
              >
                Get {area.name} investment brief
              </Link>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-gold px-6 py-3 text-[14px] font-semibold text-gold transition hover:bg-gold hover:text-white"
              >
                Book a 30-min call
              </a>
            </div>
          </section>

          {faqs.length > 0 && (
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                {area.name} property FAQ
              </h2>
              <div className="mt-5 space-y-3">
                {faqs.map((f, i) => (
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
          )}

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Explore other Zanzibar investment areas
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="luxury-card group block p-4 transition hover:shadow-premium"
                >
                  <p className="font-serif text-base font-semibold text-navy-heading">
                    {a.name}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-muted">
                    {a.headline}
                  </p>
                  <span className="mt-3 inline-block text-[13px] font-semibold text-gold group-hover:underline">
                    {a.name} property guide →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-luxury-lg bg-surface p-6 text-center md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Ready to invest in {area.name}?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-body">
              Tell us your budget and timeline — we&apos;ll send a curated {area.name} brief
              within 24 hours.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/#qualify"
                className="rounded-full bg-gold px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
              >
                Get {area.name} brief
              </Link>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-gold px-7 py-3 text-[14px] font-semibold text-gold transition hover:bg-gold hover:text-white"
              >
                Book a 30-min call
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
