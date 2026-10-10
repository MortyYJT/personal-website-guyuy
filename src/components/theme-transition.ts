"use client";
import { flushSync } from "react-dom";
import type { Theme } from "../content/types";

/**
 * Switches theme inside a View Transition so the new palette grows as a circle
 * from the toggle that was pressed. Falls back to an instant switch when the
 * API is missing or the visitor prefers reduced motion.
 */
export function switchTheme(
  next: Theme,
  apply: (theme: Theme) => void,
  origin?: { x: number; y: number },
) {
  const root = document.documentElement;
  const commit = () => {
    root.dataset.theme = next;
    flushSync(() => apply(next));
  };
  if (
    typeof document.startViewTransition !== "function" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return commit();
  root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth / 2}px`);
  root.style.setProperty("--vt-y", `${origin?.y ?? 0}px`);
  root.dataset.themeTransition = "";
  document
    .startViewTransition(commit)
    .finished.finally(() => delete root.dataset.themeTransition);
}
