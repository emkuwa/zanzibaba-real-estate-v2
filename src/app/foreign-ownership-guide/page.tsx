import type { Metadata } from "next";
import Link from "next/link";
import { SITE, BOOK_CALL_URL, whatsappUrl } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const pageSlug = "foreign-ownership-guide";
const canonicalUrl = `${SITE.url}/${pageSlug}`;

export const metadata: Metadata = {
  title: "Foreign Ownership Guide — Buy Property in Zanzibar as a Foreigner | Zanzibaba",
  description:
    "Complete guide to foreign property ownership in Zanzibar: acquisition process, due diligence, ownership structures, FAQs, and advisory support for international buyers from the UK, US, EU, UAE, Canada, and South Africa.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Foreign Ownership Guide — Buy Property in Zanzibar as a Foreigner",
    description:
      "Step-by-step guide to foreign property ownership in Zanzibar: legal frameworks, due diligence, ownership structures, and advisory support for international investors.",
  },
  keywords: [
    "foreign ownership Zanzibar",
    "buy property Zanzibar foreigner",
    "Zanzibar property law",
    "foreign buyer Zanzibar",
    "Zanzibar land ownership",
    "leasehold Zanzibar",
    "Zanzibar property acquisition",
    "can foreigners buy property in Zanzibar",
  ],
};

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Investor Qualification",
    description:
      "We start by understanding your budget, preferred area, property type, and investment timeline. This helps us match you with verified opportunities and identify the right ownership structure for your situation.",
  },
  {
    step: 2,
    title: "Area & Property Selection",
    description:
      "Review curated property options — beachfront villas, off-plan developments, land, or hospitality assets. We provide area guides, ROI projections, and developer background for each shortlisted opportunity.",
  },
  {
    step: 3,
    title: "Due Diligence & Title Verification",
    description:
      "Our advisory team conducts legal due diligence on the property: title deed verification, boundary confirmation, encumbrance checks, and developer standing. Every opportunity is vetted before we proceed.",
  },
  {
    step: 4,
    title: "Legal Review & Offer",
    description:
      "A Zanzibar-qualified legal counsel reviews the sale agreement, explains terms in English, and coordinates any required approvals for foreign buyers. Once satisfied, you sign and make a reservation deposit.",
  },
  {
    step: 5,
    title: "Payment & Completion",
    description:
      "Funds are transferred in USD via international wire. Milestone payments apply for off-plan; full payment for ready property. Title registration follows completion, and we coordinate handover documentation.",
  },
  {
    step: 6,
    title: "Post-Purchase Concierge",
    description:
      "After handover, we introduce property management, rental operators, and maintenance contacts. You receive a welcome pack with local service providers, emergency contacts, and area orientation.",
  },
];

