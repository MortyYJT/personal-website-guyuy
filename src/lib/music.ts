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
    `album=${ids.album}/size=small/bgcol=${colours.background}/linkcol=${colours.link}/artwork=none/` +
    `track=${ids.track}/transparent=true/`
  );
}

/** NetEase Cloud Music song page, or null for a non-numeric id. */
export function neteaseSongUrl(id: string): string | null {
  return digits.test(id) ? `https://music.163.com/#/song?id=${id}` : null;
}

/**
 * Wall-clock stand-in for playback progress. The cross-origin player reports
 * nothing, so the facade times the known track length from the user's clicks.
 */
export type FacadeClock = { elapsed: number; startedAt: number | null };

export function startClock(clock: FacadeClock, now: number): FacadeClock {
  return clock.startedAt === null ? { elapsed: clock.elapsed, startedAt: now } : clock;
}

export function pauseClock(clock: FacadeClock, now: number): FacadeClock {
  return clock.startedAt === null
    ? clock
    : { elapsed: clock.elapsed + now - clock.startedAt, startedAt: null };
}

export function clockFraction(clock: FacadeClock, now: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  const running = clock.startedAt === null ? 0 : now - clock.startedAt;
  return Math.min(1, (clock.elapsed + running) / durationMs);
}
