"use client";
import { useSyncExternalStore } from "react";

// One shared minute-resolution clock. The server snapshot is null so that
// time-dependent text renders a neutral placeholder and never mismatches.
let current: Date | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function tick() {
  const next = new Date();
  if (
    current &&
    next.getMinutes() === current.getMinutes() &&
    next.getHours() === current.getHours() &&
    next.getDate() === current.getDate()
  )
    return;
  current = next;
  for (const notify of listeners) notify();
}
function subscribe(notify: () => void) {
  listeners.add(notify);
  timer ??= setInterval(tick, 1000);
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}
function snapshot() {
  current ??= new Date();
  return current;
}

export function useNow(): Date | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}
