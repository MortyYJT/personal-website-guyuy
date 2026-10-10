"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ui } from "../../content/ui";
import { parseLikeState } from "../../lib/likes";
import { usePreferences } from "../preferences-provider";

// Set at build time once the Cloudflare Worker is deployed; without it the
// heart only remembers this browser's like and shows no total.
const endpoint = process.env.NEXT_PUBLIC_LIKES_ENDPOINT ?? "";
const likedKey = "guyuy:liked:v1";

const listeners = new Set<() => void>();
function readLiked() {
  try {
    return window.localStorage.getItem(likedKey) === "1";
  } catch {
    return false;
  }
}
function rememberLiked() {
  try {
    window.localStorage.setItem(likedKey, "1");
  } catch {
    // Storage denied: the server-side visitor marker still blocks repeats.
  }
  for (const notify of listeners) notify();
}
function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function LikeButton() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const likedHere = useSyncExternalStore(subscribe, readLiked, () => false);
  const [server, setServer] = useState<{ count: number; liked: boolean } | null>(null);
  const [popping, setPopping] = useState(false);
  const liked = likedHere || Boolean(server?.liked);

  useEffect(() => {
    if (!endpoint) return;
    fetch(endpoint, { cache: "no-store" })
      .then((response) => response.json())
      .then((json) => setServer(parseLikeState(json)))
      .catch(() => setServer(null));
  }, []);

  function like() {
    if (liked) return;
    rememberLiked();
    setPopping(true);
    if (!endpoint) return;
    setServer((current) => current && { count: current.count + 1, liked: true });
    fetch(endpoint, { method: "POST" })
      .then((response) => response.json())
      .then((json) => {
        const state = parseLikeState(json);
        if (state) setServer(state);
      })
      .catch(() => {
        // Keep the optimistic count; the next visit re-reads the real total.
      });
  }

  return (
    <button
      className={`like-button${liked ? " is-liked" : ""}${popping ? " is-popping" : ""}`}
      onClick={like}
      onAnimationEnd={() => setPopping(false)}
      aria-pressed={liked}
      aria-label={liked ? text.liked : text.like}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5 4.2 12.9a4.9 4.9 0 0 1 7-6.9l.8.8.8-.8a4.9 4.9 0 0 1 7 6.9Z" />
      </svg>
      {server && <span className="like-count">{server.count}</span>}
    </button>
  );
}
