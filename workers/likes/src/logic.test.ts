import test from "node:test";
import assert from "node:assert/strict";
import { readLikes, recordLike, type LikeStore } from "./logic.ts";

function memoryStore(): LikeStore & { ttl: Map<string, number> } {
  const data = new Map<string, string>();
  const ttl = new Map<string, number>();
  return {
    ttl,
    get: async (key) => data.get(key) ?? null,
    put: async (key, value, options) => {
      data.set(key, value);
      if (options?.expirationTtl) ttl.set(key, options.expirationTtl);
    },
  };
}

test("a new visitor's like increments the total once", async () => {
  const store = memoryStore();
  assert.deepEqual(await readLikes(store, "visitor-a"), { count: 0, liked: false });
  assert.deepEqual(await recordLike(store, "visitor-a"), { count: 1, liked: true, accepted: true });
  assert.deepEqual(await readLikes(store, "visitor-a"), { count: 1, liked: true });
});

test("the same visitor cannot like twice", async () => {
  const store = memoryStore();
  await recordLike(store, "visitor-a");
  assert.deepEqual(await recordLike(store, "visitor-a"), { count: 1, liked: true, accepted: false });
});

test("different visitors each count", async () => {
  const store = memoryStore();
  await recordLike(store, "visitor-a");
  assert.deepEqual(await recordLike(store, "visitor-b"), { count: 2, liked: true, accepted: true });
});

test("visitor markers expire after a day so stored hashes do not accumulate forever", async () => {
  const store = memoryStore();
  await recordLike(store, "visitor-a");
  assert.equal(store.ttl.get("voter:visitor-a"), 86400);
});

test("a corrupted total is treated as zero instead of NaN", async () => {
  const store = memoryStore();
  await store.put("likes:total", "not-a-number");
  assert.deepEqual(await recordLike(store, "visitor-a"), { count: 1, liked: true, accepted: true });
});
