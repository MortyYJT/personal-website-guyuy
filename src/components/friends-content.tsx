"use client";
import Image from "next/image";
import Link from "next/link";
import { friends } from "../content/friends";
import { ui } from "../content/ui";
import { usePreferences } from "./preferences-provider";

export function FriendsContent() {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <div className="gallery-page">
      <header className="gallery-heading">
        <Link className="back-link" href="/">
          ← {text.home}
        </Link>
        <h1>{text.friendsTitle}</h1>
        <p>{text.friendsIntro}</p>
      </header>
      <div className="gallery-grid friends-grid">
        {friends.map((friend) => (
          <a
            className="gallery-card friend-card"
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            key={friend.login}
          >
            <div className="gallery-card-head">
              <Image
                className="friend-avatar"
                src={`https://avatars.githubusercontent.com/${friend.login}?s=128`}
                alt=""
                width={56}
                height={56}
                unoptimized
              />
              <div>
                <h2>{friend.name}</h2>
                <p className="friend-url">{friend.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</p>
              </div>
            </div>
            {friend.bio && <p>{friend.bio}</p>}
          </a>
        ))}
      </div>
      <p className="gallery-note">
        <a
          className="text-link"
          href="https://github.com/MortyYJT/personal-website-guyuy/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.friendsJoin} <span aria-hidden="true">↗</span>
        </a>
      </p>
    </div>
  );
}
