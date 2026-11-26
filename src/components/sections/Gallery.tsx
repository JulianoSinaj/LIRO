"use client";

import { content, gallery, restaurant } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { ParallaxImage } from "../motion/ParallaxImage";
import { TextLink } from "../ui/Button";
import { SectionHeading } from "../ui/Typography";

/* Forma e secilës foto sipas radhës: panoramike, horizontale, vertikale. */
const layout = [
  { frame: "aspect-[4/3] sm:aspect-[21/9]", cell: "lg:col-span-12", sizes: "100vw" },
  { frame: "aspect-[4/3]", cell: "lg:col-span-7", sizes: "(min-width: 1024px) 58vw, 100vw" },
  {
    frame: "aspect-[4/5]",
    cell: "lg:col-span-4 lg:col-start-9 lg:mt-40",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
];

/** Galeria e atmosferës — kompozim asimetrik me hapësirë të pastër. */
export function Gallery() {
  const { t } = useLanguage();
  const g = content.gallery;

  return (
    <section id="gallery" className="border-t border-gold/15 px-6 py-32 sm:px-10 lg:py-48">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={t(g.eyebrow)} title={t(g.title)} />
          <FadeUp delay={0.15} className="shrink-0">
            <TextLink href={restaurant.social.instagramUrl} target="_blank" rel="noopener noreferrer">
              {restaurant.social.instagramHandle}
            </TextLink>
          </FadeUp>
        </div>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-24">
          {gallery.slice(0, layout.length).map((photo, i) => (
            <FadeUp as="figure" key={photo.src} className={cn(layout[i].cell)}>
              <ParallaxImage
                src={photo.src}
                alt={t(photo.alt)}
                sizes={layout[i].sizes}
                className={layout[i].frame}
                strength={i === 0 ? 4 : 6}
                zoomOnHover
              />
              <figcaption className="mt-5 text-[11px] tracking-[0.25em] text-muted uppercase">
                {t(photo.caption)}
              </figcaption>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
