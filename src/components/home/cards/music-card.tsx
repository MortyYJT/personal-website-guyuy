"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "../../../content/site";
import { ui } from "../../../content/ui";
import { readAmbientEnabled, writeAmbientEnabled } from "../../../lib/ambient";
import { neteaseSongUrl } from "../../../lib/music";
import { createShuffler } from "../../../lib/shuffle";
import { startAmbience, stopAmbience } from "../../../lib/summer-ambience";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

// The ambience preference lives in localStorage; the server renders "on".
const ambientListeners = new Set<() => void>();
function subscribeAmbient(notify: () => void) {
  ambientListeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    ambientListeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}
function setAmbientEnabled(enabled: boolean) {
  writeAmbientEnabled(storage(), enabled);
  for (const notify of ambientListeners) notify();
}

export function MusicCard() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const ambient = useSyncExternalStore(
    subscribeAmbient,
    () => readAmbientEnabled(storage()),
    () => true,
  );
  const [song, setSong] = useState<number | null>(null);
  const shuffle = useRef<() => number>(null);
  const controls = useRef<HTMLDivElement>(null);
  const cancelGestureStart = useRef<() => void>(() => {});

  // Browsers only allow sound after a user gesture, so ambience starts on the
  // visitor's first click or key press anywhere on the page.
  useEffect(() => {
    if (!readAmbientEnabled(storage())) return;
    if (navigator.userActivation?.hasBeenActive) {
      void startAmbience();
      return stopAmbience;
    }
    function onFirstGesture(event: Event) {
      if (controls.current?.contains(event.target as Node)) return;
      void startAmbience();
      remove();
    }
    function remove() {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    }
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);
    cancelGestureStart.current = remove;
    return () => {
      remove();
      stopAmbience();
    };
  }, []);

  function toggleAmbient() {
    cancelGestureStart.current();
    const next = !ambient;
    setAmbientEnabled(next);
    if (next && song === null) void startAmbience();
    else stopAmbience();
  }
  function playNext() {
    shuffle.current ??= createShuffler(site.songs.length);
    cancelGestureStart.current();
    stopAmbience();
    setSong(shuffle.current());
  }
  function closeSong() {
    setSong(null);
    if (ambient) void startAmbience();
  }

  const current = song === null ? null : site.songs[song];
  const url = current ? neteaseSongUrl(current.neteaseId) : null;
  return (
    <Card area="music" order={8} className={current ? "is-open" : ""}>
      {current && url && (
        <div className="song-popover" role="dialog" aria-label={text.songFrame}>
          <iframe
            key={current.neteaseId}
            className="song-frame"
            src={url}
            title={`${text.songFrame}: ${current.title}`}
            allow="autoplay"
            referrerPolicy="no-referrer"
          />
          <div className="song-popover-bar">
            <span>{text.songRegionNote}</span>
            <button onClick={playNext}>{text.nextSong}</button>
            <button onClick={closeSong} aria-label={text.closeSong}>
              ×
            </button>
          </div>
        </div>
      )}
      <div className="music-facade" ref={controls}>
        <span className="music-note" aria-hidden="true">
          {current ? "♪" : "🎐"}
        </span>
        <div className="music-meta">
          <p className="music-title">{current ? current.title : text.ambientName}</p>
          <p className="music-sub">
            {current ? current.artist : ambient ? text.ambientOn : text.ambientOff}
          </p>
        </div>
        <button
          className="music-icon-button"
          onClick={toggleAmbient}
          aria-pressed={ambient}
          aria-label={ambient ? text.ambientToggleOff : text.ambientToggleOn}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9h4l5-4v14l-5-4H4z" />
            {ambient ? (
              <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" />
            ) : (
              <path d="m16 9 5 6m0-6-5 6" fill="none" />
            )}
          </svg>
        </button>
        <button className="music-play" onClick={playNext} aria-label={text.shufflePlay}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
      </div>
    </Card>
  );
}
