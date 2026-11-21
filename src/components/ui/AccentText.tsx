import { Fragment } from "react";
import { cn } from "@/lib/cn";

/** Ndan tekstin në pjesë: `{ text, accent }`. Fjalët mes *yjeve* janë "accent". */
export function parseAccent(text: string) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

/** Heq yjet për përdorim si tekst i thjeshtë (aria-label, title, etj.). */
export const plainText = (text: string) => text.replace(/\*/g, "");

/**
 * Shfaq një titull ku fjalët mes *yjeve* dalin me italic në ngjyrë ari,
 * p.sh. "Një Përvojë *Fine Dining* në Zemër të Natyrës".
 */
export function AccentText({ text, accentClassName }: { text: string; accentClassName?: string }) {
  return (
    <>
      {parseAccent(text).map((part, i) =>
        part.accent ? (
          <span key={i} className={cn("font-serif italic text-gold-soft", accentClassName)}>
            {part.text}
          </span>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}
