"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, whatsappUrl } from "@/data/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/gtag";

const STEPS = [
  {
    id: "type",
    label: "What are you looking for?",
    options: ["Villa", "Land", "Hotel / Resort", "Apartment", "Commercial", "Not Sure"],
  },
  {
    id: "budget",
    label: "Investment Budget",
    options: ["Under $150K", "$150K–$300K", "$300K–$500K", "$500K–$1M", "$1M+"],
  },
  {
    id: "area",
    label: "Preferred Area",
    options: ["Paje", "Jambiani", "Nungwi", "Matemwe", "Fumba", "Other / Not Sure"],
  },
  {
    id: "objective",
    label: "Primary Objective",
    options: [
      "Lifestyle / Holiday Home",
      "Airbnb / Rental",
      "Development",
      "Hospitality Business",
      "Long-Term Investment",
    ],
  },
];

const inputClass =
  "min-h-[48px] w-full rounded-luxury border border-[#E2E8F0] bg-white px-4 py-3 text-[16px] text-[#0B2A6B] placeholder:text-[#374151]/60 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/20";

export function QualificationFunnel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const isContactStep = step === STEPS.length;
  const allAnswered = STEPS.every((s) => answers[s.id]);

  function selectOption(option: string) {
    const currentStep = STEPS[step];
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
    setTimeout(() => {
      if (step < STEPS.length - 1) {
        setStep(step + 1);
      } else {
        setStep(STEPS.length);
      }
    }, 300);
  }

  function buildWhatsAppMessage() {
    const parts = STEPS.map((s) => `${s.label}: ${answers[s.id] || "Not specified"}`);
    return `Hello Zanzibaba, I've completed the property matcher.\n\n${parts.join("\n")}\n\nName: ${contact.name}\nWhatsApp: ${contact.phone}${contact.email ? `\nEmail: ${contact.email}` : ""}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.phone) return;
    setStatus("loading");
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          source: "smart_match",
          qualification: answers,
        }),
      });
      setStatus("done");
      trackFormSubmit("smart_match");
      // Open WhatsApp
      const whatsappMsg = whatsappUrl(buildWhatsAppMessage());
      window.open(whatsappMsg, "_blank");
      trackWhatsAppClick("smart_match_success");
    } catch {
      setStatus("idle");
    }
  }

  const progress = isContactStep ? 100 : Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <Section id="qualify" className="relative z-10 bg-navy-deep py-10 md:py-16">
      <SectionHeader
        eyebrow="Smart Property Matching"
        title="Find Your Zanzibar Property"
        description="Tell us what you're looking for and we'll match you with suitable opportunities."
        light
      />

      <div className="mx-auto max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full transition ${
                  i < step || (i === step && answers[s.id])
                    ? "bg-gold"
                    : i === step
                      ? "bg-gold/50"
                      : "bg-white/20"
                }`}
              />
              {i < STEPS.length - 1 && (
                <div className={`h-px w-6 ${i < step ? "bg-gold" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ x: 12 }}
              animate={{ x: 0 }}
              exit={{ x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {isContactStep ? (
                /* Contact form after completing steps */
                <div>
                  <p className="mb-6 text-center text-sm text-white/80">
                    We can match you with opportunities based on your requirements.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      required
                      type="tel"
                      placeholder="WhatsApp number"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className={inputClass}
                    />
                    {status === "done" ? (
                      <div className="rounded-luxury border border-gold/40 bg-navy-deep/50 p-4 text-center">
                        <p className="text-[16px] font-semibold text-gold">Thank you</p>
                        <p className="mt-2 text-[14px] text-white/80">
                          Your requirements have been sent. Our team will be in touch shortly.
                        </p>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "loading" || !contact.phone}
                        className="w-full rounded-luxury bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-navy-deep transition hover:bg-gold-light disabled:opacity-50"
                      >
                        {status === "loading" ? "Sending..." : "Send My Matches on WhatsApp"}
                      </button>
                    )}
                    <p className="text-center text-[11px] uppercase tracking-wider text-white/40">
                      Confidential enquiry · No obligation · Response within 24 hours
                    </p>
                  </form>
                </div>
              ) : (
                /* Option selection step */
                <div>
                  <h3 className="text-center text-sm font-medium text-white">
                    {STEPS[step]?.label}
                  </h3>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {STEPS[step]?.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectOption(option)}
                        className={`min-h-[48px] rounded-luxury border px-4 py-3 text-sm font-medium transition ${
                          answers[STEPS[step].id] === option
                            ? "border-gold bg-gold/10 text-navy-deep"
                            : "border-white/20 bg-white text-navy hover:border-gold/50 hover:bg-gold/5"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="mt-6 text-xs text-white/50 hover:text-white/80"
                    >
                      ← Back
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
