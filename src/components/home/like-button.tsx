"use client";
import { useEffect, useRef, useState } from "react";
import { ui } from "../../content/ui";
import { parseLikeState, type LikeState } from "../../lib/likes";
import { usePreferences } from "../preferences-provider";

async function requestState(method: "GET" | "POST") {
  const response = await fetch("/api/likes", {
    method,
    credentials: "same-origin",
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (response.status === 409) throw new Error("cookies_required");
  if (!response.ok) throw new Error("unavailable");
  const state = parseLikeState(await response.json());
  if (!state) throw new Error("invalid_response");
  return state;
}

// Serializes initial cookie creation and writes across tabs of the same browser.
function withVisitorLock<T>(action: () => Promise<T>): Promise<T> {
  return navigator.locks
    ? navigator.locks.request(
        "guyuy:likes",
        { signal: AbortSignal.timeout(15000) },
        action,
      )
    : action();
}

/** Reuses the original heart and pop animation, with server-authoritative state. */
export function LikeButton() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const [server, setServer] = useState<LikeState | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<"cookies" | "network" | null>(null);
  const [popping, setPopping] = useState(false);
  const busy = useRef(false);
  useEffect(() => {
    let active = true;
    const refresh = () => {
      void withVisitorLock(() => requestState("GET"))
        .then((state) => {
          if (active) {
            setServer(state);
            setError(null);
          }
        })
        .catch(() => {
          if (active) setError("network");
        });
    };
    refresh();
    const onFocus = () => {
      if (!busy.current) refresh();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      active = false;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  async function like() {
    if (busy.current || server?.liked) return;
    busy.current = true;
    setPending(true);
    setError(null);
    try {
      const state = await withVisitorLock(async () => {
        const current = await requestState("GET");
        return current.liked ? current : requestState("POST");
      });
      setServer(state);
      setPopping(true);
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message === "cookies_required"
          ? "cookies"
          : "network",
      );
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  return (
    <div className="like-control">
      <button
        type="button"
        className={`social-icon like-button${server?.liked ? " is-liked" : ""}${popping ? " is-popping" : ""}`}
        onClick={like}
        onAnimationEnd={() => setPopping(false)}
        disabled={pending || Boolean(server?.liked)}
        aria-busy={pending}
        aria-pressed={server?.liked ?? false}
        aria-label={server?.liked ? text.liked : text.like}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20.5 4.2 12.9a4.9 4.9 0 0 1 7-6.9l.8.8.8-.8a4.9 4.9 0 0 1 7 6.9Z" />
        </svg>
        {server && <span className="like-count">{server.count}</span>}
      </button>
      <span className="like-status" role="status">
        {error === "cookies" ? text.likeCookies : error ? text.likeFailed : ""}
      </span>
    </div>
  );
}
