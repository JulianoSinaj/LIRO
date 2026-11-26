"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { content, images } from "@/data/restaurantData";
import { EASE_LUXE } from "@/lib/motion";
import { useIntroRevealed } from "../CinematicIntro";
import { useLanguage } from "../LanguageProvider";
import { ButtonLink } from "../ui/Button";
import { AccentText, Eyebrow } from "../ui/Typography";

/* Animacionet e hyrjes presin derisa intro kinematik të zbehet (`revealed`). */
const reveal = (delay: number, revealed: boolean) => ({
  initial: { opacity: 0, y: 20 },
  animate: revealed ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: 1.2, delay, ease: EASE_LUXE },
});

export function Hero() {
  const { t } = useLanguage();
  const h = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const revealed = useIntroRevealed();

  /* Parallax i lehtë: fotoja lëviz më ngadalë se faqja. */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={revealed ? { scale: 1 } : undefined}
          transition={{ duration: 2.8, ease: EASE_LUXE }}
        >
          <Image
            src={images.hero.src}
            alt={t(images.hero.alt)}
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Overlay i butë — fotoja merr frymë, teksti mbetet i lexueshëm */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-ink to-transparent"
      />

      <div className="flex w-full max-w-5xl flex-col items-center px-6 pt-28 pb-20 text-center sm:px-10">
        <motion.div {...reveal(0.1, revealed)}>
          <Eyebrow>{t(h.eyebrow)}</Eyebrow>
        </motion.div>

        {/* Emri i restorantit — në qendër të faqes */}
        <motion.p
          {...reveal(0.3, revealed)}
          aria-hidden="true"
          className="mt-8 font-display text-[5.5rem] leading-[0.9] font-light tracking-[0.06em] text-gold sm:text-[9rem] lg:text-[12rem]"
        >
          LI-RO
        </motion.p>

        <motion.h1
          {...reveal(0.6, revealed)}
          className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.15] font-light text-balance text-ivory sm:text-5xl"
        >
          <span className="sr-only">Taverna Li-Ro — </span>
          <AccentText text={t(h.title)} />
        </motion.h1>

        <motion.p
          {...reveal(0.85, revealed)}
          className="mt-8 max-w-md text-[15px] leading-relaxed text-pretty text-ivory/85"
        >
          {t(h.subtitle)}
        </motion.p>

        <motion.div {...reveal(1.05, revealed)} className="mt-12">
          <ButtonLink href="#reservation">{t(h.cta)}</ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
