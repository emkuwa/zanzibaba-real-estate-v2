"use client";

import { useRef, useState } from "react";
import { TESTIMONIALS } from "@/data/seo-content";
import { QuoteIcon, StarRating } from "@/components/ui/StatIcon";
import { cn } from "@/lib/utils";

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-deep text-lg font-semibold text-white shadow-md ring-2 ring-gold/30">
      {initials}
    </div>
  );
}

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(index);
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          "scrollbar-hide md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0"
        )}
        onScroll={(e) => {
          const el = e.currentTarget;
          const cardWidth = el.offsetWidth * 0.88;
          const index = Math.round(el.scrollLeft / cardWidth);
          setActive(Math.min(Math.max(index, 0), TESTIMONIALS.length - 1));
        }}
      >
        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.name}
            className={cn(
              "luxury-card flex w-[88vw] shrink-0 snap-center flex-col",
              "md:w-auto md:shrink"
            )}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <QuoteIcon />
              <StarRating count={t.rating} />
            </div>
            <p className="flex-1 text-[16px] leading-[1.75] text-body">
              {t.quote}
            </p>
            <footer className="mt-5 flex items-center gap-4 border-t border-border/60 pt-5">
              <Avatar initials={t.initials} />
              <cite className="not-italic">
                <strong className="block text-[16px] text-navy-heading">{t.name}</strong>
                <span className="mt-0.5 block text-[14px] text-body">{t.role}</span>
                <span className="mt-0.5 block text-[14px] font-medium text-gold">
                  {t.location}
                </span>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2 md:hidden">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`View testimonial ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              active === i ? "w-7 bg-gold" : "w-2 bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
