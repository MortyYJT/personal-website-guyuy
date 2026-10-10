import Image from "next/image";
import { site } from "../../../content/site";
import type { Locale } from "../../../content/types";

export function Avatar({
  size,
  locale,
  priority = false,
}: {
  size: number;
  locale: Locale;
  priority?: boolean;
}) {
  return (
    <Image
      className="avatar"
      src={site.avatar.src}
      alt={site.avatar.alt[locale]}
      width={size}
      height={size}
      priority={priority}
    />
  );
}
