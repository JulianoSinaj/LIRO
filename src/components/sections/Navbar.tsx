"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content, languages, navLinks, restaurant } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { Arrow } from "../ui/Button";
import { Logo } from "../ui/Logo";

/* Gjendja e scroll-it si "external store" — pa setState brenda effect-eve. */
function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 40;
const getScrolledServer = () => false;

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t(content.nav.language)}
      className={cn("flex items-center gap-2 text-[11px] tracking-[0.2em]", className)}
    >
      {languages.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="text-ivory/30">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={cn(
              "py-2 transition-colors duration-300",
              lang === l.code ? "text-gold" : "text-ivory/50 hover:text-ivory",
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
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-b transition-[background-color,border-color] duration-700",
          solid ? "border-gold/15 bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      />

      <div
        className={cn(
          "relative mx-auto grid max-w-[90rem] grid-cols-[1fr_auto] items-center gap-6 px-6 transition-[height] duration-700 sm:px-10 lg:grid-cols-[1fr_auto_1fr]",
          scrolled ? "h-16" : "h-20 sm:h-24",
        )}
      >
        <a href="#top" aria-label={`${restaurant.name} — ${t(content.nav.home)}`} onClick={close}>
          <Logo />
        </a>

        {/* Lidhjet — desktop */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-[11px] tracking-[0.25em] text-ivory/70 uppercase transition-colors duration-300 hover:text-gold"
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-6 sm:gap-8">
          <LanguageToggle className="hidden sm:flex" />
          <a
            href="#reservation"
            className="group hidden items-center gap-2.5 border border-gold/40 px-5 py-2.5 text-[11px] tracking-[0.25em] text-gold uppercase transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink sm:inline-flex"
          >
            {t(content.nav.cta)}
            <Arrow className="size-3.5" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? content.nav.closeMenu : content.nav.openMenu)}
            className="relative -mr-2 flex size-10 flex-col items-center justify-center gap-[7px] lg:hidden"
          >
            <span
              className={cn(
                "h-px w-6 bg-ivory transition-transform duration-500",
                open && "translate-y-1 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-ivory transition-transform duration-500",
                open && "-translate-y-1 -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Menuja celulare — ekran i plotë, vetëm tipografi */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: EASE_LUXE }}
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink px-6 pt-32 pb-12 sm:px-10 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={close}
                      className="block py-2 font-display text-5xl font-light text-ivory transition-colors hover:text-gold"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex items-end justify-between gap-6 border-t border-gold/15 pt-8">
              <a
                href="#reservation"
                onClick={close}
                className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] text-gold uppercase"
              >
                {t(content.nav.cta)}
                <Arrow className="size-3.5" />
              </a>
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
