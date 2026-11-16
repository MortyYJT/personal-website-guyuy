import {
  createHmac,
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { createServer, type IncomingMessage } from "node:http";
import type { LikeStore } from "./store.ts";

export function createLikesServer(store: LikeStore, origin: string) {
  const secure = new URL(origin).protocol === "https:";
  const cookieName = secure ? "__Host-guyuy-visitor" : "guyuy-visitor";
  const sign = (id: string) =>
    createHmac("sha256", store.secret).update(id).digest("base64url");
  function identity(request: IncomingMessage): string | null {
    const token = request.headers.cookie
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1);
    if (!token || !/^[a-f0-9]{32}\.[A-Za-z0-9_-]{43}$/.test(token)) return null;
    const [id, signature] = token.split(".");
    if (!timingSafeEqual(Buffer.from(sign(id)), Buffer.from(signature)))
      return null;
    return createHash("sha256").update(id).digest("hex");
  }
  const server = createServer((request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("X-Content-Type-Options", "nosniff");
    const send = (status: number, body: unknown) => {
      response.writeHead(status);
      response.end(JSON.stringify(body));
    };
    try {
      const path = new URL(request.url ?? "/", origin).pathname;
      if (path === "/health" && request.method === "GET") {
        send(200, { ok: true });
        return;
      }
      if (path !== "/api/likes") {
        send(404, { error: "not_found" });
        return;
      }
      if (request.method !== "GET" && request.method !== "POST") {
        response.setHeader("Allow", "GET, POST");
        send(405, { error: "method_not_allowed" });
        return;
      }
      if (
        request.method === "POST" &&
        (request.headers.origin !== origin ||
          request.headers["sec-fetch-site"] === "cross-site")
      ) {
        send(403, { error: "forbidden" });
        return;
      }
      const visitor = identity(request);
      if (request.method === "POST") {
        // A GET must first establish a working cookie. Never mint identities on POST.
        if (!visitor) {
          send(409, { error: "cookies_required" });
          return;
        }
        send(200, store.like(visitor));
        return;
      }
      if (!visitor) {
        const id = randomBytes(16).toString("hex");
        response.setHeader(
          "Set-Cookie",
          `${cookieName}=${id}.${sign(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=34560000${secure ? "; Secure" : ""}`,
        );
      }
      send(200, store.read(visitor));
    } catch {
      console.error("Likes request failed");
      send(503, { error: "unavailable" });
    }
  });
  server.requestTimeout = 10000;
  server.headersTimeout = 10000;
  return server;
}
