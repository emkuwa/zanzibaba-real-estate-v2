import { SITE } from "@/data/site";
import { BRAND_LOGO } from "@/data/brand";
import { ALL_FAQ_ITEMS } from "@/data/authority";
import { AREA_GUIDES } from "@/data/authority";

export function RealEstateJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.tagline,
    telephone: SITE.phoneTel,
    email: SITE.email,
    image: `${SITE.url}${BRAND_LOGO.og}`,
    logo: `${SITE.url}${BRAND_LOGO.primary.png}`,
    areaServed: AREA_GUIDES.map((a) => ({
      "@type": "Place",
      name: `${a.name}, Zanzibar`,
    })),
    address: SITE.offices.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.location,
      addressCountry: "TZ",
    })),
    sameAs: [
      "https://www.facebook.com/ZanzibabaCompanyLimited",
      "https://www.instagram.com/zanzibaragroup",
      "https://www.linkedin.com/company/zanzibaba-company-limited",
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Zanzibar authority advisory — real estate, tourism, investment & relocation",
        description:
          "Luxury real estate funnel, tourism intelligence, investment discovery, relocation guidance, and business opportunities for international audiences.",
        areaServed: "Zanzibar, Tanzania",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${BRAND_LOGO.primary.png}`,
    description: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phoneTel,
    address: SITE.offices.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.location,
      addressRegion: "Zanzibar",
      addressCountry: "TZ",
    })),
    sameAs: [
      "https://www.facebook.com/ZanzibabaCompanyLimited",
      "https://www.instagram.com/zanzibaragroup",
      "https://www.linkedin.com/company/zanzibaba-company-limited",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    image: `${SITE.url}${BRAND_LOGO.og}`,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paje, Zanzibar",
      addressCountry: "TZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.262,
      longitude: 39.543,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: "Zanzibar Authority Platform",
    url: SITE.url,
    description: SITE.tagline,
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}${BRAND_LOGO.primary.png}`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/#qualify?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Why Zanzibar", item: `${SITE.url}/#why-zanzibar` },
      { "@type": "ListItem", position: 3, name: "Investment", item: `${SITE.url}/#invest` },
      { "@type": "ListItem", position: 4, name: "Area Guides", item: `${SITE.url}/#areas` },
      { "@type": "ListItem", position: 5, name: "Tourism", item: `${SITE.url}/#tourism` },
      { "@type": "ListItem", position: 6, name: "Insights", item: `${SITE.url}/insights` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function AreaGuidesItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zanzibar Area Guides",
    description: "Premium area intelligence for property, tourism, and relocation in Zanzibar.",
    numberOfItems: AREA_GUIDES.length,
    itemListElement: AREA_GUIDES.map((area, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${area.name} Zanzibar Area Guide`,
      description: area.description,
      url: `${SITE.url}/#area-${area.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
