import type { Metadata } from "next";
import { SITE, SEO_KEYWORDS } from "@/data/site";
import { BRAND_LOGO } from "@/data/brand";

const defaultTitle =
  "Zanzibar Investment Ecosystem | Real Estate, Intelligence & AI Concierge | Zanzibaba";
const defaultDescription = SITE.tagline;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: "%s | Zanzibaba — Zanzibar Investment Ecosystem",
  },
  description: defaultDescription,
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
    title: defaultTitle,
    description: defaultDescription,
    determiner: "",
    images: [
      {
        url: BRAND_LOGO.og,
        width: 1200,
        height: 630,
        alt: "Zanzibaba Real Estate — Zanzibar Investment Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zanzibaragroup",
    creator: "@zanzibaragroup",
    title: defaultTitle,
    description: defaultDescription,
    images: [BRAND_LOGO.og],
  },
  category: "Real Estate",
  classification: "Real Estate Investment Platform — Zanzibar, Tanzania",
  other: {
    "geo.region": "TZ-ZNZ",
    "geo.placename": "Zanzibar, Tanzania",
    "geo.position": "-6.262;39.543",
    "ICBM": "-6.262, 39.543",
  },
};
