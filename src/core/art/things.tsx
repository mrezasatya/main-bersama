import type { ComponentType } from 'react';
import type { ThingKey } from './thingKeys';
import { MORE } from './thingsMore';
import { MORE2 } from './thingsMore2';
import { CULTURE } from './culture';

/** Ikon benda sehari-hari dan organ indra, orisinal, viewBox 100x100. */
const SKIN = '#F2C49B';
const SKIN_INK = '#B9835A';

const Mata = () => (
  <g>
    <path d="M8 50 Q50 12 92 50 Q50 88 8 50 Z" fill="#fff" stroke={SKIN_INK} strokeWidth={3} />
    <circle cx={50} cy={50} r={18} fill="#6B4A2E" />
    <circle cx={50} cy={50} r={9} fill="#1E1A20" />
    <circle cx={44} cy={44} r={4} fill="#fff" />
    <path
      d="M14 30 Q50 4 86 30"
      stroke="#3A2A20"
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
    />
  </g>
);
const Telinga = () => (
  <g>
    <path
      d="M36 14 C70 6 86 34 76 56 C70 70 60 70 58 84 C56 96 36 96 34 82"
      fill={SKIN}
      stroke={SKIN_INK}
      strokeWidth={3}
      strokeLinecap="round"
    />
    <path
      d="M44 30 C62 24 72 42 62 54 C56 60 50 58 52 68"
      stroke={SKIN_INK}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M20 44 q-8 6 0 12 M12 38 q-14 12 0 24"
      stroke="#7FC4EE"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
  </g>
);
const Hidung = () => (
  <g>
    <path
      d="M50 10 C46 34 30 56 28 70 C26 84 40 86 50 82 C60 86 74 84 72 70 C70 56 54 34 50 10 Z"
      fill={SKIN}
      stroke={SKIN_INK}
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <ellipse cx={41} cy={74} rx={5} ry={3.5} fill={SKIN_INK} />
    <ellipse cx={59} cy={74} rx={5} ry={3.5} fill={SKIN_INK} />
  </g>
);
const Lidah = () => (
  <g>
    <path
      d="M10 40 Q50 30 90 40 Q86 76 50 80 Q14 76 10 40 Z"
      fill="#C2414E"
      stroke="#8A2A33"
      strokeWidth={3}
    />
    <path
      d="M24 46 Q50 42 76 46 Q74 86 50 90 Q26 86 24 46 Z"
      fill="#F07C8C"
      stroke="#C2414E"
      strokeWidth={2}
    />
    <path d="M50 52 V78" stroke="#C2414E" strokeWidth={2.5} strokeLinecap="round" />
    <path d="M12 40 Q50 22 88 40" stroke="#fff" strokeWidth={6} fill="none" />
  </g>
);
const Tangan = () => (
  <g fill={SKIN} stroke={SKIN_INK} strokeWidth={3} strokeLinejoin="round">
    <path d="M30 92 L28 56 Q22 44 14 40 Q10 34 18 32 Q28 34 34 46 L34 20 Q34 12 40 12 Q46 12 46 20 L46 42 L48 12 Q48 6 54 6 Q60 6 60 12 L58 42 L62 16 Q62 10 68 10 Q74 12 72 18 L68 46 L74 28 Q76 22 82 24 Q86 26 84 32 L76 64 Q72 80 66 92 Z" />
  </g>
);
const Jeruk = () => (
  <g>
    <circle cx={50} cy={56} r={34} fill="#FF9F1C" stroke="#D97706" strokeWidth={3} />
    <path d="M50 22 Q52 12 60 10" stroke="#5A3A22" strokeWidth={3} fill="none" />
    <ellipse cx={64} cy={16} rx={10} ry={5} fill="#34B865" transform="rotate(-20 64 16)" />
    <circle cx={38} cy={44} r={6} fill="#FFC77A" opacity={0.8} />
  </g>
);
const Permen = () => (
  <g>
    <path
      d="M30 50 L8 34 L12 66 Z M70 50 L92 34 L88 66 Z"
      fill="#FF8DB8"
      stroke="#C2557F"
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <circle cx={50} cy={50} r={22} fill="#FF8DB8" stroke="#C2557F" strokeWidth={3} />
    <path
      d="M36 40 Q50 30 64 44 M34 54 Q50 44 66 58"
      stroke="#fff"
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
    />
  </g>
);
const Garam = () => (
  <g>
    <path
      d="M14 50 H86 Q84 84 50 86 Q16 84 14 50 Z"
      fill="#9BC4E2"
      stroke="#4E7398"
      strokeWidth={3}
    />
    <path d="M18 50 Q50 28 82 50 Z" fill="#FFFFFF" stroke="#C9CED6" strokeWidth={2} />
    {[30, 42, 54, 66].map((x) => (
      <rect
        key={x}
        x={x}
        y={40 - (x % 3)}
        width={4}
        height={4}
        fill="#E3E7EC"
        transform={`rotate(20 ${x} 40)`}
      />
    ))}
  </g>
);
const EsKrim = () => (
  <g>
    <path
      d="M30 50 L50 96 L70 50 Z"
      fill="#E3B877"
      stroke="#B07A3E"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path d="M38 56 L62 70 M62 56 L38 70" stroke="#B07A3E" strokeWidth={2} />
    <circle cx={40} cy={42} r={14} fill="#FFE3EC" stroke="#E9A3B8" strokeWidth={2.5} />
    <circle cx={60} cy={42} r={14} fill="#B98A62" stroke="#8A5E3B" strokeWidth={2.5} />
    <circle cx={50} cy={26} r={14} fill="#FFF3C9" stroke="#E5C76A" strokeWidth={2.5} />
    <circle cx={50} cy={12} r={5} fill="#E5302B" />
  </g>
);
const EsBatu = () => (
  <g>
    <rect
      x={18}
      y={36}
      width={40}
      height={40}
      rx={6}
      fill="#D9F1FF"
      stroke="#7FB8DE"
      strokeWidth={3}
      transform="rotate(-10 38 56)"
    />
    <rect
      x={46}
      y={28}
      width={36}
      height={36}
      rx={6}
      fill="#E8F7FF"
      stroke="#7FB8DE"
      strokeWidth={3}
      transform="rotate(12 64 46)"
    />
    <path d="M28 46 l8 -2 M56 36 l8 2" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
    <path d="M70 76 l4 8 l4 -8 M84 70 l3 6 l3 -6" stroke="#7FB8DE" strokeWidth={2} fill="none" />
  </g>
);
const Kue = () => (
  <g>
    <path
      d="M30 22 q4 -8 0 -14 M50 22 q4 -8 0 -14 M70 22 q4 -8 0 -14"
      stroke="#C9CED6"
      strokeWidth={2.5}
      fill="none"
      strokeLinecap="round"
    />
    <rect
      x={14}
      y={44}
      width={72}
      height={40}
      rx={6}
      fill="#E3B877"
      stroke="#9C6239"
      strokeWidth={3}
    />
    <path
      d="M14 52 Q24 64 34 52 Q44 64 54 52 Q64 64 74 52 Q82 62 86 52 V44 H14 Z"
      fill="#FFF3F6"
      stroke="#E9A3B8"
      strokeWidth={2}
    />
    <rect x={14} y={66} width={72} height={6} fill="#C27A9A" />
    <circle cx={50} cy={34} r={6} fill="#E5302B" />
  </g>
);
const Roti = () => (
  <g>
    <path
      d="M12 56 Q12 26 50 26 Q88 26 88 56 V80 Q88 86 82 86 H18 Q12 86 12 80 Z"
      fill="#D49A5A"
      stroke="#9C6239"
      strokeWidth={3}
    />
    <path
      d="M30 40 l8 8 M48 36 l8 8 M66 40 l8 8"
      stroke="#F2D398"
      strokeWidth={4}
      strokeLinecap="round"
    />
  </g>
);
const Sabun = () => (
  <g>
    <rect
      x={16}
      y={42}
      width={60}
      height={38}
      rx={14}
      fill="#B9E4D6"
      stroke="#5FA88E"
      strokeWidth={3}
    />
    <ellipse cx={46} cy={58} rx={16} ry={6} fill="#D9F2EA" />
    <circle cx={74} cy={30} r={10} fill="none" stroke="#9FD4F5" strokeWidth={2.5} />
    <circle cx={86} cy={16} r={6} fill="none" stroke="#9FD4F5" strokeWidth={2.5} />
    <circle cx={58} cy={22} r={5} fill="none" stroke="#9FD4F5" strokeWidth={2.5} />
  </g>
);
const Durian = () => (
  <g>
    <ellipse cx={50} cy={58} rx={32} ry={30} fill="#9BB04A" stroke="#5E6E22" strokeWidth={3} />
    {Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2;
      const x = 50 + Math.cos(a) * 32;
      const y = 58 + Math.sin(a) * 30;
      return (
        <path
          key={i}
          d={`M${x} ${y} L${50 + Math.cos(a) * 40} ${58 + Math.sin(a) * 38}`}
          stroke="#5E6E22"
          strokeWidth={4}
          strokeLinecap="round"
        />
      );
    })}
    {[
      [40, 48],
      [58, 52],
      [46, 66],
      [62, 70],
    ].map(([x, y = 0]) => (
      <path key={`${x}${y}`} d={`M${x} ${y - 4} l4 8 h-8 z`} fill="#6F8A2A" />
    ))}
    <path d="M50 28 V14" stroke="#5A3A22" strokeWidth={4} strokeLinecap="round" />
    <path d="M70 24 q6 -6 12 -2 M76 32 q8 -4 12 2" stroke="#B5A86A" strokeWidth={2} fill="none" />
  </g>
);
const Pisang = () => (
  <g>
    <path
      d="M18 34 Q20 80 74 84 Q86 82 84 76 Q40 72 30 30 Z"
      fill="#FFD84A"
      stroke="#C9A12A"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path d="M30 30 L26 20" stroke="#6E5A2A" strokeWidth={4} strokeLinecap="round" />
  </g>
);
const Cabai = () => (
  <g>
    <path
      d="M34 26 Q20 60 46 86 Q52 90 54 84 Q36 60 50 30 Z"
      fill="#E5302B"
      stroke="#9E1F1A"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path d="M36 26 Q44 14 56 18 Q50 26 50 30 Z" fill="#34B865" stroke="#23824A" strokeWidth={2} />
    <path
      d="M62 30 Q70 50 64 74 Q60 80 58 74 Q64 52 56 32 Z"
      fill="#34B865"
      stroke="#23824A"
      strokeWidth={2.5}
    />
  </g>
);
const Bantal = () => (
  <g>
    <path
      d="M10 30 Q50 18 90 30 Q96 50 90 70 Q50 82 10 70 Q4 50 10 30 Z"
      fill="#CFE0FF"
      stroke="#6E8FC9"
      strokeWidth={3}
    />
    <path
      d="M22 40 Q50 32 78 40 M22 60 Q50 66 78 60"
      stroke="#A9C3F0"
      strokeWidth={3}
      fill="none"
    />
  </g>
);
const Batu = () => (
  <g>
    <path
      d="M14 76 Q8 54 24 40 Q40 22 62 28 Q86 34 88 58 Q90 78 70 82 H28 Q16 82 14 76 Z"
      fill="#A3A6AD"
      stroke="#6C7078"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path
      d="M34 46 Q42 40 50 44 M60 60 l10 -4"
      stroke="#C9CCD2"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </g>
);
const Kapas = () => (
  <g fill="#FFFFFF" stroke="#C9CED6" strokeWidth={2.5}>
    <circle cx={34} cy={56} r={18} />
    <circle cx={52} cy={42} r={20} />
    <circle cx={68} cy={58} r={18} />
    <circle cx={50} cy={66} r={16} />
  </g>
);
const TehHangat = () => (
  <g>
    <path
      d="M36 26 q-6 -8 0 -16 M50 26 q-6 -8 0 -16 M64 26 q-6 -8 0 -16"
      stroke="#C9CED6"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    <path d="M70 46 Q90 46 88 60 Q86 72 68 70" stroke="#E5484D" strokeWidth={5} fill="none" />
    <path
      d="M18 36 H74 L68 80 Q66 88 58 88 H34 Q26 88 24 80 Z"
      fill="#E5484D"
      stroke="#9E2A2E"
      strokeWidth={3}
    />
    <ellipse cx={46} cy={36} rx={28} ry={5} fill="#B5651D" />
  </g>
);
const Buku = () => (
  <g>
    <path
      d="M50 26 Q30 16 8 22 V80 Q30 74 50 84 Z"
      fill="#FFFFFF"
      stroke="#3B7BF5"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path
      d="M50 26 Q70 16 92 22 V80 Q70 74 50 84 Z"
      fill="#FFFFFF"
      stroke="#3B7BF5"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path
      d="M16 34 Q30 30 42 36 M16 46 Q30 42 42 48 M58 36 Q70 30 84 34 M58 48 Q70 42 84 46"
      stroke="#AEB6C2"
      strokeWidth={2.5}
      fill="none"
    />
    <circle cx={70} cy={64} r={6} fill="#FFC83A" />
  </g>
);
const Lonceng = () => (
  <g>
    <path d="M50 10 V18" stroke="#9C7A1E" strokeWidth={4} strokeLinecap="round" />
    <path
      d="M24 74 Q26 30 50 20 Q74 30 76 74 Z"
      fill="#FFC83A"
      stroke="#C9952A"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <rect
      x={16}
      y={72}
      width={68}
      height={8}
      rx={4}
      fill="#F2B233"
      stroke="#C9952A"
      strokeWidth={2}
    />
    <circle cx={50} cy={86} r={6} fill="#C9952A" />
    <path
      d="M86 40 q6 8 0 16 M14 40 q-6 8 0 16"
      stroke="#7FC4EE"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
  </g>
);
const Gendang = () => (
  <g>
    <path
      d="M16 34 L22 82 H78 L84 34 Z"
      fill="#C4552F"
      stroke="#7D2F16"
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path
      d="M18 44 L50 74 L82 44 M20 70 L50 40 L80 70"
      stroke="#FFC83A"
      strokeWidth={2}
      fill="none"
    />
    <ellipse cx={50} cy={34} rx={34} ry={9} fill="#F4E4C2" stroke="#9C6239" strokeWidth={3} />
  </g>
);
const Televisi = () => (
  <g>
    <path
      d="M38 14 L50 24 L62 10"
      stroke="#5A5560"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    <rect x={8} y={24} width={84} height={58} rx={8} fill="#5A5560" />
    <rect x={14} y={30} width={72} height={46} rx={4} fill="#8EC9F0" />
    <circle cx={36} cy={50} r={8} fill="#FFC83A" />
    <path d="M14 70 L36 54 L54 66 L66 58 L86 72 V76 H14 Z" fill="#34B865" />
  </g>
);

const C = (G: () => React.ReactElement): ComponentType => G;

export const THINGS: Record<ThingKey, ComponentType> = {
  mata: C(Mata),
  telinga: C(Telinga),
  hidung: C(Hidung),
  lidah: C(Lidah),
  tangan: C(Tangan),
  jeruk: C(Jeruk),
  permen: C(Permen),
  garam: C(Garam),
  esKrim: C(EsKrim),
  esBatu: C(EsBatu),
  kue: C(Kue),
  roti: C(Roti),
  sabun: C(Sabun),
  durian: C(Durian),
  pisang: C(Pisang),
  cabai: C(Cabai),
  bantal: C(Bantal),
  batu: C(Batu),
  kapas: C(Kapas),
  tehHangat: C(TehHangat),
  buku: C(Buku),
  lonceng: C(Lonceng),
  gendang: C(Gendang),
  televisi: C(Televisi),
  ...MORE,
  ...MORE2,
  ...CULTURE,
};

export function ThingArt({
  k,
  title,
  className,
}: {
  k: ThingKey;
  title?: string;
  className?: string;
}) {
  const G = THINGS[k];
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <G />
    </svg>
  );
}
