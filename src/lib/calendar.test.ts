import test from "node:test";
import assert from "node:assert/strict";
import { monthGrid } from "./calendar.ts";

test("October 2026 starts on Thursday in a Monday-first grid", () => {
  const weeks = monthGrid(2026, 9);
  assert.deepEqual(weeks[0], [null, null, null, 1, 2, 3, 4]);
  assert.deepEqual(weeks.at(-1), [26, 27, 28, 29, 30, 31, null]);
  assert.equal(weeks.length, 5);
});

test("a month starting on Sunday puts day 1 in the last column", () => {
  // 2026-03-01 is a Sunday.
  assert.deepEqual(monthGrid(2026, 2)[0], [null, null, null, null, null, null, 1]);
});

test("February in a leap year has 29 days and every week has seven cells", () => {
  const weeks = monthGrid(2028, 1);
  assert.equal(weeks.flat().filter((day) => day !== null).length, 29);
  assert.ok(weeks.every((week) => week.length === 7));
});
