/** Official NetEase Cloud Music single-song outchain player, or null for an invalid id. */
export function neteaseSongUrl(songId: string): string | null {
  if (!/^\d+$/.test(songId)) return null;
  const url = new URL("https://music.163.com/outchain/player");
  url.search = new URLSearchParams({
    type: "2",
    id: songId,
    auto: "1",
    height: "66",
  }).toString();
  return url.toString();
}

/** Public NetEase song page, for visitors whose region cannot play the embed. */
export function neteaseSongPage(songId: string): string | null {
  return /^\d+$/.test(songId) ? `https://music.163.com/song?id=${songId}` : null;
}
