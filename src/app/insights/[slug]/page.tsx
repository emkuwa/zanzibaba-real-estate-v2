import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/data/articles";
import { SITE } from "@/data/site";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { ArticleJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `${SITE.url}/insights/${article.slug}`;

  return {
    title: `${article.title} | Zanzibaba Insights`,
    description: article.excerpt,
    alternates: { canonical: url },
    keywords: [...article.keywords],
    authors: [{ name: "Zanzibaba Advisory Team" }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
      images: [
        {
          url: `${SITE.url}${article.image.src}`,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`${SITE.url}${article.image.src}`],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const canonicalUrl = `${SITE.url}/insights/${article.slug}`;

  const lines = article.content.split("\n");
  const htmlParts: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("- ")) {
      if (!inList) {
        htmlParts.push('<ul class="mt-3 space-y-1">');
        inList = true;
      }
      const liContent = line.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      htmlParts.push(`<li class="ml-4 text-[15px] leading-relaxed text-body">${liContent}</li>`);
      continue;
    }

    if (inList) {
      htmlParts.push("</ul>");
      inList = false;
    }

    if (line.trim() === "") continue;

    if (line.startsWith("## ")) {
      htmlParts.push(`<h2 class="mt-8 mb-3 font-serif text-[1.5rem] font-semibold text-navy-heading md:text-2xl">${line.slice(3)}</h2>`);
    } else if (line.startsWith("### ")) {
      htmlParts.push(`<h3 class="mt-5 mb-2 font-serif text-[1.125rem] font-semibold text-navy-heading md:text-xl">${line.slice(4)}</h3>`);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      htmlParts.push(`<strong class="block mt-4 text-[16px] font-semibold text-navy-heading">${line.slice(2, -2)}</strong>`);
    } else {
      htmlParts.push(`<p class="mt-3 text-[15px] leading-[1.7] text-body">${line}</p>`);
    }
  }

  // Close any remaining list
  if (inList) htmlParts.push("</ul>");

  const contentHtml = htmlParts.join("\n");

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        imageUrl={`${SITE.url}${article.image.src}`}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
        url={canonicalUrl}
      />

      <main className="min-h-screen bg-white">
        {/* Hero / header */}
        <header className="relative">
          <div className="absolute inset-0 z-0">
            <LuxuryImage
              asset={article.image}
              overlay="cinematic"
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 bg-gradient-to-t from-navy-deep/90 via-navy-deep/60 to-navy-deep/30 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/insights"
                className="text-[14px] font-medium text-gold hover:underline"
              >
                ← Back to Insights
              </Link>

              <nav aria-label="Breadcrumb" className="mt-3">
                <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
                  <li>
                    <Link href="/" className="hover:text-gold">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/insights" className="hover:text-gold">Insights</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="truncate text-white/80 max-w-[200px]" aria-current="page">
                    {article.title}
                  </li>
                </ol>
              </nav>

              <span className="mt-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-gold">
                {article.category}
              </span>

              <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight md:text-[2.25rem] lg:text-4xl">
                {article.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[14px] text-white/70">
                <time dateTime={article.datePublished}>
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime} read</span>
                <span aria-hidden="true">·</span>
                <span>Zanzibaba Advisory Team</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Related links */}
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-serif text-xl font-semibold text-navy-heading">
              Related reading
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {article.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border px-4 py-2 text-[14px] font-medium text-body transition hover:border-gold/40 hover:text-gold"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-luxury-lg bg-navy-deep p-6 text-white md:p-8">
            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              Ready to invest in Zanzibar?
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/75">
              Our advisory team matches international investors with verified
              opportunities aligned to your budget, timeline, and investment goals.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/#qualify"
                className="rounded-full bg-gold px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-gold-light"
              >
                Get Personalized Recommendations
              </Link>
              <Link
                href="/opportunities"
                className="rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white/90 transition hover:border-gold/40 hover:text-gold"
              >
                Browse Opportunities
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
