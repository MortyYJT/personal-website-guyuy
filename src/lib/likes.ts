export type LikeState = { count: number; liked: boolean };

/** Restored from the original like button; validate data before displaying it. */
export function parseLikeState(value: unknown): LikeState | null {
  if (!value || typeof value !== "object") return null;
  const { count, liked } = value as Record<string, unknown>;
  if (
    !Number.isSafeInteger(count) ||
    (count as number) < 0 ||
    typeof liked !== "boolean"
  )
    return null;
  return { count: count as number, liked };
}
