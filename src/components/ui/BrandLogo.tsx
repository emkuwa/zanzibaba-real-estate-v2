"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BRAND_LOGO,
  brandLogoDimensions,
  brandLogoSrc,
  brandLogoSrcSet,
  type BrandLogoVariant,
} from "@/data/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  height?: number;
  className?: string;
  href?: string;
  /** Crossfade helper for navbar — keeps layout stable */
  visible?: boolean;
};

export function BrandLogo({
  variant = "primary",
  height = BRAND_LOGO.sizes.navbarMobile,
  className,
  href,
  visible = true,
}: BrandLogoProps) {
  const isIcon = variant === "icon";
  const intrinsic = isIcon
    ? { width: height, height }
    : brandLogoDimensions(height);

  const [src, setSrc] = useState(() => brandLogoSrc(variant));
  const srcSet = brandLogoSrcSet(variant);

  const classNames = cn(
    "block h-auto max-w-none object-contain object-left transition-opacity duration-300",
    isIcon ? "aspect-square" : "",
    !visible && "pointer-events-none opacity-0",
    visible && "opacity-100",
    className ?? (isIcon ? "h-9 w-9" : "h-9 w-auto md:h-11")
  );

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      alt={visible ? BRAND_LOGO.alt : ""}
      aria-hidden={!visible}
      width={intrinsic.width}
      height={intrinsic.height}
      decoding="async"
      fetchPriority="low"
      className={classNames}
      onError={() => {
        const fallback =
          variant === "icon"
            ? BRAND_LOGO.icon.svg
            : variant === "reverse"
              ? BRAND_LOGO.reverse.svg
              : BRAND_LOGO.primary.svg;
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center py-0.5"
        aria-label={BRAND_LOGO.alt}
      >
        {image}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{image}</span>;
}