const OWNERSHIP_STRUCTURES = [
  {
    title: "Leasehold Ownership",
    description:
      "Foreigners can acquire leasehold interests in Zanzibar land for up to 99 years, renewable. This is the most common structure for international buyers acquiring villas, apartments, and developed property. Leasehold ownership is registrable and transferable.",
  },
  {
    title: "Company Ownership",
    description:
      "Foreign investors may hold property through a locally registered company (LLC). This structure is commonly used for hospitality assets, commercial property, and portfolio holdings. Company registration is handled through the relevant authorities.",
  },
  {
    title: "Direct Freehold (Limited)",
    description:
      "Freehold ownership by foreign individuals is restricted in Zanzibar. Certain developed properties — particularly units within approved developments — may be structured for effective freehold equivalent rights through legal mechanisms. This is assessed on a case-by-case basis.",
  },
  {
    title: "Off-Plan Structures",
    description:
      "Off-plan purchases typically use milestone-based sale agreements with staged payments tied to construction progress. Title transfers upon completion. Developer payment plans and phased structures are reviewed and verified during due diligence.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Can foreigners buy property in Zanzibar?",
    answer:
      "Yes. Foreigners can acquire property in Zanzibar through approved legal structures, primarily leasehold interests of up to 99 years. Our advisory team coordinates legal review, title verification, and compliant acquisition paths for international buyers from the UK, US, EU, UAE, Canada, South Africa, and beyond.",
  },
  {
    question: "What is the difference between freehold and leasehold in Zanzibar?",
    answer:
      "Freehold ownership by foreign individuals is restricted in Zanzibar. The standard structure for foreign buyers is a registrable 99-year leasehold interest, which provides effective ownership rights — including the ability to sell, lease, or bequeath the property. Certain developed units within approved schemes may be structured differently; we assess this on a case-by-case basis.",
  },
  {
    question: "How long does the acquisition process take?",
    answer:
      "A typical ready-property purchase runs 8–14 weeks from first enquiry to handover. Off-plan purchases follow the developer's construction timeline, with title transfer upon completion. We provide a personalised timeline during qualification.",
  },
  {
    question: "Do I need a local lawyer?",
    answer:
      "Yes. Independent legal representation is essential for any property transaction in Zanzibar. Our advisory team coordinates with a vetted network of Zanzibar-qualified legal counsel who handle sale agreements, title verification, and registration. All documentation is explained in English.",
  },
  {
    question: "What due diligence is conducted on properties?",
    answer:
      "Our research team verifies title deeds, confirms property boundaries, checks for encumbrances or disputes, reviews developer track records, and validates planning or construction approvals. Every opportunity is vetted before it reaches investors.",
  },
  {
    question: "Can I rent out my property as a foreign owner?",
    answer:
      "Yes. Foreign owners can generate rental income from their Zanzibar property. Short-stay holiday rentals (Airbnb-style) are common in tourist corridors like Paje, Nungwi, and Kiwengwa. Long-term rentals suit Stone Town heritage apartments. Our partner network provides professional property management for both models.",
  },
  {
    question: "What are the costs involved beyond the purchase price?",
    answer:
      "Additional costs include legal fees, stamp duty, title registration, valuation fees, and due diligence. Annual holding costs include property management (if applicable), utilities, and maintenance. We provide a full cost breakdown during qualification.",
  },
  {
    question: "How is the purchase funded?",
    answer:
      "Purchases are funded via international wire transfer in USD. Our team coordinates banking documentation, source-of-funds verification, and milestone-payment scheduling. We advise on the cleanest banking path based on your country of residence during qualification.",
  },
];

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Foreign Ownership Guide", item: canonicalUrl },
    ],
  };
}

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function buildServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Zanzibar Foreign Ownership Advisory",
    description:
      "Complete guidance for foreign buyers acquiring property in Zanzibar: legal structures, due diligence, title verification, acquisition process, and post-purchase support.",
    provider: {
      "@type": "RealEstateAgent",
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      telephone: SITE.phoneTel,
      email: SITE.email,
      areaServed: { "@type": "Country", name: "Tanzania" },
    },
    areaServed: { "@type": "Place", name: "Zanzibar, Tanzania" },
    audience: {
      "@type": "Audience",
      audienceType: "International Real Estate Investors",
    },
  };
}

