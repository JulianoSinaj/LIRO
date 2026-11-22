"use client";

import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { content, openingHours, restaurant } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ShimmerBorder } from "../motion/ShimmerBorder";
import { AmbientGlow } from "../ui/Atmosphere";
import { buttonClasses } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

/* -------------------------------------------------------------------------- */
/*  Vendndodhja — adresa, orari, telefoni dhe harta                           */
/* -------------------------------------------------------------------------- */

export function Location() {
  const { t } = useLanguage();
  const l = content.location;
  const { contact, map } = restaurant;

  const info = [
    {
      icon: MapPin,
      label: t(l.addressLabel),
      value: t(restaurant.address),
      href: map.mapsUrl,
      external: true,
    },
    {
      icon: Clock,
      label: t(l.hoursLabel),
      value: openingHours.map((h) => `${t(h.days)} · ${h.time}`).join("\n"),
    },
    {
      icon: Phone,
      label: t(l.phoneLabel),
      value: contact.phoneDisplay,
      href: contact.phoneHref,
    },
  ];

  return (
    <section
      id="location"
      data-nav="location"
      className="relative isolate overflow-x-clip py-24 sm:py-32"
    >
      <AmbientGlow tone="olive" className="-left-40 top-1/3 size-[44rem]" />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        {/* Informacioni */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={t(l.eyebrow)}
            title={t(l.title)}
            subtitle={t(l.subtitle)}
            align="left"
          />

          <FadeUp delay={0.25}>
            <ul className="mt-10 divide-y divide-gold/12 border-y border-gold/12">
              {info.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="flex items-center gap-5 py-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.04] text-gold-soft">
                    <Icon className="size-5" strokeWidth={1.3} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 inline-block font-display text-xl text-ivory transition-colors hover:text-gold-light"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-display text-xl whitespace-pre-line text-ivory">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.35}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ className: "flex-1" })}
              >
                <Navigation className="size-4" strokeWidth={1.75} aria-hidden="true" />
                {t(l.directions)}
              </a>
              <a
                href={map.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "glass", className: "flex-1" })}
              >
                {t(l.openInMaps)}
                <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Harta */}
        {map.embedUrl && (
          <FadeUp delay={0.15} className="lg:col-span-7" y={40}>
            <ShimmerBorder className="overflow-hidden rounded-3xl bg-bronze/72 shadow-[0_50px_100px_-40px_rgb(0_0_0/1)]">
              <iframe
                src={map.embedUrl}
                title={t(l.mapTitle)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full sm:h-[28rem] lg:h-[34rem]"
              />
            </ShimmerBorder>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
