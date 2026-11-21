"use client";

import { useSyncExternalStore } from "react";
import { menu } from "@/data/restaurantData";

/*
 * Kategoria aktive e menusë, e ndarë mes seksioneve:
 * kartat "Signature Menu" e ndryshojnë, menuja e plotë e lexon.
 */

const initial = menu[0]?.id ?? "";
let current = initial;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function selectMenuCategory(id: string) {
  if (id === current || !menu.some((c) => c.id === id)) return;
  current = id;
  listeners.forEach((listener) => listener());
}

export function useMenuCategory() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => initial,
  );
}
