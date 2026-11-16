import { randomBytes } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

/** A unique row is the like: retries cannot increment a separate counter twice. */
export function openStore(path: string) {
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS likes (visitor TEXT PRIMARY KEY) WITHOUT ROWID;
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL) WITHOUT ROWID;`);
  db.prepare("INSERT OR IGNORE INTO settings VALUES ('cookie-secret', ?)").run(
    randomBytes(32).toString("hex"),
  );
  const secret = (
    db
      .prepare("SELECT value FROM settings WHERE key = 'cookie-secret'")
      .get() as { value: string }
  ).value;
  const count = db.prepare("SELECT COUNT(*) AS count FROM likes");
  const exists = db.prepare("SELECT 1 FROM likes WHERE visitor = ?");
  const insert = db.prepare("INSERT OR IGNORE INTO likes (visitor) VALUES (?)");
  function read(visitor: string | null) {
    return {
      count: (count.get() as { count: number }).count,
      liked: visitor !== null && Boolean(exists.get(visitor)),
    };
  }
  return {
    secret,
    read,
    like(visitor: string) {
      insert.run(visitor);
      return read(visitor);
    },
    close() {
      db.close();
    },
  };
}
export type LikeStore = ReturnType<typeof openStore>;
