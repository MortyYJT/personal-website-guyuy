"use client";
import { useEffect, useState } from "react";
import { heroEyebrow, phrases, profile } from "../../content/profile";
import { ui } from "../../content/ui";
import { usePreferences } from "../preferences-provider";
import { FishMark } from "../fish-mark";
function TypedPhrase({ locale }: { locale: "zh" | "en" }) {
  const [typed, setTyped] = useState(phrases[0][locale]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    let length = phrases[0][locale].length;
    let deleting = true;
    function tick() {
      const phrase = phrases[index][locale];
      length += deleting ? -1 : 1;
      setTyped(phrase.slice(0, length));
      if (length === 0) {
        index = (index + 1) % phrases.length;
        deleting = false;
      }
      if (length === phrases[index][locale].length) {
        deleting = true;
        timer = setTimeout(tick, 2600);
      } else timer = setTimeout(tick, deleting ? 45 : 85);
    }
    function start() {
      clearTimeout(timer);
      if (media.matches) setTyped(phrases[0][locale]);
      else timer = setTimeout(tick, 2600);
    }
    start();
    media.addEventListener("change", start);
    return () => {
      clearTimeout(timer);
      media.removeEventListener("change", start);
    };
  }, [locale]);
  return (
    <>
      <span aria-hidden="true">
        {typed}
        <span className="typing-caret">|</span>
      </span>
      <span className="sr-only">{phrases[0][locale]}</span>
    </>
  );
}
export function Hero() {
  const { locale } = usePreferences();
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <FishMark className="hero-fish" />
      <p className="eyebrow">{heroEyebrow[locale]}</p>
      <h1 id="hero-title">
        {locale === "zh" ? "你好，我是" : "Hi, I'm"}{" "}
        <span>{locale === "zh" ? "谷鱼Y" : "MortyYJT"}</span>
        <span className="greeting-dot">.</span>
      </h1>
      <div className="hero-phrase">
        <TypedPhrase key={locale} locale={locale} />
      </div>
      <p className="hero-description">{profile.introduction[locale]}</p>
      <div className="hero-interests">
        <span>AI</span>
        <span>{locale === "zh" ? "工具与产品" : "Tools & products"}</span>
        <span>{locale === "zh" ? "学习与创造" : "Learning & making"}</span>
      </div>
      <p className="hero-contact">
        {locale === "zh" ? "你可以在 " : "Find me on "}
        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        {locale === "zh" ? " 找到我。" : "."}
      </p>
      <a href="#about" className="scroll-hint" aria-label={ui[locale].about}>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
