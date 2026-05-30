"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode, type SyntheticEvent } from "react";
import { cn } from "@/lib/utils";
import type { VisualAsset } from "@/data/visual-system";

type OverlayVariant = "none" | "cinematic" | "card" | "minimal" | "dark";

const OVERLAY_STYLES: Record<OverlayVariant, string> = {
  none: "",
  cinematic:
    "bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-navy-deep/85",
  card: "bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent",
  minimal: "bg-gradient-to-t from-black/50 to-transparent",
  dark: "bg-navy-deep/40",
};

export type LuxuryImageProps = {
  asset: VisualAsset;
  overlay?: OverlayVariant;
  animate?: boolean;
  containerClassName?: string;
  imageClassName?: string;
  children?: ReactNode;
} & Omit<ImageProps, "src" | "alt">;

export function LuxuryImage({
  asset,
  overlay = "card",
  animate: _animate = false,
  containerClassName,
  imageClassName,
  children,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  fill,
  className,
  onError,
  onLoad,
  ...props
}: LuxuryImageProps) {
  const [src, setSrc] = useState(asset.src);
  const useFill = fill ?? true;

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    onLoad?.(event);
  }

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    event.preventDefault();
    if (src !== asset.fallback) {
      setSrc(asset.fallback);
    }
    onError?.(event);
  }

  const containerClass = cn(
    "overflow-hidden image-placeholder",
    useFill ? "absolute inset-0 h-full w-full min-h-[1px]" : "relative min-h-[120px]",
    containerClassName
  );

  return (
    <div className={containerClass}>
      <Image
        src={src}
        alt={asset.alt}
        fill={useFill}
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName, className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {overlay !== "none" && (
        <div
          className={cn("pointer-events-none absolute inset-0 z-[1]", OVERLAY_STYLES[overlay])}
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}

export function LuxuryBackground({
  asset,
  overlay = "cinematic",
  priority = false,
  className,
  children,
}: {
  asset: VisualAsset;
  overlay?: OverlayVariant;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative h-full min-h-[100svh] w-full", className)}>
      <LuxuryImage
        asset={asset}
        overlay={overlay}
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {children}
    </div>
  );
}
