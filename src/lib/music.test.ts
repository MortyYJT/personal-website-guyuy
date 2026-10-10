import test from "node:test";
import assert from "node:assert/strict";
import { bandcampEmbedUrl } from "./music.ts";

test("builds the official small Bandcamp player for one album track", () => {
  assert.equal(
    bandcampEmbedUrl({ album: "2955245981", track: "1570961482" }, { background: "ffffff", link: "4a9b78" }),
    "https://bandcamp.com/EmbeddedPlayer/album=2955245981/size=small/bgcol=ffffff/linkcol=4a9b78/track=1570961482/transparent=true/",
  );
});

test("rejects ids or colours that could alter the embed path", () => {
  const colours = { background: "ffffff", link: "4a9b78" };
  assert.equal(bandcampEmbedUrl({ album: "29/../x", track: "1" }, colours), null);
  assert.equal(bandcampEmbedUrl({ album: "1", track: "" }, colours), null);
  assert.equal(bandcampEmbedUrl({ album: "1", track: "2" }, { background: "#fff", link: "4a9b78" }), null);
  assert.equal(bandcampEmbedUrl({ album: "1", track: "2" }, { background: "ffffff", link: "red" }), null);
});
