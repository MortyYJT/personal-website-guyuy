// Sites of people the owner follows on GitHub (2026-10-10), limited to those who
// publish a personal website and the owner chose to list (2026-10-11). Bios are their own public GitHub bios.
export type Friend = { login: string; name: string; url: string; bio: string };

export const friends: readonly Friend[] = [
  {
    login: "auberginewly",
    name: "不想上学",
    url: "https://auberginewly.site",
    bio: "只要不停的 Build，就会有好事发生",
  },
  { login: "MarkChu-git", name: "MarkChu", url: "https://me.markchu.work", bio: "" },
  {
    login: "Emulisy",
    name: "Emulisy",
    url: "https://emulisy.github.io/",
    bio: "Undergraduate major in computer science @Monash University",
  },
];
