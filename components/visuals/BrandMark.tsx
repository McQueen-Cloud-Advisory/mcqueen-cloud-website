export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M5 29V11l15 9 15-9v18" stroke="currentColor" strokeWidth="2" />
      <path d="m5 19 15 9 15-9M5 29l15 9 15-9" stroke="currentColor" strokeWidth="2" opacity=".6" />
      <path d="M20 20V3" stroke="#8CB8FF" strokeWidth="2" />
      <circle cx="20" cy="3" r="2" fill="#8CB8FF" />
    </svg>
  );
}
