"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content, images } from "@/data/restaurantData";
import { EASE_LUXE, VIEWPORT } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ShimmerBorder } from "../motion/ShimmerBorder";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";
import { AccentText } from "../ui/AccentText";
import { AmbientGlow } from "../ui/Atmosphere";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/SectionHeading";

/** Banner horizontal: "Darka Ekskluzive e Shefit" (menu degustimi / darka private). */
export function PrivateDining() {
  const { t } = useLanguage();
  const p = content.privateDining;

  return (
    <section aria-labelledby="private-dining-title" data-nav="" className="relative py-8 sm:py-12">
      <AmbientGlow className="top-1/2 right-0 size-[44rem] -translate-y-1/2" />

      <FadeUp className="relative mx-auto max-w-[88rem] px-5 sm:px-8" y={40}>
        <ShimmerBorder className="overflow-hidden rounded-3xl bg-bronze/72 shadow-[0_50px_100px_-40px_rgb(0_0_0/1)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-12">
            {/* Titulli */}
            <div className="relative flex flex-col justify-center px-7 pt-12 sm:px-12 lg:col-span-4 lg:py-16 lg:pr-6">
              <Eyebrow>{t(p.eyebrow)}</Eyebrow>
              <h2
                id="private-dining-title"
                className="mt-6 font-serif text-[2.6rem] leading-[1.02] font-medium text-ivory sm:text-5xl xl:text-[3.6rem]"
              >
                <AccentText text={t(p.title)} />
              </h2>
            </div>

            {/* Përshkrimi + butoni */}
            <div className="relative flex flex-col justify-center px-7 pt-6 pb-12 sm:px-12 lg:col-span-4 lg:border-l lg:border-gold/15 lg:px-10 lg:py-16">
              <p className="text-base leading-[1.8] text-pretty text-muted">{t(p.text)}</p>
              <StaggerContainer as="ul" interval={0.1} delay={0.2} className="mt-6 space-y-2.5">
                {p.highlights.map((item) => (
                  <StaggerItem
                    as="li"
                    key={item.sq}
                    y={12}
                    className="flex items-center gap-3 text-sm text-ivory/90"
                  >
                    <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                    {t(item)}
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <ButtonLink href="#reservation" arrow className="mt-9 self-start">
                {t(p.cta)}
              </ButtonLink>
            </div>

            {/* Fotoja */}
            <div className="relative min-h-72 overflow-hidden sm:min-h-96 lg:col-span-4 lg:min-h-full">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.8, ease: EASE_LUXE }}
              >
                <Image
                  src={images.privateDining.src}
                  alt={t(images.privateDining.alt)}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-bronze/90 via-transparent to-transparent lg:bg-linear-to-r lg:from-bronze lg:via-bronze/20"
              />
            </div>
          </div>
        </ShimmerBorder>
      </FadeUp>
    </section>
  );
}
