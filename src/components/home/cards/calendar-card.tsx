"use client";
import { ui } from "../../../content/ui";
import { useNow } from "../../../hooks/use-now";
import { monthGrid } from "../../../lib/calendar";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

export function CalendarCard() {
  const { locale } = usePreferences();
  const now = useNow();
  const text = ui[locale];
  const weekdayIndex = now ? (now.getDay() + 6) % 7 : -1;
  return (
    <Card area="calendar" order={4} label={text.calendar}>
      <p className="calendar-title">
        {now
          ? now.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "short",
            })
          : text.calendar}
      </p>
      <table className="calendar-grid">
        <thead>
          <tr>
            {text.weekdays.map((day, index) => (
              <th
                key={day}
                scope="col"
                className={index === weekdayIndex ? "is-today" : undefined}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        {now && (
          <tbody>
            {monthGrid(now.getFullYear(), now.getMonth()).map((week, row) => (
              <tr key={row}>
                {week.map((day, col) => (
                  <td
                    key={col}
                    aria-current={day === now.getDate() ? "date" : undefined}
                  >
                    {day ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Card>
  );
}
