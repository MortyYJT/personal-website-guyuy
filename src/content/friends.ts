// Sites of people the owner follows on GitHub (2026-10-10), limited to those who
// publish a personal website. Bios are their own public GitHub bios.
export type Friend = { login: string; name: string; url: string; bio: string };

export const friends: readonly Friend[] = [
  { login: "lvy010", name: "lvy-neko", url: "https://lvyovo-wiki.tech", bio: "code weaves world" },
  {
    login: "auberginewly",
    name: "不想上学",
    url: "https://auberginewly.site",
    bio: "只要不停的 Build，就会有好事发生",
  },
  { login: "MarkChu-git", name: "MarkChu", url: "https://me.markchu.work", bio: "" },
  {
    login: "Eryc123Y",
    name: "Eryc123Y",
    url: "https://eryc123y.github.io/blog/",
    bio: "CS Student at Monash University",
  },
  {
    login: "Emulisy",
    name: "Emulisy",
    url: "https://emulisy.github.io/",
    bio: "Undergraduate major in computer science @Monash University",
  },
];
