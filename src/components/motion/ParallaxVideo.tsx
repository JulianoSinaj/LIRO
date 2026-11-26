"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

type ParallaxVideoProps = {
  src: string;
  /** Foto që shfaqet derisa video të ngarkohet. */
  poster?: string;
  /** Klasat e kornizës — p.sh. `aspect-[4/5]`. */
  className?: string;
  /** Sa lëviz videoja brenda kornizës (përqindje e lartësisë). */
  strength?: number;
};

/**
 * Video dekorative që luan pa ndërprerje në loop (pa zë, pa kontrolle),
 * me të njëjtin parallax të lehtë si ParallaxImage.
 */
export function ParallaxVideo({ src, poster, className, strength = 6 }: ParallaxVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = reduceMotion ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-ink-soft", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
