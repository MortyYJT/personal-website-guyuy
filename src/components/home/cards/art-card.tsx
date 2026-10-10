"use client";
import type { CSSProperties } from "react";
import { usePreferences } from "../../preferences-provider";
import { SproutMark } from "../../sprout-mark";
import { Card } from "./card";

// Fixed positions keep server and client markup identical; `still` is the
// resting position when reduced motion stops the animation.
const drops = [
  { x: 12, delay: 0, speed: 2.6, still: 22 },
  { x: 26, delay: 1.1, speed: 2.2, still: 58 },
  { x: 38, delay: 0.4, speed: 2.9, still: 34 },
  { x: 62, delay: 1.6, speed: 2.4, still: 66 },
  { x: 74, delay: 0.8, speed: 2.7, still: 28 },
  { x: 88, delay: 1.9, speed: 2.3, still: 50 },
];

export function ArtCard() {
  const { locale } = usePreferences();
  return (
    <Card area="art" order={1}>
      <div className="art-rain" aria-hidden="true">
        {drops.map((drop) => (
          <span
            key={drop.x}
            style={
              {
                "--x": `${drop.x}%`,
                "--delay": `${drop.delay}s`,
                "--speed": `${drop.speed}s`,
                "--still": `${drop.still}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <SproutMark className="art-sprout" />
      <p className="art-caption">
        {locale === "zh" ? "雨生百谷" : "Rain nurtures every grain"}
      </p>
    </Card>
  );
}
