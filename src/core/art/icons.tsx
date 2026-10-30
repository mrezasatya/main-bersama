/** Ikon antarmuka; selalu disertai teks di sebelahnya. */
interface IconProps {
  className?: string;
}

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const IconSpeaker = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 19h7l10-8v26l-10-8H8z" fill="currentColor" />
    <path d="M32 17c3 4 3 10 0 14M37 12c6 7 6 17 0 24" />
  </svg>
);

export const IconSpeakerOff = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 19h7l10-8v26l-10-8H8z" fill="currentColor" />
    <path d="M32 19l10 10M42 19L32 29" />
  </svg>
);

export const IconHome = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 23L24 9l17 14" />
    <path d="M12 20v19h24V20" />
    <path d="M20 39V28h8v11" />
  </svg>
);

export const IconStar = ({ className, filled = true }: IconProps & { filled?: boolean }) => (
  <svg {...base} strokeWidth={3} className={className}>
    <path
      d="M24 5l5.6 12 13 1.4-9.7 8.8 2.7 12.8L24 33.4 12.4 40l2.7-12.8L5.4 18.4l13-1.4z"
      fill={filled ? 'currentColor' : 'none'}
    />
  </svg>
);

export const IconAlbum = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="8" y="7" width="32" height="34" rx="4" />
    <path d="M16 7v34" />
    <circle cx="29" cy="20" r="5" fill="currentColor" />
    <path d="M22 33h14" />
  </svg>
);

export const IconParent = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="18" cy="14" r="6" />
    <path d="M7 40c0-8 5-13 11-13s11 5 11 13" />
    <circle cx="34" cy="22" r="4.5" />
    <path d="M28 40c0-5 3-9 6-9s7 4 7 9" />
  </svg>
);

export const IconBack = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M29 9L14 24l15 15" />
  </svg>
);

export const IconPlay = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M15 9l24 15-24 15z" fill="currentColor" />
  </svg>
);

export const IconRepeat = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M38 20a15 15 0 1 0 1 9" />
    <path d="M39 9v11H28" />
  </svg>
);

export const IconLock = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="10" y="21" width="28" height="20" rx="4" />
    <path d="M16 21v-6a8 8 0 0 1 16 0v6" />
  </svg>
);
