const digits = /^\d+$/;
/** NetEase Cloud Music song page, or null for a non-numeric id. */
export function neteaseSongUrl(id: string): string | null {
  return digits.test(id) ? `https://music.163.com/#/song?id=${id}` : null;
}

/** Playback metadata is unknown until audio loads; clamp browser values safely. */
export function playbackFraction(
  currentTime: number,
  duration: number,
): number {
  if (
    !Number.isFinite(currentTime) ||
    !Number.isFinite(duration) ||
    duration <= 0
  )
    return 0;
  return Math.max(0, Math.min(1, currentTime / duration));
}
