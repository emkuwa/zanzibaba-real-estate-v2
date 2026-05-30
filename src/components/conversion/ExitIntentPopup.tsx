"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";
import { trackCtaClick } from "@/lib/gtag";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const key = "zre_exit_dismissed";
    if (sessionStorage.getItem(key)) {
      setDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) setShow(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed]);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("zre_exit_dismissed", "1");
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-labelledby="exit-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative max-w-md rounded-lg bg-white p-8 shadow-luxury"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 text-muted hover:text-navy"
              aria-label="Close"
            >
              ✕
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Before you go
            </p>
            <h2 id="exit-title" className="mt-2 font-serif text-2xl font-semibold text-navy">
              Don&apos;t miss Zanzibar&apos;s best opportunities
            </h2>
            <p className="mt-3 text-sm text-muted">
              Get matched with verified investment properties — villas, land, and
              off-plan programmes tailored to your budget.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={() => {
                  trackCtaClick("Get Matched Now", "exit_intent_popup");
                  dismiss();
                  scrollToId("qualify");
                }}
              >
                Get Matched Now
              </Button>
              <button
                type="button"
                onClick={dismiss}
                className="text-sm text-muted hover:text-navy"
              >
                No thanks, I&apos;ll browse
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
