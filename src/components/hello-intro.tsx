"use client";
import { useSyncExternalStore } from "react";
import { ui } from "../content/ui";
import { createIntroGate } from "../lib/intro";
import { usePreferences } from "./preferences-provider";

// Total length of the CSS sequence: draw "hello", fill it, then fade away.
const introMs = 2900;

let initialized = false;
let playing = false;
const listeners = new Set<() => void>();

function finish() {
  playing = false;
  delete document.documentElement.dataset.intro;
  for (const notify of listeners) notify();
}
function subscribe(notify: () => void) {
  listeners.add(notify);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!initialized) {
    initialized = true;
    let storage: Storage | undefined;
    try {
      storage = window.sessionStorage;
    } catch {
      // The in-memory guard still prevents replays.
    }
    playing = createIntroGate(storage)(media.matches);
    if (playing) {
      // Hold the home card entrances until the curtain lifts.
      document.documentElement.dataset.intro = "playing";
      window.setTimeout(finish, introMs);
    }
    notify();
  }
  const keyPressed = (event: KeyboardEvent) => {
    if (event.key === "Escape") finish();
  };
  document.addEventListener("keydown", keyPressed);
  return () => {
    listeners.delete(notify);
    document.removeEventListener("keydown", keyPressed);
  };
}

/** Once per session: a handwritten "hello" draws itself, Apple-setup style. */
export function HelloIntro() {
  const active = useSyncExternalStore(subscribe, () => playing, () => false);
  const { locale } = usePreferences();
  if (!active) return null;
  return (
    <div className="hello-intro">
      <svg className="hello-word" viewBox="0 0 600 220" role="img" aria-label="hello">
        <defs>
          <linearGradient id="hello-ink" x1="0" x2="1">
            <stop offset="0%" stopColor="#4a9b78" />
            <stop offset="55%" stopColor="#7cc29f" />
            <stop offset="100%" stopColor="#f0a77c" />
          </linearGradient>
        </defs>
        <text x="50%" y="62%" textAnchor="middle">
          hello
        </text>
      </svg>
      <button className="hello-skip" onClick={finish}>
        {ui[locale].skipIntro}
      </button>
    </div>
  );
}
