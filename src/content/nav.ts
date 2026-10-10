import type { LocalizedText } from "./types";

export type NavItem = { href: string; icon: "profile" | "projects" | "friends"; label: LocalizedText };

export const navItems: readonly NavItem[] = [
  { href: "/profile", icon: "profile", label: { zh: "小档案", en: "Profile" } },
  { href: "/projects", icon: "projects", label: { zh: "项目", en: "Projects" } },
  { href: "/friends", icon: "friends", label: { zh: "友链", en: "Friends" } },
];
