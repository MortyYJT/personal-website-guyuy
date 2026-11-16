import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import test from "node:test";
import { createLikesServer } from "./server.ts";
import { openStore } from "./store.ts";

const origin = "https://mortyyjt.site";
async function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "guyuy-likes-"));
  const path = join(dir, "likes.sqlite");
  const store = openStore(path);
  const server = createLikesServer(store, origin);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}/api/likes`;
  return {
    path,
    store,
    url,
    async close() {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      store.close();
      rmSync(dir, { recursive: true });
    },
  };
}

test("only one like per signed visitor under concurrent retries; different visitors add up", async () => {
  const f = await fixture();
  try {
    const initial = await fetch(f.url);
    assert.deepEqual(await initial.json(), { count: 0, liked: false });
    assert.equal(initial.headers.get("cache-control"), "no-store");
    const setCookie = initial.headers.get("set-cookie")!;
    for (const flag of ["HttpOnly", "Secure", "SameSite=Lax", "Path=/"])
      assert.ok(setCookie.includes(flag));
    const cookie = setCookie.split(";")[0];
    const results = await Promise.all(
      Array.from({ length: 25 }, () =>
        fetch(f.url, { method: "POST", headers: { origin, cookie } }).then(
          (r) => r.json(),
        ),
      ),
    );
    for (const result of results)
      assert.deepEqual(result, { count: 1, liked: true });
    assert.deepEqual(
      await (await fetch(f.url, { headers: { cookie } })).json(),
      { count: 1, liked: true },
    );
    const next = await fetch(f.url);
    const cookie2 = next.headers.get("set-cookie")!.split(";")[0];
    assert.deepEqual(
      await (
        await fetch(f.url, {
          method: "POST",
          headers: { origin, cookie: cookie2 },
        })
      ).json(),
      { count: 2, liked: true },
    );
    // A fresh connection sees the rows and the same signing secret after redeploy/restart.
    const reopened = openStore(f.path);
    assert.equal(reopened.secret, f.store.secret);
    const secondServer = createLikesServer(reopened, origin);
    secondServer.listen(0, "127.0.0.1");
    await once(secondServer, "listening");
    const addr = secondServer.address();
    assert.ok(addr && typeof addr !== "string");
    assert.deepEqual(
      await (
        await fetch(`http://127.0.0.1:${addr.port}/api/likes`, {
          headers: { cookie },
        })
      ).json(),
      { count: 2, liked: true },
    );
    await new Promise<void>((resolve) => secondServer.close(() => resolve()));
    reopened.close();
  } finally {
    await f.close();
  }
});

test("missing or forged cookies and cross-origin writes never count", async () => {
  const f = await fixture();
  try {
    for (const cookie of [
      "",
      "__Host-guyuy-visitor=forged",
      `__Host-guyuy-visitor=${"a".repeat(32)}.${"b".repeat(43)}`,
    ]) {
      assert.equal(
        (await fetch(f.url, { method: "POST", headers: { origin, cookie } }))
          .status,
        409,
      );
    }
    const cookie = (await fetch(f.url)).headers
      .get("set-cookie")!
      .split(";")[0];
    for (const foreign of ["https://evil.example", "null", ""]) {
      assert.equal(
        (
          await fetch(f.url, {
            method: "POST",
            headers: { origin: foreign, cookie },
          })
        ).status,
        403,
      );
    }
    assert.equal(
      (
        await fetch(f.url, {
          method: "POST",
          headers: { origin, cookie, "sec-fetch-site": "cross-site" },
        })
      ).status,
      403,
    );
    assert.equal((await fetch(f.url, { method: "DELETE" })).status, 405);
    assert.equal((await fetch(f.url + "/other")).status, 404);
    assert.deepEqual(
      await (await fetch(f.url, { headers: { cookie } })).json(),
      { count: 0, liked: false },
    );
  } finally {
    await f.close();
  }
});
