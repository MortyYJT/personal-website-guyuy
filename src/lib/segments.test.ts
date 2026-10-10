import test from "node:test";
import assert from "node:assert/strict";
import { segmentsFor } from "./segments.ts";

test("eight lights every segment and one lights only the right side", () => {
  assert.deepEqual(segmentsFor(8), ["a", "b", "c", "d", "e", "f", "g"]);
  assert.deepEqual(segmentsFor(1), ["b", "c"]);
});

test("zero leaves the middle segment dark", () => {
  assert.ok(!segmentsFor(0).includes("g"));
  assert.equal(segmentsFor(0).length, 6);
});

test("a value outside 0-9 lights nothing", () => {
  assert.deepEqual(segmentsFor(10), []);
  assert.deepEqual(segmentsFor(-1), []);
  assert.deepEqual(segmentsFor(Number.NaN), []);
});
