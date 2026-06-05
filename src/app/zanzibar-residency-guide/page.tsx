import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, BOOK_CALL_URL, whatsappUrl } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import trustMetrics from "@/data/trust-metrics.json";

const pageSlug = "zanzibar-residency-guide";
const canonicalUrl = `${SITE.url}/${pageSlug}`;

export const metadata: Metadata = {
  title: "Living in Zanzibar — Residency Guide for Expats & International Residents | Zanzibaba",
  description:
    "Complete Zanzibar residency guide covering cost of living, banking, healthcare, schools, internet, expat lifestyle, and relocation essentials for international residents, digital nomads, and retirees.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Living in Zanzibar — Residency Guide for Expats & International Residents",
    description:
      "Everything you need to know about living in Zanzibar as an expat: cost of living, banking, healthcare, education, internet, and lifestyle for international residents.",
  },
  keywords: [
    "living in Zanzibar",
    "Zanzibar expat guide",
    "Zanzibar cost of living",
    "Zanzibar residency",
    "Zanzibar banking",
    "Zanzibar healthcare",
    "Zanzibar schools",
    "Zanzibar internet",
    "expat lifestyle Zanzibar",
    "move to Zanzibar",
  ],
};

const LIVING_SECTIONS = [
  {
    id: "living",
    eyebrow: "Living in Zanzibar",
    title: "Indian Ocean island living for international residents",
    description:
      "Zanzibar offers a unique lifestyle combination: tropical climate, rich culture, growing infrastructure, and a welcoming international community. From beachfront villas in Paje to heritage apartments in Stone Town, the island suits a range of lifestyles — from digital nomads and remote workers to retirees and families.",
    bullets: [
      "Tropical climate year-round (26–32°C)",
      "English widely spoken in business and tourism",
      "Safe and welcoming environment for foreigners",
      "Growing international community across the island",
      "Direct flights from UK, Europe, UAE, South Africa",
    ],
  },
  {
    id: "cost-of-living",
    eyebrow: "Cost of Living",
    title: "Affordable island living with options for every budget",
    description:
      "Zanzibar offers a relatively affordable cost of living compared to Western countries and other Indian Ocean destinations. Costs vary significantly depending on lifestyle, location, and accommodation choices.",
    details: [
      { label: "Luxury villa (monthly)", value: "$800–$2,500" },
      { label: "Mid-range apartment", value: "$400–$800" },
      { label: "Single person (comfortable)", value: "$1,200–$2,000/month" },
      { label: "Couple (comfortable)", value: "$1,800–$3,000/month" },
      { label: "Family of four", value: "$2,500–$4,500/month" },
      { label: "Internet (fibre)", value: "$50–$100/month" },
    ],
    note: "Local produce is affordable. Imported goods are more expensive. Those earning in foreign currencies find Zanzibar particularly cost-effective.",
  },
  {
    id: "banking",
    eyebrow: "Banking & Finance",
    title: "Banking for international residents",
    description:
      "Zanzibar has a functional banking system with several international and local banks serving expat clients. Foreign currency accounts (USD) are available, and mobile money (M-Pesa) is widely used for daily transactions.",
    bullets: [
      "International and local banks with expat services",
      "USD foreign currency accounts available",
      "Mobile money (M-Pesa) for daily transactions",
      "International wire transfers in USD supported",
      "ATMs in Stone Town and major tourist areas",
      "Online banking available at major banks",
    ],
    note: "We recommend opening a local bank account upon arrival. Our team can introduce you to banks with dedicated expat relationship managers.",
  },
  {
    id: "healthcare",
    eyebrow: "Healthcare",
    title: "Healthcare services for residents",
    description:
      "Zanzibar has public hospitals and private clinics, with the main referral hospital in Stone Town. For serious medical needs, evacuation to Nairobi, Dar es Salaam, or overseas is common. Comprehensive health insurance is essential for all residents.",
    bullets: [
      "Private clinics in Stone Town and major areas",
      "Public hospitals for basic and emergency care",
      "Medical evacuation insurance strongly recommended",
      "Pharmacies well-stocked in urban centres",
      "Dental and optical services available in Stone Town",
      "International health insurance widely accepted",
    ],
    note: "We advise all residents to maintain comprehensive international health insurance with evacuation cover. Popular providers include Cigna, Allianz, and AXA.",
  },
  {
    id: "schools",
    eyebrow: "Education",
    title: "Schools and education for expat families",
    description:
      "Zanzibar offers several schooling options for expat families, including international schools, private schools, and the national curriculum system. Most international schools are located in or near Stone Town.",
    bullets: [
      "International schools with British and IB curricula",
      "Private schools with smaller class sizes",
      "National curriculum schools for local integration",
      "Pre-school and early childhood education options",
      "Extra-curricular activities including swimming, sports, arts",
    ],
    note: "School placement should be arranged well in advance. We recommend visiting schools during your site visit to assess facilities and meet teaching staff.",
  },
  {
    id: "internet",
    eyebrow: "Connectivity",
    title: "Internet and connectivity for remote work",
    description:
      "Internet connectivity in Zanzibar has improved significantly. Fibre broadband is available in Stone Town and major tourist areas. Mobile data networks (4G) cover most of the island, with 5G rolling out in urban centres.",
    bullets: [
      "Fibre broadband in Stone Town and urban areas",
      "4G mobile data across most of the island",
      "5G rolling out in Stone Town and tourist corridors",
      "Co-working spaces in Paje and Stone Town",
      "Starlink satellite internet available for remote locations",
      "Backup power recommended for uninterrupted connectivity",
    ],
    note: "Paje has the strongest digital nomad infrastructure with multiple co-working spaces, reliable internet, and a community of remote workers.",
  },
  {
    id: "expat-lifestyle",
    eyebrow: "Expat Lifestyle",
    title: "Community, culture, and daily life",
    description:
      "Zanzibar's expat community is welcoming and growing. Social events, fitness groups, networking meetups, and cultural activities are common in Paje, Nungwi, and Stone Town. The island offers a relaxed pace of life balanced with modern conveniences.",
    bullets: [
      "Active expat social scene in Paje and Stone Town",
      "Kitesurfing, diving, yoga, and fitness communities",
      "Farmers markets, beach clubs, and sunset dining",
      "Cultural events, music festivals, and gallery openings",
      "Volunteer and community involvement opportunities",
      "Welcoming environment for families, couples, and singles",
    ],
    note: "Paje is the social hub for the digital nomad and expat community. Stone Town offers more cultural immersion. Nungwi attracts a luxury-oriented international crowd.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Can I live in Zanzibar as a foreigner?",
    answer:
      "Yes. Foreigners can live in Zanzibar on tourist visas (up to 90 days), renewable visitor permits, or longer-term residence permits. Investor-class residence permits are available for those with qualifying property or business investment. We coordinate with local immigration counsel to advise on the right pathway.",
  },
  {
    question: "Do I need a residency permit to buy property?",
    answer:
      "No. Property ownership and residency are separate processes. Foreigners can acquire property through approved legal structures (leasehold up to 99 years) without holding a residence permit. However, if you plan to live in Zanzibar full-time, we recommend exploring residence permit options.",
  },
  {
    question: "Can I get a residency permit by buying property?",
    answer:
      "Tanzania offers investor-class residence permits linked to qualifying investment. The requirements and processing timelines vary. We coordinate with local immigration counsel to advise on eligibility, documentation, and application procedures.",
  },
  {
    question: "How much does it cost to live comfortably in Zanzibar?",
    answer:
      "A comfortable lifestyle for a single person typically costs $1,200–$2,000 per month, including accommodation, food, utilities, transport, and entertainment. A couple can live comfortably on $1,800–$3,000 per month. Families of four should budget $2,500–$4,500 per month. Costs vary significantly based on accommodation choice and lifestyle preferences.",
  },
  {
    question: "Is Zanzibar safe for expats?",
    answer:
      "Zanzibar is generally safe for international residents. Crime rates are low compared to many urban environments. Standard precautions apply: secure your home, avoid walking alone late at night in isolated areas, and keep valuables safe. The expat community is welcoming and well-established across the island.",
  },
  {
    question: "What healthcare options are available?",
    answer:
      "Zanzibar has public hospitals and private clinics. The main referral hospital is in Stone Town. For serious medical needs, evacuation to Nairobi or Dar es Salaam is common. Comprehensive international health insurance with evacuation cover is essential. Popular providers include Cigna, Allianz, and AXA.",
  },
  {
    question: "What internet speeds can I expect?",
    answer:
      "Fibre broadband is available in Stone Town and major tourist areas with reliable speeds for video calls and streaming. Mobile 4G covers most of the island. 5G is rolling out in urban centres. For remote locations, Starlink satellite internet is available. Paje has the strongest digital nomad infrastructure with multiple co-working spaces.",
  },
  {
    question: "Are there good international schools?",
    answer:
      "Yes. Zanzibar has international schools offering British and IB curricula, as well as private schools with smaller class sizes. Most are located in or near Stone Town. We recommend arranging school placement well in advance and visiting during your site visit.",
  },
  {
    question: "Can I open a bank account as a foreigner?",
    answer:
      "Yes. International residents can open bank accounts with local and international banks operating in Zanzibar. USD foreign currency accounts are available. You will typically need your passport, residence permit or visa, proof of address, and reference from your home bank. Mobile money (M-Pesa) is widely used for daily transactions.",
  },
  {
    question: "What transport options are available?",
    answer:
      "Transportation options include taxis, bajajis (tuk-tuks), daladalas (shared minibuses), and private vehicles. Many expats rent or buy cars for flexibility. Scooters and motorcycles are common for local travel. Ride-hailing apps operate in Stone Town. International driving permits are recommended.",
  },
  {
    question: "Is English widely spoken?",
    answer:
      "Yes. English is widely spoken in business, tourism, and government contexts. Swahili is the national language and is used in daily conversation. Learning basic Swahili phrases is appreciated and helps with local integration, but it is possible to live comfortably speaking only English.",
  },
  {
    question: "Can I work remotely from Zanzibar?",
    answer:
      "Yes. Zanzibar has a thriving digital nomad community, particularly in Paje, with co-working spaces, reliable internet in urban areas, and a calendar of networking events. Most remote workers enter on a tourist visa (up to 90 days). Longer-term arrangements require proper visa advice. We recommend consulting immigration professionals.",
  },
];

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Zanzibar Residency Guide", item: canonicalUrl },
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
    name: "Zanzibar Residency & Expat Advisory",
    description:
      "Complete guidance for international residents and expats moving to Zanzibar: visa and residency, cost of living, banking, healthcare, education, internet, and lifestyle integration.",
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
    audience: { "@type": "Audience", audienceType: "Expats and International Residents" },
  };
}

