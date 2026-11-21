"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE, VIEWPORT } from "@/lib/motion";

type MotionTag = "div" | "section" | "article" | "header" | "li" | "p" | "span";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  /** Vonesa në sekonda. */
  delay?: number;
  /** Sa pikselë ngjitet elementi (y: 30 → 0). */
  y?: number;
  duration?: number;
  as?: MotionTag;
};

/**
 * Shfaq elementin me lëvizje të butë kur hyn në ekran:
 * `opacity 0 → 1`, `y 30 → 0`, 0.8s, ease [0.22, 1, 0.36, 1].
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 30,
  duration = DURATION,
  as = "div",
}: FadeUpProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_LUXE }}
    >
      {children}
    </Component>
  );
}
