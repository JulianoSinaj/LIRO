"use client";

import { motion, stagger, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE, VIEWPORT } from "@/lib/motion";

type ContainerTag = "div" | "ul" | "ol" | "section" | "dl";
type ItemTag = "div" | "li" | "article" | "span" | "p";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  /** Intervali mes fëmijëve (sekonda). */
  interval?: number;
  /** Vonesa para fëmijës së parë (sekonda). */
  delay?: number;
  as?: ContainerTag;
  /** Animo menjëherë (p.sh. kur ndryshon tab-i) në vend që të presë scroll-in. */
  immediate?: boolean;
};

/**
 * Kontejner që shfaq fëmijët <StaggerItem> njëri pas tjetrit kur hyn në ekran.
 */
export function StaggerContainer({
  children,
  className,
  interval = 0.12,
  delay = 0,
  as = "div",
  immediate = false,
}: StaggerContainerProps) {
  const Component = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: stagger(interval, { startDelay: delay }) } },
  };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: VIEWPORT })}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: ItemTag;
};

export function StaggerItem({ children, className, y = 30, as = "div" }: StaggerItemProps) {
  const Component = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE_LUXE } },
  };
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
