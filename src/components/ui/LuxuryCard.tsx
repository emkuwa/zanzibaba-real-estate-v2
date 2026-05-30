import { cn } from "@/lib/utils";

type LuxuryCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "glass";
};

export function LuxuryCard({
  children,
  className,
  variant = "light",
}: LuxuryCardProps) {
  return (
    <div
      className={cn(
        variant === "light" && "luxury-card",
        variant === "dark" && "luxury-card-dark",
        variant === "glass" && "luxury-card-glass",
        className
      )}
    >
      {children}
    </div>
  );
}
