interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function GiftGlyph({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="3" {...base} />
      <path d="M2.5 9.5h19" {...base} />
      <path d="M6 14.5h5" {...base} />
    </svg>
  );
}

export function LockIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" {...base} />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" {...base} />
    </svg>
  );
}

export function InfoIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...base} />
      <path d="M12 11v5" {...base} />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ClockIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...base} />
      <path d="M12 7v5l3 2" {...base} />
    </svg>
  );
}

export function CheckCircleIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...base} />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" {...base} />
    </svg>
  );
}

export function XCircleIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...base} />
      <path d="M9 9l6 6M15 9l-6 6" {...base} />
    </svg>
  );
}

export function DocIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" {...base} />
      <path d="M9 8h6M9 12h6M9 16h4" {...base} />
    </svg>
  );
}

export function UserIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" {...base} />
      <path d="M5 20a7 7 0 0 1 14 0" {...base} />
    </svg>
  );
}

export function LogoutIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" {...base} />
      <path d="M16 17l5-5-5-5" {...base} />
      <path d="M21 12H9" {...base} />
    </svg>
  );
}

export function SearchIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" {...base} />
      <path d="M20 20l-3.5-3.5" {...base} />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M15 6l-6 6 6 6" {...base} />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" {...base} />
    </svg>
  );
}

export function ChevronDownIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" {...base} />
    </svg>
  );
}

export function ShieldIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" {...base} />
      <path d="M9 12l2 2 4-4" {...base} />
    </svg>
  );
}

export function BoltIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M13 3L5 13h6l-1 8 8-10h-6z" {...base} />
    </svg>
  );
}
