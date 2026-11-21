"use client";

import { ChefHat, Flame, Leaf, Wine, type LucideIcon } from "lucide-react";
import { content, type FeatureIcon } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ShimmerBorder } from "../motion/ShimmerBorder";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";

const icons: Record<FeatureIcon, LucideIcon> = {
  chef: ChefHat,
  wine: Wine,
  leaf: Leaf,
  flame: Flame,
};

/* Ndarësit: 2×2 në celular, një rresht në desktop. */
const cellBorders = [
  "border-r border-b lg:border-b-0",
  "border-b lg:border-b-0 lg:border-r",
  "border-r",
  "",
];

/** Shirit xhami që "noton" mbi fundin e hero-s, me 4 veçoritë e restorantit. */
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
            className="grid grid-cols-2 lg:grid-cols-4"
          >
            {content.features.map((feature, i) => {
              const Icon = icons[feature.icon];
              return (
                <StaggerItem
                  as="li"
                  key={feature.icon}
                  y={16}
                  className={cn(
                    "group flex flex-col items-center gap-4 border-gold/12 px-4 py-7 text-center sm:px-6 lg:flex-row lg:gap-5 lg:py-8 lg:text-left",
                    cellBorders[i],
                  )}
                >
                  <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.04] text-gold-soft transition-colors duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
                    <span
                      aria-hidden="true"
                      className="absolute inset-1 rounded-full border border-gold/10"
                    />
                    <Icon className="size-6" strokeWidth={1.1} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg leading-tight font-medium text-ivory sm:text-xl">
                      {t(feature.title)}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-muted">
                      {t(feature.text)}
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
