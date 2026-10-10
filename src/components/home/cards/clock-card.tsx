"use client";
import { ui } from "../../../content/ui";
import { useNow } from "../../../hooks/use-now";
import { segmentsFor, type Segment } from "../../../lib/segments";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

// Segment polygons on a 20x36 digit cell.
const shapes: Record<Segment, string> = {
  a: "4,1 16,1 13,4 7,4",
  b: "17,2 17,16 14,14.5 14,5",
  c: "17,20 17,34 14,31 14,21.5",
  d: "4,35 16,35 13,32 7,32",
  e: "3,20 3,34 6,31 6,21.5",
  f: "3,2 3,16 6,14.5 6,5",
  g: "4,18 7,16.5 13,16.5 16,18 13,19.5 7,19.5",
};

function Digit({ value }: { value: number | null }) {
  const lit = value === null ? [] : segmentsFor(value);
  return (
    <svg className="lcd-digit" viewBox="0 0 20 36" aria-hidden="true">
      {(Object.keys(shapes) as Segment[]).map((segment) => (
        <polygon
          key={segment}
          points={shapes[segment]}
          className={lit.includes(segment) ? "on" : "off"}
        />
      ))}
    </svg>
  );
}

export function ClockCard() {
  const { locale } = usePreferences();
  const now = useNow();
  const hours = now ? now.getHours() : null;
  const minutes = now ? now.getMinutes() : null;
  const label = now
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : "--:--";
  return (
    <Card area="clock" order={3} label={ui[locale].clock}>
      <time className="lcd" dateTime={label === "--:--" ? undefined : label}>
        <Digit value={hours === null ? null : Math.floor(hours / 10)} />
        <Digit value={hours === null ? null : hours % 10} />
        <span className="lcd-colon" aria-hidden="true" />
        <Digit value={minutes === null ? null : Math.floor(minutes / 10)} />
        <Digit value={minutes === null ? null : minutes % 10} />
        <span className="sr-only">{label}</span>
      </time>
    </Card>
  );
}
