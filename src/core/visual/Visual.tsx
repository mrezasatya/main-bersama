import { Fragment } from 'react';
import { NAMED_COLORS, shade, type ColorName } from '../art/colors';
import { FlagArt } from '../art/Flag';
import { Art } from '../art/registry';
import type { ArtKey } from '../art/keys';
import type { Emotion, SceneKey, ShapeKey, Visual } from './types';

/** Renderer visual deklaratif. Selalu SVG persegi agar seragam di kartu pilihan. */

const SK = '#E8B48A';
const SK_INK = '#A8724A';
const INK = '#33302B';
const col = (c?: ColorName, d = '#3B7BF5') => (c ? NAMED_COLORS[c] : d);

const Svg = ({
  children,
  label,
  vb = '0 0 100 100',
}: {
  children: React.ReactNode;
  label?: string;
  vb?: string;
}) => (
  <svg
    viewBox={vb}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
  >
    {children}
  </svg>
);

/** Gambar art di dalam kotak (x, y, ukuran) di dalam SVG lain. */
// SVG bersarang (bukan foreignObject) agar andal di Safari iPad.
const ArtAt = ({
  k,
  x,
  y,
  s,
  color,
}: {
  k: ArtKey;
  x: number;
  y: number;
  s: number;
  color?: ColorName;
}) => (
  <svg x={x} y={y} width={s} height={s} viewBox="0 0 100 100" overflow="visible">
    <Art k={k} color={color && NAMED_COLORS[color]} />
  </svg>
);

function Face({ e }: { e: Emotion }) {
  const brow: Record<Emotion, string> = {
    senang: 'M28 32 Q36 27 44 32 M56 32 Q64 27 72 32',
    sedih: 'M28 30 Q36 32 44 26 M56 26 Q64 32 72 30',
    marah: 'M28 26 L44 34 M56 34 L72 26',
    takut: 'M28 28 Q36 22 44 28 M56 28 Q64 22 72 28',
    terkejut: 'M28 24 Q36 18 44 24 M56 24 Q64 18 72 24',
    malu: 'M28 32 Q36 30 44 32 M56 32 Q64 30 72 32',
    tenang: 'M28 32 Q36 30 44 32 M56 32 Q64 30 72 32',
    bangga: 'M28 30 Q36 25 44 30 M56 30 Q64 25 72 30',
  };
  const mouth: Record<Emotion, React.ReactNode> = {
    senang: <path d="M32 62 Q50 82 68 62 Z" fill="#C2414E" stroke="#8A2A33" strokeWidth={2} />,
    sedih: (
      <path
        d="M34 72 Q50 58 66 72"
        fill="none"
        stroke="#8A2A33"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    ),
    marah: (
      <path
        d="M34 70 Q50 62 66 70 L66 72 Q50 68 34 72 Z"
        fill="#8A2A33"
        stroke="#8A2A33"
        strokeWidth={2}
      />
    ),
    takut: (
      <path
        d="M36 70 Q42 64 48 70 Q54 64 60 70 Q64 66 66 70"
        fill="none"
        stroke="#8A2A33"
        strokeWidth={3}
        strokeLinecap="round"
      />
    ),
    terkejut: <ellipse cx={50} cy={68} rx={8} ry={10} fill="#8A2A33" />,
    malu: (
      <path
        d="M40 66 Q50 72 60 66"
        fill="none"
        stroke="#8A2A33"
        strokeWidth={3}
        strokeLinecap="round"
      />
    ),
    tenang: (
      <path
        d="M38 64 Q50 72 62 64"
        fill="none"
        stroke="#8A2A33"
        strokeWidth={3}
        strokeLinecap="round"
      />
    ),
    bangga: (
      <path
        d="M34 62 Q50 76 66 62"
        fill="none"
        stroke="#8A2A33"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    ),
  };
  const closed = e === 'tenang' || e === 'bangga';
  return (
    <Svg label={e}>
      <circle
        cx={50}
        cy={52}
        r={44}
        fill={e === 'marah' ? '#F0A07A' : SK}
        stroke={SK_INK}
        strokeWidth={2}
      />
      <path d={brow[e]} stroke="#3A2A20" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      {closed ? (
        <path
          d="M30 44 Q36 48 42 44 M58 44 Q64 48 70 44"
          stroke="#3A2A20"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <g fill="#3A2A20">
          <ellipse
            cx={36}
            cy={43}
            rx={e === 'terkejut' || e === 'takut' ? 5 : 4}
            ry={e === 'terkejut' || e === 'takut' ? 6.5 : 5}
          />
          <ellipse
            cx={64}
            cy={43}
            rx={e === 'terkejut' || e === 'takut' ? 5 : 4}
            ry={e === 'terkejut' || e === 'takut' ? 6.5 : 5}
          />
        </g>
      )}
      {(e === 'malu' || e === 'senang' || e === 'bangga') && (
        <g fill="#F07C8C" opacity={e === 'malu' ? 0.9 : 0.5}>
          <ellipse cx={26} cy={58} rx={8} ry={5} />
          <ellipse cx={74} cy={58} rx={8} ry={5} />
        </g>
      )}
      {e === 'sedih' && <path d="M34 50 q-3 8 0 10 q3 -2 0 -10" fill="#7FC4EE" />}
      {e === 'takut' && <path d="M82 26 q-4 8 0 10 q4 -2 0 -10" fill="#7FC4EE" />}
      {mouth[e]}
    </Svg>
  );
}

