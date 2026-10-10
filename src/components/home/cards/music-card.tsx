"use client";
import { site } from "../../../content/site";
import { ui } from "../../../content/ui";
import { bandcampEmbedUrl } from "../../../lib/music";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

// Bandcamp picks its text colour from `bgcol`, so the embed follows the site theme.
const colours = {
  light: { background: "ffffff", link: "4a9b78" },
  dark: { background: "333333", link: "9fd8bb" },
} as const;

export function MusicCard() {
  const { locale, theme } = usePreferences();
  const { song } = site;
  const url = bandcampEmbedUrl(song, colours[theme]);
  return (
    <Card area="music" order={8}>
      <div className="music-facade">
        <span className="music-note" aria-hidden="true">
          ♪
        </span>
        {url ? (
          <iframe
            className="music-embed"
            src={url}
            title={`${ui[locale].songFrame}: ${song.title} · ${song.artist}`}
            loading="lazy"
          />
        ) : (
          <a href={song.page} target="_blank" rel="noopener noreferrer">
            {song.title} · {song.artist} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </Card>
  );
}
