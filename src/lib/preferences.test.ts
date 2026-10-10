import test from "node:test";
import assert from "node:assert/strict";
import {
  preferenceKey,
  readPreferences,
  writePreferences,
} from "./preferences.ts";

test("unavailable storage uses Chinese and light defaults", () => {
  assert.deepEqual(readPreferences(undefined), { locale: "zh", theme: "light" });
});
test("valid saved preferences are restored", () => {
  assert.deepEqual(
    readPreferences({ getItem: () => '{"locale":"en","theme":"light"}' }),
    { locale: "en", theme: "light" },
  );
});
test("malformed JSON cannot break preference reading", () => {
  assert.deepEqual(readPreferences({ getItem: () => "invalid{" }), {
    locale: "zh",
    theme: "light",
  });
});
test("unknown fields fall back independently", () => {
  assert.deepEqual(
    readPreferences({ getItem: () => '{"locale":"fr","theme":"dark"}' }),
    { locale: "zh", theme: "dark" },
  );
  assert.deepEqual(
    readPreferences({ getItem: () => '{"locale":"en","theme":"neon"}' }),
    { locale: "en", theme: "light" },
  );
});
test("missing values and non-object JSON use safe defaults", () => {
  for (const raw of [null, "null", "[]", '"en"', "{}"]) {
    assert.deepEqual(readPreferences({ getItem: () => raw }), {
      locale: "zh",
      theme: "light",
    });
  }
});
test("denied storage reads do not throw", () => {
  assert.deepEqual(
    readPreferences({
      getItem: () => {
        throw new Error("denied");
      },
    }),
    { locale: "zh", theme: "light" },
  );
});
test("preferences persist as one versioned value", () => {
  const actual = new Map<string, string>();
  assert.equal(
    writePreferences(
      {
        setItem: (key, value) => {
          actual.set(key, value);
        },
      },
      { locale: "en", theme: "light" },
    ),
    true,
  );
  assert.equal(actual.get(preferenceKey), '{"locale":"en","theme":"light"}');
  assert.deepEqual(
    readPreferences({ getItem: (key) => actual.get(key) ?? null }),
    { locale: "en", theme: "light" },
  );
});
test("denied or unavailable writes return false", () => {
  assert.equal(
    writePreferences(undefined, { locale: "zh", theme: "dark" }),
    false,
  );
  assert.equal(
    writePreferences(
      {
        setItem: () => {
          throw new Error("denied");
        },
      },
      { locale: "en", theme: "light" },
    ),
    false,
  );
});
