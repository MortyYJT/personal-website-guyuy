"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "../content/site";
import { ui } from "../content/ui";
import { bandcampEmbedUrl, clockFraction, pauseClock, startClock, type FacadeClock } from "../lib/music";
import { usePreferences } from "./preferences-provider";

// The embed sits invisibly under the round button, so its colours never show.
const colours = { background: "ffffff", link: "4a9b78" };
const noop = () => () => {};
const stopped: FacadeClock = { elapsed: 0, startedAt: null };

// Frozen on first client read so re-renders never reload (and stop) the player.
let frozenSrc: string | null = null;
function clientSrc() {
  frozenSrc ??= bandcampEmbedUrl(site.song, colours);
  return frozenSrc;
}

/**
 * A facade in the reference's style (note, title, progress, round button) over
 * Toby Fox's official Bandcamp embed. The embed is clipped to its own play
 * button and laid under ours, so a click is a real click on Bandcamp's button.
 * The cross-origin frame reports nothing back; the page only learns that the
 * frame took focus, and times the known track length from there.
 *
 * Lives in the root layout so client-side navigation never unmounts the
 * iframe. On the home page it sits over the music card's `[data-player-slot]`;
 * elsewhere it docks in the corner while a track is under way.
 */
export function PersistentPlayer() {
  const { locale } = usePreferences();
  const pathname = usePathname();
  const src = useSyncExternalStore(noop, clientSrc, () => null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [slot, setSlot] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [clock, setClock] = useState<FacadeClock>(stopped);
  const [fraction, setFraction] = useState(0);
  const durationMs = site.song.durationSeconds * 1000;
  const playing = clock.startedAt !== null;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>("[data-player-slot]");
        if (!el) return setSlot(null);
        const rect = el.getBoundingClientRect();
        setSlot({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("resize", measure);
    // Card entrance animations move the slot after first paint.
    document.addEventListener("animationend", measure);
    measure();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("animationend", measure);
    };
  }, [pathname]);

  // A click inside the frame moves focus into it and blurs this window.
  useEffect(() => {
    const onBlur = () => {
      window.setTimeout(() => {
        if (document.activeElement !== frame.current) return;
        const now = Date.now();
        setClock((c) => (c.startedAt === null ? startClock(c, now) : pauseClock(c, now)));
        // Hand focus back so the next click blurs the window again.
        frame.current?.blur();
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      const next = clockFraction(clock, Date.now(), durationMs);
      setFraction(next);
      if (next >= 1) {
        setClock(stopped);
        setFraction(0);
      }
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [clock, playing, durationMs]);

  if (!src) return null;
  const { song } = site;
  const docked = !slot;
  const idle = !playing && clock.elapsed === 0;
  const classes = ["persistent-player", docked && "is-docked", docked && idle && "is-hidden"]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className={classes}
      style={slot ? { top: slot.top, left: slot.left, width: slot.width, height: slot.height } : undefined}
    >
      <svg className="music-note" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18V5l11-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="17" cy="16" r="3" />
      </svg>
      <div className="music-meta">
        <a className="music-title" href={song.page} target="_blank" rel="noopener noreferrer">
          {song.title}
        </a>
        <div className="music-progress" aria-hidden="true">
          <span style={{ width: `${fraction * 100}%` }} />
        </div>
      </div>
      <div className="music-button">
        <iframe
          ref={frame}
          className="music-embed"
          src={src}
          title={`${ui[locale].songFrame}: ${song.title} · ${song.artist}`}
        />
        <span className="music-button-face" aria-hidden="true">
          {playing ? (
            <svg viewBox="0 0 24 24">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.2-6.5a1 1 0 0 0 0-1.7L9.5 4.6A1 1 0 0 0 8 5.5Z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}
