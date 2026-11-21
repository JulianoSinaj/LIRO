"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { content, images } from "@/data/restaurantData";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { parseAccent, plainText } from "../ui/AccentText";
import { ButtonLink } from "../ui/Button";
import { Eyebrow } from "../ui/SectionHeading";

/**
 * Titulli shfaqet fjalë pas fjale, sikur ngrihet nga një "maskë".
 * Fjalët e theksuara (*Fine Dining*) mbahen bashkë në të njëjtin rresht.
 */
function AnimatedTitle({ text, delay = 0.35 }: { text: string; delay?: number }) {
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
      className="inline-block overflow-hidden pr-[0.06em] pb-[0.1em] -mb-[0.1em] align-bottom"
    >
      <motion.span
        className={accent ? "inline-block font-serif italic text-gold-soft" : "inline-block"}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
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

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_LUXE },
});

export function Hero() {
  const { t, lang } = useLanguage();
  const h = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
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
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-linear-to-t from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="glow-amber absolute top-1/4 -left-60 -z-10 size-[44rem] rounded-full"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[88rem] px-5 pt-36 pb-40 sm:px-8 sm:pt-40 lg:pb-44"
      >
        <div className="max-w-[44rem]">
          <motion.div {...fade(0.15)}>
            <Eyebrow>{t(h.eyebrow)}</Eyebrow>
          </motion.div>

          <h1
            key={lang}
            className="mt-7 font-serif text-[2.9rem] leading-[1.02] font-medium text-ivory sm:text-[4rem] lg:text-[4.75rem]"
          >
            <AnimatedTitle text={t(h.title)} />
          </h1>

          <motion.p
            {...fade(0.9)}
            className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-ivory/75 sm:text-lg"
          >
            {t(h.subtitle)}
          </motion.p>

          <motion.div {...fade(1.05)} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#reservation" arrow>
              {t(h.primaryCta)}
            </ButtonLink>
            <ButtonLink href="#story" variant="glass">
              {t(h.secondaryCta)}
            </ButtonLink>
          </motion.div>

          {/* Treguesit minimalë */}
          <motion.dl
            {...fade(1.25)}
            className="mt-14 grid max-w-xl grid-cols-3 divide-x divide-gold/20"
          >
            {h.stats.map((stat) => (
              <div
                key={stat.label.sq}
                className="flex flex-col-reverse gap-2 px-3 first:pl-0 sm:px-6"
              >
                <dt className="text-[10px] leading-snug font-semibold tracking-[0.18em] text-muted uppercase sm:text-[11px]">
                  {t(stat.label)}
                </dt>
                <dd className="flex items-center gap-1.5 font-serif text-[1.7rem] leading-none text-ivory sm:text-4xl">
                  {stat.value}
                  {stat.star && (
                    <>
                      <Star
                        className="size-4 fill-gold text-gold sm:size-5"
                        strokeWidth={0}
                        aria-hidden="true"
                      />
                      <span className="sr-only">/ 5</span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Treguesi i scroll-it */}
      <motion.a
        href="#story"
        aria-label={t(h.scroll)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute right-8 bottom-28 hidden flex-col items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-gold/70 uppercase [writing-mode:vertical-rl] lg:flex"
      >
        {t(h.scroll)}
        <span className="relative h-16 w-px overflow-hidden bg-gold/15">
          <span className="animate-scroll-line absolute inset-0 bg-gold" />
        </span>
      </motion.a>
    </section>
  );
}
