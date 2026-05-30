"use client";

import { cn } from "@/lib/utils";

/** Horizontal swipe carousel on mobile; grid/block on md+ */
export function MobileCarousel({
  children,
  className,
  itemClassName,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div
      className={cn(
        "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2",
        "scrollbar-hide md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0",
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={cn(
                "w-[85vw] shrink-0 snap-center md:w-auto md:shrink",
                itemClassName
              )}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
