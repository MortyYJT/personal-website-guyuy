import type { LocalizedText } from "./types";

type Picture = { src: string; width: number; height: number; alt: LocalizedText };

/**
 * Pictures for the home art card and the /pictures gallery, supplied by the owner
 * (2026-10-11). Files live in `public/pictures/` as WebP with all metadata
 * (including GPS) stripped; the first entry is shown on the home card.
 */
export const pictures: readonly Picture[] = [
  { src: "/pictures/featured.webp", width: 1800, height: 842, alt: { zh: "绝区零角色在演唱会上自拍的插画", en: "Zenless Zone Zero characters taking a selfie at a concert" } },
  { src: "/pictures/sunset-plains.webp", width: 1800, height: 1350, alt: { zh: "草原上的日落", en: "Sunset over open grassland" } },
  { src: "/pictures/tower.webp", width: 1350, height: 1800, alt: { zh: "蓝天下的电视塔", en: "A tower against a blue sky" } },
  { src: "/pictures/castle-park.webp", width: 1800, height: 1350, alt: { zh: "主题乐园里的城堡", en: "A castle in a theme park" } },
  { src: "/pictures/castle.webp", width: 1800, height: 1046, alt: { zh: "灰色尖顶的城堡", en: "A grey castle with spires" } },
  { src: "/pictures/campus-gate.webp", width: 1800, height: 1350, alt: { zh: "校园门口", en: "A campus entrance" } },
  { src: "/pictures/library-dome.webp", width: 1350, height: 1800, alt: { zh: "穹顶下的图书馆阅览室", en: "A domed library reading room" } },
  { src: "/pictures/street-dusk.webp", width: 1350, height: 1800, alt: { zh: "傍晚的街道", en: "A street at dusk" } },
  { src: "/pictures/night-show.webp", width: 1800, height: 1013, alt: { zh: "夜晚的灯光表演", en: "A night-time light show" } },
  { src: "/pictures/open-sea.webp", width: 1800, height: 1013, alt: { zh: "开阔的海面", en: "Open sea" } },
  { src: "/pictures/beach.webp", width: 1800, height: 1013, alt: { zh: "蓝色海水和沙滩", en: "Blue water and a sandy beach" } },
  { src: "/pictures/skyscraper.webp", width: 986, height: 1800, alt: { zh: "高耸的摩天楼", en: "A towering skyscraper" } },
  { src: "/pictures/mosque.webp", width: 1350, height: 1800, alt: { zh: "白色的清真寺", en: "A white mosque" } },
  { src: "/pictures/wallpaper.webp", width: 1800, height: 1013, alt: { zh: "黄昏城市天台上的动漫人物剪影", en: "An anime figure on a rooftop at dusk" } },
];