function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Living in Zanzibar — Residency Guide for Expats & International Residents",
    description:
      "Complete Zanzibar residency guide covering cost of living, banking, healthcare, schools, internet, expat lifestyle, and relocation essentials.",
    url: canonicalUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Zanzibar Residency Guide", item: canonicalUrl },
      ],
    },
    about: { "@type": "Thing", name: "Living and Residency in Zanzibar" },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };
}

export default function ZanzibarResidencyGuidePage() {
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
                { label: "Zanzibar Residency Guide", href: `/${pageSlug}` },
              ]}
              variant="on-dark"
            />
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
              Residency Guide
            </p>
            <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-tight md:text-4xl">
              Living in Zanzibar: Complete Residency Guide for Expats
            </h1>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-white/80">
              Everything international residents need to know about living in Zanzibar —
              from visas and banking to healthcare, schools, internet, and the expat lifestyle.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {LIVING_SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="mb-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                {section.eyebrow}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                {section.description}
              </p>
              {section.details && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {section.details.map((d) => (
                    <div
                      key={d.label}
                      className="rounded-luxury border border-border bg-surface p-4"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                        {d.label}
                      </p>
                      <p className="mt-1 text-[14px] font-medium text-navy-heading">{d.value}</p>
                    </div>
                  ))}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[14px] leading-snug text-body"
                    >
                      <span className="mt-0.5 text-gold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{section.note}</p>
              )}
            </section>
          ))}

          {/* ── FAQ ── */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Common Questions
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
                Zanzibar Residency FAQ
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Answers to the most common questions from international residents about living
                in Zanzibar.
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

          {/* ── Founder CTA ── */}
          <section className="mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              Meet the founder
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
              Speak directly with Emmanuel Mkuwa
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body">
              Founder-led advisory for international residents and investors. Every enquiry is
              handled by the person who built the business.
            </p>
            <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-[3px] ring-gold/60 shadow-luxury sm:h-24 sm:w-24">
                <Image
                  src={trustMetrics.founder.photo}
                  alt={trustMetrics.founder.name}
                  fill
                  sizes="96px"
                  className="object-cover object-[center_30%]"
                />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {trustMetrics.founder.role}
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-navy-heading">
                  {trustMetrics.founder.name}
                </p>
                <p className="mt-1 text-[14px] leading-[1.7] text-body">
                  {trustMetrics.founder.bio}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl(
                  "Hello Emmanuel, I'm interested in residency and living in Zanzibar."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1ebe57]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382a.68.68 0 0 1-.33.22c-.27.09-.57.14-.86.14-.78 0-1.46-.3-2.05-.66-.96-.58-2.031-1.58-3.171-2.72-1.14-1.14-2.14-2.21-2.72-3.17-.36-.59-.66-1.27-.66-2.05 0-.29.05-.59.14-.86a.68.68 0 0 1 .22-.33c.15-.16.34-.24.54-.24h.74c.2 0 .4.09.51.25.27.4.65 1.12.89 1.68a.48.48 0 0 1-.07.49c-.12.16-.27.35-.42.51l-.28.28c.22.58.7 1.19 1.24 1.73s1.15 1.02 1.73 1.24l.28-.28c.16-.15.35-.3.51-.42a.48.48 0 0 1 .49-.07c.56.24 1.28.62 1.68.89.16.11.25.31.25.51v.74c0 .2-.08.39-.24.54z" />
                  <path d="M12.004 1.998c-5.514 0-10 4.486-10 10 0 1.878.52 3.633 1.412 5.132l-1.404 4.686 4.87-1.402a9.95 9.95 0 0 0 5.122 1.584c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.367a8.35 8.35 0 0 1-4.272-1.18l-.306-.183-3.003.866.877-2.936-.2-.321a8.353 8.353 0 0 1-1.294-4.596c0-4.63 3.767-8.397 8.397-8.397s8.397 3.767 8.397 8.397-3.767 8.397-8.397 8.397z" />
                </svg>
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
              {trustMetrics.founder.linkedin && (
                <a
                  href={trustMetrics.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-heading px-5 py-2.5 text-[14px] font-semibold text-navy-heading transition hover:bg-navy-heading hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </section>

          {/* ── CTAs ── */}
          <section className="rounded-luxury-lg bg-navy-deep p-6 text-center md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
              Ready to start your Zanzibar journey?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">
              Speak with a senior advisor who can guide you through residency, property, and
              relocation — from your first question through to settling in.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={whatsappUrl(
                  "Hello, I'd like to speak with an advisor about residency and living in Zanzibar."
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
