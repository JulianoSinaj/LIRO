"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
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

/**
 * Zgjedhësi i gjuhës — kontroll i segmentuar me kornizë, që të dallohet qartë
 * nga lidhjet e navigimit. Treguesi i gjuhës aktive rrëshqet me spring.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  /* ID unike: navbar-i dhe menuja celulare mund të jenë njëkohësisht në DOM. */
  const pillId = `lang-pill-${useId()}`;

  return (
    <div
      role="group"
      aria-label={t(content.nav.language)}
      className={cn(
        "flex items-center border border-ivory/15 p-0.5 text-[11px] tracking-[0.2em]",
        className,
      )}
    >
      {languages.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={cn(
              "relative px-3 py-1.5 transition-colors duration-300",
              active ? "text-gold" : "text-ivory/50 hover:text-ivory",
            )}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                aria-hidden="true"
                className="absolute inset-0 bg-gold/15 will-change-transform"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            {/* pl = sa tracking-u pas shkronjës së fundit, që teksti të jetë në qendër */}
            <span className="relative pl-[0.2em]">{l.label}</span>
          </button>
        );
      })}
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
    /* Lidhjet e desktopit shfaqen nga `xl` (1280px) — aty menuja celulare mbyllet. */
    const desktop = window.matchMedia("(min-width: 1280px)");
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

      {/*
        Padding-u në mbështjellësin e jashtëm, max-width në atë të brendshëm —
        përndryshe padding-u ha gjerësinë dhe grupet ngjiten bashkë.
        Kolonat anësore `minmax(max-content,1fr)` nuk tkurren kurrë nën përmbajtjen,
        kështu lidhjet mbeten në qendër pa u mbivendosur me logon apo gjuhët.
      */}
      <div
        className={cn(
          "relative px-6 transition-[height] duration-700 sm:px-10 xl:px-14",
          scrolled ? "h-16" : "h-20 sm:h-24",
        )}
      >
        <div className="mx-auto grid h-full max-w-[84rem] grid-cols-[1fr_auto] items-center gap-x-8 xl:grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] xl:gap-x-14">
          <a
            href="#top"
            aria-label={`${restaurant.name} — ${t(content.nav.home)}`}
            onClick={close}
            className="justify-self-start"
          >
            <Logo />
          </a>

          {/* Lidhjet — desktop */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9 2xl:gap-11">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group relative block py-2 text-[11px] tracking-[0.25em] whitespace-nowrap text-ivory/70 uppercase transition-colors duration-300 hover:text-gold focus-visible:text-gold"
                  >
                    {t(link.label)}
                    {/* vija e hover-it — `right` heq tracking-un pas shkronjës së fundit */}
                    <span
                      aria-hidden="true"
                      className="absolute right-[0.25em] bottom-0.5 left-0 h-px origin-center scale-x-0 bg-gold/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-5 sm:gap-6">
            <LanguageToggle className="hidden sm:flex" />
            {/* ndarësi vertikal mes gjuhëve dhe butonit të rezervimit */}
            <span
              aria-hidden="true"
              className="hidden h-7 w-px bg-linear-to-b from-transparent via-gold/40 to-transparent sm:block"
            />
            <a
              href="#reservation"
              className="group hidden items-center gap-2.5 border border-gold/40 px-5 py-2.5 text-[11px] tracking-[0.25em] whitespace-nowrap text-gold uppercase transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink sm:inline-flex"
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
              className="relative -mr-2 flex size-10 flex-col items-center justify-center gap-[7px] xl:hidden"
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
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ink px-6 pt-32 pb-12 sm:px-10 xl:hidden"
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
