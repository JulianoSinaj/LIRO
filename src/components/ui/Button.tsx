import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Buton i hollë: kufi ari 1px, tekst ari; mbushet me ar vetëm në hover.
 */
export const buttonClasses = (className?: string) =>
  cn(
    "group inline-flex items-center justify-center gap-3 border border-gold/60 px-8 py-4 text-xs font-normal tracking-[0.25em] whitespace-nowrap text-gold uppercase transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink",
    className,
  );

export function Arrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={1.25}
      className={cn(
        "size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1",
        className,
      )}
    />
  );
}

export function ButtonLink({
  className,
  children,
  arrow = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { arrow?: boolean; children: ReactNode }) {
  return (
    <a className={buttonClasses(className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/** Lidhje teksti e qetë me shigjetë — p.sh. "Instagram →". */
export function TextLink({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-3 border-b border-gold/30 pb-1.5 text-xs tracking-[0.25em] text-gold uppercase transition-colors duration-500 hover:border-gold",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow className="size-3.5" />
    </a>
  );
}
