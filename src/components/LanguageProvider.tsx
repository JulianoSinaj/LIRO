"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { defaultLang, languages, type Lang, type Localized } from "@/data/restaurantData";

/* -------------------------------------------------------------------------- */
/*  Ruajtja e gjuhës (localStorage) si "external store"                        */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "liro-lang";
const listeners = new Set<() => void>();
let currentLang: Lang | null = null;

const isLang = (value: unknown): value is Lang => languages.some((l) => l.code === value);

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : defaultLang;
  } catch {
    return defaultLang;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      currentLang = isLang(event.newValue) ? event.newValue : defaultLang;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  if (currentLang === null) currentLang = readStoredLang();
  return currentLang;
}

function getServerSnapshot(): Lang {
  return defaultLang;
}

function persistLang(lang: Lang) {
  currentLang = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* localStorage mund të mos jetë i disponueshëm (p.sh. private mode) */
  }
  emit();
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Kthen tekstin në gjuhën aktive. */
  t: (value: Localized) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((value: Localized) => value[lang], [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: persistLang,
      t,
    }),
    [lang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage duhet përdorur brenda <LanguageProvider>.");
  return ctx;
}
