"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE, VIEWPORT } from "@/lib/motion";

type MotionTag = "div" | "section" | "article" | "header" | "li" | "p" | "span" | "figure";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  /** Vonesa në sekonda. */
  delay?: number;
  as?: MotionTag;
};

/** Zbulim i butë gjatë scroll-it: `opacity 0 → 1`, `y 20 → 0`, 0.9s. */
export function FadeUp({ children, className, delay = 0, as = "div" }: FadeUpProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, delay, ease: EASE_LUXE }}
    >
      {children}
    </Component>
  );
}
