export type LikeState = { count: number; liked: boolean };

/** Validates the like counter's JSON before the UI trusts it. */
export function parseLikeState(value: unknown): LikeState | null {
  if (!value || typeof value !== "object") return null;
  const { count, liked } = value as Record<string, unknown>;
  if (!Number.isInteger(count) || (count as number) < 0 || typeof liked !== "boolean") return null;
  return { count: count as number, liked };
}