function shapePath(s: ShapeKey, c: string) {
  const ink = shade(c, -0.35);
  const p = { fill: c, stroke: ink, strokeWidth: 3, strokeLinejoin: 'round' as const };
  const poly = (n: number, r = 40, rot = -Math.PI / 2) =>
    Array.from({ length: n }, (_, i) => {
      const a = rot + (i * 2 * Math.PI) / n;
      return `${(50 + r * Math.cos(a)).toFixed(1)},${(52 + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  switch (s) {
    case 'lingkaran':
      return <circle cx={50} cy={50} r={40} {...p} />;
    case 'segitiga':
      return <polygon points="50,10 92,86 8,86" {...p} />;
    case 'persegi':
      return <rect x={12} y={12} width={76} height={76} rx={3} {...p} />;
    case 'persegiPanjang':
      return <rect x={6} y={26} width={88} height={48} rx={3} {...p} />;
    case 'oval':
      return <ellipse cx={50} cy={50} rx={44} ry={28} {...p} />;
    case 'belahKetupat':
      return <polygon points="50,6 86,50 50,94 14,50" {...p} />;
    case 'trapesium':
      return <polygon points="28,24 72,24 94,78 6,78" {...p} />;
    case 'segiLima':
      return <polygon points={poly(5)} {...p} />;
    case 'segiEnam':
      return <polygon points={poly(6, 42, 0)} {...p} />;
    case 'bintang':
      return (
        <polygon
          points={Array.from({ length: 10 }, (_, i) => {
            const r = i % 2 ? 18 : 44;
            const a = -Math.PI / 2 + (i * Math.PI) / 5;
            return `${(50 + r * Math.cos(a)).toFixed(1)},${(54 + r * Math.sin(a)).toFixed(1)}`;
          }).join(' ')}
          {...p}
        />
      );
    case 'hati':
      return (
        <path
          d="M50 88 C10 60 6 30 26 18 C40 10 50 22 50 30 C50 22 60 10 74 18 C94 30 90 60 50 88 Z"
          {...p}
        />
      );
    case 'bulanSabit':
      return <path d="M62 8 A44 44 0 1 0 62 92 A34 34 0 1 1 62 8 Z" {...p} />;
    case 'kubus':
      return (
        <g {...p}>
          <polygon points="20,34 60,34 60,84 20,84" />
          <polygon points="20,34 40,16 80,16 60,34" fill={shade(c, 0.25)} />
          <polygon points="60,34 80,16 80,66 60,84" fill={shade(c, -0.2)} />
        </g>
      );
    case 'balok':
      return (
        <g {...p}>
          <polygon points="8,44 66,44 66,84 8,84" />
          <polygon points="8,44 28,26 86,26 66,44" fill={shade(c, 0.25)} />
          <polygon points="66,44 86,26 86,66 66,84" fill={shade(c, -0.2)} />
        </g>
      );
    case 'bola':
      return (
        <g>
          <circle cx={50} cy={50} r={40} {...p} />
          <ellipse cx={36} cy={34} rx={10} ry={7} fill="#fff" opacity={0.45} />
        </g>
      );
    case 'tabung':
      return (
        <g {...p}>
          <path d="M18 22 V78 A32 10 0 0 0 82 78 V22" />
          <ellipse cx={50} cy={22} rx={32} ry={10} fill={shade(c, 0.25)} />
        </g>
      );
    case 'kerucut':
      return (
        <g {...p}>
          <path d="M50 8 L84 78 A34 10 0 0 1 16 78 Z" />
          <path d="M16 78 A34 10 0 0 0 84 78" fill="none" />
        </g>
      );
    case 'limas':
      return (
        <g {...p}>
          <polygon points="50,8 14,72 56,86" />
          <polygon points="50,8 56,86 88,66" fill={shade(c, -0.2)} />
        </g>
      );
  }
}

function Clock({ h, m = 0 }: { h: number; m?: 0 | 30 }) {
  const ha = ((h % 12) + m / 60) * 30 - 90;
  const ma = m * 6 - 90;
  const hand = (a: number, len: number, w: number, c: string) => (
    <path
      d={`M50 50 L${50 + Math.cos((a * Math.PI) / 180) * len} ${50 + Math.sin((a * Math.PI) / 180) * len}`}
      stroke={c}
      strokeWidth={w}
      strokeLinecap="round"
    />
  );
  return (
    <Svg label={`jam ${h}`}>
      <circle cx={50} cy={50} r={45} fill="#FFFFFF" stroke="#3B7BF5" strokeWidth={5} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) * 30 - 90) * (Math.PI / 180);
        return (
          <text
            key={i}
            x={50 + Math.cos(a) * 34}
            y={50 + Math.sin(a) * 34 + 4}
            textAnchor="middle"
            fontSize={11}
            fontWeight={800}
            fill={INK}
          >
            {i + 1}
          </text>
        );
      })}
      {hand(ha, 20, 5, INK)}
      {hand(ma, 30, 3, '#E5484D')}
      <circle cx={50} cy={50} r={3.5} fill={INK} />
    </Svg>
  );
}

function Money({ v }: { v: number }) {
  const text = `Rp${v.toLocaleString('id-ID')}`;
  if (v < 1000 || v === 1000) {
    // Koin (1000 juga ada sebagai koin; digambar koin agar mudah dibedakan dari kertas).
    const c = v === 1000 ? '#D4AF37' : v === 500 ? '#E3C46A' : '#C9CED6';
    return (
      <Svg label={`${v} rupiah`}>
        <circle cx={50} cy={50} r={40} fill={c} stroke={shade(c, -0.3)} strokeWidth={4} />
        <circle cx={50} cy={50} r={32} fill="none" stroke={shade(c, -0.15)} strokeWidth={1.5} />
        <text
          x={50}
          y={58}
          textAnchor="middle"
          fontSize={v >= 1000 ? 20 : 24}
          fontWeight={800}
          fill={shade(c, -0.55)}
        >
          {v.toLocaleString('id-ID')}
        </text>
      </Svg>
    );
  }
  const colors: Record<number, string> = {
    2000: '#A7ADBA',
    5000: '#C69B6D',
    10000: '#A98BD6',
    20000: '#7FC49A',
    50000: '#7FB1E0',
    100000: '#E58A8A',
  };
  const c = colors[v] ?? '#C9CED6';
  return (
    <Svg label={`${v} rupiah`}>
      <rect
        x={4}
        y={24}
        width={92}
        height={52}
        rx={5}
        fill={c}
        stroke={shade(c, -0.35)}
        strokeWidth={2.5}
      />
      <rect
        x={10}
        y={30}
        width={80}
        height={40}
        rx={3}
        fill="none"
        stroke={shade(c, 0.4)}
        strokeWidth={1.5}
      />
      <circle cx={24} cy={50} r={9} fill={shade(c, 0.35)} />
      <text
        x={60}
        y={56}
        textAnchor="middle"
        fontSize={v >= 100000 ? 12 : 14}
        fontWeight={800}
        fill={shade(c, -0.6)}
      >
        {text}
      </text>
    </Svg>
  );
}

function Plant({ stage }: { stage: number }) {
  return (
    <Svg label={`tanaman tahap ${stage}`}>
      <path d="M6 78 Q50 70 94 78 V96 H6 Z" fill="#9C6239" />
      {stage === 0 && (
        <ellipse cx={50} cy={84} rx={6} ry={4} fill="#E3B877" stroke="#9C7A3E" strokeWidth={1.5} />
      )}
      {stage >= 1 && (
        <path
          d={`M50 80 V${stage === 1 ? 62 : stage === 2 ? 46 : 30}`}
          stroke="#2F9E5B"
          strokeWidth={4}
          strokeLinecap="round"
        />
      )}
      {stage === 1 && (
        <path
          d="M50 64 Q40 56 36 60 Q42 66 50 64 Z M50 64 Q60 56 64 60 Q58 66 50 64 Z"
          fill="#34B865"
        />
      )}
      {stage >= 2 && (
        <g fill="#34B865">
          <ellipse cx={38} cy={58} rx={12} ry={6} transform="rotate(-25 38 58)" />
          <ellipse cx={62} cy={52} rx={12} ry={6} transform="rotate(25 62 52)" />
        </g>
      )}
      {stage === 3 && (
        <g>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={50}
              cy={20}
              rx={6}
              ry={9}
              fill="#FF8DB8"
              transform={`rotate(${a} 50 28)`}
            />
          ))}
          <circle cx={50} cy={28} r={6} fill="#FFD84A" />
        </g>
      )}
      {stage === 4 && (
        <g>
          <ellipse cx={40} cy={40} rx={11} ry={6} fill="#34B865" transform="rotate(20 40 40)" />
          <circle cx={50} cy={26} r={11} fill="#E5484D" stroke="#9E2A2E" strokeWidth={2} />
          <circle cx={66} cy={40} r={9} fill="#E5484D" stroke="#9E2A2E" strokeWidth={2} />
        </g>
      )}
    </Svg>
  );
}

function Scene({ s }: { s: SceneKey }) {
  const sky: Record<SceneKey, string> = {
    pagi: '#FFE7B8',
    siang: '#8EC9F0',
    sore: '#F7B27A',
    malam: '#22314F',
    hujan: '#9AA6B8',
    berawan: '#BFD3E6',
    pelangi: '#BFE3F7',
    kemarau: '#FFE29A',
  };
  const cloud = (x: number, y: number, c = '#FFFFFF') => (
    <g fill={c}>
      <circle cx={x} cy={y} r={10} />
      <circle cx={x + 12} cy={y - 5} r={12} />
      <circle cx={x + 24} cy={y} r={10} />
      <rect x={x} y={y} width={24} height={10} />
    </g>
  );
  return (
    <Svg label={s}>
      <rect width={100} height={100} rx={10} fill={sky[s]} />
      {s === 'pagi' && <circle cx={20} cy={70} r={14} fill="#FFB547" />}
      {s === 'siang' && <circle cx={50} cy={24} r={14} fill="#FFC83A" />}
      {s === 'sore' && <circle cx={80} cy={72} r={14} fill="#F2702A" />}
      {s === 'kemarau' && <circle cx={50} cy={26} r={16} fill="#FFB020" />}
      {s === 'malam' && (
        <g>
          <path d="M70 14 A16 16 0 1 0 70 46 A12 12 0 1 1 70 14 Z" fill="#FFF3C9" />
          {[
            [20, 20],
            [36, 34],
            [24, 50],
            [84, 56],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={2} fill="#FFFFFF" />
          ))}
        </g>
      )}
      {s === 'hujan' && (
        <g>
          {cloud(20, 26, '#7A8496')}
          {cloud(52, 20, '#7A8496')}
          {[18, 30, 42, 54, 66, 78].map((x) => (
            <path
              key={x}
              d={`M${x} 46 l-4 10 M${x + 6} 60 l-4 10`}
              stroke="#3B7BF5"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ))}
        </g>
      )}
      {s === 'berawan' && (
        <g>
          {cloud(14, 30)}
          {cloud(52, 22)}
          {cloud(40, 46)}
        </g>
      )}
      {s === 'pelangi' &&
        ['#E5484D', '#FF8A33', '#FFC83A', '#34B865', '#3B7BF5', '#9A62DD'].map((c, i) => (
          <path
            key={c}
            d={`M${10 + i * 4} 76 A${40 - i * 4} ${40 - i * 4} 0 0 1 ${90 - i * 4} 76`}
            fill="none"
            stroke={c}
            strokeWidth={4}
          />
        ))}
      <path
        d="M0 78 Q50 70 100 78 V100 H0 Z"
        fill={s === 'kemarau' ? '#C9A26A' : s === 'malam' ? '#1E4A2E' : '#5DBB4A'}
      />
      {s === 'kemarau' && (
        <path
          d="M20 88 l8 4 l6 -4 M60 90 l6 -4 l8 4"
          stroke="#8A6A3A"
          strokeWidth={1.5}
          fill="none"
        />
      )}
    </Svg>
  );
}

const LEN_COLOR = {
  pensil: '#FFC83A',
  pita: '#E5484D',
  ular: '#34B865',
  kereta: '#3B7BF5',
} as const;

function Len({
  n,
  k,
  units,
  color,
}: {
  n: number;
  k: keyof typeof LEN_COLOR;
  units?: boolean;
  color?: ColorName;
}) {
  const u = 7.5;
  const w = n * u;
  const c = color ? NAMED_COLORS[color] : LEN_COLOR[k];
  return (
    <Svg label={`${k} ${n}`}>
      {k === 'pensil' && (
        <g>
          <rect
            x={5}
            y={40}
            width={w - 8}
            height={16}
            fill={c}
            stroke={shade(c, -0.35)}
            strokeWidth={2}
          />
          <polygon
            points={`${w - 3},40 ${w + 5},48 ${w - 3},56`}
            fill="#F4D3A0"
            stroke={shade(c, -0.35)}
            strokeWidth={2}
          />
          <rect x={2} y={40} width={5} height={16} fill="#FF8DB8" />
        </g>
      )}
      {k === 'pita' && (
        <rect
          x={5}
          y={42}
          width={w}
          height={12}
          rx={2}
          fill={c}
          stroke={shade(c, -0.35)}
          strokeWidth={2}
        />
      )}
      {k === 'ular' && (
        <g>
          <path d={`M8 48 H${w}`} stroke={c} strokeWidth={10} strokeLinecap="round" />
          <circle cx={w + 2} cy={48} r={7} fill={c} />
          <circle cx={w + 4} cy={46} r={1.5} fill={INK} />
        </g>
      )}
      {k === 'kereta' &&
        Array.from({ length: n }, (_, i) => (
          <rect
            key={i}
            x={5 + i * u}
            y={40}
            width={u - 1.2}
            height={14}
            rx={2}
            fill={c}
            stroke={shade(c, -0.35)}
            strokeWidth={1}
          />
        ))}
      {units &&
        Array.from({ length: n }, (_, i) => (
          <rect
            key={`u${i}`}
            x={5 + i * u}
            y={64}
            width={u - 1}
            height={u - 1}
            rx={1.5}
            fill="#FFC83A"
            stroke="#B07A12"
            strokeWidth={1}
          />
        ))}
    </Svg>
  );
}

function render(v: Visual): React.ReactNode {
  switch (v.t) {
    case 'art':
      if (v.silhouette)
        return (
          <div className="v-silhouette" style={{ width: '100%', height: '100%' }}>
            <Art k={v.k} color={v.color && NAMED_COLORS[v.color]} />
          </div>
        );
      return v.scale && v.scale !== 1 ? (
        <Svg label={v.k}>
          <ArtAt
            k={v.k}
            color={v.color}
            x={50 - 50 * v.scale}
            y={100 - 100 * v.scale}
            s={100 * v.scale}
          />
        </Svg>
      ) : (
        <Art k={v.k} color={v.color && NAMED_COLORS[v.color]} title={v.k} />
      );
    case 'text': {
      const fs =
        v.size === 'xl'
          ? 72
          : v.size === 'm'
            ? Math.min(30, 160 / Math.max(3, v.s.length))
            : Math.min(48, 220 / Math.max(2, v.s.length));
      return (
        <Svg label={v.s}>
          <text
            x={50}
            y={50}
            dy="0.35em"
            textAnchor="middle"
            fontSize={fs}
            fontWeight={800}
            fill={INK}
          >
            {v.s}
          </text>
        </Svg>
      );
    }
    case 'num':
      return (
        <Svg label={String(v.n)}>
          <text
            x={50}
            y={50}
            dy="0.36em"
            textAnchor="middle"
            fontSize={v.n >= 100 ? 44 : v.n >= 10 ? 58 : 72}
            fontWeight={800}
            fill="#2C6ED5"
          >
            {v.n}
          </text>
        </Svg>
      );
    case 'dadu': {
      const P: Record<number, [number, number][]> = {
        1: [[50, 50]],
        2: [
          [30, 30],
          [70, 70],
        ],
        3: [
          [28, 28],
          [50, 50],
          [72, 72],
        ],
        4: [
          [30, 30],
          [70, 30],
          [30, 70],
          [70, 70],
        ],
        5: [
          [28, 28],
          [72, 28],
          [50, 50],
          [28, 72],
          [72, 72],
        ],
        6: [
          [30, 26],
          [70, 26],
          [30, 50],
          [70, 50],
          [30, 74],
          [70, 74],
        ],
      };
      return (
        <Svg label={`dadu ${v.n}`}>
          <rect
            x={8}
            y={8}
            width={84}
            height={84}
            rx={16}
            fill="#FFFFFF"
            stroke="#9AA1AB"
            strokeWidth={3}
          />
          {P[v.n]?.map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={8} fill={INK} />
          ))}
        </Svg>
      );
    }
    case 'group': {
      const perRow = v.n <= 4 ? v.n : v.n <= 6 ? 3 : v.n <= 10 ? 5 : 5;
      const rows = Math.max(1, Math.ceil(v.n / Math.max(1, perRow)));
      const s = Math.min(96 / Math.max(1, perRow), 96 / rows);
      return (
        <Svg label={`${v.n} ${v.k}`}>
          {Array.from({ length: v.n }, (_, i) => {
            const r = Math.floor(i / perRow);
            const inRow = Math.min(perRow, v.n - r * perRow);
            const x = 50 - (inRow * s) / 2 + (i % perRow) * s;
            const y = 50 - (rows * s) / 2 + r * s;
            return <ArtAt key={i} k={v.k} color={v.color} x={x} y={y} s={s} />;
          })}
        </Svg>
      );
    }
    case 'tenframe': {
      const frames = v.n > 10 ? 2 : 1;
      const cell = 17;
      const h = cell * 2 * frames + (frames - 1) * 6;
      const y0 = 50 - h / 2;
      return (
        <Svg label={`${v.n} pada kotak sepuluh`}>
          {Array.from({ length: frames * 10 }, (_, i) => {
            const f = Math.floor(i / 10);
            const j = i % 10;
            const x = 7.5 + (j % 5) * cell;
            const y = y0 + f * (cell * 2 + 6) + Math.floor(j / 5) * cell;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  fill="#FFFFFF"
                  stroke="#5A5560"
                  strokeWidth={1.5}
                />
                {i < v.n &&
                  (v.k ? (
                    <ArtAt k={v.k} x={x + 1.5} y={y + 1.5} s={cell - 3} />
                  ) : (
                    <circle cx={x + cell / 2} cy={y + cell / 2} r={cell * 0.36} fill="#E5484D" />
                  ))}
              </g>
            );
          })}
        </Svg>
      );
    }
    case 'bond': {
      const node = (x: number, y: number, n: number | null, r: number) => (
        <g>
          <circle
            cx={x}
            cy={y}
            r={r}
            fill={n === null ? '#FFF3D6' : '#FFFFFF'}
            stroke="#3B7BF5"
            strokeWidth={3}
          />
          <text
            x={x}
            y={y}
            dy="0.36em"
            textAnchor="middle"
            fontSize={r}
            fontWeight={800}
            fill={n === null ? '#E08A00' : INK}
          >
            {n === null ? '?' : n}
          </text>
        </g>
      );
      return (
        <Svg label="ikatan bilangan">
          <path d="M50 28 L26 72 M50 28 L74 72" stroke="#3B7BF5" strokeWidth={3} />
          {node(50, 26, v.whole, 20)}
          {node(24, 74, v.a, 17)}
          {node(76, 74, v.b, 17)}
        </Svg>
      );
    }
    case 'bar': {
      const known = v.parts.map((p) => p ?? 0);
      const total = v.total ?? known.reduce((a, b) => a + b, 0);
      const sum = Math.max(
        1,
        v.parts.reduce<number>(
          (a, p) => a + (p ?? Math.max(1, (v.total ?? 0) - known.reduce((x, y) => x + y, 0))),
          0,
        ),
      );
      let x = 6;
      const colors = ['#8EC9F0', '#FFC77A', '#B9E4D6'];
      return (
        <Svg label="model batang">
          <rect
            x={6}
            y={18}
            width={88}
            height={20}
            rx={3}
            fill="#FFFFFF"
            stroke="#5A5560"
            strokeWidth={2}
          />
          <text
            x={50}
            y={28}
            dy="0.36em"
            textAnchor="middle"
            fontSize={14}
            fontWeight={800}
            fill={v.total === null ? '#E08A00' : INK}
          >
            {v.total === null ? '?' : total}
          </text>
          {v.parts.map((p, i) => {
            const val = p ?? Math.max(1, (v.total ?? 0) - known.reduce((a, b) => a + b, 0));
            const w = (val / sum) * 88;
            const el = (
              <g key={i}>
                <rect
                  x={x}
                  y={52}
                  width={w}
                  height={22}
                  rx={3}
                  fill={colors[i % 3]}
                  stroke="#5A5560"
                  strokeWidth={2}
                />
                <text
                  x={x + w / 2}
                  y={63}
                  dy="0.36em"
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight={800}
                  fill={p === null ? '#E08A00' : INK}
                >
                  {p === null ? '?' : p}
                </text>
              </g>
            );
            x += w;
            return el;
          })}
        </Svg>
      );
    }
    case 'clock':
      return <Clock h={v.h} m={v.m} />;
    case 'flag':
      return <FlagArt k={v.c} title={`bendera ${v.c}`} />;
    case 'face':
      return <Face e={v.e} />;
    case 'shape':
      return (
        <Svg label={v.s}>
          <g
            transform={
              v.scale ? `translate(50 50) scale(${v.scale}) translate(-50 -50)` : undefined
            }
          >
            {shapePath(v.s, col(v.color))}
          </g>
        </Svg>
      );
    case 'swatch':
      return (
        <Svg label={v.c}>
          <path
            d="M20 30 Q50 6 80 30 Q96 60 70 84 Q40 98 20 76 Q4 52 20 30 Z"
            fill={NAMED_COLORS[v.c]}
            stroke={shade(NAMED_COLORS[v.c] === '#FFFFFF' ? '#B8BEC8' : NAMED_COLORS[v.c], -0.3)}
            strokeWidth={3}
          />
        </Svg>
      );
    case 'mix':
      return (
        <Svg label={`${v.a} dan ${v.b}`}>
          <circle
            cx={26}
            cy={50}
            r={20}
            fill={NAMED_COLORS[v.a]}
            stroke={shade(NAMED_COLORS[v.a], -0.3)}
            strokeWidth={2.5}
          />
          <text
            x={50}
            y={50}
            dy="0.36em"
            textAnchor="middle"
            fontSize={22}
            fontWeight={800}
            fill={INK}
          >
            +
          </text>
          <circle
            cx={74}
            cy={50}
            r={20}
            fill={NAMED_COLORS[v.b]}
            stroke={shade(NAMED_COLORS[v.b], -0.3)}
            strokeWidth={2.5}
          />
        </Svg>
      );
    case 'money':
      return <Money v={v.v} />;
    case 'plant':
      return <Plant stage={v.stage} />;
    case 'scene':
      return <Scene s={v.s} />;
    case 'len':
      return <Len n={v.n} k={v.k} units={v.units} color={v.color} />;
    case 'neraca': {
      const t = v.tilt === 'kiri' ? 10 : v.tilt === 'kanan' ? -10 : 0;
      return (
        <Svg label="timbangan">
          <path d="M50 30 V88 M32 90 H68" stroke="#5A5560" strokeWidth={4} strokeLinecap="round" />
          <g transform={`rotate(${-t} 50 30)`}>
            <path d="M12 30 H88" stroke="#5A5560" strokeWidth={4} strokeLinecap="round" />
            <g transform={`rotate(${t} 16 30)`}>
              <path d="M4 52 Q16 60 28 52 Z" fill="#FFC83A" stroke="#B07A12" strokeWidth={1.5} />
              <ArtAt k={v.left} x={4} y={30} s={24} />
            </g>
            <g transform={`rotate(${t} 84 30)`}>
              <path d="M72 52 Q84 60 96 52 Z" fill="#FFC83A" stroke="#B07A12" strokeWidth={1.5} />
              <ArtAt k={v.right} x={72} y={30} s={24} />
            </g>
          </g>
        </Svg>
      );
    }
    case 'gelas': {
      const c = col(v.color, '#7FC4EE');
      const top = 20 + (1 - v.fill) * 66;
      return (
        <Svg label={`gelas ${Math.round(v.fill * 100)} persen`}>
          <path d={`M30 ${top} H70 L66 86 H34 Z`} fill={c} opacity={0.85} />
          <path
            d="M26 14 H74 L66 88 H34 Z"
            fill="none"
            stroke="#5A5560"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </Svg>
      );
    }
    case 'row': {
      const n = v.items.length;
      const s = Math.min(30, 96 / n);
      return (
        <Svg label="pola" vb={`0 0 ${n * s + 4} ${s + 4}`}>
          {v.items.map((it, i) => (
            <svg key={i} x={2 + i * s} y={2} width={s} height={s} viewBox="0 0 100 100">
              <Visual v={it} />
            </svg>
          ))}
        </Svg>
      );
    }
    case 'q':
      return (
        <Svg label="tanda tanya">
          <rect
            x={10}
            y={10}
            width={80}
            height={80}
            rx={16}
            fill="#FFF3D6"
            stroke="#F2B233"
            strokeWidth={3}
            strokeDasharray="6 5"
          />
          <text
            x={50}
            y={50}
            dy="0.36em"
            textAnchor="middle"
            fontSize={56}
            fontWeight={800}
            fill="#E08A00"
          >
            ?
          </text>
        </Svg>
      );
  }
}

export function Visual({ v }: { v: Visual }) {
  return <Fragment>{render(v)}</Fragment>;
}
