"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "../content/site";
import { ui } from "../content/ui";
import { bandcampEmbedUrl } from "../lib/music";
import { usePreferences } from "./preferences-provider";

// Bandcamp picks its text colour from `bgcol`.
const colours = {
  light: { background: "ffffff", link: "4a9b78" },
  dark: { background: "333333", link: "9fd8bb" },
} as const;

const noop = () => () => {};

// Frozen on first client read: a theme switch must not reload (and stop) the player.
// The theme comes from <html data-theme>, which the inline script sets before hydration.
let frozenSrc: string | null = null;
function clientSrc() {
  frozenSrc ??= bandcampEmbedUrl(
    site.song,
    colours[document.documentElement.dataset.theme === "dark" ? "dark" : "light"],
  );
  return frozenSrc;
}

/**
 * Lives in the root layout so client-side navigation never unmounts the
 * iframe (which would stop playback). On the home page it is laid over the
 * music card's `[data-player-slot]`; elsewhere it docks in the corner. Only
 * CSS position changes; the iframe is never re-parented or re-sourced.
 */
export function PersistentPlayer() {
  const { locale } = usePreferences();
  const pathname = usePathname();
  const src = useSyncExternalStore(noop, clientSrc, () => null);
  const [slot, setSlot] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>("[data-player-slot]");
        if (!el) return setSlot(null);
        const rect = el.getBoundingClientRect();
        setSlot({ top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("resize", measure);
    // Card entrance animations move the slot after first paint.
    document.addEventListener("animationend", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("animationend", measure);
    };
  }, [pathname]);

  if (!src) return null;
  const { song } = site;
  return (
    <div
      className={slot ? "persistent-player" : "persistent-player is-docked"}
      style={slot ? { top: slot.top, left: slot.left, width: slot.width } : undefined}
    >
      {!slot && (
        <span className="music-note" aria-hidden="true">
          ♪
        </span>
      )}
      <iframe
        className="music-embed"
        src={src}
        title={`${ui[locale].songFrame}: ${song.title} · ${song.artist}`}
      />
    </div>
  );
}
