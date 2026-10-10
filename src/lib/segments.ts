export type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";

// Standard seven-segment naming: a top, b upper right, c lower right,
// d bottom, e lower left, f upper left, g middle.
const lit: readonly (readonly Segment[])[] = [
  ["a", "b", "c", "d", "e", "f"],
  ["b", "c"],
  ["a", "b", "d", "e", "g"],
  ["a", "b", "c", "d", "g"],
  ["b", "c", "f", "g"],
  ["a", "c", "d", "f", "g"],
  ["a", "c", "d", "e", "f", "g"],
  ["a", "b", "c"],
  ["a", "b", "c", "d", "e", "f", "g"],
  ["a", "b", "c", "d", "f", "g"],
];

export function segmentsFor(digit: number): readonly Segment[] {
  return Number.isInteger(digit) && digit >= 0 && digit <= 9 ? lit[digit] : [];
}
