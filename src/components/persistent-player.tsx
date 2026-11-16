"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "../content/site";
import { ui } from "../content/ui";
import { playbackFraction } from "../lib/music";
import { usePreferences } from "./preferences-provider";

/** One real audio element survives client-side navigation in the root layout. */
export function PersistentPlayer() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const pathname = usePathname();
  const audio = useRef<HTMLAudioElement>(null);
  const playAttempt = useRef(0);
  const starting = useRef(false);
  const [slot, setSlot] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fraction, setFraction] = useState(0);
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

  async function toggle() {
    const player = audio.current;
    if (!player) return;
    const attempt = ++playAttempt.current;
    if (!player.paused || starting.current) {
      starting.current = false;
      player.pause();
      setLoading(false);
      return;
    }
    starting.current = true;
    setError(false);
    setLoading(true);
    if (player.error) player.load();
    try {
      await player.play();
    } catch (cause) {
      if (
        attempt === playAttempt.current &&
        !(cause instanceof DOMException && cause.name === "AbortError")
      ) {
        setError(true);
      }
    } finally {
      if (attempt === playAttempt.current) {
        starting.current = false;
        setLoading(false);
      }
    }
  }

  const docked = !slot;
  const idle = !playing && !loading && fraction === 0 && !error;
  const classes = [
    "persistent-player",
    docked && "is-docked",
    docked && idle && "is-hidden",
  ]
    .filter(Boolean)
    .join(" ");
  const label = error
    ? text.musicRetry
    : playing || loading
      ? text.musicPause
      : text.musicPlay;
  return (
    <div className={classes} style={slot ?? undefined}>
      <audio
        ref={audio}
        src={site.song.src}
        preload="none"
        onPlaying={() => {
          setPlaying(true);
          setLoading(false);
        }}
        onPause={() => {
          setPlaying(false);
          setLoading(false);
        }}
        onWaiting={() => setLoading(true)}
        onTimeUpdate={(event) =>
          setFraction(
            playbackFraction(
              event.currentTarget.currentTime,
              event.currentTarget.duration,
            ),
          )
        }
        onEnded={() => {
          setPlaying(false);
          setFraction(0);
        }}
        onError={() => {
          setError(true);
          setLoading(false);
          setPlaying(false);
        }}
      />
      <svg className="music-note" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18V5l11-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="17" cy="16" r="3" />
      </svg>
      <div className="music-meta">
        <a
          className="music-title"
          href={site.song.page}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.song.title}
        </a>
        <div className="music-progress" aria-hidden="true">
          <span style={{ width: `${fraction * 100}%` }} />
        </div>
        <span className="music-status" role="status">
          {error ? text.musicFailed : loading ? text.musicLoading : ""}
        </span>
      </div>
      <button
        type="button"
        className="music-button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={playing}
      >
        <span className="music-button-face" aria-hidden="true">
          {playing || loading ? (
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
      </button>
    </div>
  );
}
