import test from "node:test";
import assert from "node:assert/strict";
import { neteaseSongUrl, playbackFraction } from "./music.ts";

test("progress uses actual playback and tolerates missing media metadata", () => {
  assert.equal(playbackFraction(30, 60), 0.5);
  for (const duration of [0, NaN, Infinity, -1])
    assert.equal(playbackFraction(10, duration), 0);
  assert.equal(playbackFraction(NaN, 60), 0);
  assert.equal(playbackFraction(90, 60), 1);
  assert.equal(playbackFraction(-10, 60), 0);
});
test("links a NetEase song page by its numeric id only", () => {
  assert.equal(
    neteaseSongUrl("39227624"),
    "https://music.163.com/#/song?id=39227624",
  );
  assert.equal(neteaseSongUrl("39227624&x=1"), null);
  assert.equal(neteaseSongUrl(""), null);
});
