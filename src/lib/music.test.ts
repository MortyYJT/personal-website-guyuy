import test from "node:test";
import assert from "node:assert/strict";
import { neteasePlayerUrl } from "./music.ts";

test("a numeric playlist id becomes the official outchain player URL", () => {
  const url = new URL(neteasePlayerUrl("2829883282")!);
  assert.equal(url.origin, "https://music.163.com");
  assert.equal(url.pathname, "/outchain/player");
  assert.equal(url.searchParams.get("type"), "0");
  assert.equal(url.searchParams.get("id"), "2829883282");
  assert.equal(url.searchParams.get("auto"), "1");
});

test("anything that is not a plain digit id is rejected", () => {
  for (const id of ["", "  ", "12a", "1&auto=0", "javascript:alert(1)", "-5"])
    assert.equal(neteasePlayerUrl(id), null, JSON.stringify(id));
});
