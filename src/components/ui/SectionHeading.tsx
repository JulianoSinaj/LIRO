import { cn } from "@/lib/cn";
import { FadeUp } from "../motion/FadeUp";
import { AccentText } from "./AccentText";

/** Mbititull i vogël me hapësirë të gjerë mes shkronjave dhe vija të holla ari. */
export function Eyebrow({
  children,
  centered = false,
  className,
}: {
  children: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs",
        centered && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-10 bg-linear-to-r from-transparent to-gold/70" />
      {children}
      {centered && (
        <span aria-hidden="true" className="h-px w-10 bg-linear-to-l from-transparent to-gold/70" />
      )}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  /** Fjalët mes *yjeve* dalin me italic ari. */
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center", className)}>
      <FadeUp>
        <Eyebrow centered={centered}>{eyebrow}</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="mt-6 font-serif text-[2.6rem] leading-[1.05] font-medium text-balance text-ivory sm:text-5xl lg:text-[3.6rem]">
          <AccentText text={title} />
        </h2>
      </FadeUp>
      {subtitle && (
        <FadeUp delay={0.2}>
          <p
            className={cn(
              "mt-6 text-base leading-relaxed text-pretty text-muted sm:text-[17px]",
              centered && "mx-auto max-w-xl",
            )}
          >
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
