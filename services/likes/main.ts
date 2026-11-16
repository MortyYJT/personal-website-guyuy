import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { openStore } from "./store.ts";
import { createLikesServer } from "./server.ts";

const path = process.env.LIKES_DB ?? "/data/likes.sqlite";
const origin = process.env.SITE_ORIGIN ?? "https://mortyyjt.site";
mkdirSync(dirname(path), { recursive: true });
const store = openStore(path);
const server = createLikesServer(store, origin);
server.listen(Number(process.env.PORT ?? 3001), "0.0.0.0");
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => {
    server.close(() => {
      store.close();
      process.exit(0);
    });
  });
