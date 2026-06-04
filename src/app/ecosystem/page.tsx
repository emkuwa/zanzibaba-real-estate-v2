import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { ECOSYSTEM_MODULES } from "@/ecosystem";
import { SITE, whatsappUrl } from "@/data/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Zanzibar Investment Ecosystem — Your Complete Platform for Investing in Zanzibar",
  description:
    "Discover, verify, and invest in Zanzibar real estate through a single platform. AI concierge, vetted developers, market intelligence, and dedicated support — built for international investors.",
  alternates: { canonical: `${SITE.url}/ecosystem` },
  openGraph: {
    title: "Zanzibar Investment Ecosystem — Your Complete Platform for Investing in Zanzibar",
    description:
      "From first discovery to property ownership — a unified ecosystem connecting international investors to Zanzibar's best real estate opportunities with AI concierge, developer partnerships, and market intelligence.",
  },
};

const INVESTOR_JOURNEY = [
  {
    step: 1,
    title: "Discover",
    description:
      "Browse vetted opportunities, explore area guides, and read market intelligence — all tailored to international buyers. Filter by property type, location, budget, and investment goal.",
    outcomes: "Shortlist properties aligned with your investment strategy.",
    href: "/opportunities",
    label: "Explore opportunities",
  },
  {
    step: 2,
    title: "Connect",
    description:
      "Tell your AI Concierge what you're looking for. In minutes, receive personalised property matches, area recommendations, and ROI projections — no forms, no waiting.",
    outcomes: "Get matched with opportunities that fit your criteria.",
    href: "/#qualify",
    label: "Speak to concierge",
  },
  {
    step: 3,
    title: "Verify",
    description:
      "Access developer profiles, project galleries, due diligence data, and verified track records. Our research team validates every developer and opportunity before listing.",
    outcomes: "Invest with confidence — every opportunity is vetted.",
    href: "/developers",
    label: "View developers",
  },
  {
    step: 4,
    title: "Invest",
    description:
      "Close with guided support — from legal frameworks and foreign ownership guidance to site visits and post-purchase concierge. We're with you through every milestone.",
    outcomes: "Secure your property with end-to-end support.",
    href: "/#qualify",
    label: "Start your investment",
  },
] as const;

const WHY_DIFFERENT = [
  {
    title: "Trust & Verification",
    description:
      "Every developer, project, and opportunity is vetted before it reaches you. We verify track records, legal standing, and investment terms so you invest with confidence.",
    icon: "shield",
  },
  {
    title: "Intelligence, Not Just Listings",
    description:
      "We pair every opportunity with market data — ROI projections, tourism statistics, infrastructure developments, and area growth trends. Make informed decisions, not guesses.",
    icon: "chart",
  },
  {
    title: "End-to-End Platform",
    description:
      "From initial discovery through due diligence to closing and beyond — one ecosystem handles it all. No juggling agents, brokers, and websites across time zones.",
    icon: "layers",
  },
  {
    title: "AI + Human Concierge",
    description:
      "Get instant answers from AI, human expertise when it matters. Our concierge team coordinates site visits, introductions, and follow-ups so you never navigate alone.",
    icon: "sparkles",
  },
] as const;

const CONCIERGE_WORKFLOW = [
  {
    step: 1,
    title: "Tell us your preferences",
    description:
      "Start a conversation — via AI chat or WhatsApp. Share your budget, preferred areas, property type, and investment timeline. Our AI qualifies your profile instantly.",
  },
  {
    step: 2,
    title: "Receive a curated portfolio",
    description:
      "Within hours, receive a personalised portfolio of matched opportunities — including ROI data, area insights, and developer details. No spam, no irrelevant listings.",
  },
  {
    step: 3,
    title: "Deep-dive with a specialist",
    description:
      "Schedule a call with a Zanzibar investment specialist. Get questions answered, arrange video tours or site visits, and review due diligence documentation.",
  },
  {
    step: 4,
    title: "Guided transaction",
    description:
      "Your concierge coordinates every step — legal, payments, registration, and post-purchase support. From first enquiry to keys in hand, you're never alone.",
  },
] as const;

