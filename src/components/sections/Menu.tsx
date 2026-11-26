"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content, currencySuffix, menu, menuTabs, type MenuItem } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { formatPrice, SectionHeading } from "../ui/Typography";

function MenuRow({ item }: { item: MenuItem }) {
  const { t } = useLanguage();
  return (
    <li className="break-inside-avoid py-4 sm:py-5">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-xl font-normal text-ivory sm:text-[1.4rem]">
          {t(item.name)}
        </span>
        <span aria-hidden="true" className="min-w-8 flex-1 translate-y-[-0.3em] border-b border-gold/20" />
        <span className="text-[13px] tracking-[0.12em] whitespace-nowrap text-gold">
          {formatPrice(item.price, currencySuffix)}
        </span>
      </div>
      {item.description && (
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{t(item.description)}</p>
      )}
    </li>
  );
}

export function Menu() {
  const { t } = useLanguage();
  const m = content.menu;
  const [active, setActive] = useState(menuTabs[0]?.id ?? "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tab = menuTabs.find((x) => x.id === active) ?? menuTabs[0];
  const categories = tab.categories
    .map((id) => menu.find((c) => c.id === id))
    .filter((c) => c !== undefined);
  const showCategoryTitles = categories.length > 1;

  /* Tastiera: shigjetat majtas/djathtas lëvizin mes tab-eve. */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const index = menuTabs.findIndex((x) => x.id === active);
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + menuTabs.length) % menuTabs.length;
    setActive(menuTabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="border-t border-gold/15 bg-ink-soft px-6 py-32 sm:px-10 lg:py-48">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t(m.eyebrow)} title={t(m.title)} align="center" />

        <FadeUp delay={0.1}>
          <div
            role="tablist"
            aria-label={t(m.categoriesLabel)}
            onKeyDown={onKeyDown}
            className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-4 border-b border-gold/15 sm:gap-x-14"
          >
            {menuTabs.map((x, i) => {
              const selected = x.id === active;
              return (
                <button
                  key={x.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`menu-tab-${x.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(x.id)}
                  className={cn(
                    "-mb-px border-b pb-5 text-[11px] tracking-[0.25em] uppercase transition-colors duration-500",
                    selected
                      ? "border-gold text-gold"
                      : "border-transparent text-ivory/55 hover:text-ivory",
                  )}
                >
                  {t(x.label)}
                </button>
              );
            })}
          </div>
        </FadeUp>

        <div
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`menu-tab-${tab.id}`}
          className="mt-16 min-h-[24rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_LUXE }}
              className="gap-x-24 md:columns-2"
            >
              {categories.map((category) => (
                <div key={category.id} className={cn(showCategoryTitles && "break-inside-avoid pb-12")}>
                  {showCategoryTitles && (
                    <h3 className="mb-3 text-[11px] tracking-[0.25em] text-gold uppercase">
                      {t(category.label)}
                    </h3>
                  )}
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

        <p className="mt-12 text-center text-xs tracking-[0.08em] text-muted">{t(m.note)}</p>
      </div>
    </section>
  );
}
