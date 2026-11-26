"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Transition, type Variants } from "framer-motion";
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
import { useMagnetic } from "../motion/useMagnetic";
import { Arrow } from "../ui/Button";
import { AccentText, Eyebrow } from "../ui/Typography";
import { OpenStatus } from "./OpenStatus";

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

/** Susta e përbashkët për mbushjet dhe rrotullimin e shifrave. */
const SPRING: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.6 };

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

  return (
    <section id="reservation" className="border-t border-gold/15 bg-ink-soft px-6 py-16 sm:px-16 sm:py-20 lg:px-28 lg:py-24 xl:px-40">
      <div className="mx-auto grid max-w-[68rem] gap-12 lg:grid-cols-12 lg:gap-0">
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
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[11px] tracking-[0.25em] uppercase">
            <p className="flex items-center gap-4 text-muted">
              <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
              {t(r.phoneLabel)}
            </p>
            <OpenStatus className="text-gold/80" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-b border-gold/25 pb-9">
            <PhoneNumber display={phoneDisplay} href={phoneHref} />
            <CopyButton value={phoneDisplay} label={t(r.copy)} doneLabel={t(r.copied)} />
          </div>

          {/* Kanalet */}
          <ul className="grid sm:grid-cols-2">
            {r.channels.map(({ id, label }, i) => (
              <ChannelLink
                key={id}
                id={id}
                label={t(label)}
                href={channelHref(id, message)}
                side={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Numri — çdo shifër rrotullohet në ar gjatë hover-it, një nga një          */
/* -------------------------------------------------------------------------- */

const roll: Variants = { rest: { y: "0%" }, hover: { y: "-100%" } };

function PhoneNumber({ display, href }: { display: string; href: string }) {
  const groups = display.split(" ");
  // Indeksi i parë i çdo grupi — për vonesën e shkallëzuar të shifrave.
  const starts = groups.map((_, gi) => groups.slice(0, gi).join("").length);

  return (
    <motion.a
      href={href}
      aria-label={display}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.97 }}
      className="inline-flex font-display font-light text-ivory lining-nums tabular-nums will-change-transform"
    >
      <span
        aria-hidden="true"
        className="flex gap-[0.3em] text-[2.1rem] leading-[1.15] tracking-[0.01em] sm:text-[2.6rem] lg:text-[2.75rem]"
      >
        {groups.map((group, gi) => (
          <span key={gi} className="flex">
            {[...group].map((char, ci) => (
              <span key={ci} className="relative block overflow-hidden">
                <motion.span
                  className="block"
                  variants={roll}
                  transition={{ ...SPRING, delay: (starts[gi] + ci) * 0.025 }}
                >
                  {char}
                  <span className="absolute inset-x-0 top-full text-gold">{char}</span>
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Kopjo numrin — buton magnetik, etiketa me gjerësi fikse (pa layout shift) */
/* -------------------------------------------------------------------------- */

function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [copied, setCopied] = useState(false);
  const { style, handlers } = useMagnetic(4);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* Clipboard i bllokuar — numri mbetet i dukshëm për t'u kopjuar me dorë. */
    }
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      aria-label={label}
      {...handlers}
      style={style}
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 py-2.5 pr-5 pl-4 text-[10px] tracking-[0.25em] text-muted uppercase transition-colors duration-500 will-change-transform hover:border-gold/70 hover:text-gold"
    >
      <span aria-hidden="true" className="relative size-3.5">
        <AnimatePresence initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            className="absolute inset-0 text-gold"
            initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.4, rotate: 60 }}
            transition={SPRING}
          >
            {copied ? (
              <Check className="size-3.5" strokeWidth={1.5} />
            ) : (
              <Copy className="size-3.5" strokeWidth={1.5} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Të dyja etiketat zënë të njëjtën qelizë — gjerësia nuk ndryshon kurrë. */}
      <span aria-hidden="true" className="grid">
        <span className={cn("col-start-1 row-start-1 transition-opacity duration-300", copied && "opacity-0")}>
          {label}
        </span>
        <span className={cn("col-start-1 row-start-1 text-gold transition-opacity duration-300", !copied && "opacity-0")}>
          {doneLabel}
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? doneLabel : ""}
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Kanali — ikona magnetike mbushet me ar, vija poshtë mbushet nga e majta   */
/* -------------------------------------------------------------------------- */

const fill: Variants = { rest: { scale: 0 }, hover: { scale: 1 } };
const underline: Variants = { rest: { scaleX: 0 }, hover: { scaleX: 1 } };

function ChannelLink({
  id,
  label,
  href,
  side,
}: {
  id: ChannelId;
  label: string;
  href: string;
  side: "left" | "right";
}) {
  const Icon = icons[id];
  const external = id === "whatsapp";
  const { style, handlers } = useMagnetic(5);

  return (
    <li className={cn("border-b border-gold/15", side === "left" && "sm:border-r")}>
      <motion.a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...handlers}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group relative flex items-center gap-5 py-6 will-change-transform",
          side === "left" ? "sm:pr-8" : "sm:pl-8",
        )}
      >
        <motion.span
          style={style}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 will-change-transform group-hover:border-gold group-hover:text-ink"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gold"
            variants={fill}
            transition={SPRING}
          />
          <Icon className="relative size-[17px]" strokeWidth={1.25} aria-hidden="true" />
        </motion.span>
        <span className="flex-1 font-display text-[1.4rem] text-ivory transition-colors duration-500 group-hover:text-gold">
          {label}
        </span>
        <Arrow className="text-gold/50 group-hover:text-gold" />
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-gold/70"
          variants={underline}
          transition={SPRING}
        />
      </motion.a>
    </li>
  );
}
