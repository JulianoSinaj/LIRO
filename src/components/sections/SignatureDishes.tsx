"use client";

import Image from "next/image";
import { content, signatureDishes } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { SectionHeading } from "../ui/Typography";

/** Tre pjata të ekspozuara si në galeri arti — pa kuti, vetëm foto dhe tipografi. */
export function SignatureDishes() {
  const { t } = useLanguage();
  const s = content.signature;

  return (
    <section id="signature" className="border-t border-gold/15 px-6 py-16 sm:px-16 sm:py-20 lg:px-28 lg:py-24 xl:px-40">
      <div className="mx-auto max-w-[68rem]">
        <SectionHeading eyebrow={t(s.eyebrow)} title={t(s.title)} className="max-w-3xl" />

        <div className="mt-12 grid gap-14 md:grid-cols-3 md:gap-12 lg:mt-16">
          {signatureDishes.map((dish, i) => (
            <FadeUp
              as="article"
              key={dish.id}
              delay={i * 0.12}
              className={cn(i === 1 && "md:mt-16")}
            >
              <div className="group relative aspect-[3/4] overflow-hidden bg-ink-soft">
                <Image
                  src={dish.image.src}
                  alt={t(dish.image.alt)}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-8 font-display text-3xl font-light sm:text-[2.1rem]">
                {t(dish.name)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(dish.description)}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
