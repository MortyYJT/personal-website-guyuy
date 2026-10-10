/** Official NetEase Cloud Music outchain player for a playlist, or null for an invalid id. */
export function neteasePlayerUrl(playlistId: string): string | null {
  if (!/^\d+$/.test(playlistId)) return null;
  const url = new URL("https://music.163.com/outchain/player");
  url.search = new URLSearchParams({
    type: "0",
    id: playlistId,
    auto: "1",
    height: "430",
  }).toString();
  return url.toString();
}
