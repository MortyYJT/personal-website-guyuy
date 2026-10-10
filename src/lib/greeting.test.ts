import test from "node:test";
import assert from "node:assert/strict";
import { greetingFor } from "./greeting.ts";

test("greeting follows the visitor's hour at each boundary", () => {
  const cases: [number, string][] = [
    [4, "Good night"],
    [5, "Good morning"],
    [11, "Good morning"],
    [12, "Good afternoon"],
    [17, "Good afternoon"],
    [18, "Good evening"],
    [22, "Good evening"],
    [23, "Good night"],
    [0, "Good night"],
  ];
  for (const [hour, expected] of cases)
    assert.equal(greetingFor(hour, "en"), expected, `hour ${hour}`);
});

test("greeting is localized", () => {
  assert.equal(greetingFor(9, "zh"), "早上好");
  assert.equal(greetingFor(14, "zh"), "下午好");
  assert.equal(greetingFor(20, "zh"), "晚上好");
  assert.equal(greetingFor(2, "zh"), "夜深了");
});
