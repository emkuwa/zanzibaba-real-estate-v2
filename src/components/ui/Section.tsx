import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-7 md:py-12 lg:py-14",
        dark ? "bg-navy-deep text-white" : "bg-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-6 max-w-3xl md:mb-8",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && <p className="luxury-eyebrow mb-2 md:mb-3">{eyebrow}</p>}
      <h2
        className={cn(
          "font-serif text-[1.875rem] font-semibold leading-[1.15] sm:text-[2rem] md:text-4xl lg:text-[2.25rem]",
          light ? "text-white" : "text-[#0B2A6B]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-[16px] leading-[1.7] md:mt-4 md:text-lg md:leading-relaxed",
            light ? "text-white" : "text-[#374151]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("luxury-card-glass", className)}>{children}</div>
  );
}
