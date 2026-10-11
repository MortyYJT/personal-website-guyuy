import test from "node:test";
import assert from "node:assert/strict";
import { bandcampEmbedUrl, clockFraction, neteaseSongUrl, pauseClock, startClock } from "./music.ts";

test("builds the official small Bandcamp player for one album track", () => {
  assert.equal(
    bandcampEmbedUrl({ album: "2955245981", track: "1570961482" }, { background: "ffffff", link: "4a9b78" }),
    "https://bandcamp.com/EmbeddedPlayer/album=2955245981/size=small/bgcol=ffffff/linkcol=4a9b78/artwork=none/track=1570961482/transparent=true/",
  );
});

test("rejects ids or colours that could alter the embed path", () => {
  const colours = { background: "ffffff", link: "4a9b78" };
  assert.equal(bandcampEmbedUrl({ album: "29/../x", track: "1" }, colours), null);
  assert.equal(bandcampEmbedUrl({ album: "1", track: "" }, colours), null);
  assert.equal(bandcampEmbedUrl({ album: "1", track: "2" }, { background: "#fff", link: "4a9b78" }), null);
  assert.equal(bandcampEmbedUrl({ album: "1", track: "2" }, { background: "ffffff", link: "red" }), null);
});

test("links a NetEase song page by its numeric id only", () => {
  assert.equal(neteaseSongUrl("39227624"), "https://music.163.com/#/song?id=39227624");
  assert.equal(neteaseSongUrl("39227624&x=1"), null);
  assert.equal(neteaseSongUrl(""), null);
});

test("the facade clock only advances while playing", () => {
  const stopped = { elapsed: 0, startedAt: null };
  const playing = startClock(stopped, 1_000);
  assert.equal(clockFraction(playing, 31_000, 60_000), 0.5);
  const paused = pauseClock(playing, 31_000);
  assert.deepEqual(paused, { elapsed: 30_000, startedAt: null });
  assert.equal(clockFraction(paused, 90_000, 60_000), 0.5);
  assert.equal(clockFraction(startClock(paused, 100_000), 115_000, 60_000), 0.75);
});

test("the facade clock caps at the end of the track", () => {
  const playing = startClock({ elapsed: 0, startedAt: null }, 0);
  assert.equal(clockFraction(playing, 120_000, 60_000), 1);
  assert.equal(clockFraction(playing, 1_000, 0), 0);
});
