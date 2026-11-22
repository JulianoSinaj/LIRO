"use client";

import Image from "next/image";
import { content, gallery, restaurant } from "@/data/restaurantData";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";
import { AmbientGlow } from "../ui/Atmosphere";
import { ButtonLink } from "../ui/Button";
import { InstagramIcon } from "../ui/icons";
import { SectionHeading } from "../ui/SectionHeading";

/*
 * Rrjeta "bento" pa boshllëqe:
 *   celular (2 kolona)  → [0 0] [1 2] [3 2] [4 4] [5 5]
 *   desktop (4 kolona)  → [0 0 1 2] [0 0 3 2] [4 4 5 5]
 */
const cells = ["col-span-2 md:row-span-2", "", "row-span-2", "", "col-span-2", "col-span-2"];

const cellSizes = [
  "(min-width: 768px) 50vw, 100vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 25vw, 50vw",
  "(min-width: 768px) 50vw, 100vw",
  "(min-width: 768px) 50vw, 100vw",
];

export function Gallery() {
  const { t } = useLanguage();
  const g = content.gallery;

  return (
    <section id="gallery" data-nav="gallery" className="relative overflow-x-clip py-24 sm:py-32">
      <AmbientGlow tone="olive" className="-top-40 -left-40 size-[44rem]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading eyebrow={t(g.eyebrow)} title={t(g.title)} subtitle={t(g.subtitle)} />

        <StaggerContainer
          as="ul"
          interval={0.09}
          className="mt-16 grid auto-rows-[170px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[260px]"
        >
          {gallery.map((photo, i) => (
            <StaggerItem as="li" key={photo.src} y={36} className={cells[i % cells.length]}>
              <figure className="group relative size-full overflow-hidden rounded-2xl border border-gold/15 transition-[border-color,box-shadow] duration-700 hover:border-gold/50 hover:shadow-[0_0_40px_-8px_rgb(212_175_114/0.3)]">
                <Image
                  src={photo.src}
                  alt={t(photo.alt)}
                  fill
                  sizes={cellSizes[i % cellSizes.length]}
                  className="object-cover transition-[scale,filter] duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] saturate-[0.9] group-hover:scale-110 group-hover:saturate-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="h-px w-6 origin-left bg-gold transition-[width] duration-700 group-hover:w-10"
                  />
                  <span className="font-display text-lg text-ivory italic sm:text-2xl">
                    {t(photo.caption)}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12 flex justify-center">
          <ButtonLink
            href={restaurant.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="glass"
          >
            <InstagramIcon className="size-4" />
            {t(g.instagramCta)} · {restaurant.social.instagramHandle}
          </ButtonLink>
        </FadeUp>
      </div>
    </section>
  );
}
