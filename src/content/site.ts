import type { LocalizedText } from "./types";

export const site: {
  avatar: { src: string; alt: LocalizedText };
  /** NetEase Cloud Music playlist id (digits only); empty until the owner provides one. */
  musicPlaylistId: string;
  /** Optional page backdrop; keep credit text for third-party artwork. */
  backgroundImage: { src: string; credit: string } | null;
} = {
  avatar: {
    src: "/avatar.jpg",
    alt: { zh: "谷鱼Y 的头像", en: "MortyYJT's avatar" },
  },
  musicPlaylistId: "",
  backgroundImage: null,
};
