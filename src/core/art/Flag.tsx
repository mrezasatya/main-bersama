import type { FlagKey } from './flagKeys';

/** Bendera disederhanakan, rasio 3:2 (viewBox 150x100). */
const W = 150;
const H = 100;
const R = '#D52B1E';
const WH = '#FFFFFF';
const BL = '#1F4E9C';
const YE = '#FFD23F';
const GR = '#1E8C4E';
const BK = '#22222A';

const hStripes = (cs: string[], weights?: number[]) => {
  const w = weights ?? cs.map(() => 1);
  const total = w.reduce((a, b) => a + b, 0);
  let y = 0;
  return cs.map((c, i) => {
    const h = (w[i]! / total) * H;
    const r = <rect key={i} x={0} y={y} width={W} height={h + 0.5} fill={c} />;
    y += h;
    return r;
  });
};
const vStripes = (cs: string[]) =>
  cs.map((c, i) => (
    <rect key={i} x={(i * W) / cs.length} y={0} width={W / cs.length + 0.5} height={H} fill={c} />
  ));
const nordic = (bg: string, cross: string, inner?: string) => (
  <>
    <rect width={W} height={H} fill={bg} />
    <rect x={42} y={0} width={20} height={H} fill={cross} />
    <rect x={0} y={40} width={W} height={20} fill={cross} />
    {inner && (
      <>
        <rect x={47} y={0} width={10} height={H} fill={inner} />
        <rect x={0} y={45} width={W} height={10} fill={inner} />
      </>
    )}
  </>
);
const star = (cx: number, cy: number, r: number, fill: string, rot = 0) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const rr = i % 2 ? r * 0.4 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2 + rot;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  });
  return <polygon points={pts.join(' ')} fill={fill} />;
};
const crescent = (cx: number, cy: number, r: number, bg: string, fg = WH) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={fg} />
    <circle cx={cx + r * 0.28} cy={cy} r={r * 0.8} fill={bg} />
  </>
);

