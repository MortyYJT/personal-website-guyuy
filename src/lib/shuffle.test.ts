import test from "node:test";
import assert from "node:assert/strict";
import { createShuffler } from "./shuffle.ts";

// Deterministic pseudo-random sequence for repeatable shuffles.
function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

test("each round plays every song once before any repeats", () => {
  const next = createShuffler(5, seeded(7));
  for (let round = 0; round < 4; round++) {
    const picks = Array.from({ length: 5 }, next);
    assert.deepEqual([...picks].sort(), [0, 1, 2, 3, 4], `round ${round}`);
  }
});

test("a new round never starts with the song that just ended", () => {
  for (let seed = 1; seed < 60; seed++) {
    const next = createShuffler(3, seeded(seed));
    let last = next();
    for (let i = 0; i < 30; i++) {
      const current = next();
      assert.notEqual(current, last, `seed ${seed} step ${i}`);
      last = current;
    }
  }
});

test("a single song always returns index 0", () => {
  const next = createShuffler(1);
  assert.deepEqual([next(), next(), next()], [0, 0, 0]);
});

test("an empty list is rejected", () => {
  assert.throws(() => createShuffler(0));
});
