import type { Metadata } from "next";
import "./globals.css";
import { PreferencesProvider } from "../components/preferences-provider";

export const metadata: Metadata = {
  title: { default: "谷鱼Y · MortyYJT", template: "%s · MortyYJT" },
  description: "谷鱼Y / MortyYJT 的个人主页，记录项目实践与持续探索。",
  authors: [{ name: "MortyYJT", url: "https://github.com/MortyYJT" }],
  openGraph: {
    title: "谷鱼Y · MortyYJT",
    description: "Projects, learning, and an ongoing exploration.",
    type: "website",
    siteName: "MortyYJT",
  },
  twitter: {
    card: "summary",
    title: "谷鱼Y · MortyYJT",
    description: "Projects, learning, and an ongoing exploration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try{const p=JSON.parse(localStorage.getItem('guyuy:preferences:v1')||'null');document.documentElement.dataset.theme=p&&p.theme==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}`;
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
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
