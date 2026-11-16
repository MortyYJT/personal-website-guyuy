import assert from "node:assert/strict";
import test from "node:test";
import { parseLikeState } from "./likes.ts";

test("like responses must contain a safe nonnegative count and boolean state", () => {
  assert.deepEqual(parseLikeState({ count: 7, liked: true }), {
    count: 7,
    liked: true,
  });
  for (const value of [
    null,
    {},
    { count: -1, liked: false },
    { count: 0.5, liked: false },
    { count: 1, liked: "true" },
    { count: Infinity, liked: true },
    { count: Number.MAX_SAFE_INTEGER + 1, liked: true },
  ])
    assert.equal(parseLikeState(value), null);
});
