"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { Clock, MapPin, Menu as MenuIcon, Phone, X } from "lucide-react";
import { content, languages, navLinks, openingHours, restaurant } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { ButtonArrow, buttonClasses } from "../ui/Button";
import { Logo } from "../ui/Logo";

/* Gjendja e scroll-it si "external store" — pa setState brenda effect-eve. */
function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 32;
const getScrolledServer = () => false;

/** Seksioni aktiv: lexohet nga atributi `data-nav` i seksioneve. */
function useActiveSection() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.nav ?? "");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    /* Footer-i është i shkurtër: në fund të faqes aktivizo "Kontakti". */
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t(content.nav.language)}
      className={cn("flex items-center text-xs font-semibold tracking-[0.18em]", className)}
    >
      {languages.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-0.5 h-3.5 w-px bg-gold/30 sm:mx-1" />}
          <button
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={cn(
              "rounded px-1 py-1 transition-colors duration-300 sm:px-1.5",
              lang === l.code ? "text-gold" : "text-muted hover:text-ivory",
            )}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer);
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Menuja celulare: Escape mbyll, faqja pas saj bllokohet dhe bëhet "inert". */
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const background = document.querySelectorAll<HTMLElement>("main, footer");
    background.forEach((el) => el.setAttribute("inert", ""));
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      background.forEach((el) => el.removeAttribute("inert"));
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const solid = scrolled || open;
  const hours = openingHours[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* sfondi xhami — shfaqet pas scroll-it */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-b transition-[opacity,background-color] duration-700",
          solid
            ? "border-gold/15 bg-ink/70 opacity-100 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent opacity-0",
        )}
      />
      {/* hije e lehtë sipër hero-s, që lidhjet të lexohen */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/70 to-transparent transition-opacity duration-700",
          solid ? "opacity-0" : "opacity-100",
        )}
      />

      <div
        className={cn(
          "relative mx-auto flex max-w-[88rem] items-center justify-between gap-3 px-4 transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8",
          scrolled ? "h-[4.5rem]" : "h-[5.5rem]",
        )}
      >
        <a
          href="#top"
          aria-label={`Taverna Li-Ro — ${t(content.nav.home)}`}
          className="rounded-md"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        {/* Lidhjet — desktop */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center xl:gap-3">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block px-2.5 py-2 text-[13px] font-medium tracking-[0.06em] whitespace-nowrap transition-colors duration-300 xl:px-3",
                      isActive ? "text-gold-light" : "text-ivory/75 hover:text-ivory",
                    )}
                  >
                    {t(link.label)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        className="absolute inset-x-2.5 -bottom-px h-px xl:inset-x-3 bg-linear-to-r from-transparent via-gold to-transparent"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-5">
          <LanguageToggle />
          {/* Në celular CTA-ja është brenda menusë */}
          <span className="hidden md:block">
            <a href="#reservation" className={buttonClasses({ size: "sm" })}>
              {t(content.nav.cta)}
              <ButtonArrow className="size-3.5" />
            </a>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? content.nav.closeMenu : content.nav.openMenu)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-gold/30 sm:size-11 text-gold-light transition-colors hover:border-gold hover:bg-gold/10 lg:hidden"
          >
            {open ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <MenuIcon className="size-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Menuja celulare — ekran i plotë */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink/95 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <div
              aria-hidden="true"
              className="glow-amber pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full"
            />
            <nav aria-label="Mobile" className="relative">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { delayChildren: stagger(0.07, { startDelay: 0.1 }) } },
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_LUXE } },
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? "true" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 border-b border-gold/10 py-4 font-serif text-[2.1rem] leading-tight transition-colors",
                        active === link.id
                          ? "text-gold-light italic"
                          : "text-ivory hover:text-gold-light",
                      )}
                    >
                      <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-gold/60 not-italic">
                        0{i + 1}
                      </span>
                      {t(link.label)}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE_LUXE }}
              className="relative mt-auto pt-10"
            >
              <a
                href="#reservation"
                onClick={() => setOpen(false)}
                className={buttonClasses({ className: "w-full" })}
              >
                {t(content.nav.cta)}
                <ButtonArrow />
              </a>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li className="flex items-center gap-3">
                  <MapPin className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {t(restaurant.address)}
                </li>
                {hours && (
                  <li className="flex items-center gap-3">
                    <Clock className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    {t(hours.days)} · {hours.time}
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <a href={restaurant.contact.phoneHref} className="hover:text-gold-light">
                    {restaurant.contact.phoneDisplay}
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
