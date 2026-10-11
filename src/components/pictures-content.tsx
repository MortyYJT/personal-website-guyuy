"use client";
import Link from "next/link";
import { pictures } from "../content/pictures";
import { ui } from "../content/ui";
import { usePreferences } from "./preferences-provider";

export function PicturesContent() {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <div className="gallery-page">
      <header className="gallery-heading">
        <Link className="back-link" href="/">
          ← {text.home}
        </Link>
        <h1>{text.picturesTitle}</h1>
      </header>
      <div className="picture-grid">
        {pictures.map((picture) => (
          <figure className="picture-frame" key={picture.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={picture.src}
              alt={picture.alt[locale]}
              width={picture.width}
              height={picture.height}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
