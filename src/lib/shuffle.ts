/**
 * Returns a picker over indices 0..size-1 that plays every index once per round
 * (Fisher-Yates) and never starts a round with the index that just played.
 */
export function createShuffler(
  size: number,
  random: () => number = Math.random,
): () => number {
  if (!Number.isInteger(size) || size < 1)
    throw new RangeError("size must be a positive integer");
  let bag: number[] = [];
  let last = -1;
  return () => {
    if (bag.length === 0) {
      bag = Array.from({ length: size }, (_, i) => i);
      for (let i = size - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (size > 1 && bag[0] === last) [bag[0], bag[size - 1]] = [bag[size - 1], bag[0]];
    }
    last = bag.shift()!;
    return last;
  };
}
