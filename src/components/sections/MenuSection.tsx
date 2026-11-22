"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { content, currencySuffix, menu } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { selectMenuCategory, useMenuCategory } from "@/lib/menuSelection";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { LitBrickWall } from "../ui/Atmosphere";
import { LogoMark } from "../ui/Logo";
import { SectionHeading } from "../ui/SectionHeading";

/** Ornament i hollë ari, si në menutë e shtypura. */
function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-16 bg-linear-to-r from-transparent to-gold/50 sm:w-28" />
      <span className="size-1 rotate-45 bg-gold/60" />
      <span className="size-2 rotate-45 border border-gold/60" />
      <span className="size-1 rotate-45 bg-gold/60" />
      <span className="h-px w-16 bg-linear-to-l from-transparent to-gold/50 sm:w-28" />
    </div>
  );
}

/** Kënde dekorative ari në cepat e kartës. */
function Corners() {
  const corner = "absolute size-6 border-gold/45";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3 sm:inset-4">
      <span className={cn(corner, "top-0 left-0 border-t border-l")} />
      <span className={cn(corner, "top-0 right-0 border-t border-r")} />
      <span className={cn(corner, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(corner, "right-0 bottom-0 border-r border-b")} />
    </div>
  );
}

export function MenuSection() {
  const { t, lang } = useLanguage();
  const activeId = useMenuCategory();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const otherLang = lang === "sq" ? "en" : "sq";

  const activeIndex = Math.max(
    0,
    menu.findIndex((c) => c.id === activeId),
  );
  const category = menu[activeIndex];

  /* Në celular rreshti i tabs rrëshqet: qendërzo tab-in aktiv (pa lëvizur faqen). */
  useEffect(() => {
    const tab = tabRefs.current[activeIndex];
    const list = tab?.parentElement;
    if (!tab || !list || list.scrollWidth <= list.clientWidth) return;
    const tabRect = tab.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    list.scrollBy({
      left: tabRect.left - listRect.left - (listRect.width - tabRect.width) / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  /* Navigim me tastierë për tabs (shigjetat, Home, End). */
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = menu.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    if (e.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    selectMenuCategory(menu[next].id);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  if (!category) return null;

  return (
    <section
      id="menu"
      data-nav="menu"
      className="relative overflow-x-clip bg-linear-to-b from-ink via-ink-soft to-ink py-24 sm:py-32"
    >
      <LitBrickWall className="h-[46rem]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow={t(content.menu.eyebrow)}
          title={t(content.menu.title)}
          subtitle={t(content.menu.subtitle)}
        />

        {/* Tabs e kategorive */}
        <FadeUp delay={0.15} className="mt-14 flex justify-center">
          <div
            role="tablist"
            aria-label={t(content.menu.categoriesLabel)}
            className="glass no-scrollbar -mx-5 flex max-w-[calc(100%+2.5rem)] gap-1 overflow-x-auto rounded-none border-x-0 p-1.5 sm:mx-0 sm:max-w-full sm:rounded-full sm:border-x"
          >
            {menu.map((cat, i) => {
              const selected = cat.id === category.id;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`tab-${cat.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectMenuCategory(cat.id)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    "relative isolate shrink-0 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-500 sm:px-6",
                    selected ? "text-ink" : "text-muted hover:text-ivory",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-tab-pill"
                      aria-hidden="true"
                      className="bg-gold-gradient absolute inset-0 -z-10 rounded-full shadow-[0_8px_24px_-10px_rgb(212_175_114/0.7)]"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{t(cat.label)}</span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Karta e menusë */}
        <FadeUp delay={0.25} className="mx-auto mt-10 max-w-5xl">
          <article className="relative overflow-hidden rounded-2xl border border-gold/20 bg-bronze/72 px-6 py-12 shadow-[0_50px_100px_-40px_rgb(0_0_0/1)] backdrop-blur-xl sm:px-12 sm:py-16 lg:px-20">
            <div
              aria-hidden="true"
              className="glow-amber pointer-events-none absolute -top-48 left-1/2 size-[40rem] -translate-x-1/2 rounded-full"
            />
            <Corners />

            <header className="relative text-center">
              <LogoMark className="mx-auto size-10 opacity-90" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${category.id}-${lang}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_LUXE }}
                >
                  <h3 className="mt-4 font-display text-[2rem] text-gold-gradient italic sm:text-[2.6rem]">
                    {t(category.label)}
                  </h3>
                  <p
                    lang={otherLang}
                    className="mt-2 text-[10px] font-semibold tracking-[0.3em] text-muted uppercase"
                  >
                    {category.label[otherLang]}
                  </p>
                </motion.div>
              </AnimatePresence>
              <Ornament className="mt-6" />
            </header>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${category.id}-${lang}`}
                id={`panel-${category.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${category.id}`}
                className="relative mt-12"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { delayChildren: stagger(0.06) } },
                  exit: { opacity: 0, transition: { duration: 0.25 } },
                }}
              >
                <ul className="grid gap-x-16 gap-y-9 md:grid-cols-2">
                  {category.items.map((item) => (
                    <motion.li
                      key={item.name.sq}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: EASE_LUXE },
                        },
                      }}
                    >
                      <div className="flex items-baseline gap-3">
                        <h4 className="font-display text-xl leading-snug font-medium text-ivory sm:text-[1.4rem]">
                          {t(item.name)}
                        </h4>
                        <span aria-hidden="true" className="leader-dots h-2 min-w-6 flex-1" />
                        <span className="shrink-0 font-sans text-[15px] font-semibold tracking-wide text-gold-light tabular-nums">
                          {(Array.isArray(item.price) ? item.price : [item.price])
                            .map((price) => `${price}${currencySuffix}`)
                            .join(" / ")}
                        </span>
                      </div>
                      {item.name[otherLang] !== item.name[lang] && (
                        <p
                          lang={otherLang}
                          className="font-display text-[15px] text-muted/80 italic"
                        >
                          {item.name[otherLang]}
                        </p>
                      )}
                      {item.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {t(item.description)}
                        </p>
                      )}
                      {item.tag && (
                        <span className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-2.5 py-1 text-[9px] font-bold tracking-[0.22em] text-gold uppercase">
                          <span aria-hidden="true" className="size-1 rotate-45 bg-gold" />
                          {t(item.tag)}
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <Ornament className="relative mt-14" />
            <p className="relative mt-5 text-center text-xs leading-relaxed text-muted/80">
              {t(content.menu.note)}
            </p>
          </article>
        </FadeUp>
      </div>
    </section>
  );
}
