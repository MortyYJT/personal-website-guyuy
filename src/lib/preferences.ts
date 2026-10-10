import type { Preferences } from "../content/types.ts";

export const preferenceKey = "guyuy:preferences:v1";
export function readPreferences(
  storage: Pick<Storage, "getItem"> | undefined,
): Preferences {
  const defaults: Preferences = { locale: "zh", theme: "light" };
  try {
    const raw = storage?.getItem(preferenceKey);
    const value: unknown = raw ? JSON.parse(raw) : null;
    if (!value || typeof value !== "object" || Array.isArray(value))
      return defaults;
    const saved = value as Record<string, unknown>;
    return {
      locale: saved.locale === "en" ? "en" : "zh",
      theme: saved.theme === "dark" ? "dark" : "light",
    };
  } catch {
    return defaults;
  }
}
export function writePreferences(
  storage: Pick<Storage, "setItem"> | undefined,
  value: Preferences,
): boolean {
  try {
    if (!storage) return false;
    storage.setItem(preferenceKey, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
