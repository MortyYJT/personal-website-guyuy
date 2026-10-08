type SessionStorage = Pick<Storage, "getItem" | "setItem">;
const introKey = "guyuy:intro:v1";

export function createIntroGate(storage: SessionStorage | undefined) {
  let seen = false;
  return (reducedMotion: boolean): boolean => {
    if (reducedMotion || seen) return false;
    seen = true;
    try {
      if (storage?.getItem(introKey) === "seen") return false;
      storage?.setItem(introKey, "seen");
    } catch {
      // The in-memory guard also works when session storage is denied.
    }
    return true;
  };
}
