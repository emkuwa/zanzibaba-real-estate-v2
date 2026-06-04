import Link from "next/link";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumb({
  crumbs,
  variant = "light",
}: {
  crumbs: Crumb[];
  variant?: "light" | "on-dark";
}) {
  const isDark = variant === "on-dark";
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-[13px]",
          isDark ? "text-white/60" : "text-muted"
        )}
      >
        <li>
          <Link
            href="/"
            className={cn("transition", isDark ? "hover:text-gold" : "hover:text-gold")}
          >
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {i === crumbs.length - 1 ? (
              <span
                className={cn(
                  "font-medium",
                  isDark ? "text-white" : "text-navy-heading"
                )}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="transition hover:text-gold"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
