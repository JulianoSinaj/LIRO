"use client";

import { useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { content, images, restaurant } from "@/data/restaurantData";
import { EASE_LUXE, VIEWPORT } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { AccentText } from "../ui/AccentText";
import { AmbientGlow, LitBrickWall } from "../ui/Atmosphere";
import { ButtonLink } from "../ui/Button";
import { InstagramIcon } from "../ui/icons";
import { Eyebrow } from "../ui/SectionHeading";

/** Dritarja e videos / turit virtual (dialog nativ: Escape, fokus, sfond inert). */
function VideoDialog({
  dialogRef,
  open,
  onClose,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const v = content.story.video;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      aria-label={t(v.title)}
      className="m-auto w-[min(64rem,calc(100%-2rem))] max-w-none overflow-visible bg-transparent p-0 text-ivory backdrop:bg-ink/85 backdrop:backdrop-blur-md open:animate-dialog-in"
    >
      <div className="relative overflow-x-clip rounded-2xl border border-gold/25 bg-ink shadow-[0_40px_120px_-30px_rgb(0_0_0/1)]">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={t(v.close)}
          className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 bg-ink/70 text-gold-light backdrop-blur transition-colors hover:border-gold hover:bg-gold/10"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>

        {v.url ? (
          <div className="aspect-video">
            {open && (
              <iframe
                src={v.url}
                title={t(v.title)}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full"
              />
            )}
          </div>
        ) : (
          <div className="relative isolate flex aspect-[4/5] flex-col items-center justify-center px-8 text-center sm:aspect-video">
            <Image
              src={images.story.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="-z-10 object-cover opacity-30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-radial from-ink/40 to-ink"
            />
            <p className="font-display text-[2rem] leading-tight sm:text-[2.6rem]">
              <AccentText text={t(v.comingSoonTitle)} />
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {t(v.comingSoonText)}
            </p>
            <ButtonLink
              href={restaurant.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="glass"
              className="mt-8"
            >
              <InstagramIcon className="size-4" />
              {t(v.instagramCta)}
            </ButtonLink>
          </div>
        )}
      </div>
    </dialog>
  );
}

export function Story() {
  const { t } = useLanguage();
  const s = content.story;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const openVideo = () => {
    dialogRef.current?.showModal();
    setVideoOpen(true);
  };

  return (
    <section
      id="story"
      data-nav="story"
      className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32"
    >
      <LitBrickWall className="h-[42rem] opacity-90" />
      <AmbientGlow className="top-1/3 -left-60 size-[48rem]" />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        {/* Fotoja me butonin Play */}
        <FadeUp className="relative lg:col-span-7" y={40}>
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[1.4rem] border border-gold/12 sm:-inset-4"
          />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_50px_100px_-40px_rgb(0_0_0/1)] sm:aspect-[5/4] lg:aspect-[6/5]">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.8, ease: EASE_LUXE }}
            >
              <Image
                src={images.story.src}
                alt={t(images.story.alt)}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-ink/20"
            />

            {/* Butoni Play */}
            <button
              type="button"
              onClick={openVideo}
              aria-haspopup="dialog"
              className="absolute inset-0 m-auto flex size-fit flex-col items-center gap-4 rounded-full outline-offset-8"
            >
              <span className="relative flex size-20 items-center justify-center sm:size-24">
                {[0, 1].map((ring) => (
                  <motion.span
                    key={ring}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-gold/50"
                    animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: ring * 1.3,
                      ease: "easeOut",
                    }}
                  />
                ))}
                <span className="glass relative flex size-full items-center justify-center rounded-full border-gold/50! transition-[background-color,scale] duration-500 group-hover:scale-110 group-hover:bg-gold/20">
                  <Play
                    className="ml-1 size-7 fill-gold-soft text-gold-soft"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span className="text-[11px] font-semibold tracking-[0.22em] text-ivory uppercase drop-shadow">
                {t(s.video.play)}
              </span>
            </button>

            <span className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.22em] text-gold-light uppercase sm:bottom-7 sm:left-7">
              {t(s.imageBadge)}
            </span>
          </div>
        </FadeUp>

        {/* Teksti */}
        <div className="lg:col-span-5">
          <FadeUp>
            <Eyebrow>{t(s.eyebrow)}</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-6 font-display text-[2.2rem] leading-[1.08] font-medium tracking-[-0.01em] text-balance text-ivory sm:text-[2.6rem] xl:text-[3.1rem]">
              <AccentText text={t(s.title)} />
            </h2>
          </FadeUp>
          {s.paragraphs.map((p, i) => (
            <FadeUp key={i} delay={0.2 + i * 0.1}>
              <p className="mt-6 text-base leading-[1.8] text-pretty text-muted sm:text-[17px]">
                {t(p)}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={0.4}>
            <ButtonLink href="#gallery" variant="glass" arrow className="mt-10">
              {t(s.cta)}
            </ButtonLink>
          </FadeUp>

          {/* Firma e shefit / themeluesve */}
          <FadeUp delay={0.5} className="mt-12 border-t border-gold/15 pt-8">
            <motion.p
              aria-hidden="true"
              className="font-signature text-6xl leading-none text-gold-soft sm:text-7xl"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={VIEWPORT}
              transition={{ duration: 2, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
            >
              {s.signature}
            </motion.p>
            <p className="mt-3 text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
              <span className="sr-only">{s.signature} — </span>
              {t(s.signatureRole)}
            </p>
          </FadeUp>
        </div>
      </div>

      <VideoDialog dialogRef={dialogRef} open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
