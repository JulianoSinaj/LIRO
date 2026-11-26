"use client";

import { content } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ParallaxVideo } from "../motion/ParallaxVideo";
import { AccentText, Eyebrow } from "../ui/Typography";

/** "Thelbi" — video në loop (6 kolona) + filozofia (5 kolona). */
export function Essence() {
  const { t } = useLanguage();
  const e = content.essence;

  return (
    <section id="essence" className="px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24 xl:px-28">
      <div className="mx-auto grid max-w-[80rem] items-center gap-12 lg:grid-cols-12 lg:gap-0">
        <FadeUp className="mx-auto w-full max-w-sm lg:col-span-6 lg:col-start-1 lg:max-w-none">
          <ParallaxVideo
            src="/video/loop-video.mp4?v=3"
            poster="/video/loop-video-poster.jpg?v=3"
            className="aspect-[732/842]"
          />
        </FadeUp>

        <div className="lg:col-span-5 lg:col-start-8">
          <FadeUp>
            <Eyebrow>{t(e.eyebrow)}</Eyebrow>
            <h2 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-light text-balance sm:text-6xl">
              <AccentText text={t(e.title)} />
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-8 text-[15px] leading-[1.9] text-pretty text-ivory/75">{t(e.text)}</p>
          </FadeUp>

          <ol className="mt-12 space-y-6">
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
