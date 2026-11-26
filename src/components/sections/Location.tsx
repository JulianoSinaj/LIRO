"use client";

import { ArrowUpRight } from "lucide-react";
import { content, openingHours, restaurant } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ButtonLink, TextLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/* -------------------------------------------------------------------------- */
/*  Vendndodhja — adresa, orari dhe harta                                     */
/* -------------------------------------------------------------------------- */

export function Location() {
  const { t } = useLanguage();
  const l = content.location;
  const { map } = restaurant;

  const info = [
    {
      label: t(l.addressLabel),
      value: t(restaurant.address),
      href: map.mapsUrl,
      external: true,
    },
    {
      label: t(l.hoursLabel),
      value: openingHours.map((h) => `${t(h.days)} · ${t(h.time)}`).join("\n"),
    },
  ];

  return (
    <section id="location" className="border-t border-gold/15 px-6 py-16 sm:px-16 sm:py-20 lg:px-28 lg:py-24 xl:px-40">
      <div className="mx-auto grid max-w-[68rem] gap-12 lg:grid-cols-12 lg:items-center lg:gap-0">
        {/* Informacioni */}
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t(l.eyebrow)} title={t(l.title)} />

          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-sm text-[15px] leading-[1.9] text-ivory/75">{t(l.text)}</p>

            <dl className="mt-12 divide-y divide-gold/15 border-y border-gold/15">
              {info.map(({ label, value, href, external }) => (
                <div key={label} className="py-6">
                  <dt className="text-[11px] tracking-[0.25em] text-muted uppercase">{label}</dt>
                  <dd className="mt-2 font-display text-xl whitespace-pre-line text-ivory">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="transition-colors duration-500 hover:text-gold"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
              <ButtonLink href={map.directionsUrl} target="_blank" rel="noopener noreferrer" arrow>
                {t(l.directions)}
              </ButtonLink>
              <TextLink href={map.mapsUrl} target="_blank" rel="noopener noreferrer">
                {t(l.openInMaps)}
              </TextLink>
            </div>
          </FadeUp>
        </div>

        {/* Harta */}
        {map.embedUrl && (
          <FadeUp delay={0.15} className="lg:col-span-7 lg:col-start-6">
            <a
              href={map.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${restaurant.name} — ${t(l.openInMaps)}`}
              className="group relative block h-[24rem] overflow-hidden border border-gold/20 bg-ink-soft sm:h-[30rem] lg:h-[38rem]"
            >
              {/* Harta satelitore e Google, pak e errësuar dhe e ngrohtë */}
              <iframe
                src={map.embedUrl}
                title={t(l.mapTitle)}
                loading="lazy"
                tabIndex={-1}
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none absolute inset-0 h-full w-full [filter:saturate(0.75)_sepia(0.2)_brightness(0.72)_contrast(1.05)] transition-[filter] duration-700 group-hover:[filter:saturate(0.9)_sepia(0.1)_brightness(0.9)_contrast(1.05)]"
              />

              {/* Vinjetë: skajet shkrihen me sfondin */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(11_9_8/0.85)_100%)]"
              />

              {/* Pin-i i restorantit — qendra e hartës = vendndodhja */}
              <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-0">
                {/* Pika — saktësisht në qendër të hartës */}
                <span className="absolute top-0 left-0 flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold/60" />
                  <span className="relative inline-flex size-3 rounded-full bg-gold ring-4 ring-gold/20" />
                </span>
              </div>

              {/* Thirrje në hover */}
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 border border-gold/30 bg-ink/80 px-4 py-2.5 text-[10px] tracking-[0.25em] text-gold uppercase backdrop-blur-sm transition-colors duration-500 group-hover:border-gold">
                {t(l.openInMaps)}
                <ArrowUpRight className="size-3.5" strokeWidth={1.25} aria-hidden="true" />
              </span>
            </a>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
