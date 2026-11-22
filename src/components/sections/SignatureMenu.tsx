"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { content, signatureDishes } from "@/data/restaurantData";
import { selectMenuCategory } from "@/lib/menuSelection";
import { useLanguage } from "../LanguageProvider";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";
import { AmbientGlow, GoldRule } from "../ui/Atmosphere";
import { SectionHeading } from "../ui/SectionHeading";

export function SignatureMenu() {
  const { t } = useLanguage();
  const s = content.signatureMenu;

  return (
    <section id="signature" data-nav="menu" className="relative overflow-x-clip py-24 sm:py-32">
      <GoldRule className="absolute inset-x-0 top-0 mx-auto max-w-5xl" />
      <AmbientGlow className="top-0 left-1/2 size-[56rem] -translate-x-1/2" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading eyebrow={t(s.eyebrow)} title={t(s.title)} subtitle={t(s.subtitle)} />

        <StaggerContainer
          as="ul"
          interval={0.12}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-7"
        >
          {signatureDishes.map((dish) => (
            <StaggerItem as="li" key={dish.id} y={40}>
              <article className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_30px_60px_-35px_rgb(0_0_0/1)] transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold/55 hover:shadow-[0_40px_70px_-30px_rgb(0_0_0/1),0_0_40px_-6px_rgb(212_175_114/0.28)]">
                <div className="relative aspect-[4/3.4] overflow-hidden">
                  <Image
                    src={dish.image.src}
                    alt={t(dish.image.alt)}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-bronze via-bronze/10 to-transparent"
                  />
                  <span className="glass absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-gold-light uppercase">
                    {t(dish.label)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
                  <h3 className="pr-14 font-display text-[1.5rem] leading-tight font-medium text-ivory">
                    {t(dish.name)}
                  </h3>
                  <p className="mt-3 flex-1 pr-12 text-sm leading-relaxed text-muted">
                    {t(dish.description)}
                  </p>

                  {/* Butoni rrethor me shigjetë — gjithë karta është e klikueshme */}
                  <a
                    href="#menu"
                    onClick={() => selectMenuCategory(dish.categoryId)}
                    aria-label={`${t(s.viewInMenu)}: ${t(dish.name)}`}
                    className="absolute right-5 bottom-5 flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-[background-color,border-color,color,rotate] duration-500 group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-gold-gradient group-hover:text-ink after:absolute after:-inset-[100rem] after:content-['']"
                  >
                    <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
