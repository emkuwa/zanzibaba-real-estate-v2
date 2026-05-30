"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FUNNEL_STEP_CONFIG,
  PERSONALIZED_TIPS,
  getStepOrder,
  resolveFunnelPath,
  type FunnelStepKey,
  type QualificationAnswers,
} from "@/data/qualification";
import { SITE, whatsappUrl } from "@/data/site";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/gtag";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";

type StepKey = FunnelStepKey | "contact" | "success";

const inputClass =
  "min-h-[48px] w-full rounded-luxury border border-[#E2E8F0] bg-white px-4 py-3 text-[16px] text-[#0B2A6B] placeholder:text-[#374151]/60 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/20";

function OptionGrid({
  options,
  onSelect,
}: {
  options: readonly string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className="min-h-[48px] rounded-luxury border border-[#E2E8F0] bg-white px-4 py-3.5 text-left text-[16px] font-medium text-[#0B2A6B] shadow-sm transition hover:border-[#C89B3C]/50 hover:bg-[#F8FAFC] md:py-3"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function QualificationFunnel() {
  const [step, setStep] = useState<StepKey>("intent");
  const [answers, setAnswers] = useState<Partial<QualificationAnswers>>({});
  const [tip, setTip] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const path = resolveFunnelPath(answers.intent);
  const stepOrder = useMemo(() => getStepOrder(path), [path]);
  const stepIndex = step === "success" ? stepOrder.length : stepOrder.indexOf(step as FunnelStepKey | "contact");
  const progress =
    step === "success" ? 100 : Math.round(((stepIndex + 1) / stepOrder.length) * 100);

  const currentQuestion = useMemo(() => {
    if (step === "contact") return "Almost done — how can we reach you?";
    if (step === "success") return "Thank you";
    if (step in FUNNEL_STEP_CONFIG) {
      return FUNNEL_STEP_CONFIG[step as FunnelStepKey].question;
    }
    return "";
  }, [step]);

  const currentOptions = useMemo(() => {
    if (step in FUNNEL_STEP_CONFIG) {
      return FUNNEL_STEP_CONFIG[step as FunnelStepKey].options;
    }
    return [];
  }, [step]);

  function handleAnswer(key: FunnelStepKey, value: string) {
    const nextAnswers: Partial<QualificationAnswers> = { ...answers, [key]: value };

    if (key === "intent") {
      nextAnswers.path = resolveFunnelPath(value);
    }

    setAnswers(nextAnswers);

    const tipKey = PERSONALIZED_TIPS[value];
    if (tipKey) setTip(tipKey);

    const order = getStepOrder(nextAnswers.path ?? resolveFunnelPath(value));
    const idx = order.indexOf(key);
    const next = order[idx + 1];
    if (next) setStep(next);
  }

  function goBack() {
    if (stepIndex <= 0) return;
    setStep(stepOrder[stepIndex - 1]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.email && !contact.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          country: contact.country,
          source: "qualification_funnel",
          qualification: { ...answers, path },
        }),
      });
      setStep("success");
      trackFormSubmit("qualification_funnel");
    } finally {
      setSubmitting(false);
    }
  }

  const successCopy =
    path === "rental"
      ? "Our rental concierge will send curated villa and lifestyle options within 24 hours."
      : "A senior advisor will contact you within 24 hours with matched investment opportunities.";

  return (
    <Section id="qualify" className="relative z-10 bg-[#F8FAFC] py-7 md:py-10">
      <SectionHeader
        eyebrow="Smart Matching"
        title="Find your ideal Zanzibar property or rental"
        description="Whether you invest, buy, or rent — answer a few questions and our concierge team will send personalised recommendations."
        align="center"
      />

      <div className="mx-auto max-w-2xl">
        <div className="mb-5">
          <div className="mb-2 flex justify-between text-[14px] font-medium text-[#374151]">
            <span>
              Step {step === "success" ? stepOrder.length : stepIndex + 1} of {stepOrder.length}
              {answers.path && step !== "success" && (
                <span className="ml-2 text-[#C89B3C]">
                  · {answers.path === "rental" ? "Rental path" : "Buy & invest path"}
                </span>
              )}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
            <motion.div
              className="h-full bg-[#C89B3C]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_32px_rgba(7,36,90,0.1)] md:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ x: 12 }}
              animate={{ x: 0 }}
              exit={{ x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-serif text-[1.375rem] font-semibold leading-snug text-[#0B2A6B] md:text-2xl">
                {currentQuestion}
              </h3>

              {tip && step !== "contact" && step !== "success" && (
                <p className="mt-3 rounded-luxury border border-[#C89B3C]/25 bg-[#F8FAFC] px-4 py-3 text-[15px] leading-relaxed text-[#374151]">
                  <span className="font-semibold text-[#0B2A6B]">Insight: </span>
                  {tip}
                </p>
              )}

              {step in FUNNEL_STEP_CONFIG && (
                <div className="mt-6">
                  <OptionGrid
                    options={currentOptions}
                    onSelect={(v) => handleAnswer(step as FunnelStepKey, v)}
                  />
                </div>
              )}

              {step === "contact" && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp number (with country code)"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Country of residence"
                    value={contact.country}
                    onChange={(e) => setContact({ ...contact, country: e.target.value })}
                    className={inputClass}
                  />
                  <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
                    {submitting
                      ? "Submitting…"
                      : path === "rental"
                        ? "Get My Rental Options"
                        : "Get My Recommendations"}
                  </Button>
                </form>
              )}

              {step === "success" && (
                <div className="mt-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C89B3C]/15 ring-1 ring-[#C89B3C]/30">
                    <svg className="h-8 w-8 text-[#C89B3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[16px] leading-relaxed text-[#374151]">
                    Your enquiry has been sent to {SITE.email}. {successCopy}
                  </p>
                  <a
                    href={whatsappUrl(
                      `Hello, I just completed the ${path === "rental" ? "rental" : "investment"} form. My name is ${contact.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("qualification_success")}
                    className="mt-6 inline-block"
                  >
                    <Button variant="gold" size="lg">
                      Continue on WhatsApp
                    </Button>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step !== "success" && stepIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-6 text-[15px] font-medium text-[#374151] hover:text-[#0B2A6B]"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
