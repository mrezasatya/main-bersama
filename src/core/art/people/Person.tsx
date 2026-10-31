import { shade } from '../colors';
import type { PersonSpec } from './specs';

/** Figur orang dewasa bergaya anak-anak, tampak depan, viewBox 100x100. */
export function PersonArt({
  spec: s,
  title,
  className,
}: {
  spec: PersonSpec;
  title?: string;
  className?: string;
}) {
  const skin = s.skin ?? '#E8B48A';
  const ink = shade(skin, -0.35);
  const hair = s.hair ?? '#2E2420';
  const out = s.outfit;
  const outInk = shade(out === '#FFFFFF' || out === '#F5F7FA' ? '#B8BEC8' : out, -0.3);
  const hc = s.hatColor ?? '#2B2B33';
  const hat = () => {
    switch (s.hat) {
      case 'koki':
        return (
          <path
            d="M36 20 Q30 4 42 6 Q50 -2 58 6 Q70 4 64 20 Z"
            fill="#FFFFFF"
            stroke="#C9CED6"
            strokeWidth={1.5}
          />
        );
      case 'polisi':
        return (
          <g>
            <path d="M34 18 Q50 4 66 18 Z" fill={hc} />
            <rect x={32} y={17} width={36} height={5} rx={2} fill={shade(hc, -0.3)} />
            <circle cx={50} cy={13} r={2.5} fill="#FFC83A" />
          </g>
        );
      case 'helmPemadam':
        return (
          <path
            d="M32 22 Q32 4 50 4 Q68 4 68 22 L74 24 H26 Z"
            fill={hc}
            stroke={shade(hc, -0.3)}
            strokeWidth={1.5}
          />
        );
      case 'caping':
        return (
          <path d="M18 22 L50 2 L82 22 Z" fill={hc} stroke={shade(hc, -0.3)} strokeWidth={1.5} />
        );
      case 'pilot':
        return (
          <g>
            <path
              d="M34 18 Q34 6 50 6 Q66 6 66 18 Z"
              fill={hc}
              stroke={shade(hc, -0.25)}
              strokeWidth={1.2}
            />
            <rect x={32} y={17} width={36} height={4} rx={2} fill="#2B2B33" />
            <path d="M46 12 h8" stroke="#FFC83A" strokeWidth={2} />
          </g>
        );
      case 'astronaut':
        return (
          <circle
            cx={50}
            cy={22}
            r={19}
            fill="#BFE3F7"
            opacity={0.45}
            stroke="#9AA1AB"
            strokeWidth={2.5}
          />
        );
      case 'helmProyek':
        return (
          <path
            d="M33 20 Q33 4 50 4 Q67 4 67 20 L71 22 H29 Z"
            fill={hc}
            stroke="#9AA1AB"
            strokeWidth={1.5}
          />
        );
      case 'blangkon':
        return (
          <path
            d="M33 22 Q33 6 50 6 Q67 6 67 22 Q72 24 70 30 Q66 22 50 20 Q34 22 30 30 Q28 24 33 22 Z"
            fill={hc}
            stroke={shade(hc, -0.3)}
            strokeWidth={1.2}
          />
        );
      case 'perawat':
        return (
          <g>
            <rect
              x={38}
              y={6}
              width={24}
              height={9}
              rx={2}
              fill="#FFFFFF"
              stroke="#C9CED6"
              strokeWidth={1.2}
            />
            <path d="M48 8 h4 v2 h2 v2 h-2 v2 h-4 v-2 h-2 v-2 h2 z" fill="#E5484D" />
          </g>
        );
      case 'baret':
        return <ellipse cx={46} cy={11} rx={17} ry={6} fill={hc} transform="rotate(-10 46 11)" />;
      case 'topiPet':
        return (
          <g>
            <path d="M34 18 Q34 6 50 6 Q66 6 66 18 Z" fill={hc} />
            <path d="M34 18 H62 Q60 22 34 20 Z" fill={shade(hc, -0.3)} />
          </g>
        );
      case 'kerudung':
        return (
          <path
            d="M30 26 Q30 4 50 4 Q70 4 70 26 L74 44 Q50 52 26 44 Z"
            fill={hc}
            stroke={shade(hc, -0.25)}
            strokeWidth={1.2}
          />
        );
      default:
        return null;
    }
  };
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x={38} y={74} width={10} height={20} rx={4} fill={s.pants ?? '#3A3A44'} />
        <rect x={52} y={74} width={10} height={20} rx={4} fill={s.pants ?? '#3A3A44'} />
        <ellipse cx={42} cy={95} rx={7} ry={3.5} fill="#2B2B33" />
        <ellipse cx={58} cy={95} rx={7} ry={3.5} fill="#2B2B33" />
        <path d="M30 44 L22 70 M70 44 L78 70" stroke={out} strokeWidth={10} />
        <circle cx={22} cy={72} r={5} fill={skin} />
        <circle cx={78} cy={72} r={5} fill={skin} />
        <path
          d="M30 42 Q30 38 38 38 H62 Q70 38 70 42 L68 78 H32 Z"
          fill={out}
          stroke={outInk}
          strokeWidth={1.5}
        />
        {s.hat === 'kerudung' || <rect x={46} y={32} width={8} height={8} fill={skin} />}
        {s.acc === 'celemek' && (
          <path d="M38 50 H62 V78 H38 Z" fill="#F4E4C2" stroke="#C9A97A" strokeWidth={1.2} />
        )}
        {s.acc === 'jasLab' && (
          <path d="M40 40 L50 58 L60 40" fill="none" stroke="#C9CED6" strokeWidth={2} />
        )}
        {s.acc === 'rompi' && <path d="M32 56 H68 M32 64 H68" stroke="#FFE07A" strokeWidth={3} />}
        {s.acc === 'dasi' && <path d="M50 40 L47 46 L50 60 L53 46 Z" fill="#22314F" />}
        {s.acc === 'lencana' && <path d="M60 46 l3 -2 l3 2 v4 l-3 2 l-3 -2 z" fill="#FFC83A" />}
        {s.acc === 'kamera' && <rect x={42} y={50} width={16} height={11} rx={2} fill="#2B2B33" />}
        {s.acc === 'stetoskop' && (
          <path
            d="M40 40 Q40 56 50 56 Q60 56 60 40 M50 56 V62"
            fill="none"
            stroke="#5A5560"
            strokeWidth={2}
          />
        )}
        {s.hat === 'kerudung' ? null : (
          <path d="M33 22 Q32 4 50 4 Q68 4 67 22 Q60 14 50 14 Q40 14 33 22 Z" fill={hair} />
        )}
        <circle cx={50} cy={22} r={15} fill={skin} stroke={ink} strokeWidth={1.2} />
        {s.hat === 'kerudung' || s.hat === 'astronaut' ? null : (
          <path d="M35 18 Q36 7 50 7 Q64 7 65 18 Q58 12 50 13 Q42 12 35 18 Z" fill={hair} />
        )}
        <circle cx={44.5} cy={22} r={1.8} fill="#2B2420" />
        <circle cx={55.5} cy={22} r={1.8} fill="#2B2420" />
        {s.acc === 'kacamata' && (
          <g fill="none" stroke="#2B2B33" strokeWidth={1.3}>
            <circle cx={44.5} cy={22} r={4} />
            <circle cx={55.5} cy={22} r={4} />
            <path d="M48.5 22 h3" />
          </g>
        )}
        <path d="M45 28 Q50 32 55 28" stroke="#8A2A33" strokeWidth={1.5} fill="none" />
        {hat()}
      </g>
    </svg>
  );
}
