"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  MessageCircle,
  MessageCircleMore,
  MessageSquareText,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { content, openingHours, restaurant } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { Arrow } from "../ui/Button";
import { AccentText, Eyebrow } from "../ui/Typography";

/* -------------------------------------------------------------------------- */
/*  Rezervimi — vetëm me telefon: thirrje, WhatsApp, Viber, SMS               */
/* -------------------------------------------------------------------------- */

type ChannelId = (typeof content.reservation.channels)[number]["id"];

const icons: Record<ChannelId, LucideIcon> = {
  call: Phone,
  whatsapp: MessageCircle,
  viber: MessageCircleMore,
  sms: MessageSquareText,
};

/** Lidhja për secilin kanal, me mesazhin e parashkruar ku mbështetet. */
function channelHref(id: ChannelId, message: string) {
  const { phoneHref, whatsappNumber } = restaurant.contact;
  const intl = `+${whatsappNumber}`;
  const text = encodeURIComponent(message);
  switch (id) {
    case "call":
      return phoneHref;
    case "whatsapp":
      return `https://wa.me/${whatsappNumber}?text=${text}`;
    case "viber":
      return `viber://chat?number=${encodeURIComponent(intl)}`;
    case "sms":
      // "?&body=" funksionon si në iOS ashtu edhe në Android.
      return `sms:${intl}?&body=${text}`;
  }
}

export function Reservation() {
  const { t } = useLanguage();
  const r = content.reservation;
  const { phoneDisplay, phoneHref } = restaurant.contact;
  const message = t(r.message);

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneDisplay);
      setCopied(true);
    } catch {
      /* Clipboard i bllokuar — numri mbetet i dukshëm për t'u kopjuar me dorë. */
    }
  };

  return (
    <section id="reservation" className="border-t border-gold/15 bg-ink-soft px-6 py-32 sm:px-10 lg:py-48">
      <div className="mx-auto grid max-w-[90rem] gap-20 lg:grid-cols-12 lg:gap-0">
        <FadeUp className="lg:col-span-4">
          <Eyebrow>{t(r.eyebrow)}</Eyebrow>
          <h2 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-light text-balance sm:text-6xl">
            <AccentText text={t(r.title)} />
          </h2>
          <p className="mt-8 max-w-sm text-[15px] leading-[1.9] text-ivory/75">{t(r.text)}</p>
          {openingHours.length > 0 && (
            <ul className="mt-10 space-y-2 text-xs tracking-[0.2em] text-muted uppercase">
              {openingHours.map((h, i) => (
                <li key={i}>
                  {t(h.days)} · {t(h.time)}
                </li>
              ))}
            </ul>
          )}
        </FadeUp>

        <FadeUp delay={0.1} className="lg:col-span-7 lg:col-start-6">
          {/* Numri */}
          <p className="text-[11px] tracking-[0.25em] text-muted uppercase">{t(r.phoneLabel)}</p>
          <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-gold/25 pb-8">
            <a
              href={phoneHref}
              className="font-display text-[2.4rem] leading-none font-light whitespace-nowrap text-ivory transition-colors duration-500 hover:text-gold sm:text-6xl lg:text-7xl"
            >
              {phoneDisplay}
            </a>
            <button
              type="button"
              onClick={copyNumber}
              className="inline-flex items-center gap-2 pb-1 text-[11px] tracking-[0.25em] text-muted uppercase transition-colors duration-500 hover:text-gold"
            >
              {copied ? (
                <Check className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              )}
              <span aria-live="polite">{t(copied ? r.copied : r.copy)}</span>
            </button>
          </div>

          {/* Kanalet */}
          <ul className="grid sm:grid-cols-2">
            {r.channels.map(({ id, label }, i) => {
              const Icon = icons[id];
              const external = id === "whatsapp";
              return (
                <li
                  key={id}
                  className={cn(
                    "border-b border-gold/15",
                    i % 2 === 0 && "sm:border-r sm:pr-8",
                    i % 2 === 1 && "sm:pl-8",
                  )}
                >
                  <a
                    href={channelHref(id, message)}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-5 py-7 transition-colors duration-500"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <Icon className="size-[18px]" strokeWidth={1.25} aria-hidden="true" />
                    </span>
                    <span className="flex-1 font-display text-2xl text-ivory transition-colors duration-500 group-hover:text-gold">
                      {t(label)}
                    </span>
                    <Arrow className="text-gold/50 group-hover:text-gold" />
                  </a>
                </li>
              );
            })}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
