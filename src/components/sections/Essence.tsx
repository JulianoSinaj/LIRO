"use client";

import { content, images } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ParallaxImage } from "../motion/ParallaxImage";
import { AccentText, Eyebrow } from "../ui/Typography";

/** "Thelbi" — foto e madhe arkitekture (7 kolona) + filozofia (5 kolona). */
export function Essence() {
  const { t } = useLanguage();
  const e = content.essence;

  return (
    <section id="essence" className="px-6 py-32 sm:px-10 lg:py-48">
      <div className="mx-auto grid max-w-[90rem] items-center gap-16 lg:grid-cols-12 lg:gap-0">
        <FadeUp className="lg:col-span-7">
          <ParallaxImage
            src={images.story.src}
            alt={t(images.story.alt)}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/5]"
          />
        </FadeUp>

        <div className="lg:col-span-4 lg:col-start-9">
          <FadeUp>
            <Eyebrow>{t(e.eyebrow)}</Eyebrow>
            <h2 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-light text-balance sm:text-6xl">
              <AccentText text={t(e.title)} />
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-10 text-[15px] leading-[1.9] text-pretty text-ivory/75">{t(e.text)}</p>
          </FadeUp>

          <ol className="mt-16 space-y-8">
            {e.values.map((value, i) => (
              <FadeUp as="li" key={i} delay={0.15 + i * 0.1} className="border-t border-gold/30 pt-5">
                <span className="block text-[11px] tracking-[0.25em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-display text-2xl font-light italic">
                  {t(value)}
                </span>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
