import { PARTS, type PartKey, type View } from './parts';

const SKIN = '#E8B48A';
const SKIN_INK = '#A8724A';
const HAIR = '#2E2420';

interface Props {
  view: View;
  /** Bagian yang benar (untuk petunjuk dan tanda benar). */
  target: PartKey;
  solved: boolean;
  hint: boolean;
  /** Titik ketukan terakhir yang bukan jawaban (lingkaran lembut). */
  miss: PartKey | null;
  onTap: (p: PartKey) => void;
}

function Face() {
  return (
    <g>
      <ellipse cx={9} cy={54} rx={7} ry={10} fill={SKIN} stroke={SKIN_INK} strokeWidth={1.5} />
      <ellipse cx={91} cy={54} rx={7} ry={10} fill={SKIN} stroke={SKIN_INK} strokeWidth={1.5} />
      <circle cx={50} cy={54} r={40} fill={SKIN} stroke={SKIN_INK} strokeWidth={1.5} />
      <path
        d="M10 52 C8 18 30 4 50 4 C70 4 92 18 90 52 C86 36 80 26 72 22 C62 26 40 26 26 21 C18 28 12 38 10 52 Z"
        fill={HAIR}
      />
      <path
        d="M28 37 Q35 33 42 37 M58 37 Q65 33 72 37"
        stroke={HAIR}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={35} cy={47} rx={6} ry={5} fill="#fff" />
      <ellipse cx={65} cy={47} rx={6} ry={5} fill="#fff" />
      <circle cx={35} cy={47} r={3.4} fill="#3A2A20" />
      <circle cx={65} cy={47} r={3.4} fill="#3A2A20" />
      <path
        d="M50 52 Q46 61 50 63 Q53 63 54 61"
        stroke={SKIN_INK}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={27} cy={63} r={6} fill="#F29C9C" opacity={0.55} />
      <circle cx={73} cy={63} r={6} fill="#F29C9C" opacity={0.55} />
      <path
        d="M40 72 Q50 82 60 72 Z"
        fill="#C2414E"
        stroke="#8A2A33"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </g>
  );
}

function Body() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M34 48 L23 66 L18 84 M66 48 L77 66 L82 84"
        stroke={SKIN}
        strokeWidth={8}
        fill="none"
      />
      <path d="M34 47 L26 62 M66 47 L74 62" stroke="#3B7BF5" strokeWidth={10} fill="none" />
      <circle cx={18} cy={86} r={6} fill={SKIN} stroke={SKIN_INK} strokeWidth={1.2} />
      <circle cx={82} cy={86} r={6} fill={SKIN} stroke={SKIN_INK} strokeWidth={1.2} />
      <path
        d="M42 92 L41 110 L39 128 M58 92 L59 110 L61 128"
        stroke={SKIN}
        strokeWidth={9}
        fill="none"
      />
      <ellipse cx={37} cy={132} rx={9} ry={5} fill="#E5484D" />
      <ellipse cx={63} cy={132} rx={9} ry={5} fill="#E5484D" />
      <rect x={35} y={78} width={30} height={18} rx={5} fill="#2F5FA8" />
      <rect x={46} y={33} width={8} height={10} fill={SKIN} />
      <path
        d="M33 46 Q34 42 42 42 H58 Q66 42 67 46 L66 82 H34 Z"
        fill="#3B7BF5"
        stroke="#244E85"
        strokeWidth={1.2}
      />
      <circle cx={50} cy={20} r={15} fill={SKIN} stroke={SKIN_INK} strokeWidth={1.2} />
      <path
        d="M35 20 C34 6 44 3 50 3 C58 3 67 7 65 20 C62 13 56 11 50 12 C44 12 38 13 35 20 Z"
        fill={HAIR}
      />
      <circle cx={45} cy={20} r={1.8} fill="#3A2A20" />
      <circle cx={55} cy={20} r={1.8} fill="#3A2A20" />
      <path d="M45 27 Q50 30 55 27" stroke="#8A2A33" strokeWidth={1.5} fill="none" />
    </g>
  );
}

/** Gambar anak (wajah atau badan) dengan area sentuh tak terlihat untuk tiap bagian. */
export function Figure({ view, target, solved, hint, miss, onTap }: Props) {
  const keys = (Object.keys(PARTS) as PartKey[]).filter((k) => PARTS[k].view === view);
  return (
    <svg
      viewBox={view === 'wajah' ? '0 0 100 100' : '0 0 100 140'}
      className={`figure figure-${view}`}
      role="group"
      aria-label={view === 'wajah' ? 'Gambar wajah' : 'Gambar badan'}
    >
      {view === 'wajah' ? <Face /> : <Body />}
      {keys.map((k) =>
        PARTS[k].spots.map((sp, i) => {
          const cls = [
            'spot',
            solved && k === target && 'is-correct',
            hint && !solved && k === target && 'is-hint',
            miss === k && 'is-miss',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <ellipse
              key={`${k}-${i}`}
              className={cls}
              cx={sp.cx}
              cy={sp.cy}
              rx={sp.rx}
              ry={sp.ry}
              role="button"
              tabIndex={0}
              aria-label={PARTS[k].name}
              data-part={k}
              onClick={() => onTap(k)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onTap(k);
              }}
            />
          );
        }),
      )}
    </svg>
  );
}
