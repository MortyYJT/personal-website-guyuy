export function FishMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path d="M11 32c9-17 30-22 44 0-14 22-35 17-44 0Z" fill="currentColor" />
      <path d="m15 32-12-12v24l12-12Z" fill="currentColor" />
      <path d="M26 19c1-6 6-9 12-9l-1 9" fill="currentColor" />
      <path
        d="M22 28c5-6 11-8 17-6"
        stroke="var(--fish-highlight)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="45" cy="30" r="2.5" fill="var(--fish-highlight)" />
    </svg>
  );
}
