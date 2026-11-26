"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { content, openingHours, restaurant } from "@/data/restaurantData";
import { EASE_LUXE } from "@/lib/motion";
import { Embers } from "../motion/Embers";
import { useLanguage } from "../LanguageProvider";
import { useMagnetic } from "../motion/useMagnetic";
import { OpenStatus } from "./OpenStatus";

const CREDIT = { name: "Juliano Sinaj", url: "https://thelinktree.com/julianosinaj" };

/* Viti aktual — lexohet vetëm në klient (faqja është statike). */
const noopSubscribe = () => () => {};
const useYear = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );

const label = "text-[11px] tracking-[0.25em] text-gold uppercase";
const link = "transition-colors duration-300 hover:text-gold";
const smallLink =
  "mt-3 inline-block text-[11px] tracking-[0.2em] text-white/85 uppercase transition-colors duration-300 hover:text-gold";

const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;
const WORDMARK = ["L", "I", "-", "R", "O"];

/* Shfaqje e butë nga poshtë, me vonesë. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
  transition: { duration: 1.2, delay, ease: EASE_LUXE },
});

export function Footer() {
  const { t } = useLanguage();
  const f = content.footer;
  const year = useYear();
  const { contact, social, map } = restaurant;
  const magnet = useMagnetic(4);

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden border-t border-gold/15 px-6 pt-20 pb-8 sm:px-16 lg:px-28 xl:px-40 lg:pt-24"
    >
      {/* Zjarri: dritë e ngrohtë që merr frymë nga poshtë + shkëndija që ngjiten */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 2.5, ease: EASE_LUXE }}
      >
        <div className="fireglow absolute inset-x-0 bottom-0 h-3/4" />
      </motion.div>

      {/* LI-RO e madhe në sfond: shkronjat ngjiten një nga një, pastaj drita kalon mbi to */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.2] select-none"
      >
        <span className="font-display text-[min(34vw,23rem)] leading-none font-light tracking-[0.04em] whitespace-nowrap">
          {WORDMARK.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: "0.25em", filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VIEW}
              transition={{ duration: 1.6, delay: 0.1 + i * 0.12, ease: EASE_LUXE }}
            >
              <span className="wordmark-letter" style={{ animationDelay: `${2 + i * 0.14}s` }}>
                {ch}
              </span>
            </motion.span>
          ))}
        </span>
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Embers />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <span className="sr-only">{restaurant.name}</span>

        <div className="grid gap-10 text-[15px] leading-relaxed font-normal text-white sm:grid-cols-3 sm:gap-8">
          <motion.div {...rise(0.2)}>
            <p className={label}>{t(f.addressLabel)}</p>
            <a href={map.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-4 block ${link}`}>
              {t(restaurant.address)}
            </a>
            <a href={map.directionsUrl} target="_blank" rel="noopener noreferrer" className={smallLink}>
              {t(f.directions)} →
            </a>
          </motion.div>

          <motion.div {...rise(0.35)}>
            <p className={label}>{t(f.hoursLabel)}</p>
            <ul className="mt-4 space-y-1">
              {openingHours.map((h, i) => (
                <li key={i}>
                  {t(h.days)}
                  <br />
                  {t(h.time)}
                </li>
              ))}
            </ul>
            <OpenStatus className="mt-4 text-[11px] tracking-[0.2em] text-white/85 uppercase" />
          </motion.div>

          <motion.div {...rise(0.5)}>
            <p className={label}>{t(f.contactLabel)}</p>
            <a href={contact.phoneHref} className={`mt-4 block ${link}`}>
              {contact.phoneDisplay}
            </a>
            <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className={`mt-1 block ${link}`}>
              {social.instagramHandle}
            </a>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={smallLink}
            >
              {t(f.whatsapp)} →
            </a>
          </motion.div>
        </div>

        {/* Blloku i fundit: pa margjinë negative, ndryshe në fund të faqes nuk arrin kurrë zonën e shfaqjes */}
        <motion.div
          {...rise(0.7)}
          viewport={{ once: true, amount: 0 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-white/80 uppercase transition-colors duration-300 hover:text-gold"
          >
            <ArrowUp
              aria-hidden="true"
              strokeWidth={1.25}
              className="size-3.5 transition-transform duration-500 group-hover:-translate-y-1"
            />
            {t(f.backToTop)}
          </a>
          <p className="text-[11px] tracking-[0.15em] text-white/55">
            © {year ?? ""} {restaurant.name}. {t(f.rights)}
          </p>
          {/* Kredia e zhvilluesit: e zbehtë, me tërheqje magnetike dhe vijë ari që mbushet në hover */}
          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
            {t(f.credit)}{" "}
            <motion.a
              href={CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              style={magnet.style}
              {...magnet.handlers}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-block py-1 text-white/70 transition-colors duration-500 will-change-transform hover:text-gold"
            >
              {CREDIT.name}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </motion.a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
