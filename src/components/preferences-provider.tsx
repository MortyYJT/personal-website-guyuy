"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import type { Locale, Preferences, Theme } from "../content/types";
import { readPreferences, writePreferences } from "../lib/preferences";

const defaults: Preferences = { locale: "zh", theme: "light" };
let current = defaults;
const listeners = new Set<() => void>();

function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
function publish(value: Preferences) {
  current = value;
  for (const notify of listeners) notify();
}
function subscribe(notify: () => void) {
  if (listeners.size === 0) current = readPreferences(storage());
  listeners.add(notify);
  const sync = () => publish(readPreferences(storage()));
  window.addEventListener("storage", sync);
  notify();
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", sync);
  };
}
function snapshot() {
  return current;
}
function serverSnapshot() {
  return defaults;
}
function update(value: Preferences) {
  writePreferences(storage(), value);
  publish(value);
}

type PreferenceContext = Preferences & {
  setLocale: (value: Locale) => void;
  setTheme: (value: Theme) => void;
};
const Context = createContext<PreferenceContext | null>(null);

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preferences = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  useEffect(() => {
    document.documentElement.lang =
      preferences.locale === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = preferences.theme;
  }, [preferences]);
  return (
    <Context.Provider
      value={{
        ...preferences,
        setLocale: (locale) => update({ ...current, locale }),
        setTheme: (theme) => update({ ...current, theme }),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function usePreferences() {
  const value = useContext(Context);
  if (!value) throw new Error("PreferencesProvider is required");
  return value;
}
