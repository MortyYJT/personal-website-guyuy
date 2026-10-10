"use client";
import { profile } from "../../../content/profile";
import { ui } from "../../../content/ui";
import { usePreferences } from "../../preferences-provider";
import { LikeButton } from "../like-button";

// Bare icon tiles, like the reference: no card behind them.
export function SocialCard() {
  const { locale } = usePreferences();
  return (
    <div className="card-social" style={{ "--order": 9 } as React.CSSProperties}>
      <a
        className="social-icon social-github"
        href={profile.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui[locale].github}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      </a>
      <LikeButton />
    </div>
  );
}
