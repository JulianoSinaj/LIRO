"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, LayoutGrid, X } from "lucide-react";
import { content, gallery, restaurant, type GalleryPhoto } from "@/data/restaurantData";
import { cn } from "@/lib/cn";
import { EASE_LUXE } from "@/lib/motion";
import { useLanguage } from "../LanguageProvider";
import { FadeUp } from "../motion/FadeUp";
import { TextLink } from "../ui/Button";
import { AccentText, SectionHeading } from "../ui/Typography";

const FEATURED_COUNT = 4;
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/* Fotot e shënuara `featured` dalin të parat; nëse s'mjaftojnë, plotësohen me radhë. */
const featured = [...gallery.filter((p) => p.featured), ...gallery.filter((p) => !p.featured)].slice(
  0,
  FEATURED_COUNT,
);
const hiddenCount = gallery.length - featured.length;

/* Zhvendosja vertikale e secilës kolonë në desktop — ritëm "editorial". */
const stagger = ["lg:mt-0", "lg:mt-16", "lg:mt-6", "lg:mt-24"];

const pad = (n: number) => String(n).padStart(2, "0");

type ViewerState = { mode: "grid" } | { mode: "photo"; index: number } | null;

/** Galeria e atmosferës — 4 foto në faqe, katalogu i plotë hapet në ekran të plotë. */
export function Gallery() {
  const { t } = useLanguage();
  const g = content.gallery;
  const [viewer, setViewer] = useState<ViewerState>(null);

  return (
    <section id="gallery" className="border-t border-gold/15 px-6 py-16 sm:px-16 sm:py-20 lg:px-28 lg:py-24 xl:px-40">
      <div className="mx-auto max-w-[68rem]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={t(g.eyebrow)} title={t(g.title)} />
          <FadeUp delay={0.15} className="flex shrink-0 flex-wrap items-center gap-x-10 gap-y-6">
            <MagneticButton onClick={() => setViewer({ mode: "grid" })}>
              <LayoutGrid aria-hidden="true" strokeWidth={1.25} className="size-4" />
              {t(g.viewAll)}
              <span className="text-gold/60 tabular-nums">· {pad(gallery.length)}</span>
            </MagneticButton>
            <TextLink href={restaurant.social.instagramUrl} target="_blank" rel="noopener noreferrer">
              {restaurant.social.instagramHandle}
            </TextLink>
          </FadeUp>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {featured.map((photo, i) => {
            const index = gallery.indexOf(photo);
            /* Pllaka e fundit hap katalogun dhe tregon sa foto të tjera ka. */
            const isMore = i === featured.length - 1 && hiddenCount > 0;
            return (
              <FadeUp
                as="li"
                key={photo.src}
                delay={i * 0.08}
                className={cn(i % 2 === 1 && "mt-8", stagger[i])}
              >
                <figure>
                  <TiltTile
                    photo={photo}
                    label={
                      isMore
                        ? `${t(g.viewAll)} (${gallery.length} ${t(g.photos)})`
                        : `${t(g.open)}: ${t(photo.caption)}`
                    }
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    onClick={() => setViewer(isMore ? { mode: "grid" } : { mode: "photo", index })}
                  >
                    {isMore && (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/60 backdrop-blur-[2px] transition-colors duration-700 group-hover:bg-ink/40">
                        <span className="font-display text-5xl font-light text-ivory sm:text-6xl">
                          +{hiddenCount}
                        </span>
                        <span className="text-[11px] tracking-[0.25em] text-gold uppercase">
                          {t(g.viewAll)}
                        </span>
                      </span>
                    )}
                  </TiltTile>
                  <figcaption className="mt-5 flex items-baseline gap-3 text-[11px] tracking-[0.25em] text-muted uppercase">
                    <span className="text-gold/70 tabular-nums">{pad(index + 1)}</span>
                    {isMore ? t(g.more) : t(photo.caption)}
                  </figcaption>
                </figure>
              </FadeUp>
            );
          })}
        </ul>
      </div>

      <GalleryViewer state={viewer} setState={setViewer} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pllaka e fotos — anon lehtë në 3D drejt kursorit (spring)                 */
/* -------------------------------------------------------------------------- */

function TiltTile({
  photo,
  label,
  sizes,
  onClick,
  children,
  tilt = 6,
}: {
  photo: GalleryPhoto;
  label: string;
  sizes: string;
  onClick: () => void;
  children?: ReactNode;
  tilt?: number;
}) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-tilt, tilt]), SPRING);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [tilt, -tilt]), SPRING);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="[perspective:1200px]">
      <motion.button
        type="button"
        aria-label={label}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.96 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative block aspect-[2/3] w-full cursor-zoom-in overflow-hidden bg-ink-soft will-change-transform"
      >
        <Image
          src={photo.src}
          alt={t(photo.alt)}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-700 group-hover:border-gold/40"
        />
        {children}
      </motion.button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Butoni magnetik — ndjek kursorin, mbushet me ar nga poshtë                */