function draw(k: FlagKey) {
  switch (k) {
    case 'indonesia':
      return hStripes([R, WH]);
    case 'polandia':
      return hStripes([WH, R]);
    case 'jepang':
      return (
        <>
          <rect width={W} height={H} fill={WH} />
          <circle cx={75} cy={50} r={30} fill="#BC002D" />
        </>
      );
    case 'prancis':
      return vStripes([BL, WH, R]);
    case 'italia':
      return vStripes([GR, WH, R]);
    case 'irlandia':
      return vStripes([GR, WH, '#F28C28']);
    case 'belgia':
      return vStripes([BK, YE, R]);
    case 'jerman':
      return hStripes([BK, R, '#FFCC00']);
    case 'belanda':
      return hStripes(['#AE1C28', WH, '#21468B']);
    case 'rusia':
      return hStripes([WH, '#0039A6', R]);
    case 'austria':
      return hStripes([R, WH, R]);
    case 'hungaria':
      return hStripes([R, WH, GR]);
    case 'bulgaria':
      return hStripes([WH, GR, R]);
    case 'lituania':
      return hStripes([YE, GR, R]);
    case 'estonia':
      return hStripes(['#0072CE', BK, WH]);
    case 'ukraina':
      return hStripes(['#0057B7', YE]);
    case 'swedia':
      return nordic('#006AA7', '#FECC00');
    case 'norwegia':
      return nordic('#BA0C2F', WH, '#00205B');
    case 'denmark':
      return nordic('#C8102E', WH);
    case 'finlandia':
      return nordic(WH, '#002F6C');
    case 'islandia':
      return nordic('#02529C', WH, '#DC1E35');
    case 'swiss':
      return (
        <>
          <rect width={W} height={H} fill={R} />
          <rect x={65} y={20} width={20} height={60} fill={WH} />
          <rect x={45} y={40} width={60} height={20} fill={WH} />
        </>
      );
    case 'thailand':
      return hStripes(['#A51931', WH, '#2D2A4A', WH, '#A51931'], [1, 1, 2, 1, 1]);
    case 'nigeria':
      return vStripes(['#008751', WH, '#008751']);
    case 'mali':
      return vStripes(['#14B53A', '#FCD116', '#CE1126']);
    case 'rumania':
      return vStripes(['#002B7F', '#FCD116', '#CE1126']);
    case 'kolombia':
      return hStripes(['#FCD116', '#003893', '#CE1126'], [2, 1, 1]);
    case 'laos':
      return (
        <>
          {hStripes(['#CE1126', '#002868', '#CE1126'], [1, 2, 1])}
          <circle cx={75} cy={50} r={20} fill={WH} />
        </>
      );
    case 'uea':
      return (
        <>
          {hStripes(['#00732F', WH, BK])}
          <rect width={38} height={H} fill="#FF0000" />
        </>
      );
    case 'amerikaSerikat':
      return (
        <>
          {hStripes(Array.from({ length: 13 }, (_, i) => (i % 2 ? WH : '#B22234')))}
          <rect width={64} height={54} fill="#3C3B6E" />
          {Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) => (
              <circle key={`${r}${c}`} cx={6 + c * 10.5} cy={6 + r * 10.5} r={2} fill={WH} />
            )),
          )}
        </>
      );
    case 'inggris':
      return (
        <>
          <rect width={W} height={H} fill="#012169" />
          <path d="M0 0 L150 100 M150 0 L0 100" stroke={WH} strokeWidth={20} />
          <path d="M0 0 L150 100 M150 0 L0 100" stroke="#C8102E" strokeWidth={7} />
          <path d="M75 0 V100 M0 50 H150" stroke={WH} strokeWidth={30} />
          <path d="M75 0 V100 M0 50 H150" stroke="#C8102E" strokeWidth={18} />
        </>
      );
    case 'tiongkok':
      return (
        <>
          <rect width={W} height={H} fill="#DE2910" />
          {star(25, 25, 15, '#FFDE00')}
          {star(50, 10, 5, '#FFDE00', 0.4)}
          {star(60, 20, 5, '#FFDE00', 0.8)}
          {star(60, 34, 5, '#FFDE00', 0.2)}
          {star(50, 44, 5, '#FFDE00', 0.6)}
        </>
      );
    case 'vietnam':
      return (
        <>
          <rect width={W} height={H} fill="#DA251D" />
          {star(75, 52, 30, '#FFFF00')}
        </>
      );
    case 'koreaSelatan':
      return (
        <>
          <rect width={W} height={H} fill={WH} />
          <circle cx={75} cy={50} r={25} fill="#003478" />
          <path
            d="M50 50 A25 25 0 0 1 100 50 A12.5 12.5 0 0 1 75 50 A12.5 12.5 0 0 0 50 50 Z"
            fill="#C60C30"
          />
          {[
            [28, 22, 35],
            [122, 22, -35],
            [28, 78, -35],
            [122, 78, 35],
          ].map(([x, y, a]) => (
            <g key={`${x}${y}`} transform={`rotate(${a} ${x} ${y})`}>
              {[-8, 0, 8].map((dy) => (
                <rect key={dy} x={x! - 12} y={y! + dy - 2.5} width={24} height={5} fill={BK} />
              ))}
            </g>
          ))}
        </>
      );
    case 'brasil':
      return (
        <>
          <rect width={W} height={H} fill="#009C3B" />
          <polygon points="75,8 140,50 75,92 10,50" fill="#FFDF00" />
          <circle cx={75} cy={50} r={22} fill="#002776" />
          <path d="M54 46 Q75 38 96 54" stroke={WH} strokeWidth={4} fill="none" />
        </>
      );
    case 'argentina':
      return (
        <>
          {hStripes(['#74ACDF', WH, '#74ACDF'])}
          <circle cx={75} cy={50} r={10} fill="#F6B40E" />
        </>
      );
    case 'india':
      return (
        <>
          {hStripes(['#FF9933', WH, '#138808'])}
          <circle cx={75} cy={50} r={13} fill="none" stroke="#000080" strokeWidth={2.5} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <path
                key={i}
                d={`M75 50 L${75 + Math.cos(a) * 13} ${50 + Math.sin(a) * 13}`}
                stroke="#000080"
                strokeWidth={1.2}
              />
            );
          })}
        </>
      );
    case 'turki':
      return (
        <>
          <rect width={W} height={H} fill="#E30A17" />
          {crescent(58, 50, 25, '#E30A17')}
          {star(92, 50, 11, WH, -0.3)}
        </>
      );
    case 'malaysia':
      return (
        <>
          {hStripes(Array.from({ length: 14 }, (_, i) => (i % 2 ? WH : '#CC0001')))}
          <rect width={75} height={57} fill="#010066" />
          {crescent(28, 28, 18, '#010066', '#FFCC00')}
          {star(55, 28, 11, '#FFCC00')}
        </>
      );
    case 'singapura':
      return (
        <>
          {hStripes(['#EF3340', WH])}
          {crescent(28, 25, 15, '#EF3340')}
          {[
            [44, 14],
            [52, 22],
            [49, 32],
            [39, 32],
            [36, 22],
          ].map(([x, y]) => (
            <g key={`${x}${y}`}>{star(x!, y!, 3.5, WH)}</g>
          ))}
        </>
      );
    case 'filipina':
      return (
        <>
          {hStripes(['#0038A8', '#CE1126'])}
          <polygon points="0,0 86,50 0,100" fill={WH} />
          <circle cx={28} cy={50} r={11} fill="#FCD116" />
          {star(8, 12, 5, '#FCD116')}
          {star(8, 88, 5, '#FCD116')}
          {star(70, 50, 5, '#FCD116')}
        </>
      );
    case 'afrikaSelatan':
      return (
        <>
          {hStripes(['#E03C31', '#001489'])}
          <path d="M0 0 L70 50 L0 100 M70 50 H150" stroke={WH} strokeWidth={34} fill="none" />
          <path d="M0 0 L70 50 L0 100 M70 50 H150" stroke="#007749" strokeWidth={20} fill="none" />
          <polygon points="0,14 50,50 0,86" fill="#FFB81C" />
          <polygon points="0,22 39,50 0,78" fill={BK} />
        </>
      );
    case 'chile':
      return (
        <>
          {hStripes([WH, '#D52B1E'])}
          <rect width={50} height={50} fill="#0039A6" />
          {star(25, 25, 12, WH)}
        </>
      );
    case 'kuba':
      return (
        <>
          {hStripes(['#002A8F', WH, '#002A8F', WH, '#002A8F'])}
          <polygon points="0,0 86,50 0,100" fill="#CF142B" />
          {star(28, 50, 14, WH)}
        </>
      );
    case 'jamaika':
      return (
        <>
          <rect width={W} height={H} fill="#009B3A" />
          <polygon points="0,0 75,50 0,100" fill={BK} />
          <polygon points="150,0 75,50 150,100" fill={BK} />
          <path d="M0 0 L150 100 M150 0 L0 100" stroke="#FED100" strokeWidth={14} />
        </>
      );
    case 'yunani':
      return (
        <>
          {hStripes(Array.from({ length: 9 }, (_, i) => (i % 2 ? WH : '#0D5EAF')))}
          <rect width={56} height={56} fill="#0D5EAF" />
          <rect x={22} y={0} width={11} height={56} fill={WH} />
          <rect x={0} y={22} width={56} height={11} fill={WH} />
        </>
      );
    case 'timorLeste':
      return (
        <>
          <rect width={W} height={H} fill="#DC241F" />
          <polygon points="0,0 80,50 0,100" fill="#FFC726" />
          <polygon points="0,0 52,50 0,100" fill={BK} />
          {star(18, 50, 11, WH, 0.3)}
        </>
      );
    case 'myanmar':
      return (
        <>
          {hStripes(['#FECB00', '#34B233', '#EA2839'])}
          {star(75, 54, 30, WH)}
        </>
      );
    case 'peru':
      return vStripes(['#D91023', WH, '#D91023']);
    case 'spanyol':
      return hStripes(['#AA151B', '#F1BF00', '#AA151B'], [1, 2, 1]);
  }
}

export function FlagArt({
  k,
  title,
  className,
}: {
  k: FlagKey;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="-6 -31 162 162"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <clipPath id={`flag-${k}`}>
          <rect width={W} height={H} rx={6} />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-${k})`}>{draw(k)}</g>
      <rect width={W} height={H} rx={6} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
    </svg>
  );
}
