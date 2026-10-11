import type { LocalizedText } from "./types";

/**
 * Pictures for the home art card and the /pictures gallery. Put files in
 * `public/pictures/` and list them here; the first entry is shown on the card.
 * Only add images the owner made or has the right to publish.
 */
export const pictures: readonly { src: string; alt: LocalizedText }[] = [
  { src: "/avatar.jpg", alt: { zh: "谷鱼Y 的头像插画", en: "MortyYJT's avatar illustration" } },
];
