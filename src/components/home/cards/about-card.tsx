"use client";
import { profile } from "../../../content/profile";
import { ui } from "../../../content/ui";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

export function AboutCard() {
  const { locale } = usePreferences();
  return (
    <Card area="about" order={6}>
      <h2 className="card-eyebrow">{ui[locale].about}</h2>
      <p className="about-copy">{profile.about[locale]}</p>
    </Card>
  );
}
