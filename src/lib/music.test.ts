import test from "node:test";
import assert from "node:assert/strict";
import { neteaseSongPage, neteaseSongUrl } from "./music.ts";

test("a numeric song id becomes the official single-song outchain player", () => {
  const url = new URL(neteaseSongUrl("39227624")!);
  assert.equal(url.origin, "https://music.163.com");
  assert.equal(url.pathname, "/outchain/player");
  assert.equal(url.searchParams.get("type"), "2");
  assert.equal(url.searchParams.get("id"), "39227624");
  assert.equal(url.searchParams.get("auto"), "1");
});

test("anything that is not a plain digit id is rejected", () => {
  for (const id of ["", "  ", "12a", "1&auto=0", "javascript:alert(1)", "-5"])
    assert.equal(neteaseSongUrl(id), null, JSON.stringify(id));
});

test("each song links to its NetEase page as a fallback", () => {
  assert.equal(neteaseSongPage("39227624"), "https://music.163.com/song?id=39227624");
  assert.equal(neteaseSongPage("abc"), null);
});
