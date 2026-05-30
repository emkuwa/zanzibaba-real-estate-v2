"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Button } from "@/components/ui/Button";
import { trackFormSubmit } from "@/lib/gtag";

export function LeadMagnetPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [coverSrc, setCoverSrc] = useState<string>(VISUAL_SYSTEM.leadMagnet.guide2026.src);

  useEffect(() => {
    const key = "zre_magnet_shown";
    if (sessionStorage.getItem(key)) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem(key, "1");
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Investment Guide Request",
          email,
          phone: "",
          source: "lead_magnet_guide",
        }),
      });
      setStatus("done");
      trackFormSubmit("lead_magnet_guide");
      setTimeout(() => setShow(false), 2500);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <AnimatePresence>
      {show && status !== "done" && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-24 right-6 z-50 w-full max-w-sm overflow-hidden rounded-lg border border-gold/30 bg-white shadow-luxury"
          role="dialog"
          aria-labelledby="magnet-title"
        >
          <div className="relative h-36 bg-navy">
            <Image
              src={coverSrc}
              alt={VISUAL_SYSTEM.leadMagnet.guide2026.alt}
              fill
              className="object-cover object-top"
              sizes="400px"
              onError={() => setCoverSrc(VISUAL_SYSTEM.leadMagnet.guide2026.fallback)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
          <div className="relative p-6 pt-2">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="absolute right-3 top-3 text-muted hover:text-navy"
              aria-label="Close"
            >
              ✕
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Free Download
            </p>
            <h2 id="magnet-title" className="mt-1 font-serif text-xl font-semibold text-navy">
              2026 Zanzibar Property Investment Guide
            </h2>
            <p className="mt-2 text-sm text-muted">
              ROI insights, area comparisons, and buyer checklists — delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-sm border border-border px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
              <Button type="submit" variant="gold" size="sm" disabled={status === "loading"}>
                {status === "loading" ? "…" : "Get Guide"}
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
