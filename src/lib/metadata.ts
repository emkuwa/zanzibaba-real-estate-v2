import type { Metadata } from "next";
import { SITE, SEO_KEYWORDS } from "@/data/site";
import { BRAND_LOGO } from "@/data/brand";

const title =
  "Zanzibar Investment Ecosystem | Real Estate, Intelligence & AI Concierge | Zanzibaba";
const description = SITE.tagline;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Zanzibaba Investment Ecosystem",
  },
  description,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.legalName }],
  creator: SITE.name,
  publisher: SITE.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
    images: [
      {
        url: BRAND_LOGO.og,
        width: 1200,
        height: 630,
        alt: BRAND_LOGO.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [BRAND_LOGO.og],
  },
  category: "Real Estate",
};
