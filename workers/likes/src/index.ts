import { readLikes, recordLike, type LikeStore } from "./logic.ts";

type Env = { LIKES: LikeStore; IP_SALT: string };

const allowedOrigins = new Set([
  "https://mortyyjt.github.io",
  "https://personal-website-guyuy.vercel.app",
  "http://localhost:3000",
]);

// Raw IPs are never stored: only a salted SHA-256 digest identifies a visitor.
async function visitorId(request: Request, salt: string): Promise<string> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const cors: Record<string, string> = allowedOrigins.has(origin)
      ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
      : {};
    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: { ...cors, "Access-Control-Allow-Methods": "GET, POST", "Access-Control-Max-Age": "86400" },
      });
    if (new URL(request.url).pathname !== "/likes") return new Response("Not found", { status: 404 });
    if (request.method === "POST" && !allowedOrigins.has(origin))
      return new Response("Forbidden", { status: 403 });

    const visitor = await visitorId(request, env.IP_SALT);
    const body =
      request.method === "POST"
        ? await recordLike(env.LIKES, visitor)
        : request.method === "GET"
          ? await readLikes(env.LIKES, visitor)
          : null;
    if (!body) return new Response("Method not allowed", { status: 405, headers: cors });
    return Response.json(
      { count: body.count, liked: body.liked },
      { headers: { ...cors, "Cache-Control": "no-store" } },
    );
  },
};

export default worker;
