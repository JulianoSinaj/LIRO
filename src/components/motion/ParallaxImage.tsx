"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Klasat e kornizës — p.sh. `aspect-[4/5]`. */
  className?: string;
  /** Sa lëviz fotoja brenda kornizës (përqindje e lartësisë). */
  strength?: number;
  /** Zmadhim shumë i ngadaltë kur kalon miu sipër. */
  zoomOnHover?: boolean;
};

/**
 * Foto me parallax të lehtë: lëviz pak më ngadalë se faqja brenda kornizës së vet.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  strength = 6,
  zoomOnHover = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = reduceMotion ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);

  return (
    <div ref={ref} className={cn("group relative overflow-hidden bg-ink-soft", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover",
            zoomOnHover &&
              "transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
          )}
        />
      </motion.div>
    </div>
  );
}
