import { Cormorant_Garamond, DM_Sans } from "next/font/google";

/** Primary UI font — preloaded; applied via className on body in layout.tsx */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Display serif — variable only; no preload (headings below hero image LCP) */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});
