"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ShimmerBorderProps = {
  children: ReactNode;
  /** Klasat e kontejnerit (p.sh. `rounded-2xl glass`). Rrumbullakimi trashëgohet nga kufiri. */
  className?: string;
  /** Sa sekonda zgjat një kalim drite. */
  duration?: number;
  /** Pushimi mes dy kalimeve (sekonda). */
  pause?: number;
};

/**
 * Kufi i hollë ari me një shkëlqim drite që rrëshqet periodikisht përgjatë tij —
 * si drita që bie mbi një buzë metali të lëmuar.
 */
export function ShimmerBorder({
  children,
  className,
  duration = 3.2,
  pause = 2.8,
}: ShimmerBorderProps) {
  return (
    <div className={cn("relative isolate", className)}>
      {/* kufiri statik */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-gold/25"
      />
      {/* drita që lëviz — e dukshme vetëm brenda unazës 1px */}
      <span
        aria-hidden="true"
        className="mask-ring pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] p-px"
      >
        <motion.span
          className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(100deg,transparent_10%,rgb(243_224_181/0.95)_50%,transparent_90%)]"
          initial={{ x: "-100%" }}
          animate={{ x: "400%" }}
          transition={{
            duration,
            ease: [0.45, 0, 0.55, 1],
            repeat: Infinity,
            repeatDelay: pause,
          }}
        />
      </span>
      {children}
    </div>
  );
}
