/** Minimal subset of Workers KV used by the like counter (and faked in tests). */
export type LikeStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

const totalKey = "likes:total";
// Visitor markers are salted IP hashes; they expire so the store never keeps them for long.
const voterTtlSeconds = 86400;

async function total(store: LikeStore): Promise<number> {
  const value = Number(await store.get(totalKey));
  return Number.isInteger(value) && value > 0 ? value : 0;
}

export async function readLikes(store: LikeStore, visitor: string) {
  return { count: await total(store), liked: (await store.get(`voter:${visitor}`)) !== null };
}

/**
 * Records one like per visitor. KV has no atomic increment, so two likes in the
 * same instant can lose one count; acceptable for a personal site's heart.
 */
export async function recordLike(store: LikeStore, visitor: string) {
  if ((await store.get(`voter:${visitor}`)) !== null)
    return { count: await total(store), liked: true, accepted: false };
  const count = (await total(store)) + 1;
  await store.put(totalKey, String(count));
  await store.put(`voter:${visitor}`, "1", { expirationTtl: voterTtlSeconds });
  return { count, liked: true, accepted: true };
}
