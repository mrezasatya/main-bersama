import { shade } from './colors';

export interface ArtProps {
  color?: string;
  /** Teks alternatif; kosong = dekoratif. */
  title?: string;
  className?: string;
}

function Svg({ title, className, children }: ArtProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {children}
    </svg>
  );
}

export function Bola({ color = '#E5484D', ...p }: ArtProps) {
  const line = shade(color, -0.35);
  return (
    <Svg {...p}>
      <circle cx="50" cy="52" r="40" fill={color} stroke={line} strokeWidth="3" />
      <path
        d="M14 46 C 34 60, 66 60, 86 46"
        fill="none"
        stroke={shade(color, 0.55)}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <ellipse
        cx="36"
        cy="30"
        rx="10"
        ry="6"
        fill="#fff"
        opacity="0.5"
        transform="rotate(-25 36 30)"
      />
    </Svg>
  );
}

function starPath(cx: number, cy: number, outer: number, inner: number, points = 5): string {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}

export function Bintang({ color = '#FFC83A', ...p }: ArtProps) {
  return (
    <Svg {...p}>
      <path
        d={starPath(50, 54, 44, 20)}
        fill={color}
        stroke={shade(color, -0.35)}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="44" r="5" fill="#fff" opacity="0.45" />
    </Svg>
  );
}

export function Balon({ color = '#3B7BF5', ...p }: ArtProps) {
  const line = shade(color, -0.35);
  return (
    <Svg {...p}>
      <path d="M50 74 C 46 84, 56 88, 50 98" fill="none" stroke="#8a8a96" strokeWidth="2" />
      <path d="M45 76 L55 76 L50 69 Z" fill={line} />
      <ellipse cx="50" cy="38" rx="30" ry="34" fill={color} stroke={line} strokeWidth="3" />
      <ellipse
        cx="38"
        cy="24"
        rx="7"
        ry="11"
        fill="#fff"
        opacity="0.45"
        transform="rotate(20 38 24)"
      />
    </Svg>
  );
}

export function Bunga({ color = '#FF8DB8', ...p }: ArtProps) {
  const line = shade(color, -0.35);
  const petals = [0, 72, 144, 216, 288];
  return (
    <Svg {...p}>
      <path d="M50 60 L50 97" stroke="#2f9d55" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="62" cy="84" rx="11" ry="5" fill="#34B865" transform="rotate(-30 62 84)" />
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="22"
          rx="13"
          ry="17"
          fill={color}
          stroke={line}
          strokeWidth="2.5"
          transform={`rotate(${deg} 50 40)`}
        />
      ))}
      <circle cx="50" cy="40" r="11" fill="#FFF3C9" stroke="#C9A43A" strokeWidth="2.5" />
    </Svg>
  );
}

export function Ikan({ color = '#FF8A33', ...p }: ArtProps) {
  const line = shade(color, -0.35);
  return (
    <Svg {...p}>
      <path
        d="M70 50 L94 30 L92 70 Z"
        fill={shade(color, 0.2)}
        stroke={line}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="44" cy="50" rx="36" ry="24" fill={color} stroke={line} strokeWidth="3" />
      <path
        d="M50 30 C 56 40, 56 60, 50 70"
        fill="none"
        stroke={line}
        strokeWidth="2.5"
        opacity="0.6"
      />
      <circle cx="24" cy="45" r="6" fill="#fff" stroke={line} strokeWidth="2" />
      <circle cx="23" cy="45" r="2.8" fill="#2B2B33" />
      <path
        d="M12 56 Q 17 60 22 57"
        fill="none"
        stroke={line}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
