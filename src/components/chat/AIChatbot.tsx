"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AREA_OPTIONS,
  BUDGET_OPTIONS,
  FUNNEL_STEP_CONFIG,
  INTENT_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  isRentalIntent,
} from "@/data/qualification";
import { SITE, whatsappUrl } from "@/data/site";
import { trackFormSubmit, trackChatAction, trackWhatsAppClick } from "@/lib/gtag";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import Image from "next/image";

type Message = { role: "bot" | "user"; text: string };

const CONCIERGE_TOPICS = [
  "Real Estate & Investment",
  "Luxury Rentals",
  "Tourism & Travel",
  "Relocation & Expat Life",
  "Business Opportunities",
] as const;

const TOPIC_TO_INTENT: Record<string, string> = {
  "Real Estate & Investment": "Property Investment",
  "Luxury Rentals": "Luxury Vacation Rental",
  "Tourism & Travel": "Buying a Holiday Home",
  "Relocation & Expat Life": "Long-Term Rental",
  "Business Opportunities": "Commercial Opportunity",
};

const FAQ_RESPONSES: Record<string, string> = {
  roi: "Typical gross Airbnb yields in Paje and Nungwi range 10–15% with professional management. All figures are indicative — we provide personalised analysis during consultation.",
  foreign: "Foreign investors can acquire property in Zanzibar through approved structures. Our team coordinates legal review and title verification.",
  areas: "Popular areas include Paje (Airbnb & nomads), Nungwi (luxury villas), Stone Town (expats & heritage), Kiwengwa (resorts), and Matemwe (boutique stays).",
  offplan: "Off-plan programmes offer flexible milestone payments and early investor pricing. Complete our form for current opportunities.",
  rentals: "We curate luxury villa rentals, monthly beachfront stays, and expat housing — a premium concierge, not a booking engine. Tell me your dates and budget.",
};

type BotStep =
  | { type: "intent" }
  | { type: "rental"; key: "rentalType" | "stayDuration" | "rentalBudget" | "lifestylePrefer" }
  | { type: "buy"; key: "area" | "budget" | "propertyType" };

function getBotSteps(intent: string): BotStep[] {
  if (isRentalIntent(intent)) {
    return [
      { type: "rental", key: "rentalType" },
      { type: "rental", key: "stayDuration" },
      { type: "rental", key: "rentalBudget" },
      { type: "rental", key: "lifestylePrefer" },
    ];
  }
  return [
    { type: "buy", key: "area" },
    { type: "buy", key: "budget" },
    { type: "buy", key: "propertyType" },
  ];
}

function getStepOptions(step: BotStep): readonly string[] {
  if (step.type === "rental") {
    return FUNNEL_STEP_CONFIG[step.key].options;
  }
  if (step.type === "buy") {
    if (step.key === "area") return AREA_OPTIONS.slice(0, 4);
    if (step.key === "budget") return BUDGET_OPTIONS;
    return PROPERTY_TYPE_OPTIONS.slice(0, 4);
  }
  return INTENT_OPTIONS;
}

