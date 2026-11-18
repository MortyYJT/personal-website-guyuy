import assert from "node:assert/strict";
import test from "node:test";
test("head bootstrap covers the page before hydration and fails open", async () => {
  const { runInNewContext } = await import("node:vm");
  const { introBootstrap } = await import("./intro.ts");
  for (const mode of ["fresh", "seen", "reduced", "denied"]) {
    const root: { dataset: { intro?: string } } = { dataset: {} };
    const timers: Array<() => void> = [];
    runInNewContext(introBootstrap, {
      document: { documentElement: root, addEventListener: () => {}, removeEventListener: () => {} },
      matchMedia: () => ({ matches: mode === "reduced" }),
      sessionStorage: {
        getItem: () => {
          if (mode === "denied") throw new Error("denied");
          return mode === "seen" ? "seen" : null;
        },
      },
      setTimeout: (callback: () => void) => timers.push(callback),
    });
    assert.equal(
      root.dataset.intro,
      mode === "fresh" || mode === "denied" ? "pending" : undefined,
    );
    timers.forEach((callback) => callback());
    assert.equal(root.dataset.intro, undefined);
  }
});
