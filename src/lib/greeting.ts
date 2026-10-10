import type { Locale } from "../content/types.ts";

type Period = "morning" | "afternoon" | "evening" | "night";

const labels: Record<Period, Record<Locale, string>> = {
  morning: { zh: "早上好", en: "Good morning" },
  afternoon: { zh: "下午好", en: "Good afternoon" },
  evening: { zh: "晚上好", en: "Good evening" },
  night: { zh: "夜深了", en: "Good night" },
};

/** Greeting for a local hour (0-23): 5-11 morning, 12-17 afternoon, 18-22 evening. */
export function greetingFor(hour: number, locale: Locale): string {
  const period: Period =
    hour >= 5 && hour < 12
      ? "morning"
      : hour >= 12 && hour < 18
        ? "afternoon"
        : hour >= 18 && hour < 23
          ? "evening"
          : "night";
  return labels[period][locale];
}
