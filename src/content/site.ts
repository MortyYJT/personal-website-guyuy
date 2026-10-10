import type { LocalizedText } from "./types";

export const site: {
  avatar: { src: string; alt: LocalizedText };
  /** Owner's favourite songs, played in shuffled order through official embeds. */
  songs: readonly { title: string; artist: string; neteaseId: string }[];
  /** Optional page backdrop; keep credit text for third-party artwork. */
  backgroundImage: { src: string; credit: string } | null;
} = {
  avatar: {
    src: "/avatar.jpg",
    alt: { zh: "谷鱼Y 的头像", en: "MortyYJT's avatar" },
  },
  songs: [
    { title: "昔涟", artist: "张韶涵 / HOYO-MiX", neteaseId: "3316968660" },
    {
      title: "I Really Want to Stay at Your House",
      artist: "Rosa Walton / Hallie Coggins",
      neteaseId: "1496089152",
    },
    { title: "Undertale", artist: "Toby Fox", neteaseId: "39227624" },
    { title: "Snowship", artist: "Patricia Wilde", neteaseId: "27544862" },
    {
      title: "生きていたんだよな",
      artist: "宫野栞",
      neteaseId: "1389428653",
    },
  ],
  backgroundImage: null,
};
