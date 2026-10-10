import type { CSSProperties, ReactNode } from "react";

/** A glass card placed by grid area; `order` staggers its entrance. */
export function Card({
  area,
  order,
  label,
  className = "",
  children,
}: {
  area: string;
  order: number;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`card card-${area} ${className}`}
      style={{ "--order": order } as CSSProperties}
      aria-label={label}
    >
      {children}
    </section>
  );
}
