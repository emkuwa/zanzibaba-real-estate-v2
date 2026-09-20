import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-deep text-white hover:bg-navy shadow-sm border border-navy-deep",
  secondary:
    "bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20",
  ghost: "bg-transparent text-navy hover:bg-surface border border-transparent",
  gold: "bg-navy-deep text-white hover:bg-navy shadow-sm border border-navy-deep",
  outline:
    "bg-transparent text-navy border border-navy/20 hover:border-gold hover:text-gold",
};

const sizes = {
  sm: "min-h-[44px] px-4 py-2.5 text-sm",
  md: "min-h-[48px] px-6 py-3 text-base md:text-sm",
  lg: "min-h-[52px] px-6 py-3.5 text-base md:px-8 md:py-4",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[3px] font-sans font-semibold uppercase tracking-[.1em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
