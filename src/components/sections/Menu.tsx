"use client";

import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { content, currencySuffix, menu, menuTabs, type MenuItem } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { formatPrice, SectionHeading } from "../ui/Typography";

/* Lëvizjet: lista zbehet, rreshtat shfaqen njëri pas tjetrit — shumë butë. */
const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.025 } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_LUXE } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_LUXE } },
};

/** Lartësia e kartës ndjek përmbajtjen pa kërcime (susta "overdamped", pa lëkundje). */
const HEIGHT_SPRING = { type: "spring", stiffness: 170, damping: 30, mass: 1 } as const;
/** Vija e artë nën tab-in aktiv rrëshqet mes tab-eve. */
const INDICATOR_SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

/** Mat lartësinë e elementit sa herë ndryshon (ResizeObserver). */
function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, height] as const;
}

function MenuRow({ item }: { item: MenuItem }) {
  const { t } = useLanguage();
  return (
    <motion.li variants={rowVariants} className="break-inside-avoid py-2.5">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[1.15rem] leading-snug text-ivory sm:text-[1.2rem]">
          {t(item.name)}
        </span>
        <span aria-hidden="true" className="menu-leader min-w-6 flex-1 -translate-y-[0.3em]" />
        <span className="shrink-0 text-[13px] tracking-[0.08em] whitespace-nowrap text-gold tabular-nums">
          {formatPrice(item.price, currencySuffix)}
        </span>
      </div>
      {item.description && (
        <p className="mt-0.5 font-display text-[0.95rem] text-muted italic">{t(item.description)}</p>
      )}
    </motion.li>
  );
}

/** Titulli i kategorisë: italic ari, me dy vija të holla që shuhen anash. */
function CategoryTitle({ label }: { label: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-4 font-display text-[1.4rem] text-gold italic">
      <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-transparent to-gold/25" />
      {label}
      <span aria-hidden="true" className="h-px flex-1 bg-linear-to-l from-transparent to-gold/25" />
    </h3>
  );
}

export function Menu() {
  const { t } = useLanguage();
  const m = content.menu;
  const [active, setActive] = useState(menuTabs[0]?.id ?? "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [contentRef, contentHeight] = useMeasuredHeight<HTMLDivElement>();

  const tab = menuTabs.find((x) => x.id === active) ?? menuTabs[0];
  const categories = tab.categories
    .map((id) => menu.find((c) => c.id === id))
    .filter((c) => c !== undefined);
  /* Disa kategori → dy kolona (një bllok për kategori). Një kategori → një kolonë e ngushtë. */
  const multi = categories.length > 1;

  /* Celular: tab-i i zgjedhur rrëshqet në qendër të rreshtit të tab-eve. */
  const select = (index: number) => {
    setActive(menuTabs[index].id);
    const scroller = scrollerRef.current;
    const button = tabRefs.current[index];
    if (scroller && button) {
      scroller.scrollTo({
        left: button.offsetLeft - (scroller.clientWidth - button.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  /* Tastiera: shigjetat lëvizin mes tab-eve, Home/End te i pari/i fundit. */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = menuTabs.findIndex((x) => x.id === active);
    const last = menuTabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (index + 1) % menuTabs.length
      : e.key === "ArrowLeft" ? (index - 1 + menuTabs.length) % menuTabs.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="border-t border-gold/15 bg-ink-soft px-6 py-12 sm:px-16 sm:py-14 lg:px-28 lg:py-16 xl:px-40">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={t(m.eyebrow)} title={t(m.title)} align="center" />

        <FadeUp delay={0.1} className="mt-8 lg:mt-10">
          {/* Në celular rreshti rrëshqet horizontalisht; skajet shuhen butë. */}
          <div
            ref={scrollerRef}
            className="relative -mx-6 overflow-x-auto px-6 [mask-image:linear-gradient(to_right,transparent,#000_1.5rem,#000_calc(100%-1.5rem),transparent)] [scrollbar-width:none] md:mx-0 md:px-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              role="tablist"
              aria-label={t(m.categoriesLabel)}
              onKeyDown={onKeyDown}
              className="mx-auto flex w-max items-center gap-x-4 sm:gap-x-6 lg:gap-x-8"
            >
              {menuTabs.map((x, i) => {
                const selected = x.id === active;
                return (
                  <Fragment key={x.id}>
                    {i > 0 && <span aria-hidden="true" className="size-[3px] rounded-full bg-gold/35" />}
                    <button
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`menu-tab-${x.id}`}
                      aria-selected={selected}
                      aria-controls="menu-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(i)}
                      className={cn(
                        "relative py-2 font-display text-[1.1rem] whitespace-nowrap transition-colors duration-500 sm:text-lg",
                        selected ? "text-gold" : "text-ivory/50 hover:text-ivory/85",
                      )}
                    >
                      {t(x.label)}
                      {selected && (
                        <motion.span
                          layoutId="menu-tab-indicator"
                          transition={INDICATOR_SPRING}
                          className="absolute inset-x-0 bottom-0.5 mx-auto h-px w-6 bg-gold"
                        />
                      )}
                    </button>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-px max-w-xs bg-linear-to-r from-transparent via-gold/30 to-transparent"
          />
        </FadeUp>

        <FadeUp delay={0.15} className="mt-8 lg:mt-10">
          <motion.div
            initial={false}
            animate={{ height: contentHeight }}
            transition={HEIGHT_SPRING}
            className="overflow-hidden"
          >
            <div
              ref={contentRef}
              id="menu-panel"
              role="tabpanel"
              aria-labelledby={`menu-tab-${tab.id}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab.id}
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className={cn(multi ? "gap-x-12 md:columns-2 lg:gap-x-20" : "mx-auto max-w-md")}
                >
                  {categories.map((category) => (
                    <div key={category.id} className={cn(multi && "break-inside-avoid not-last:pb-10")}>
                      {multi && <CategoryTitle label={t(category.label)} />}
                      <ul>
                        {category.items.map((item, i) => (
                          <MenuRow key={i} item={item} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </FadeUp>

        <p className="mt-8 text-center font-display text-[0.95rem] text-muted italic">{t(m.note)}</p>
      </div>
    </section>
  );
}
