"use client";

import { Flame, Leaf, Star, type LucideIcon } from "lucide-react";
import { content, type FeatureIcon } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ShimmerBorder } from "../motion/ShimmerBorder";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";

const icons: Record<FeatureIcon, LucideIcon> = {
  leaf: Leaf,
  flame: Flame,
  star: Star,
};

/** Shirit xhami që "noton" mbi fundin e hero-s, me 3 treguesit e restorantit. */
export function FeatureBar() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 -mt-20 px-5 sm:-mt-24 sm:px-8">
      <FadeUp className="mx-auto max-w-6xl" delay={0.2}>
        <ShimmerBorder className="rounded-2xl bg-bronze/72 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95)] backdrop-blur-xl backdrop-saturate-150">
          <StaggerContainer
            as="ul"
            interval={0.1}
            delay={0.3}
            className="grid grid-cols-3 divide-x divide-gold/12"
          >
            {content.features.map((feature) => {
              const Icon = icons[feature.icon];
              return (
                <StaggerItem
                  as="li"
                  key={feature.icon}
                  y={16}
                  className="group flex flex-col items-center gap-3 px-2 py-6 text-center sm:gap-4 sm:px-6 lg:flex-row lg:justify-center lg:gap-5 lg:py-8 lg:text-left"
                >
                  <span className="relative hidden size-14 shrink-0 sm:flex items-center justify-center rounded-full border border-gold/30 bg-gold/[0.04] text-gold-soft transition-colors duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
                    <span
                      aria-hidden="true"
                      className="absolute inset-1 rounded-full border border-gold/10"
                    />
                    <Icon className="size-6" strokeWidth={1.1} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-[1.45rem] leading-none text-ivory sm:text-3xl">
                      {feature.value}
                      {feature.icon === "star" && <span className="sr-only"> / 5</span>}
                    </span>
                    <span className="mt-2 block text-[10px] leading-snug font-semibold tracking-[0.16em] text-muted uppercase sm:text-[11px] sm:tracking-[0.18em]">
                      {t(feature.label)}
                    </span>
                  </span>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </ShimmerBorder>
      </FadeUp>
    </div>
  );
}
