import { cn } from "@/lib/utils";

export type PropertyBadgeVariant =
  | "featured"
  | "beachfront"
  | "investment"
  | "new-listing";

const LABELS: Record<PropertyBadgeVariant, string> = {
  featured: "Featured",
  beachfront: "Beachfront",
  investment: "Investment Opportunity",
  "new-listing": "New Listing",
};

export function PropertyBadge({
  variant,
  className,
}: {
  variant: PropertyBadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/40 bg-gold px-2.5 py-1",
        "text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm",
        "sm:text-[12px] sm:px-3",
        className
      )}
    >
      {LABELS[variant]}
    </span>
  );
}
