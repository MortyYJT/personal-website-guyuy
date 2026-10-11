"use client";
import Link from "next/link";
import { pictures } from "../../../content/pictures";
import { ui } from "../../../content/ui";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

// One featured picture; the whole card opens the gallery, like the reference.
export function ArtCard() {
  const { locale } = usePreferences();
  const featured = pictures[0];
  return (
    <Card area="art" order={1}>
      <Link className="art-link" href="/pictures" aria-label={ui[locale].picturesTitle}>
        {/* Static export: next/image optimisation is unavailable. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={featured.src} alt={featured.alt[locale]} width={featured.width} height={featured.height} />
      </Link>
    </Card>
  );
}
