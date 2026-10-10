const digits = /^\d+$/;
const hex = /^[0-9a-f]{6}$/i;

/** Official Bandcamp small embedded player for one album track, or null for unsafe input. */
export function bandcampEmbedUrl(
  ids: { album: string; track: string },
  colours: { background: string; link: string },
): string | null {
  if (!digits.test(ids.album) || !digits.test(ids.track)) return null;
  if (!hex.test(colours.background) || !hex.test(colours.link)) return null;
  return (
    "https://bandcamp.com/EmbeddedPlayer/" +
    `album=${ids.album}/size=small/bgcol=${colours.background}/linkcol=${colours.link}/` +
    `track=${ids.track}/transparent=true/`
  );
}
