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
      <main>
        <header className="border-b border-border bg-navy-deep px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link href="/" className="text-[14px] font-medium text-gold hover:underline">
              ← Zanzibar Investment Ecosystem
            </Link>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
              {eyebrow}
            </p>
            <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-tight md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-white/80">{description}</p>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function EcosystemMeta({ title, description }: { title: string; description: string }) {
  return { title, description, openGraph: { title: `${title} | ${SITE.name}`, description } };
}
