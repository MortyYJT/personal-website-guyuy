"use client";
import { heroEyebrow } from "../../../content/profile";
import { usePreferences } from "../../preferences-provider";
import { FishMark } from "../../fish-mark";
import { Card } from "./card";

export function ArtCard() {
  const { locale } = usePreferences();
  return (
    <Card area="art" order={1}>
      <div className="art-waves" aria-hidden="true" />
      <FishMark className="art-fish" />
      <p className="art-caption">{heroEyebrow[locale]}</p>
    </Card>
  );
}
