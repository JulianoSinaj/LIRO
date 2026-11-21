/** Bashkon klasat CSS, duke anashkaluar vlerat false/null/undefined. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
