"use client";
import { profile } from "../../../content/profile";
import { ui } from "../../../content/ui";
import { useNow } from "../../../hooks/use-now";
import { greetingFor } from "../../../lib/greeting";
import { usePreferences } from "../../preferences-provider";
import { Avatar } from "./avatar";
import { Card } from "./card";

export function HiCard() {
  const { locale } = usePreferences();
  const now = useNow();
  const text = ui[locale];
  return (
    <Card area="hi" order={2}>
      <Avatar size={128} locale={locale} priority />
      <h1 className="hi-title">
        <span className="hi-greeting">
          {now ? greetingFor(now.getHours(), locale) : text.hello}
        </span>
        <span className="hi-line">
          {text.iAm}{" "}
          <span className="hi-name">{locale === "zh" ? "谷鱼Y" : "MortyYJT"}</span>
          {text.niceToMeet}
        </span>
      </h1>
      <p className="hi-intro">{profile.introduction[locale]}</p>
    </Card>
  );
}
