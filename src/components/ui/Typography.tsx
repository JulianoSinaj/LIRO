import { cn } from "@/lib/cn";
import { FadeUp } from "../motion/FadeUp";

/** Ndan tekstin në pjesë: fjalët mes *yjeve* janë "accent". */
function parseAccent(text: string) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

/** Fjalët mes *yjeve* dalin me italic në ngjyrë ari. */
export function AccentText({ text }: { text: string }) {
  return (
    <>
      {parseAccent(text).map((part, i) =>
        part.accent ? (
          <em key={i} className="whitespace-nowrap text-gold italic">
            {part.text}
          </em>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

/** Mbititull i vogël: shkronja të mëdha, hapësirë e gjerë. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("text-xs font-normal tracking-[0.25em] text-gold uppercase", className)}>
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  /** Fjalët mes *yjeve* dalin me italic ari. */
  title: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({ eyebrow, title, align = "left", className }: SectionHeadingProps) {
  return (
    <FadeUp className={cn(align === "center" && "text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-light text-balance text-ivory sm:text-6xl lg:text-7xl">
        <AccentText text={title} />
      </h2>
    </FadeUp>
  );
}

/** Formati i çmimit: 1500 → "1500 L", [300, 500] → "300 / 500 L". */
export function formatPrice(price: number | readonly number[], suffix: string) {
  const values = Array.isArray(price) ? price : [price];
  return `${values.join(" / ")} ${suffix}`;
}
