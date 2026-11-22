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
 * Shfaq një titull me nuancë fildish-perlë; fjalët mes *yjeve* dalin me italic
 * dhe gradient ari, p.sh. "Një Përvojë *Fine Dining* në Zemër të Natyrës".
 */
export function AccentText({ text, accentClassName }: { text: string; accentClassName?: string }) {
  return (
    <>
      {parseAccent(text).map((part, i) =>
        part.accent ? (
          <span
            key={i}
            className={cn("italic-bleed font-display text-gold-gradient italic", accentClassName)}
          >
            {part.text}
          </span>
        ) : (
          <span key={i} className="text-pearl">
            {part.text}
          </span>
        ),
      )}
    </>
  );
}