function getStepQuestion(step: BotStep): string {
  if (step.type === "rental") {
    return FUNNEL_STEP_CONFIG[step.key].question;
  }
  if (step.type === "buy") {
    if (step.key === "area") return "Which area interests you most?";
    if (step.key === "budget") return "What is your estimated budget?";
    return "What property type do you prefer?";
  }
  return "What brings you to Zanzibar?";
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(VISUAL_SYSTEM.chat.aiAdvisor.fallback);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome — I'm your Zanzibar AI Concierge. I help with real estate, rentals, tourism, investment, relocation, and business opportunities. How may I assist you today?",
    },
  ]);
  const [phase, setPhase] = useState<"topic" | "intent" | "flow" | "lead" | "done">("topic");
  const [botSteps, setBotSteps] = useState<BotStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase]);

  function handleTopic(topic: string) {
    setMessages((m) => [...m, { role: "user", text: topic }]);
    const mapped = TOPIC_TO_INTENT[topic];
    if (mapped) {
      setTimeout(() => {
        setAnswers((a) => ({
          ...a,
          intent: mapped,
          path: isRentalIntent(mapped) ? "rental" : "buy",
        }));
        const steps = getBotSteps(mapped);
        setBotSteps(steps);
        setPhase("flow");
        setStepIndex(0);
        setMessages((m) => [...m, { role: "bot", text: getStepQuestion(steps[0]) }]);
      }, 400);
      return;
    }
    setPhase("intent");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: "What brings you to Zanzibar?" }]);
    }, 400);
  }

  function handleIntent(option: string) {
    setMessages((m) => [...m, { role: "user", text: option }]);
    setAnswers((a) => ({ ...a, intent: option, path: isRentalIntent(option) ? "rental" : "buy" }));
    const steps = getBotSteps(option);
    setBotSteps(steps);
    setPhase("flow");
    setStepIndex(0);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getStepQuestion(steps[0]) }]);
    }, 400);
  }

  function handleFlowOption(option: string) {
    const step = botSteps[stepIndex];
    if (!step || step.type === "intent") return;
    const key = step.key;
    setMessages((m) => [...m, { role: "user", text: option }]);
    setAnswers((a) => ({ ...a, [key]: option }));

    const nextIndex = stepIndex + 1;
    if (nextIndex < botSteps.length) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "bot", text: getStepQuestion(botSteps[nextIndex]) }]);
        setStepIndex(nextIndex);
      }, 400);
    } else {
      const isRental = botSteps[0]?.type === "rental";
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: isRental
              ? "Excellent — I can match you with luxury rental villas and expat-friendly stays. May I have your contact details?"
              : "Excellent choices. I can connect you with investment and purchase opportunities. May I have your contact details?",
          },
        ]);
        setPhase("lead");
      }, 400);
    }
  }

  function handleQuickFaq(key: keyof typeof FAQ_RESPONSES) {
    const labels: Record<string, string> = {
      roi: "What is the ROI?",
      foreign: "Can foreigners buy?",
      areas: "Best areas?",
      offplan: "Off-plan options?",
      rentals: "Luxury rentals?",
    };
    setMessages((m) => [
      ...m,
      { role: "user", text: labels[key] ?? key },
      { role: "bot", text: FAQ_RESPONSES[key] },
    ]);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/leads/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: "ai_chatbot",
        qualification: answers,
      }),
    });
    trackFormSubmit("ai_chatbot");
    setMessages((m) => [
      ...m,
      {
        role: "bot",
        text: `Thank you, ${lead.name}! Our concierge will reach you at ${lead.email}. You can also WhatsApp us for immediate assistance.`,
      },
    ]);
    setPhase("done");
  }

  const currentOptions =
    phase === "topic"
      ? CONCIERGE_TOPICS
      : phase === "intent"
        ? INTENT_OPTIONS
        : phase === "flow" && botSteps[stepIndex]
          ? getStepOptions(botSteps[stepIndex])
          : null;

  function handleOptionClick(option: string) {
    if (phase === "topic") handleTopic(option);
    else if (phase === "intent") handleIntent(option);
    else if (phase === "flow") handleFlowOption(option);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const nextOpen = !open;
          trackChatAction(nextOpen ? "open" : "close");
          setOpen(nextOpen);
        }}
        className="fixed bottom-6 left-6 z-50 flex h-14 items-center gap-2 rounded-full bg-navy px-5 text-white shadow-luxury transition hover:bg-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label="Open Zanzibar AI Concierge"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span className="hidden text-sm font-semibold sm:inline">AI Concierge</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-50 flex h-[480px] w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-xl border border-white/20 bg-white shadow-luxury"
            role="dialog"
            aria-label="Zanzibar AI Concierge"
          >
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-white/10">
                  <Image
                    src={avatarSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                    unoptimized
                    onError={() => setAvatarSrc(VISUAL_SYSTEM.chat.aiAdvisor.fallback)}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Zanzibar AI Concierge</p>
                  <p className="text-xs text-white/60">Invest · Travel · Relocate · Discover</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                trackChatAction("close");
                setOpen(false);
              }}
                className="rounded p-1 hover:bg-white/10"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user" ? "bg-navy text-white" : "bg-surface text-navy"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {phase === "lead" && (
                <form onSubmit={submitLead} className="space-y-2">
                  <input
                    required
                    placeholder="Full name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    className="w-full rounded-sm border border-border px-3 py-2 text-sm"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    className="w-full rounded-sm border border-border px-3 py-2 text-sm"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    className="w-full rounded-sm border border-border px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-sm bg-gold py-2 text-sm font-semibold text-white"
                  >
                    Submit & Get Recommendations
                  </button>
                </form>
              )}

              {currentOptions && phase !== "lead" && phase !== "done" && (
                <div className="flex flex-wrap gap-2">
                  {currentOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleOptionClick(opt)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-navy hover:border-gold hover:bg-sand-light"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleQuickFaq("rentals")}
                  className="text-xs text-gold hover:underline"
                >
                  Rentals?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFaq("roi")}
                  className="text-xs text-gold hover:underline"
                >
                  ROI?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFaq("areas")}
                  className="text-xs text-gold hover:underline"
                >
                  Areas?
                </button>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ai_chatbot")}
                  className="text-xs text-gold hover:underline"
                >
                  WhatsApp {SITE.phoneLocal}
                </a>
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
