import type { LocalizedText } from "./types";

export const site: {
  avatar: { src: string; alt: LocalizedText };
  /** One favourite track, played through Toby Fox's official Bandcamp embed. */
  song: { title: string; artist: string; album: string; track: string; page: string };
  /** Optional page backdrop; keep credit text for third-party artwork. */
  backgroundImage: { src: string; credit: string } | null;
} = {
  avatar: {
    src: "/avatar.jpg",
    alt: { zh: "谷鱼Y 的头像", en: "MortyYJT's avatar" },
  },
  song: {
    title: "Undertale",
    artist: "Toby Fox",
    album: "2955245981",
    track: "1570961482",
    page: "https://tobyfox.bandcamp.com/album/undertale-soundtrack",
  },
  backgroundImage: null,
};
