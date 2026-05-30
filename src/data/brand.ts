export const BRAND_LOGO = {
  /** Official horizontal logo — navy wordmark, for light backgrounds */
  primary: {
    svg: "/brand/logos/zanzibaba-real-estate-horizontal.svg",
    png: "/brand/logos/zanzibaba-real-estate-horizontal.png",
    png2x: "/brand/logos/zanzibaba-real-estate-horizontal@2x.png",
  },
  /** Reverse wordmark — white on dark backgrounds */
  reverse: {
    svg: "/brand/logos/zanzibaba-real-estate-reverse.svg",
    png: "/brand/logos/zanzibaba-real-estate-reverse.png",
    png2x: "/brand/logos/zanzibaba-real-estate-reverse@2x.png",
  },
  /** Square icon emblem */
  icon: {
    svg: "/brand/logos/zanzibaba-real-estate-icon.svg",
    png: "/brand/favicons/favicon-512.png",
  },
  favicons: {
    icon32: "/brand/favicons/favicon-32.png",
    apple180: "/brand/favicons/favicon-180.png",
    icon512: "/brand/favicons/favicon-512.png",
  },
  og: "/brand/og-zanzibaba-real-estate.png",
  alt: "Zanzibaba Real Estate",
  /** Master aspect ratio width / height (1024 × 341) */
  aspectRatio: 1024 / 341,
  /** Display heights in px — width derived from aspect ratio */
  sizes: {
    navbarMobile: 46,
    navbarDesktop: 52,
    footer: 48,
    mobileMenu: 44,
  },
} as const;

export type BrandLogoVariant = "primary" | "reverse" | "icon";

export function brandLogoSrc(variant: BrandLogoVariant): string {
  switch (variant) {
    case "reverse":
      return BRAND_LOGO.reverse.png;
    case "icon":
      return BRAND_LOGO.icon.png;
    default:
      return BRAND_LOGO.primary.png;
  }
}

export function brandLogoSrcSet(variant: BrandLogoVariant): string | undefined {
  switch (variant) {
    case "reverse":
      return `${BRAND_LOGO.reverse.png} 1x, ${BRAND_LOGO.reverse.png2x} 2x`;
    case "icon":
      return undefined;
    default:
      return `${BRAND_LOGO.primary.png} 1x, ${BRAND_LOGO.primary.png2x} 2x`;
  }
}

export function brandLogoDimensions(height: number) {
  return {
    height,
    width: Math.round(height * BRAND_LOGO.aspectRatio),
  };
}
