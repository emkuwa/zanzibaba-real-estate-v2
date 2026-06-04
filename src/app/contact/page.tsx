import type { Metadata } from "next";
import Link from "next/link";
import { SITE, BOOK_CALL_URL, whatsappUrl, TARGET_COUNTRIES } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact a Zanzibar Investment Advisor | Zanzibaba",
  description:
    "Book a 30-min video call with a senior Zanzibar investment advisor, or reach us on WhatsApp. Bilingual advisory for UK, US, EU, UAE, SA, and Canadian investors.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Contact a Zanzibar Investment Advisor | Zanzibaba",
    description:
      "Speak directly with a Zanzibar investment specialist. 30-min video call, multilingual, no commitment.",
  },
};

const ADVISORS = [
  { tz: "Dubai (GMT+4)", hours: "9:00 – 18:00", specialty: "UAE, UK, EU investors" },
  { tz: "London (GMT/BST)", hours: "9:00 – 18:00", specialty: "UK, EU, US investors" },
  { tz: "Sandton (GMT+2)", hours: "9:00 – 18:00", specialty: "South African investors" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <header className="border-b border-border bg-navy-deep px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/" className="text-[14px] font-medium text-gold hover:underline">
              ← Zanzibar Investment Ecosystem
            </Link>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
              Talk to a Specialist
            </p>
            <h1 className="mt-2 font-serif text-[2rem] font-semibold md:text-4xl">
              Book a 30-min video call with a senior advisor
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/80">
              No commitment. No pressure. Walk away with a personalised investment brief — areas,
              budget fit, ROI, and next steps.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-luxury-lg border-2 border-gold/40 bg-surface p-6 transition hover:border-gold hover:shadow-premium"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold">
                Recommended
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading">
                Book a 30-min video call
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Pick a time that suits you. We confirm in under 4 hours, including weekends.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold transition group-hover:gap-2">
                See available times →
              </p>
            </a>

            <a
              href={whatsappUrl(
                "Hello Zanzibaba, I'd like to speak with an advisor on WhatsApp."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-luxury-lg border border-border bg-white p-6 transition hover:border-[#25D366] hover:shadow-premium"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#25D366]">
                Fastest
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-heading">
                Chat on WhatsApp
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Replies in under 2 hours during advisory hours. {SITE.phone}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#25D366] transition group-hover:gap-2">
                Open WhatsApp →
              </p>
            </a>
          </section>

          <section className="mt-10 rounded-luxury-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-xl font-semibold text-navy-heading">
              Advisory hours
            </h2>
            <p className="mt-2 text-[14px] text-muted">
              We align our team with your time zone — UK, EU, UAE, SA, US East & West.
            </p>
            <ul className="mt-5 space-y-3">
              {ADVISORS.map((a) => (
                <li
                  key={a.tz}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-navy-heading">{a.tz}</p>
                    <p className="text-[13px] text-muted">{a.specialty}</p>
                  </div>
                  <p className="text-[14px] font-medium text-gold">{a.hours}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold text-navy-heading">
              Or start with a quick brief
            </h2>
            <p className="mt-2 text-[15px] text-body">
              Not ready for a call? Send a short brief and we&apos;ll reply with matched opportunities.
            </p>
            <Link
              href="/#qualify"
              className="mt-4 inline-flex rounded-full bg-navy-deep px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-navy"
            >
              Start the Match Form →
            </Link>
          </section>

          <section className="mt-10 rounded-luxury-lg bg-navy-deep p-6 text-white">
            <h2 className="font-serif text-xl font-semibold">Offices</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {SITE.offices.map((o) => (
                <li
                  key={o.name}
                  className="rounded-luxury border-l-2 border-gold/40 bg-white/[0.04] p-4"
                >
                  <strong className="block text-[15px]">{o.name}</strong>
                  <span className="text-[13px] text-white/70">{o.location}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-white/70">
              Email:{" "}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
                {SITE.email}
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