function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Foreign Ownership Guide — Buy Property in Zanzibar as a Foreigner",
    description:
      "Complete guide to foreign property ownership in Zanzibar: acquisition process, due diligence, ownership structures, and advisory support.",
    url: canonicalUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Foreign Ownership Guide",
          item: canonicalUrl,
        },
      ],
    },
    about: {
      "@type": "Thing",
      name: "Foreign Property Ownership in Zanzibar",
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export default function ForeignOwnershipGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
      />

      <Navbar />
      <main className="bg-white">
        <header className="border-b border-border bg-navy-deep text-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Breadcrumb
              crumbs={[
                { label: "Home", href: "/" },
                { label: "Foreign Ownership Guide", href: `/${pageSlug}` },
              ]}
              variant="on-dark"
            />
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
              Foreign Ownership Guide
            </p>
            <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-tight md:text-4xl">
              Buy Property in Zanzibar as a Foreigner
            </h1>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-white/80">
              Everything you need to know about foreign property ownership in Zanzibar —
              from legal structures and due diligence to the step-by-step acquisition process.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {/* ── Overview ── */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Foreign Ownership Overview
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-body">
              Zanzibar welcomes foreign investment in real estate. International buyers from the UK,
              US, EU, UAE, Canada, South Africa, and beyond can acquire property through approved
              legal structures — primarily registrable leasehold interests of up to 99 years.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              The process is transparent when guided by experienced advisors. Our team coordinates
              every step: legal review, title verification, due diligence, payment structuring, and
              registration. Foreign buyers do not need to be resident in Zanzibar to own property here.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Whether you are acquiring a beachfront villa in Paje, an off-plan apartment in Fumba,
              a heritage property in Stone Town, or a hospitality asset in Matemwe — the same core
              framework applies. Each transaction is structured to be compliant, transparent, and
              aligned with your investment goals.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Leasehold Term", value: "Up to 99 years, renewable" },
                { label: "Currency", value: "USD (no FX risk for US buyers)" },
                { label: "Legal Review", value: "English-language counsel" },
                { label: "Timeline", value: "8–14 weeks typical" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-luxury border border-border bg-surface p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-navy-heading">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Acquisition Process ── */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Step-by-Step
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                Property Acquisition Process
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                From first enquiry to keys in hand — a structured process designed for
                international buyers.
              </p>
            </div>
            <div className="space-y-4">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="luxury-card flex items-start gap-5 p-5 transition hover:shadow-premium md:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-[15px] font-bold text-white">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-navy-heading">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-body">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Due Diligence ── */}
          <section className="mb-12 rounded-luxury-lg border border-border bg-surface p-6 md:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Investor Protection
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Due Diligence Process
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              Every opportunity in our portfolio undergoes a verification process before it reaches
              investors. Our research team conducts thorough due diligence on:
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Title deed verification and chain of ownership",
                "Property boundary confirmation",
                "Encumbrance and dispute checks",
                "Developer track record and company standing",
                "Planning and construction approvals",
                "Financial health of counterparty",
                "Legal review of sale agreement",
                "Compliance with foreign-ownership regulations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[14px] leading-snug text-body"
                >
                  <span className="mt-0.5 text-gold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              We do not list unverified opportunities. Every developer, project, and title is
              vetted before introduction. Investors receive a due diligence summary for each
              shortlisted property.
            </p>
          </section>

          {/* ── Ownership Structures ── */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Legal Framework
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                Ownership Structures for Foreign Buyers
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Foreign investors can choose from several legal structures depending on the property
                type, investment duration, and long-term objectives.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {OWNERSHIP_STRUCTURES.map((struct) => (
                <article
                  key={struct.title}
                  className="luxury-card flex flex-col p-5 transition hover:shadow-premium"
                >
                  <h3 className="font-serif text-lg font-semibold text-navy-heading">
                    {struct.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body">
                    {struct.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Common Questions
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                Foreign Ownership FAQ
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Answers to the most common questions from international buyers about property
                ownership in Zanzibar.
              </p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((f, i) => (
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

          {/* ── CTAs ── */}
          <section className="rounded-luxury-lg bg-navy-deep p-6 text-center md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
              Ready to start your Zanzibar property search?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">
              Speak with a senior advisor who will guide you through the foreign ownership process —
              from your first question through to keys in hand.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={whatsappUrl(
                  "Hello, I'd like to speak with an advisor about foreign ownership in Zanzibar."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1ebe57]"
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
              >
                Book Consultation
              </a>
              <Link
                href="/#qualify"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3 text-[14px] font-semibold text-white transition hover:border-gold hover:text-gold"
              >
                Get Matched →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
