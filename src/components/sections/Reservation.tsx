"use client";

import Image from "next/image";
import { Check, Clock, Phone, Users } from "lucide-react";
import { content, images, openingHours, restaurant } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ShimmerBorder } from "../motion/ShimmerBorder";
import { AccentText } from "../ui/AccentText";
import { AmbientGlow } from "../ui/Atmosphere";
import { buttonClasses } from "../ui/Button";
import { Eyebrow, SectionHeading } from "../ui/SectionHeading";

/* -------------------------------------------------------------------------- */
/*  Seksioni — rezervimet bëhen vetëm me telefon                              */
/* -------------------------------------------------------------------------- */

export function Reservation() {
  const { t } = useLanguage();
  const r = content.reservation;
  const { phoneDisplay, phoneHref } = restaurant.contact;

  return (
    <section
      id="reservation"
      data-nav=""
      className="relative isolate overflow-x-clip py-24 sm:py-32"
    >
      {/* Sfondi: tarracë në mbrëmje, shumë e errësuar */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={images.reservation.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/60 to-ink/90" />
      </div>
      <AmbientGlow className="-right-40 top-1/4 size-[46rem]" />
      <AmbientGlow tone="wine" className="-left-60 bottom-0 size-[40rem]" />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        {/* Informacioni */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={t(r.eyebrow)}
            title={t(r.title)}
            subtitle={t(r.subtitle)}
            align="left"
          />

          <FadeUp delay={0.25}>
            <div className="mt-10 flex items-center gap-5 border-y border-gold/12 py-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.04] text-gold-soft">
                <Clock className="size-5" strokeWidth={1.3} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
                  {t(r.hoursLabel)}
                </p>
                <p className="mt-1 font-display text-xl whitespace-pre-line text-ivory">
                  {openingHours.map((h) => `${t(h.days)} · ${h.time}`).join("\n")}
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted">
              <Users
                className="mt-0.5 size-4 shrink-0 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {t(r.groupsNote)}
            </p>
          </FadeUp>
        </div>

        {/* Karta e telefonit */}
        <FadeUp delay={0.15} className="lg:col-span-7" y={40}>
          <ShimmerBorder className="rounded-3xl bg-bronze/72 shadow-[0_50px_100px_-40px_rgb(0_0_0/1)] backdrop-blur-xl">
            <div className="relative p-6 sm:p-10 lg:p-12">
              <Eyebrow>{t(r.callEyebrow)}</Eyebrow>
              <h3 className="mt-5 font-display text-[2rem] leading-tight text-ivory sm:text-[2.6rem]">
                <AccentText text={t(r.callTitle)} />
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{t(r.callText)}</p>

              <a
                href={phoneHref}
                className="group mt-8 flex items-center gap-5 rounded-2xl border border-gold/15 bg-ink/50 p-5 transition-[border-color,background-color] duration-300 hover:border-gold/45 hover:bg-ink/70 sm:p-7"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/[0.06] text-gold-light transition-colors duration-300 group-hover:bg-gold/15">
                  <Phone className="size-6" strokeWidth={1.3} aria-hidden="true" />
                </span>
                <span className="font-display text-2xl text-ivory tabular-nums lining-nums transition-colors group-hover:text-gold-light sm:text-4xl">
                  {phoneDisplay}
                </span>
              </a>

              <div className="mt-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                  {t(r.prepareTitle)}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {r.prepare.map((item) => (
                    <li key={item.en} className="flex items-start gap-3 text-sm text-ivory/90">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <a href={phoneHref} className={buttonClasses({ className: "w-full py-[1.1rem]" })}>
                  <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  {t(r.call)}
                </a>
                <p className="mt-4 text-center text-xs text-muted">{t(r.callHint)}</p>
              </div>
            </div>
          </ShimmerBorder>
        </FadeUp>
      </div>
    </section>
  );
}
