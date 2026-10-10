export const ambientKey = "guyuy:ambient:v1";

/** Ambient sound defaults to on; only an explicit "off" disables it. */
export function readAmbientEnabled(
  storage: Pick<Storage, "getItem"> | undefined,
): boolean {
  try {
    return storage?.getItem(ambientKey) !== "off";
  } catch {
    return true;
  }
}
export function writeAmbientEnabled(
  storage: Pick<Storage, "setItem"> | undefined,
  enabled: boolean,
): boolean {
  try {
    if (!storage) return false;
    storage.setItem(ambientKey, enabled ? "on" : "off");
    return true;
  } catch {
    return false;
  }
}
