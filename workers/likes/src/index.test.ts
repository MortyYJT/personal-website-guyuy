import test from "node:test";
import assert from "node:assert/strict";
import worker from "./index.ts";

function env() {
  const data = new Map<string, string>();
  return {
    data,
    IP_SALT: "test-salt",
    LIKES: {
      get: async (key: string) => data.get(key) ?? null,
      put: async (key: string, value: string) => void data.set(key, value),
    },
  };
}
const site = "https://mortyyjt.github.io";
const like = (ip: string, origin = site) =>
  new Request("https://likes.example/likes", {
    method: "POST",
    headers: { Origin: origin, "CF-Connecting-IP": ip },
  });

test("one like per visitor, with CORS for the site", async () => {
  const e = env();
  const first = await worker.fetch(like("1.2.3.4"), e);
  assert.equal(first.headers.get("Access-Control-Allow-Origin"), site);
  assert.deepEqual(await first.json(), { count: 1, liked: true });
  assert.deepEqual(await (await worker.fetch(like("1.2.3.4"), e)).json(), { count: 1, liked: true });
  assert.deepEqual(await (await worker.fetch(like("5.6.7.8"), e)).json(), { count: 2, liked: true });
});

test("likes from other origins are refused", async () => {
  const response = await worker.fetch(like("1.2.3.4", "https://evil.example"), env());
  assert.equal(response.status, 403);
});

test("raw IP addresses are never stored", async () => {
  const e = env();
  await worker.fetch(like("1.2.3.4"), e);
  assert.ok([...e.data.keys()].every((key) => !key.includes("1.2.3.4")));
});

test("unknown paths return 404", async () => {
  const response = await worker.fetch(new Request("https://likes.example/other"), env());
  assert.equal(response.status, 404);
});
