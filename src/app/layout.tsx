import type { Metadata } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { BRAND_LOGO } from "@/data/brand";
import {
  RealEstateJsonLd,
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  FaqJsonLd,
  WebSiteJsonLd,
  BreadcrumbJsonLd,
  AreaGuidesItemListJsonLd,
  TouristDestinationJsonLd,
} from "@/components/seo/JsonLd";
import { DevServiceWorkerCleanup } from "@/components/DevServiceWorkerCleanup";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  ...siteMetadata,
  icons: {
    icon: { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    apple: { url: "/favicon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body
        className={cn(
          dmSans.className,
          "bg-white text-[16px] leading-[1.65] text-ink antialiased md:text-[15px]"
        )}
      >
        <DevServiceWorkerCleanup />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <RealEstateJsonLd />
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <FaqJsonLd />
        <WebSiteJsonLd />
        <BreadcrumbJsonLd />
        <AreaGuidesItemListJsonLd />
        <TouristDestinationJsonLd />
        {children}
      </body>
    </html>
  );
}
