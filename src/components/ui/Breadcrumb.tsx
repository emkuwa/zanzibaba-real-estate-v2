import Link from "next/link";

interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
        <li>
          <Link href="/" className="transition hover:text-gold">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-navy-heading font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="transition hover:text-gold">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
