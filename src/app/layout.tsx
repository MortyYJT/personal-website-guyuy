import type { Metadata } from "next";
import { Averia_Gruesa_Libre } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "../components/preferences-provider";
import { siteOpenGraph, siteOrigin } from "../lib/site";

// Self-hosted at build time, so visitors never request Google Fonts.
const display = Averia_Gruesa_Libre({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "谷鱼Y · MortyYJT", template: "%s · MortyYJT" },
  description: "谷鱼Y / MortyYJT 的个人主页，记录项目实践与持续探索。",
  authors: [{ name: "MortyYJT", url: "https://github.com/MortyYJT" }],
  openGraph: siteOpenGraph,
  twitter: {
    card: "summary",
    title: "谷鱼Y · MortyYJT",
    description: "Projects, learning, and an ongoing exploration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try{const p=JSON.parse(localStorage.getItem('guyuy:preferences:v1')||'null');document.documentElement.dataset.theme=p&&p.theme==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`;
  return (
    <html
      lang="zh-CN"
      className={display.variable}
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
