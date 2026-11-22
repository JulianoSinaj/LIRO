"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp, Clock, MapPin, Phone } from "lucide-react";
import { content, navLinks, openingHours, restaurant } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";
import { AmbientGlow, GoldRule } from "../ui/Atmosphere";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { Logo } from "../ui/Logo";

/* Viti aktual — lexohet vetëm në klient (faqja është statike). */
const noopSubscribe = () => () => {};
const useYear = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );

export function Footer() {
  const { t } = useLanguage();
  const f = content.footer;
  const year = useYear();
  const { contact, social, map } = restaurant;

  const socials = [
    { href: social.instagramUrl, label: "Instagram", Icon: InstagramIcon },
    { href: social.facebookUrl, label: "Facebook", Icon: FacebookIcon },
    { href: `https://wa.me/${contact.whatsappNumber}`, label: "WhatsApp", Icon: WhatsAppIcon },
  ].filter((s) => s.href);

  const columnTitle = "text-[11px] font-semibold tracking-[0.22em] text-gold uppercase";

  return (
    <footer
      id="contact"
      data-nav="contact"
      className="relative overflow-hidden bg-ink-soft pt-20 pb-10 sm:pt-28"
    >
      <GoldRule className="absolute inset-x-0 top-0" />
      <AmbientGlow className="-bottom-60 left-1/2 size-[60rem] -translate-x-1/2" />

      {/* Fjala "LI-RO" e madhe, si gdhendje në sfond */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] text-center font-display text-[30vw] leading-none font-semibold tracking-[0.04em] text-transparent select-none [-webkit-text-stroke:1px_rgb(212_175_114/0.09)] lg:text-[22rem]"
      >
        LI-RO
      </p>

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <StaggerContainer
          interval={0.1}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10"
        >
          {/* Logoja & rrjetet sociale */}
          <StaggerItem className="md:col-span-2 lg:col-span-5">
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{t(f.tagline)}</p>
            <ul className="mt-7 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-gold/25 text-gold-soft transition-[background-color,border-color,color,translate] duration-500 hover:-translate-y-0.5 hover:border-transparent hover:bg-gold-gradient hover:text-ink"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Orari */}
          <StaggerItem className="lg:col-span-3 lg:col-start-7">
            <h2 className={columnTitle}>{t(f.hoursLabel)}</h2>
            <ul className="mt-5 space-y-1.5">
              {openingHours.map((h) => (
                <li
                  key={h.days.sq}
                  className="flex items-start gap-3 font-display text-xl text-ivory"
                >
                  <Clock
                    className="mt-1 size-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    {t(h.days)}
                    <span className="block text-base text-muted">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Kontakti */}
          <StaggerItem className="lg:col-span-3">
            <h2 className={columnTitle}>{t(f.contactLabel)}</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-3 text-ivory transition-colors hover:text-gold-light"
                >
                  <Phone className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={map.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ivory transition-colors hover:text-gold-light"
                >
                  <MapPin className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {t(restaurant.address)}
                </a>
              </li>
              <li>
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ivory transition-colors hover:text-gold-light"
                >
                  <InstagramIcon className="size-4 text-gold" />
                  {social.instagramHandle}
                </a>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Rreshti i fundit */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-gold/12 pt-8 text-xs text-muted sm:mt-20 lg:flex-row lg:justify-between">
          <p>
            © {year ?? ""} {restaurant.name}. {t(f.rights)}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="tracking-[0.08em] transition-colors hover:text-gold-light"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#top"
            className="group inline-flex items-center gap-2.5 tracking-[0.16em] uppercase transition-colors hover:text-gold-light"
          >
            {t(f.backToTop)}
            <span className="flex size-9 items-center justify-center rounded-full border border-gold/30 transition-[border-color,translate] duration-500 group-hover:-translate-y-1 group-hover:border-gold">
              <ArrowUp className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
