import { cn } from "@/lib/cn";

/**
 * Dritë radiale qelibari e fshehur pas seksioneve — imiton ndriçimin e ngrohtë
 * LED mbi muret me tulla. Pozicionohet me `className` (p.sh. "-left-40 top-0 size-[40rem]").
 */
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("glow-amber pointer-events-none absolute rounded-full", className)}
    />
  );
}

/**
 * Mur me tulla i ndriçuar nga lart prej tre "dritave LED" (wall-washer).
 * Tullat duken vetëm aty ku bie drita.
 */
export function LitBrickWall({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 [mask-image:linear-gradient(to_bottom,transparent,#000_7rem)]",
        className,
      )}
    >
      <div className="led-wash absolute inset-0" />
      <div className="brick-lit absolute inset-0" />
    </div>
  );
}

/** Vijë e hollë ari ndarëse, që zbehet në skaje. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px bg-linear-to-r from-transparent via-gold/35 to-transparent", className)}
    />
  );
}
