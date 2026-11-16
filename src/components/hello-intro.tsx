"use client";
import { useEffect } from "react";
import { ui } from "../content/ui";
import { usePreferences } from "./preferences-provider";

const introMs = 2900;

function finish() {
  delete document.documentElement.dataset.intro;
}

/** The curtain is rendered in HTML; the head script decides before first paint. */
export function HelloIntro() {
  const { locale } = usePreferences();
  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    root.dataset.intro = "playing";
    try {
      sessionStorage.setItem("guyuy:intro:v1", "seen");
    } catch {
      /* Session-only fallback. */
    }
    const timer = window.setTimeout(finish, introMs);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <div className="hello-intro">
      <svg
        className="hello-word"
        viewBox="0 0 600 220"
        role="img"
        aria-label="hello"
      >
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