/* -------------------------------------------------------------------------- */

function MagneticButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
      style={{ x, y }}
      className="group relative inline-flex items-center overflow-hidden border border-gold/60 px-7 py-4 text-xs tracking-[0.25em] whitespace-nowrap text-gold uppercase will-change-transform"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <span className="relative inline-flex items-center gap-3 transition-colors duration-500 group-hover:text-ink [&>span]:transition-colors [&>span]:duration-500 group-hover:[&>span]:text-ink/60">
        {children}
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Katalogu në ekran të plotë: rrjeta e të gjitha fotove + pamja e një fotoje */
/* -------------------------------------------------------------------------- */

function GalleryViewer({
  state,
  setState,
}: {
  state: ViewerState;
  setState: (s: ViewerState) => void;
}) {
  const { t } = useLanguage();
  const g = content.gallery;
  const open = state !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);

  const close = useCallback(() => setState(null), [setState]);
  const go = useCallback(
    (step: number) => {
      if (state?.mode !== "photo") return;
      setDirection(step);
      setState({ mode: "photo", index: (state.index + step + gallery.length) % gallery.length });
    },
    [state, setState],
  );

  /* Hapja: faqja pas bllokohet dhe bëhet "inert"; fokusi kthehet te butoni që e hapi. */
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const background = document.querySelectorAll<HTMLElement>("header, main, footer");
    background.forEach((el) => el.setAttribute("inert", ""));
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      background.forEach((el) => el.removeAttribute("inert"));
      document.documentElement.style.overflow = "";
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {state && (
        <motion.div
          key="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={t(g.title).replaceAll("*", "")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-md"
        >
          {/* Shiriti i sipërm */}
          <div className="flex h-20 shrink-0 items-center justify-between gap-6 border-b border-gold/15 px-6 sm:px-10">
            <div className="flex items-baseline gap-4 text-[11px] tracking-[0.25em] uppercase">
              <span className="text-gold">{t(g.eyebrow)}</span>
              <span className="text-muted tabular-nums">
                {state.mode === "photo"
                  ? `${pad(state.index + 1)} / ${pad(gallery.length)}`
                  : `${pad(gallery.length)} ${t(g.photos)}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {state.mode === "photo" && (
                <IconButton label={t(g.back)} onClick={() => setState({ mode: "grid" })}>
                  <LayoutGrid strokeWidth={1.25} className="size-5" />
                </IconButton>
              )}
              <IconButton ref={closeRef} label={t(g.close)} onClick={close}>
                <X strokeWidth={1.25} className="size-5" />
              </IconButton>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {state.mode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_LUXE }}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-10 sm:px-10 lg:py-16"
              >
                <div className="mx-auto max-w-[80rem]">
                  <h2 className="font-display text-4xl leading-[1.05] font-light text-ivory sm:text-5xl">
                    <AccentText text={t(g.title)} />
                  </h2>
                  <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-8">
                    {gallery.map((photo, i) => (
                      <motion.li
                        key={photo.src}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE_LUXE }}
                      >
                        <TiltTile
                          photo={photo}
                          tilt={4}
                          label={`${t(g.open)}: ${t(photo.caption)}`}
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 31vw, 50vw"
                          onClick={() => {
                            setDirection(0);
                            setState({ mode: "photo", index: i });
                          }}
                        />
                        <p className="mt-3 flex items-baseline gap-3 text-[11px] tracking-[0.25em] text-muted uppercase">
                          <span className="text-gold/70 tabular-nums">{pad(i + 1)}</span>
                          {t(photo.caption)}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <PhotoView
                key="photo"
                index={state.index}
                direction={direction}
                onStep={go}
                onSelect={(i) => {
                  setDirection(i > state.index ? 1 : -1);
                  setState({ mode: "photo", index: i });
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function PhotoView({
  index,
  direction,
  onStep,
  onSelect,
}: {
  index: number;
  direction: number;
  onStep: (step: number) => void;
  onSelect: (index: number) => void;
}) {
  const { t } = useLanguage();
  const g = content.gallery;
  const photo = gallery[index];
  const thumbsRef = useRef<HTMLDivElement>(null);

  /* Miniatura aktive mbahet gjithmonë në pamje. */
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  /* Rrëshqitje me gisht / mi: majtas → tjetra, djathtas → e mëparshmja. */
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -500) onStep(1);
    else if (info.offset.x > 80 || info.velocity.x > 500) onStep(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE_LUXE }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden [perspective:1600px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.figure
            key={photo.src}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: `${d * 12}%`, rotateY: d * -8, scale: 0.96 }),
              center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: `${d * -12}%`, rotateY: d * 8, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={onDragEnd}
            className="absolute inset-0 flex cursor-grab flex-col items-center justify-center px-4 py-6 will-change-transform active:cursor-grabbing sm:px-24"
          >
            <div className="relative min-h-0 w-full flex-1">
              <Image
                src={photo.src}
                alt={t(photo.alt)}
                fill
                priority
                sizes="(min-width: 640px) 70vw, 100vw"
                draggable={false}
                className="pointer-events-none object-contain select-none"
              />
            </div>
            <figcaption className="mt-4 flex shrink-0 items-baseline gap-3 text-[11px] tracking-[0.25em] text-muted uppercase">
              <span className="text-gold/70 tabular-nums">{pad(index + 1)}</span>
              {t(photo.caption)}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center pl-6 sm:flex sm:pl-10">
          <IconButton label={t(g.prev)} onClick={() => onStep(-1)} className="pointer-events-auto">
            <ArrowLeft strokeWidth={1.25} className="size-5" />
          </IconButton>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-6 sm:flex sm:pr-10">
          <IconButton label={t(g.next)} onClick={() => onStep(1)} className="pointer-events-auto">
            <ArrowRight strokeWidth={1.25} className="size-5" />
          </IconButton>
        </div>
      </div>

      {/* Miniaturat */}
      <div
        ref={thumbsRef}
        className="flex shrink-0 justify-start gap-2 overflow-x-auto border-t border-gold/15 px-6 py-4 sm:justify-center sm:px-10"
      >
        {gallery.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            data-index={i}
            aria-label={`${t(g.open)}: ${t(p.caption)}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => onSelect(i)}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "relative aspect-[2/3] h-16 shrink-0 overflow-hidden border transition-[opacity,border-color] duration-500 sm:h-20",
              i === index ? "border-gold opacity-100" : "border-transparent opacity-40 hover:opacity-80",
            )}
          >
            <Image src={p.src} alt="" fill sizes="56px" className="object-cover" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function IconButton({
  label,
  onClick,
  children,
  className,
  ref,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full border border-gold/30 bg-ink/60 text-gold backdrop-blur-sm transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
