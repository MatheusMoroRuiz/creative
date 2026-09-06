"use client";

import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/cn";
import type { ReactNode, ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "reveal" | "iris";
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  variant = "reveal",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn(variant, inView && "is-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
