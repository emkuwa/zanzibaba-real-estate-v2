"use client";

import { type FC, type MouseEvent, type ReactNode } from "react";

type TrackedLinkProps = {
  event: string;
  category?: string;
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const TrackedLink: FC<TrackedLinkProps> = ({ 
  event, 
  category = "cta", 
  children, 
  onClick,
  className,
  href,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, { event_category: category, event_label: event });
    }
    onClick?.();
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

type TrackedAnchorProps = {
  event: string;
  category?: string;
  href: string;
  target?: string;
  rel?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const TrackedAnchor: FC<TrackedAnchorProps> = ({
  event,
  category = "cta",
  href,
  target,
  rel,
  children,
  className,
  onClick,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, { event_category: category, event_label: event });
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};