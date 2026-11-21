import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "glass";
type Size = "sm" | "md";

const base =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-wide whitespace-nowrap transition-[translate,box-shadow,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5";

/* Shkëlqimi që kalon mbi butonin e artë në hover */
const shine =
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_25%,rgb(255_250_235/0.55)_50%,transparent_75%)] before:transition-transform before:duration-700 hover:before:translate-x-full";

const variants: Record<Variant, string> = {
  gold: cn(
    "bg-gold-gradient text-ink shadow-[0_10px_30px_-12px_rgb(212_175_114/0.6),inset_0_1px_0_rgb(255_255_255/0.35)] hover:shadow-[0_18px_44px_-12px_rgb(212_175_114/0.75),inset_0_1px_0_rgb(255_255_255/0.35)]",
    shine,
  ),
  glass: "glass text-ivory hover:border-gold/55 hover:bg-bronze/90 hover:text-gold-light",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-7 py-4 text-sm",
};

/** Klasat e butonit — për <a>, <button> etj. */
export function buttonClasses({
  variant = "gold",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={1.75}
      className={cn(
        "size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1",
        className,
      )}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "gold",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && <ButtonArrow />}
    </a>
  );
}
