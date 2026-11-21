"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { INTRO_STORAGE_KEY } from "@/lib/intro";
import { useLanguage } from "./LanguageProvider";

/* -------------------------------------------------------------------------- */
/*  Gjendja e intros (sessionStorage)                                          */
/* -------------------------------------------------------------------------- */

/** Nëse video nuk ka nisur brenda kësaj kohe (rrjet i ngadaltë), intro anashkalohet. */
const START_TIMEOUT_MS = 6000;

function readPlayed(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* sessionStorage i bllokuar (p.sh. modaliteti privat) — s'ka problem */
  }
}

const noopSubscribe = () => () => {};

/**
 * `true` kur intro ka mbaruar (ose s'do shfaqet) dhe faqja është e dukshme.
 * Hero e përdor për të nisur animacionet e hyrjes pikërisht kur intro zbehet.
 */
const IntroRevealedContext = createContext(true);
export const useIntroRevealed = () => useContext(IntroRevealedContext);

/* -------------------------------------------------------------------------- */
/*  Komponenti                                                                 */
/* -------------------------------------------------------------------------- */

const skipLabel = { sq: "Kalo hyrjen", en: "Skip Intro" } as const;

export function CinematicIntro({ src, children }: { src: string; children: ReactNode }) {
  const { t } = useLanguage();

  /* Serveri supozon "s'është luajtur" → overlay-i është në HTML-në fillestare,
     kështu vizitori i ri s'e sheh kurrë faqen para videos. Për vizitorin që kthehet,
     skripti në <head> e fsheh me CSS para pikturimit, pastaj React e heq fare. */
  const alreadyPlayed = useSyncExternalStore(noopSubscribe, readPlayed, () => false);
  const [dismissed, setDismissed] = useState(false);
  const visible = !alreadyPlayed && !dismissed;

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismiss = useCallback(() => {
    markPlayed();
    /* Faqja poshtë bëhet menjëherë e klikueshme, edhe gjatë zbehjes. */
    if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
    videoRef.current?.pause();
    setDismissed(true);
  }, []);

  /* Bllokimi i scroll-it gjatë intros — rikthehet menjëherë në dalje. */
  useEffect(() => {
    if (!visible) return;
    const targets = [document.documentElement, document.body];
    targets.forEach((el) => el.classList.add("overflow-hidden"));
    return () => targets.forEach((el) => el.classList.remove("overflow-hidden"));
  }, [visible]);

  /* Nisja e videos + rrjetat e sigurisë (autoplay i bllokuar, rrjet i ngadaltë). */
  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    if (!video) return;

    /* Video nis nga HTML-ja e serverit, para hidratimit — ngjarjet e hershme
       (`ended`) mund të kenë ndodhur para se React të dëgjojë. */
    if (video.ended) {
      dismiss();
      return;
    }

    let cancelled = false;
    // iOS kërkon që `muted` të jetë vendosur si veti para play() — React
    // nuk e shkruan gjithmonë atributin në HTML-në e serverit.
    video.muted = true;
    video.defaultMuted = true;

    const attempt = video.play();
    // P.sh. iOS "Low Power Mode" bllokon autoplay-in → mos e lër përdoruesin në ekran të zi.
    attempt?.catch(() => {
      if (!cancelled && video.paused) dismiss();
    });

    const timeout = window.setTimeout(() => {
      if (!cancelled && video.currentTime === 0) dismiss();
    }, START_TIMEOUT_MS);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, dismiss]);

  return (
    <IntroRevealedContext value={!visible}>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="cinematic-intro"
            ref={overlayRef}
            data-cinematic-intro=""
            role="region"
            aria-label="Intro"
            initial={false}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] h-full w-full touch-none overflow-hidden overscroll-none intro-overlay"
          >
            {/* Video e zakonshme (jo motion): është e dukshme që nga HTML-ja e serverit,
                me një zbehje CSS që s'varet nga JavaScript-i.
                Kornizimi sipas raportit të ekranit është te `.intro-video` në globals.css. */}
            <video
              ref={videoRef}
              src={src}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              tabIndex={-1}
              onEnded={dismiss}
              onError={dismiss}
              className="intro-video animate-intro-in pointer-events-none"
            />

            {/* Vinjetë e lehtë poshtë, që butoni të lexohet mbi çdo kuadër */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent sm:h-48"
            />

            <motion.button
              type="button"
              onClick={dismiss}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group absolute right-[max(2rem,calc(env(safe-area-inset-right)+1rem))] bottom-[max(2rem,calc(env(safe-area-inset-bottom)+1rem))] [@media(max-height:500px)]:right-[max(1rem,env(safe-area-inset-right))] [@media(max-height:500px)]:bottom-[max(1rem,env(safe-area-inset-bottom))] inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-black/40 py-2.5 pr-4 pl-5 text-[11px] font-semibold tracking-[0.22em] text-white/90 uppercase backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black focus-visible:outline-none sm:py-3 sm:pr-5 sm:pl-6 sm:text-xs"
            >
              {t(skipLabel)}
              <ChevronRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </IntroRevealedContext>
  );
}
