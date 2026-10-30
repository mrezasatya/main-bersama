import { ThingArt } from '../../core/art';
import type { RhythmSound } from './types';

const Rebana = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx={50} cy={50} r={42} fill="#9C6239" />
    <circle cx={50} cy={50} r={34} fill="#F4E4C2" stroke="#C9A97A" strokeWidth={2} />
    {[0, 72, 144, 216, 288].map((a) => (
      <circle
        key={a}
        cx={50 + Math.cos((a * Math.PI) / 180) * 38}
        cy={50 + Math.sin((a * Math.PI) / 180) * 38}
        r={4.5}
        fill="#D4AF37"
      />
    ))}
  </svg>
);

const Kentongan = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 4 V16" stroke="#7A4B2A" strokeWidth={3} />
    <rect
      x={32}
      y={14}
      width={36}
      height={78}
      rx={16}
      fill="#D9B26A"
      stroke="#9C7A3E"
      strokeWidth={3}
    />
    <rect x={46} y={30} width={8} height={44} rx={4} fill="#5A3A22" />
    <path d="M32 40 H68 M32 66 H68" stroke="#9C7A3E" strokeWidth={2.5} />
  </svg>
);

export function BeatArt({ sound }: { sound: RhythmSound }) {
  if (sound === 'tepuk') return <ThingArt k="tangan" />;
  if (sound === 'kendang') return <ThingArt k="gendang" />;
  if (sound === 'rebana') return <Rebana />;
  return <Kentongan />;
}
