import test from "node:test";
import assert from "node:assert/strict";
import { parseLikeState } from "./likes.ts";

test("accepts a well-formed like response", () => {
  assert.deepEqual(parseLikeState({ count: 12, liked: true }), { count: 12, liked: true });
});

test("rejects malformed or hostile responses", () => {
  for (const value of [null, "12", { count: "12", liked: true }, { count: -1, liked: false }, { count: 1.5, liked: false }, { count: 3 }])
    assert.equal(parseLikeState(value), null, JSON.stringify(value));
});
