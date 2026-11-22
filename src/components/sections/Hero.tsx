"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { content, images } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useIntroRevealed } from "../CinematicIntro";
import { useLanguage } from "../LanguageProvider";
import { parseAccent, plainText } from "../ui/AccentText";
import { Eyebrow } from "../ui/SectionHeading";

/**
 * Titulli shfaqet fjalë pas fjale, sikur ngrihet nga një "maskë".
 * Fjalët e theksuara (*Fine Dining*) mbahen bashkë në të njëjtin rresht.
 */
function AnimatedTitle({ text, delay = 0.35 }: { text: string; delay?: number }) {
  const revealed = useIntroRevealed();
  let index = 0;
  const groups = parseAccent(text)
    .map((part) => ({
      accent: part.accent,
      words: part.text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, i: index++ })),
    }))
    .filter((group) => group.words.length > 0);

  const renderWord = (word: string, i: number, accent: boolean) => (
    <span
      key={i}
      className="-mr-[0.12em] -ml-[0.12em] inline-block overflow-hidden pr-[0.18em] pb-[0.14em] pl-[0.12em] -mb-[0.14em] align-bottom"
    >
      <motion.span
        className={cn(
          "inline-block italic-bleed",
          accent ? "text-gold-gradient italic" : "text-pearl",
        )}
        initial={{ y: "110%", opacity: 0 }}
        animate={revealed ? { y: "0%", opacity: 1 } : undefined}
        transition={{ duration: 1.1, delay: delay + i * 0.07, ease: EASE_LUXE }}
      >
        {word}
      </motion.span>
    </span>
  );

  return (
    <>
      <span className="sr-only">{plainText(text)}</span>
      <span aria-hidden="true">
        {groups.map((group, g) => (
          <Fragment key={g}>
            {g > 0 && " "}
            {group.accent ? (
              <span className="whitespace-nowrap">
                {group.words.map(({ word, i }, w) => (
                  <Fragment key={i}>
                    {w > 0 && " "}
                    {renderWord(word, i, true)}
                  </Fragment>
                ))}
              </span>
            ) : (
              group.words.map(({ word, i }, w) => (
                <Fragment key={i}>
                  {w > 0 && " "}
                  {renderWord(word, i, false)}
                </Fragment>
              ))
            )}
          </Fragment>
        ))}
      </span>
    </>
  );
}

/* Animacionet e hyrjes presin derisa intro kinematik të zbehet (`revealed`). */
const fade = (delay: number, revealed: boolean) => ({
  initial: { opacity: 0, y: 30 },
  animate: revealed ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: 0.8, delay, ease: EASE_LUXE },
});

export function Hero() {
  const { t, lang } = useLanguage();
  const h = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const revealed = useIntroRevealed();

  /* Parallax: fotoja lëviz më ngadalë se faqja, teksti zbehet gjatë scroll-it. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-nav="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden lg:min-h-[calc(100svh-6.5rem)]"
    >
      {/* Fotoja — Ken Burns (zoom i ngadaltë) + parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={{ scale: [1.18, 1.06, 1.12] }}
          transition={{
            duration: 24,
            times: [0, 0.55, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Image
            src={images.hero.src}
            alt={t(images.hero.alt)}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </motion.div>
      </motion.div>

      {/* Overlay: errësirë nga e majta në të djathtë + vinjetë + shkrirje me faqen poshtë */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-ink/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,transparent_20%,rgb(11_9_8/0.55)_75%)]"
      />
      <div
        aria-hidden="true"
        className="glow-amber absolute top-[5%] -left-60 -z-10 size-[40rem] rounded-full"
      />
      {/* Shkrirja me faqen poshtë — e fundit, që të mbulojë edhe shkëlqimin */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-linear-to-t from-ink via-ink/75 to-transparent"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[88rem] px-5 pt-36 pb-40 sm:px-8 sm:pt-40 lg:pt-28 lg:pb-36"
      >
        <div className="max-w-[44rem]">
          <motion.div {...fade(0.15, revealed)}>
            <Eyebrow>{t(h.eyebrow)}</Eyebrow>
          </motion.div>

          <h1
            key={lang}
            className="mt-7 font-display text-[2.5rem] leading-[1.06] font-medium tracking-[-0.01em] text-ivory sm:text-[3.4rem] lg:text-[4.1rem]"
          >
            <AnimatedTitle text={t(h.title)} />
          </h1>

          <motion.p
            {...fade(0.9, revealed)}
            className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-ivory/75 sm:text-lg"
          >
            {t(h.subtitle)}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
