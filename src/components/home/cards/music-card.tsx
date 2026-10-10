"use client";
import { useRef, useState } from "react";
import { site } from "../../../content/site";
import { ui } from "../../../content/ui";
import { neteaseSongPage, neteaseSongUrl } from "../../../lib/music";
import { createShuffler } from "../../../lib/shuffle";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

// The NetEase iframe (and its cookies) loads only after the visitor presses play.
export function MusicCard() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const [song, setSong] = useState<number | null>(null);
  const shuffle = useRef<() => number>(null);

  function playNext() {
    shuffle.current ??= createShuffler(site.songs.length);
    setSong(shuffle.current());
  }

  const current = song === null ? null : site.songs[song];
  const url = current ? neteaseSongUrl(current.neteaseId) : null;
  const page = current ? neteaseSongPage(current.neteaseId) : null;
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
          <p className="song-popover-note">{text.songRegionNote}</p>
          <div className="song-popover-bar">
            {page && (
              <a href={page} target="_blank" rel="noopener noreferrer">
                {text.openInNetease} <span aria-hidden="true">↗</span>
              </a>
            )}
            <button onClick={playNext}>{text.nextSong}</button>
            <button onClick={() => setSong(null)} aria-label={text.closeSong}>
              ×
            </button>
          </div>
        </div>
      )}
      <div className="music-facade">
        <span className="music-note" aria-hidden="true">
          ♪
        </span>
        <div className="music-meta">
          <p className="music-title">{current ? current.title : text.songsTitle}</p>
          <p className="music-sub">{current ? current.artist : text.songsHint}</p>
        </div>
        <button className="music-play" onClick={playNext} aria-label={text.shufflePlay}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
      </div>
    </Card>
  );
}