export default function EcosystemPage() {
  return (
    <EcosystemPageShell
      eyebrow="The Investor's Edge"
      title="Your Complete Zanzibar Investment Ecosystem"
      description="A unified platform connecting international investors to Zanzibar's most exclusive real estate opportunities — powered by intelligence, AI concierge, and a dedicated partner network."
    >
      <Breadcrumb crumbs={[{ label: "Ecosystem", href: "/ecosystem" }]} />

      {/* ── Investor Journey ── */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
            How It Works: Your Investment Journey
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-body">
            From discovery to ownership in four seamless steps — every part of the ecosystem designed
            around your investment goals.
          </p>
        </div>
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div
            className="absolute left-[30px] top-0 hidden h-full w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:left-1/2 md:-translate-x-1/2 md:block lg:left-0 lg:w-full lg:translate-x-0"
            aria-hidden
          />
          {INVESTOR_JOURNEY.map((step) => (
            <article
              key={step.step}
              className="luxury-card relative z-10 flex flex-col p-6 transition hover:shadow-premium"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[13px] font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-navy-heading">
                {step.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body">
                {step.description}
              </p>
              <p className="mt-3 text-[13px] font-medium italic text-gold">
                {step.outcomes}
              </p>
              <Link
                href={step.href}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-gold transition hover:gap-2 hover:text-gold-light"
              >
                {step.label} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── Ecosystem Advantage ── */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
            The Ecosystem Advantage
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-body">
            Nine integrated capabilities — each one built to serve a specific part of your investment
            journey. No separate logins, no scattered information.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM_MODULES.filter((mod) => mod.id !== "internal-agents").map((mod) => (
            <Link
              key={mod.id}
              href={mod.href.startsWith("/#") ? `/${mod.href}` : mod.href}
              className="luxury-card block p-5 transition hover:shadow-premium"
            >
              <h3 className="font-serif text-lg font-semibold text-navy-heading">{mod.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-body">{mod.description}</p>
              <ul className="mt-3 space-y-1.5">
                {mod.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-muted">
                    <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why Different ── */}
      <section className="mb-16 rounded-luxury-lg bg-navy-deep px-6 py-10 text-white sm:px-8 md:px-10 md:py-12">
        <div className="mb-8 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
            Why We&apos;re Different
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
            Investing in Zanzibar Shouldn&apos;t Feel Like Navigating a Maze
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">
            Most investors piece together information from brokers, blogs, and WhatsApp groups.
            We built a better way.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {WHY_DIFFERENT.map((item) => (
            <article
              key={item.title}
              className="rounded-luxury-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-gold/30 hover:bg-white/[0.07]"
            >
              <h3 className="font-serif text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/70">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Concierge Workflow ── */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
            Your Personal Concierge
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-body">
            AI-powered matching. Human expertise. Seamless coordination — from first hello to
            property handover.
          </p>
        </div>
        <div className="space-y-4">
          {CONCIERGE_WORKFLOW.map((step) => (
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
                <p className="mt-1 text-[14px] leading-relaxed text-body">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-2xl font-semibold text-navy-heading md:text-3xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-body">
            Tell your concierge what you&apos;re looking for — and let the ecosystem do the rest.
            No commitment, no pressure. Just expert guidance.
          </p>
          <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/#qualify"
              className="inline-flex rounded-full bg-gold px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-gold-light"
            >
              Speak to Your Concierge →
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-8 py-3.5 text-[15px] font-semibold text-gold transition hover:bg-gold hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382a.68.68 0 0 1-.33.22c-.27.09-.57.14-.86.14-.78 0-1.46-.3-2.05-.66-.96-.58-2.031-1.58-3.171-2.72-1.14-1.14-2.14-2.21-2.72-3.17-.36-.59-.66-1.27-.66-2.05 0-.29.05-.59.14-.86a.68.68 0 0 1 .22-.33c.15-.16.34-.24.54-.24h.74c.2 0 .4.09.51.25.27.4.65 1.12.89 1.68a.48.48 0 0 1-.07.49c-.12.16-.27.35-.42.51l-.28.28c.22.58.7 1.19 1.24 1.73s1.15 1.02 1.73 1.24l.28-.28c.16-.15.35-.3.51-.42a.48.48 0 0 1 .49-.07c.56.24 1.28.62 1.68.89.16.11.25.31.25.51v.74c0 .2-.08.39-.24.54z" />
                <path d="M12.004 1.998c-5.514 0-10 4.486-10 10 0 1.878.52 3.633 1.412 5.132l-1.404 4.686 4.87-1.402a9.95 9.95 0 0 0 5.122 1.584c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.367a8.35 8.35 0 0 1-4.272-1.18l-.306-.183-3.003.866.877-2.936-.2-.321a8.353 8.353 0 0 1-1.294-4.596c0-4.63 3.767-8.397 8.397-8.397s8.397 3.767 8.397 8.397-3.767 8.397-8.397 8.397z" />
              </svg>
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </EcosystemPageShell>
  );
}
