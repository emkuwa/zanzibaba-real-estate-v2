"use client";

import { useState } from "react";
import { whatsappUrl } from "@/data/site";

const STEPS = [
  { id: "type", label: "What are you looking for?", options: ["Villa", "Land", "Hotel / Resort", "Apartment", "Commercial", "Not Sure"] },
  { id: "budget", label: "What is your investment budget?", options: ["Under $150K", "$150K–$300K", "$300K–$500K", "$500K–$1M", "$1M+", "Not Sure"] },
  { id: "area", label: "Which area interests you?", options: ["Paje", "Jambiani", "Nungwi", "Matemwe", "Fumba", "Not Sure"] },
  { id: "timeline", label: "When are you ready to proceed?", options: ["Now", "Within 3 months", "Within 6 months", "This year", "Researching", "Not Sure"] },
];

export function QualificationFunnel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const current = STEPS[step];

  function choose(option: string) {
    const next = { ...answers, [current.id]: option };
    setAnswers(next);
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      const summary = STEPS.map((item) => `${item.label}: ${next[item.id] || "Not specified"}`).join("\n");
      window.open(whatsappUrl(`Hello Zanzibaba, I completed the Smart Property Match.\n\n${summary}`), "_blank");
    }
  }

  return <section id="qualify" className="bg-[#f7f4ed] px-5 py-12 md:px-8 md:py-20"><div className="mx-auto max-w-2xl">
    <h2 className="font-serif text-[2.35rem] font-medium leading-none tracking-[-.035em] text-[#102f2c] md:text-5xl">Find Your Zanzibar<br />Property</h2>
    <p className="mt-3 max-w-lg text-sm leading-6 text-[#59635f]">Tell us what you&apos;re looking for and we&apos;ll match you with suitable opportunities.</p>
    <div className="mt-8 flex items-center gap-3"><span className="text-xs font-semibold text-[#0a5b4d]">{step + 1} / {STEPS.length}</span><div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#dedbd3]"><div className="h-full rounded-full bg-[#0a5b4d] transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div></div>
    <h3 className="mt-10 font-serif text-xl text-[#102f2c]">{current.label}</h3>
    <div className="mt-5 grid grid-cols-2 gap-3">{current.options.map((option, i) => <button key={option} type="button" onClick={() => choose(option)} className={`min-h-[58px] border px-4 text-left text-sm transition ${i === 0 ? "border-[#0a5b4d] bg-[#0a5b4d] text-white" : "border-[#d4d0c6] bg-[#fbfaf6] text-[#243f3b] hover:border-[#0a5b4d]"}`}>{option}{i === 0 && <span className="float-right">→</span>}</button>)}</div>
    <div className="mt-7 flex items-center justify-between">{step > 0 ? <button onClick={() => setStep(step - 1)} className="text-xs text-[#56635f]">← Back</button> : <span />}<p className="text-[10px] uppercase tracking-[.12em] text-[#89908d]">No obligation · Private enquiry</p></div>
  </div></section>;
}
