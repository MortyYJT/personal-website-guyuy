import test from "node:test";
import assert from "node:assert/strict";
import { readAmbientEnabled, writeAmbientEnabled } from "./ambient.ts";

function memory(): Storage {
  const data = new Map<string, string>();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
  } as Storage;
}

test("ambient sound is on until the visitor turns it off", () => {
  const storage = memory();
  assert.equal(readAmbientEnabled(storage), true);
  writeAmbientEnabled(storage, false);
  assert.equal(readAmbientEnabled(storage), false);
  writeAmbientEnabled(storage, true);
  assert.equal(readAmbientEnabled(storage), true);
});

test("missing or failing storage falls back to on without throwing", () => {
  assert.equal(readAmbientEnabled(undefined), true);
  const broken = {
    getItem() {
      throw new Error("denied");
    },
    setItem() {
      throw new Error("denied");
    },
  } as unknown as Storage;
  assert.equal(readAmbientEnabled(broken), true);
  assert.equal(writeAmbientEnabled(broken, false), false);
});
