"use client";
import { stack } from "../../../content/profile";
import { ui } from "../../../content/ui";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

export function StackCard() {
  const { locale } = usePreferences();
  return (
    <Card area="stack" order={7}>
      <h2 className="card-eyebrow">{ui[locale].stack}</h2>
      <ul className="tag-list">
        {stack.flatMap((group) => group.items).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
