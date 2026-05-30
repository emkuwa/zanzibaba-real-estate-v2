"use client";

export function MotionReveal({
  children,
  className,
  delay: _delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

export { AnimatedCounter } from "./AnimatedCounter";
