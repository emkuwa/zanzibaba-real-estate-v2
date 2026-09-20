import Link from "next/link";
import { SITE } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function EcosystemPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fbfaf6]">
        <header className="border-b border-border bg-[#f7f4ed] px-5 py-12 text-navy-heading sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link href="/" className="text-[12px] font-semibold uppercase tracking-[.1em] text-gold hover:underline">
              ← Zanzibar Investment Ecosystem
            </Link>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              {eyebrow}
            </p>
            <h1 className="mt-2 max-w-3xl font-serif text-[2.45rem] font-medium leading-[.98] tracking-[-.035em] md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-body">{description}</p>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-14 lg:px-8">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function EcosystemMeta({ title, description }: { title: string; description: string }) {
  return { title, description, openGraph: { title: `${title} | ${SITE.name}`, description } };
}
