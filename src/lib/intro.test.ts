import assert from "node:assert/strict";
import test from "node:test";
import { createIntroGate } from "./intro.ts";

test("reduced motion skips the intro without consuming the visit", () => {
  const gate = createIntroGate(undefined);
  assert.equal(gate(true), false);
  assert.equal(gate(false), true);
});
test("unavailable storage still plays only once in memory", () => {
  const gate = createIntroGate(undefined);
  assert.equal(gate(false), true);
  assert.equal(gate(false), false);
});
test("a previously seen session skips the intro", () => {
  const gate = createIntroGate({ getItem: () => "seen", setItem: () => {} });
  assert.equal(gate(false), false);
});
test("a fresh visit is persisted for the next page mount", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
  assert.equal(createIntroGate(storage)(false), true);
  assert.equal(createIntroGate(storage)(false), false);
});
test("denied storage never throws or repeatedly plays", () => {
  const gate = createIntroGate({
    getItem: () => { throw new Error("denied"); },
    setItem: () => { throw new Error("denied"); },
  });
  assert.equal(gate(false), true);
  assert.equal(gate(false), false);
});
