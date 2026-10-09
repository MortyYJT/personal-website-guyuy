"use client";

import { useSyncExternalStore } from "react";
import { createIntroGate } from "../lib/intro";
import { usePreferences } from "./preferences-provider";

let initialized = false;
let playing = false;
const listeners = new Set<() => void>();

function finish() {
  playing = false;
  for (const notify of listeners) notify();
}
function subscribe(notify: () => void) {
  listeners.add(notify);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!initialized) {
    initialized = true;
    let storage: Storage | undefined;
    try { storage = window.sessionStorage; } catch { /* Use the memory guard. */ }
    playing = createIntroGate(storage)(media.matches);
    // This finite store-owned timer survives React's subscription checks.
    if (playing) window.setTimeout(finish, 1400);
    notify();
  }
  const motionChanged = () => { if (media.matches) finish(); };
  const keyPressed = (event: KeyboardEvent) => {
    if (event.key === "Escape") finish();
  };
  const focused = (event: FocusEvent) => {
    if (event.target instanceof Element && !event.target.closest(".opening-animation")) finish();
  };
  media.addEventListener("change", motionChanged);
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("focusin", focused);
  return () => {
    listeners.delete(notify);
    media.removeEventListener("change", motionChanged);
    document.removeEventListener("keydown", keyPressed);
    document.removeEventListener("focusin", focused);
  };
}
const snapshot = () => playing;
const serverSnapshot = () => false;

export function OpeningAnimation() {
  const active = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const { locale } = usePreferences();
  if (!active) return null;
  return (
    <div className="opening-animation">
      <div className="intro-stage" aria-hidden="true">
        <div className="intro-symbols">
          <svg className="intro-heart" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 42 5 23C-7 9 12-5 24 10 36-5 55 9 43 23Z" />
          </svg>
          <svg className="intro-cross" viewBox="0 0 48 48" fill="none">
            <path d="m10 10 28 28M38 10 10 38" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
          </svg>
        </div>
        <div className="intro-bar" />
      </div>
      <div className="intro-wipe" aria-hidden="true" />
      <button className="intro-skip" onClick={finish}>
        {locale === "zh" ? "跳过动画" : "Skip intro"} <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
