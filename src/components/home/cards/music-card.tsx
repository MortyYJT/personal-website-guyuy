"use client";
import { useState } from "react";
import { site } from "../../../content/site";
import { ui } from "../../../content/ui";
import { neteasePlayerUrl } from "../../../lib/music";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

// Facade: the third-party iframe (and its cookies) loads only after a click.
export function MusicCard() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const [open, setOpen] = useState(false);
  const url = neteasePlayerUrl(site.musicPlaylistId);
  return (
    <Card area="music" order={8} label={text.playlist}>
      {open && url ? (
        <iframe
          className="music-frame"
          src={url}
          title={text.playlistFrame}
          allow="autoplay"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="music-facade">
          <span className="music-note" aria-hidden="true">♪</span>
          <div className="music-meta">
            <p className="music-title">{text.playlist}</p>
            <p className="music-sub">{url ? text.playlistSource : text.playlistSoon}</p>
          </div>
          <button
            className="music-play"
            onClick={() => setOpen(true)}
            disabled={!url}
            aria-label={text.playPlaylist}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </button>
        </div>
      )}
    </Card>
  );
}
