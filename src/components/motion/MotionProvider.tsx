"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Konfigurimi global i Framer Motion.
 * `reducedMotion="user"`: nëse përdoruesi ka zgjedhur "Reduce motion" në pajisje,
 * lëvizjet (zhvendosje, zmadhime) çaktivizohen dhe mbetet vetëm fade-i.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
