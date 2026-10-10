/** Brand mark: a young sprout after spring rain. */
export function SproutMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 58V31" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M31 35C31 20 21 11 6 11c0 15 10 24 25 24Z" fill="currentColor" />
      <path d="M33 31c0-13 9-21 25-21 0 13-9 21-25 21Z" fill="currentColor" opacity="0.78" />
      <path
        d="M12 16c7 3 12 8 16 15M52 15c-6 3-11 7-15 12"
        stroke="var(--mark-highlight)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
