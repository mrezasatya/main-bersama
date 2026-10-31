import { useId } from 'react';
import { shade } from '../colors';
import type {
  BirdSpec,
  BugSpec,
  PrimateSpec,
  QuadSpec,
  ReptileSpec,
  SeaSpec,
  AnimalSpec,
} from './specs';

/** Renderer hewan orisinal. Semua koordinat dalam viewBox 100x100, menghadap ke kiri. */

const LINE = 2;
const eye = (x: number, y: number, r = 2.6) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#22202A" />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#fff" />
  </g>
);

function Quad({ s }: { s: QuadSpec }) {
  const clip = useId();
  const cx = 58;
  const cy = 54;
  const rx = s.bodyW ?? 28;
  const ry = s.bodyH ?? 17;
  const L = s.legLen ?? 20;
  const W = s.legW ?? 7;
  const r = s.headR ?? 13;
  const n = s.neck ?? 1;
  const ink = shade(s.color === '#FFFFFF' || s.color === '#FBF8F1' ? '#B9B2A6' : s.color, -0.35);
  const headColor = s.face ?? s.color;
  const legColor = s.face ?? s.color;
  const hx = cx - rx * 0.95;
  const hy = cy - ry * 0.55 - 8 * n;
  const legTop = cy + ry * 0.35;
  const hoof = s.ear === 'samping' || s.ear === 'tegak';
  const tx = cx + rx * 0.95;
  const ty = cy - ry * 0.3;
  const sc = (s.scale ?? 1) * 1.12;

  const leg = (x: number, far: boolean) => (
    <g key={`${x}-${far}`}>
      <rect
        x={x - W / 2}
        y={legTop}
        width={W}
        height={L}
        rx={W / 2.5}
        fill={far ? shade(legColor, -0.15) : legColor}
        stroke={ink}
        strokeWidth={LINE}
      />
      {hoof && (
        <rect x={x - W / 2} y={legTop + L - 4} width={W} height={4} rx={1.5} fill="#3A3330" />
      )}
    </g>
  );
  const legsX = [cx - rx * 0.62, cx - rx * 0.32, cx + rx * 0.32, cx + rx * 0.62];

  const tail = () => {
    switch (s.tail) {
      case 'tipis':
        return (
          <path
            d={`M${tx} ${ty} Q${tx + 10} ${ty + 6} ${tx + 8} ${ty + 24}`}
            stroke={ink}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'jumbai':
        return (
          <g>
            <path
              d={`M${tx} ${ty} Q${tx + 9} ${ty + 6} ${tx + 8} ${ty + 22}`}
              stroke={ink}
              strokeWidth={2.2}
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx={tx + 8}
              cy={ty + 25}
              rx={3.2}
              ry={5}
              fill={s.maneColor ?? shade(s.color, -0.5)}
            />
          </g>
        );
      case 'panjang':
        return (
          <path
            d={`M${tx - 2} ${ty + 2} C${tx + 16} ${ty + 6} ${tx + 18} ${ty - 16} ${tx + 9} ${ty - 26}`}
            stroke={s.color}
            strokeWidth={5.5}
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'lebat':
        return (
          <ellipse
            cx={tx + 8}
            cy={ty - 4}
            rx={13}
            ry={5.5}
            fill={s.color}
            stroke={ink}
            strokeWidth={LINE}
            transform={`rotate(-35 ${tx + 8} ${ty - 4})`}
          />
        );
      case 'kuda':
        return (
          <path
            d={`M${tx - 2} ${ty} Q${tx + 12} ${ty + 4} ${tx + 8} ${ty + 30}`}
            stroke={s.maneColor ?? ink}
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
          />
        );
      default:
        return (
          <circle cx={tx + 1} cy={ty} r={4.5} fill={s.color} stroke={ink} strokeWidth={LINE} />
        );
    }
  };

  const ears = () => {
    const c = s.earColor ?? headColor;
    switch (s.ear) {
      case 'runcing':
        return (
          <g fill={c} stroke={ink} strokeWidth={LINE} strokeLinejoin="round">
            <path
              d={`M${hx - r * 0.55} ${hy - r * 0.55} L${hx - r * 0.45} ${hy - r * 1.45} L${hx + r * 0.05} ${hy - r * 0.8} Z`}
            />
            <path
              d={`M${hx + r * 0.15} ${hy - r * 0.75} L${hx + r * 0.55} ${hy - r * 1.5} L${hx + r * 0.85} ${hy - r * 0.45} Z`}
            />
          </g>
        );
      case 'bulat':
        return (
          <g>
            <circle
              cx={hx + r * 0.45}
              cy={hy - r * 0.8}
              r={r * 0.4}
              fill={c}
              stroke={ink}
              strokeWidth={LINE}
            />
            <circle cx={hx + r * 0.45} cy={hy - r * 0.8} r={r * 0.2} fill={shade(c, 0.4)} />
          </g>
        );
      case 'terkulai':
        return (
          <ellipse
            cx={hx + r * 0.5}
            cy={hy + r * 0.15}
            rx={r * 0.32}
            ry={r * 0.7}
            fill={c}
            stroke={ink}
            strokeWidth={LINE}
            transform={`rotate(18 ${hx + r * 0.5} ${hy + r * 0.15})`}
          />
        );
      case 'tegak':
        return (
          <ellipse
            cx={hx + r * 0.35}
            cy={hy - r * 1.05}
            rx={r * 0.22}
            ry={r * 0.65}
            fill={c}
            stroke={ink}
            strokeWidth={LINE}
            transform={`rotate(18 ${hx + r * 0.35} ${hy - r * 1.05})`}
          />
        );
      case 'kecil':
        return (
          <circle
            cx={hx + r * 0.55}
            cy={hy - r * 0.78}
            r={r * 0.2}
            fill={c}
            stroke={ink}
            strokeWidth={LINE}
          />
        );
      case 'samping':
        return (
          <ellipse
            cx={hx + r * 0.95}
            cy={hy - r * 0.25}
            rx={r * 0.45}
            ry={r * 0.2}
            fill={c}
            stroke={ink}
            strokeWidth={LINE}
            transform={`rotate(-20 ${hx + r * 0.95} ${hy - r * 0.25})`}
          />
        );
      default:
        return null;
    }
  };

  const horns = () => {
    switch (s.horn) {
      case 'lengkung':
        return (
          <path
            d={`M${hx - r * 0.05} ${hy - r * 0.8} C${hx + r * 0.2} ${hy - r * 1.9} ${hx + r * 1.3} ${hy - r * 1.6} ${hx + r * 1.15} ${hy - r * 0.6}`}
            stroke="#B9A57E"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'pendek':
        return (
          <g stroke="#E8DCC0" strokeWidth={3.5} strokeLinecap="round" fill="none">
            <path d={`M${hx - r * 0.3} ${hy - r * 0.8} q-2 -6 -6 -7`} />
            <path d={`M${hx + r * 0.35} ${hy - r * 0.85} q1 -6 -2 -9`} />
          </g>
        );
      case 'lebar':
        return (
          <path
            d={`M${hx - r * 1.45} ${hy - r * 1.25} Q${hx - r * 0.2} ${hy - r * 0.2} ${hx + r * 1.4} ${hy - r * 1.35}`}
            stroke="#D8CDB5"
            strokeWidth={5.5}
            fill="none"
            strokeLinecap="round"
          />
        );
      default:
        return null;
    }
  };

  const snout = () => {
    const m = s.muzzle ?? shade(headColor, 0.3);
    switch (s.snout) {
      case 'pendek':
        return (
          <g>
            <ellipse cx={hx - r * 0.72} cy={hy + r * 0.32} rx={r * 0.42} ry={r * 0.32} fill={m} />
            <path d={`M${hx - r * 1.05} ${hy + r * 0.12} l3 0 l-1.5 2.2 z`} fill="#E07A8A" />
          </g>
        );
      case 'moncong':
        return (
          <g>
            <ellipse
              cx={hx - r * 0.85}
              cy={hy + r * 0.38}
              rx={r * 0.62}
              ry={r * 0.42}
              fill={m}
              stroke={ink}
              strokeWidth={LINE}
            />
            <ellipse
              cx={hx - r * 1.35}
              cy={hy + r * 0.22}
              rx={r * 0.2}
              ry={r * 0.15}
              fill="#2B2320"
            />
          </g>
        );
      case 'panjang':
        return (
          <g>
            <ellipse
              cx={hx - r * 0.85}
              cy={hy + r * 0.45}
              rx={r * 0.8}
              ry={r * 0.48}
              fill={headColor}
              stroke={ink}
              strokeWidth={LINE}
            />
            <ellipse
              cx={hx - r * 1.38}
              cy={hy + r * 0.55}
              rx={r * 0.4}
              ry={r * 0.4}
              fill={m}
              stroke={ink}
              strokeWidth={LINE}
            />
            <circle cx={hx - r * 1.5} cy={hy + r * 0.45} r={1.3} fill="#2B2320" />
          </g>
        );
      case 'lebar':
        return (
          <g>
            <ellipse
              cx={hx - r * 0.82}
              cy={hy + r * 0.48}
              rx={r * 0.75}
              ry={r * 0.55}
              fill={m}
              stroke={ink}
              strokeWidth={LINE}
            />
            <ellipse cx={hx - r * 1.15} cy={hy + r * 0.38} rx={1.5} ry={1.1} fill="#2B2320" />
            <ellipse cx={hx - r * 0.6} cy={hy + r * 0.38} rx={1.5} ry={1.1} fill="#2B2320" />
          </g>
        );
      case 'runcing':
        return (
          <g>
            <path
              d={`M${hx - r * 0.5} ${hy - r * 0.15} L${hx - r * 1.75} ${hy + r * 0.45} L${hx - r * 0.4} ${hy + r * 0.75} Z`}
              fill={m}
              stroke={ink}
              strokeWidth={LINE}
              strokeLinejoin="round"
            />
            <circle cx={hx - r * 1.72} cy={hy + r * 0.42} r={1.8} fill="#2B2320" />
          </g>
        );
      case 'belalai':
        return (
          <path
            d={`M${hx - r * 0.55} ${hy + r * 0.1} C${hx - r * 1.3} ${hy + r * 0.6} ${hx - r * 1.1} ${hy + r * 1.6} ${hx - r * 1.45} ${hy + r * 2.2} q-2 2 -4 0`}
            stroke={s.color}
            strokeWidth={r * 0.55}
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

  return (
    <g transform={`translate(50 92) scale(${sc}) translate(-50 -92)`}>
      <defs>
        <clipPath id={clip}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
        </clipPath>
      </defs>
      {leg(legsX[1]! + 4, true)}
      {leg(legsX[3]! + 4, true)}
      {tail()}
      {s.pattern === 'wol' ? (
        <g fill={s.color} stroke="#CFC6B6" strokeWidth={1.5}>
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={cx + Math.cos(a) * rx * 0.85}
                cy={cy + Math.sin(a) * ry * 0.8}
                r={8}
              />
            );
          })}
          <ellipse cx={cx} cy={cy} rx={rx * 0.9} ry={ry * 0.85} stroke="none" />
        </g>
      ) : (
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={s.color} stroke={ink} strokeWidth={LINE} />
      )}
      <g clipPath={`url(#${clip})`}>
        {s.belly && (
          <ellipse cx={cx} cy={cy + ry * 0.75} rx={rx * 0.8} ry={ry * 0.5} fill={s.belly} />
        )}
        {s.pattern === 'belang' &&
          [0, 1, 2, 3, 4].map((i) => {
            const x = cx - rx * 0.55 + i * rx * 0.3;
            return (
              <path
                key={i}
                d={`M${x} ${cy - ry} Q${x + 5} ${cy - ry * 0.2} ${x} ${cy + ry * 0.3}`}
                stroke={s.patternColor}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        {s.pattern === 'totol' && (
          <g fill={s.patternColor}>
            <ellipse cx={cx - rx * 0.3} cy={cy - ry * 0.3} rx={7} ry={5} />
            <ellipse cx={cx + rx * 0.35} cy={cy + ry * 0.1} rx={8} ry={6} />
            <ellipse cx={cx + rx * 0.05} cy={cy + ry * 0.75} rx={5} ry={4} />
          </g>
        )}
      </g>
      {s.pattern === 'wol' || (
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={ink} strokeWidth={LINE} />
      )}
      {leg(legsX[0]!, false)}
      {leg(legsX[2]!, false)}
      <path
        d={`M${cx - rx * 0.55} ${cy - ry * 0.2} L${hx + 2} ${hy + 3}`}
        stroke={headColor === s.color ? s.color : s.color}
        strokeWidth={r * 1.2}
        strokeLinecap="round"
      />
      {s.mane === 'kuda' && (
        <path
          d={`M${hx + r * 0.45} ${hy - r * 0.55} L${cx - rx * 0.45} ${cy - ry * 0.75}`}
          stroke={s.maneColor}
          strokeWidth={6}
          strokeLinecap="round"
        />
      )}
      {s.mane === 'singa' && (
        <g fill={s.maneColor}>
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={hx + Math.cos(a) * r * 1.05}
                cy={hy + Math.sin(a) * r * 1.05}
                r={r * 0.55}
              />
            );
          })}
        </g>
      )}
      {s.ear !== 'lebar' && ears()}
      {horns()}
      <circle cx={hx} cy={hy} r={r} fill={headColor} stroke={ink} strokeWidth={LINE} />
      {snout()}
      {eye(hx - r * 0.3, hy - r * 0.22, Math.max(2, r * 0.17))}
      {s.ear === 'lebar' && (
        <ellipse
          cx={hx + r * 0.6}
          cy={hy + r * 0.1}
          rx={r * 0.75}
          ry={r * 1.0}
          fill={s.earColor}
          stroke={ink}
          strokeWidth={LINE}
        />
      )}
      {s.tusk && (
        <path
          d={`M${hx - r * 0.65} ${hy + r * 0.75} q-4 4 -9 2`}
          stroke="#FFF8E8"
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {s.beard && (
        <path
          d={`M${hx - r * 1.2} ${hy + r * 0.95} l-2 7 l5 -3 z`}
          fill={shade(s.color, -0.15)}
          stroke={ink}
          strokeWidth={1.2}
        />
      )}
      {s.whisker && (
        <g stroke="#5A4A40" strokeWidth={0.9} strokeLinecap="round">
          <path d={`M${hx - r * 0.8} ${hy + r * 0.3} l-9 -2`} />
          <path d={`M${hx - r * 0.8} ${hy + r * 0.4} l-9 2`} />
        </g>
      )}
    </g>
  );
}

function Primate({ s }: { s: PrimateSpec }) {
  const ink = shade(s.color, -0.4);
  const k = s.big ? 1.12 : 1;
  const arm = (d: string) => (
    <path d={d} stroke={s.color} strokeWidth={9 * k} fill="none" strokeLinecap="round" />
  );
  return (
    <g transform={`translate(50 92) scale(${k > 1 ? 1 : 0.95}) translate(-50 -92)`}>
      {s.tail && (
        <path
          d="M70 84 C92 86 92 62 80 62 C72 62 74 72 80 70"
          stroke={s.color}
          strokeWidth={4.5}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {s.arms === 'naik' && (
        <>
          {arm('M34 54 L18 30 L14 10')}
          {arm('M66 54 L82 30 L86 10')}
        </>
      )}
      <ellipse cx={50} cy={68} rx={22 * k} ry={22} fill={s.color} stroke={ink} strokeWidth={LINE} />
      {s.big && <ellipse cx={50} cy={66} rx={13} ry={12} fill={s.face} />}
      <ellipse cx={38} cy={88} rx={11} ry={6} fill={s.color} stroke={ink} strokeWidth={LINE} />
      <ellipse cx={62} cy={88} rx={11} ry={6} fill={s.color} stroke={ink} strokeWidth={LINE} />
      {s.arms === 'turun' && (
        <>
          {arm('M32 56 Q24 70 28 84')}
          {arm('M68 56 Q76 70 72 84')}
        </>
      )}
      {s.arms === 'dada' && (
        <>
          {arm('M30 54 Q26 68 42 64')}
          {arm('M70 54 Q74 68 58 64')}
          <circle cx={43} cy={63} r={5.5} fill={s.face} stroke={ink} strokeWidth={1.5} />
          <circle cx={57} cy={63} r={5.5} fill={s.face} stroke={ink} strokeWidth={1.5} />
        </>
      )}
      <circle cx={31} cy={34} r={6.5} fill={s.color} stroke={ink} strokeWidth={LINE} />
      <circle cx={69} cy={34} r={6.5} fill={s.color} stroke={ink} strokeWidth={LINE} />
      <circle cx={31} cy={34} r={3.2} fill={s.face} />
      <circle cx={69} cy={34} r={3.2} fill={s.face} />
      <circle cx={50} cy={34} r={18} fill={s.color} stroke={ink} strokeWidth={LINE} />
      <ellipse cx={50} cy={39} rx={13} ry={11} fill={s.face} />
      {s.big && (
        <path
          d="M37 29 Q50 23 63 29"
          stroke={ink}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {eye(44, 33, 2.4)}
      {eye(56, 33, 2.4)}
      <ellipse cx={47.5} cy={40} rx={1.2} ry={0.9} fill={ink} />
      <ellipse cx={52.5} cy={40} rx={1.2} ry={0.9} fill={ink} />
      <path
        d="M44 45 Q50 49 56 45"
        stroke={ink}
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function Bird({ s }: { s: BirdSpec }) {
  const ink = shade(s.color === '#FFFFFF' ? '#B8B2A6' : s.color, -0.35);
  const legC = s.legColor ?? '#E8A33A';
  const beakC = s.beakColor ?? '#F2B233';
  if (s.owl) {
    return (
      <g>
        <ellipse cx={50} cy={60} rx={27} ry={30} fill={s.color} stroke={ink} strokeWidth={LINE} />
        <ellipse cx={50} cy={70} rx={16} ry={18} fill={s.belly} />
        {[62, 70, 78].map((y) => (
          <path
            key={y}
            d={`M42 ${y} l3 3 l3 -3 M52 ${y} l3 3 l3 -3`}
            stroke={s.wing}
            strokeWidth={1.3}
            fill="none"
          />
        ))}
        <ellipse cx={26} cy={64} rx={7} ry={17} fill={s.wing} stroke={ink} strokeWidth={LINE} />
        <ellipse cx={74} cy={64} rx={7} ry={17} fill={s.wing} stroke={ink} strokeWidth={LINE} />
        <path
          d="M27 32 L31 16 L40 30 Z M73 32 L69 16 L60 30 Z"
          fill={s.color}
          stroke={ink}
          strokeWidth={LINE}
          strokeLinejoin="round"
        />
        <circle cx={39} cy={41} r={12} fill={s.belly} stroke={ink} strokeWidth={1.2} />
        <circle cx={61} cy={41} r={12} fill={s.belly} stroke={ink} strokeWidth={1.2} />
        <circle cx={39} cy={41} r={7.5} fill="#FFC83A" />
        <circle cx={61} cy={41} r={7.5} fill="#FFC83A" />
        <circle cx={39} cy={41} r={4} fill="#22202A" />
        <circle cx={61} cy={41} r={4} fill="#22202A" />
        <path d="M47 49 L53 49 L50 57 Z" fill="#E09A2A" />
        <path
          d="M42 89 l-3 5 M45 89 l0 5 M58 89 l0 5 M61 89 l3 5"
          stroke={legC}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      </g>
    );
  }
  if (s.chick) {
    return (
      <g>
        <path
          d="M48 80 l-2 10 l-4 2 M48 90 l2 2 M58 80 l0 10 l-4 2 M58 90 l3 2"
          stroke="#F28C1A"
          strokeWidth={2.4}
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx={54}
          cy={62}
          r={22}
          fill={s.color}
          stroke={shade(s.color, -0.3)}
          strokeWidth={LINE}
        />
        <ellipse cx={60} cy={62} rx={11} ry={7} fill={s.wing} transform="rotate(-20 60 62)" />
        <circle
          cx={36}
          cy={42}
          r={14}
          fill={s.color}
          stroke={shade(s.color, -0.3)}
          strokeWidth={LINE}
        />
        <path d="M23 41 L15 44 L23 47 Z" fill="#F28C1A" />
        {eye(31, 38, 2.4)}
      </g>
    );
  }
  const n = s.neck ?? 1;
  const hr = 11;
  const hx = 30 - (n - 1) * 4;
  const hy = 38 - (n - 1) * 14;
  const headC = s.head ?? s.color;
  const tail = () => {
    const c = s.tailColor ?? s.wing ?? s.color;
    switch (s.tail) {
      case 'kipas':
        return (
          <g>
            <circle cx={70} cy={48} r={33} fill={c} stroke={shade(c, -0.3)} strokeWidth={LINE} />
            {Array.from({ length: 9 }, (_, i) => {
              const a = Math.PI * (0.95 + i * 0.13);
              const x = 70 + Math.cos(a) * 25 * -1;
              const y = 48 + Math.sin(a) * 25;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={5} fill="#F2C230" />
                  <circle cx={x} cy={y} r={3.2} fill="#1C6FB8" />
                  <circle cx={x} cy={y} r={1.5} fill="#1E2026" />
                </g>
              );
            })}
          </g>
        );
      case 'kalkun':
        return (
          <g>
            <path
              d="M44 56 A30 30 0 0 1 98 56 Z"
              fill={c}
              stroke={shade(c, -0.3)}
              strokeWidth={LINE}
            />
            <path d="M50 56 A24 24 0 0 1 92 56" stroke="#D9B8A6" strokeWidth={3} fill="none" />
            <path d="M56 56 A18 18 0 0 1 86 56" stroke="#3E2C21" strokeWidth={3} fill="none" />
          </g>
        );
      case 'ayam':
        return (
          <g stroke={c} strokeWidth={5.5} fill="none" strokeLinecap="round">
            <path d="M74 52 C84 26 100 34 96 62" />
            <path d="M74 56 C90 36 104 48 94 70" stroke={shade(c, 0.25)} />
            <path d="M72 58 C82 46 92 58 88 74" />
          </g>
        );
      case 'panjang':
        return (
          <path
            d="M74 52 L100 60 L96 68 L74 62 Z"
            fill={c}
            stroke={ink}
            strokeWidth={LINE}
            strokeLinejoin="round"
          />
        );
      case 'pendek':
        return (
          <path
            d="M74 50 L90 46 L90 62 Z"
            fill={c}
            stroke={ink}
            strokeWidth={LINE}
            strokeLinejoin="round"
          />
        );
      default:
        return null;
    }
  };
  const beak = () => {
    const bx = hx - hr + 1;
    switch (s.beak) {
      case 'kerucut':
        return <path d={`M${bx} ${hy - 3} L${bx - 9} ${hy + 1} L${bx} ${hy + 4} Z`} fill={beakC} />;
      case 'pendek':
        return (
          <path d={`M${bx} ${hy - 2} L${bx - 7} ${hy + 1.5} L${bx} ${hy + 4} Z`} fill={beakC} />
        );
      case 'bebek':
        return (
          <ellipse
            cx={bx - 6}
            cy={hy + 2}
            rx={9}
            ry={3.6}
            fill={beakC}
            stroke={shade(beakC, -0.3)}
            strokeWidth={1.2}
          />
        );
      case 'kait':
        return (
          <path
            d={`M${bx + 1} ${hy - 5} Q${bx - 10} ${hy - 5} ${bx - 7} ${hy + 6} Q${bx - 4} ${hy + 1} ${bx + 1} ${hy + 3} Z`}
            fill={beakC}
            stroke={shade(beakC, -0.3)}
            strokeWidth={1}
          />
        );
      case 'runcing':
        return (
          <path d={`M${bx} ${hy - 2.5} L${bx - 17} ${hy + 1} L${bx} ${hy + 3.5} Z`} fill={beakC} />
        );
    }
  };
  return (
    <g>
      {tail()}
      <path
        d="M50 74 L47 90 M47 90 l-5 2 M47 90 l2 3 M60 74 L58 90 M58 90 l-5 2 M58 90 l2 3"
        stroke={legC}
        strokeWidth={2.6}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={56} cy={58} rx={24} ry={18} fill={s.color} stroke={ink} strokeWidth={LINE} />
      {s.belly && <ellipse cx={52} cy={66} rx={17} ry={9} fill={s.belly} />}
      <ellipse
        cx={62}
        cy={55}
        rx={16}
        ry={10}
        fill={s.wing ?? s.color}
        stroke={ink}
        strokeWidth={1.5}
        transform="rotate(-12 62 55)"
      />
      {n > 1 && (
        <>
          <path
            d={`M40 54 L${hx + 3} ${hy + 4}`}
            stroke={ink}
            strokeWidth={13}
            strokeLinecap="round"
          />
          <path
            d={`M40 54 L${hx + 3} ${hy + 4}`}
            stroke={s.color}
            strokeWidth={9}
            strokeLinecap="round"
          />
        </>
      )}
      {s.crest && s.beak === 'kait' && (
        <g fill={s.crest}>
          {[-40, -15, 10].map((a) => (
            <ellipse
              key={a}
              cx={hx + 4}
              cy={hy - hr - 5}
              rx={2.5}
              ry={9}
              transform={`rotate(${a + 20} ${hx + 2} ${hy - hr + 2})`}
            />
          ))}
        </g>
      )}
      {s.crest && s.beak !== 'kait' && (
        <g stroke={s.crest} strokeWidth={1.2}>
          {[-14, 0, 14].map((a) => (
            <g key={a} transform={`rotate(${a} ${hx} ${hy - hr})`}>
              <line x1={hx} y1={hy - hr} x2={hx} y2={hy - hr - 8} />
              <circle cx={hx} cy={hy - hr - 9} r={1.8} fill={s.crest} />
            </g>
          ))}
        </g>
      )}
      {s.comb && (
        <path
          d={
            s.comb === 'besar'
              ? `M${hx - 7} ${hy - 8} q0 -9 5 -6 q2 -8 6 -3 q4 -6 6 2 q2 2 -2 6 Z`
              : `M${hx - 4} ${hy - 9} q1 -5 4 -3 q3 -4 4 1 q1 2 -2 4 Z`
          }
          fill="#E5302B"
        />
      )}
      <circle cx={hx} cy={hy} r={hr} fill={headC} stroke={ink} strokeWidth={LINE} />
      {beak()}
      {s.wattle && <ellipse cx={hx - hr + 3} cy={hy + 9} rx={2.6} ry={4} fill={s.wattle} />}
      {eye(hx - 3, hy - 2, 2.3)}
    </g>
  );
}

function Reptile({ s }: { s: ReptileSpec }) {
  const ink = shade(s.color, -0.4);
  if (s.form === 'katak') {
    return (
      <g>
        <ellipse cx={22} cy={82} rx={14} ry={8} fill={s.color} stroke={ink} strokeWidth={LINE} />
        <ellipse cx={78} cy={82} rx={14} ry={8} fill={s.color} stroke={ink} strokeWidth={LINE} />
        <ellipse cx={50} cy={64} rx={31} ry={23} fill={s.color} stroke={ink} strokeWidth={LINE} />
        <ellipse cx={50} cy={72} rx={20} ry={13} fill={s.belly} />
        <path
          d="M36 84 l-4 6 M36 84 l0 7 M36 84 l4 6 M64 84 l-4 6 M64 84 l0 7 M64 84 l4 6"
          stroke={ink}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <circle cx={36} cy={42} r={10} fill={s.color} stroke={ink} strokeWidth={LINE} />
        <circle cx={64} cy={42} r={10} fill={s.color} stroke={ink} strokeWidth={LINE} />
        <circle cx={36} cy={42} r={6} fill="#fff" />
        <circle cx={64} cy={42} r={6} fill="#fff" />
        <circle cx={37} cy={43} r={3.5} fill="#22202A" />
        <circle cx={63} cy={43} r={3.5} fill="#22202A" />
        <path
          d="M34 60 Q50 70 66 60"
          stroke={ink}
          strokeWidth={2.2}
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  }
  if (s.form === 'ular') {
    const d = 'M84 88 C104 70 24 76 34 60 C44 44 86 52 76 34 C70 24 56 26 50 28';
    return (
      <g>
        <path d={d} stroke={ink} strokeWidth={15} fill="none" strokeLinecap="round" />
        <path d={d} stroke={s.color} strokeWidth={12} fill="none" strokeLinecap="round" />
        <path
          d={d}
          stroke={s.spots}
          strokeWidth={5}
          fill="none"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />
        <ellipse cx={44} cy={28} rx={11} ry={8} fill={s.color} stroke={ink} strokeWidth={LINE} />
        {eye(42, 25, 2.2)}
        {s.tongue && (
          <path
            d="M33 30 L24 31 M24 31 l-3 -3 M24 31 l-3 3"
            stroke="#E5302B"
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          />
        )}
      </g>
    );
  }
  // kadal tampak atas: cicak, tokek, komodo
  const k = s.big ? 1.15 : s.spots === '#CDBFA6' ? 0.8 : 1;
  const legs = [
    'M42 42 Q30 38 26 30',
    'M58 42 Q70 38 74 30',
    'M42 64 Q30 70 26 78',
    'M58 64 Q70 70 74 78',
  ];
  const feet: [number, number][] = [
    [26, 30],
    [74, 30],
    [26, 78],
    [74, 78],
  ];
  return (
    <g transform={`translate(50 52) scale(${k}) translate(-50 -52)`}>
      <path
        d="M50 74 C52 86 66 88 70 98"
        stroke={s.color}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      {legs.map((d) => (
        <path key={d} d={d} stroke={s.color} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      {feet.map(([x, y]) => (
        <g key={`${x}${y}`} fill={s.big ? ink : s.color}>
          <circle cx={x - 3} cy={y - 2} r={s.big ? 1.6 : 2.4} />
          <circle cx={x} cy={y - 3.5} r={s.big ? 1.6 : 2.4} />
          <circle cx={x + 3} cy={y - 2} r={s.big ? 1.6 : 2.4} />
        </g>
      ))}
      <ellipse cx={50} cy={54} rx={12} ry={22} fill={s.color} stroke={ink} strokeWidth={LINE} />
      {s.spots && (
        <g fill={s.spots}>
          {[
            [46, 44],
            [54, 50],
            [46, 58],
            [54, 64],
            [50, 70],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} />
          ))}
        </g>
      )}
      <ellipse cx={50} cy={24} rx={10} ry={12} fill={s.color} stroke={ink} strokeWidth={LINE} />
      {eye(44, 21, 2.2)}
      {eye(56, 21, 2.2)}
      {s.tongue && (
        <path
          d="M50 12 L50 4 M50 4 l-3 -3 M50 4 l3 -3"
          stroke="#E5302B"
          strokeWidth={1.8}
          fill="none"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

function Bug({ s }: { s: BugSpec }) {
  const clip = useId();
  switch (s.form) {
    case 'lebah':
      return (
        <g>
          <ellipse
            cx={52}
            cy={34}
            rx={15}
            ry={10}
            fill="#DDEEFF"
            stroke="#8FB3D9"
            strokeWidth={1.5}
            opacity={0.9}
            transform="rotate(-20 52 34)"
          />
          <ellipse
            cx={66}
            cy={34}
            rx={13}
            ry={9}
            fill="#DDEEFF"
            stroke="#8FB3D9"
            strokeWidth={1.5}
            opacity={0.9}
            transform="rotate(20 66 34)"
          />
          <defs>
            <clipPath id={clip}>
              <ellipse cx={58} cy={56} rx={26} ry={17} />
            </clipPath>
          </defs>
          <path d="M83 56 L94 56 L84 61 Z" fill="#2B2320" />
          <ellipse cx={58} cy={56} rx={26} ry={17} fill="#FFC83A" />
          <g clipPath={`url(#${clip})`} fill="#2B2320">
            <rect x={48} y={36} width={7} height={40} />
            <rect x={62} y={36} width={7} height={40} />
            <rect x={76} y={36} width={7} height={40} />
          </g>
          <ellipse
            cx={58}
            cy={56}
            rx={26}
            ry={17}
            fill="none"
            stroke="#2B2320"
            strokeWidth={LINE}
          />
          <circle cx={28} cy={54} r={12} fill="#2B2320" />
          {eye(24, 51, 3)}
          <path
            d="M26 43 Q22 32 16 30 M32 43 Q32 32 28 26"
            stroke="#2B2320"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    case 'nyamuk':
      return (
        <g stroke="#4A4048" strokeLinecap="round" fill="none">
          <path
            d="M44 54 L30 80 M52 55 L48 84 M60 55 L66 84 M44 50 L24 70 M62 52 L84 76 M68 52 L92 66"
            strokeWidth={1.6}
          />
          <ellipse
            cx={58}
            cy={36}
            rx={22}
            ry={6}
            fill="#E3EEF8"
            stroke="#9FB4C8"
            strokeWidth={1.2}
            transform="rotate(-15 58 36)"
          />
          <ellipse
            cx={58}
            cy={42}
            rx={18}
            ry={5}
            fill="#E3EEF8"
            stroke="#9FB4C8"
            strokeWidth={1.2}
            transform="rotate(10 58 42)"
          />
          <ellipse cx={62} cy={50} rx={22} ry={6} fill="#8A7A6E" strokeWidth={1.5} />
          <path d="M50 46 v8 M58 45 v10 M66 45 v10 M74 46 v8" stroke="#E8E0D6" strokeWidth={1.4} />
          <circle cx={36} cy={48} r={7} fill="#5A4E48" strokeWidth={1.5} />
          <path d="M30 51 L10 64" strokeWidth={1.8} />
          <path d="M33 42 Q28 34 22 32 M36 41 Q36 33 32 28" strokeWidth={1.2} />
          <circle cx={33} cy={47} r={2.2} fill="#C23B3B" stroke="none" />
        </g>
      );
    case 'jangkrik':
      return (
        <g>
          <path
            d="M28 52 Q50 14 96 30 M30 50 Q56 22 94 40"
            stroke="#5A3A22"
            strokeWidth={1.4}
            fill="none"
          />
          <path
            d="M66 62 L84 38 L96 76"
            stroke="#6E4A2E"
            strokeWidth={5}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M40 66 l-6 14 M50 68 l-2 14"
            stroke="#5A3A22"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <ellipse
            cx={56}
            cy={58}
            rx={27}
            ry={11}
            fill="#7A4F2E"
            stroke="#4A2E1A"
            strokeWidth={LINE}
          />
          <ellipse cx={62} cy={53} rx={22} ry={7} fill="#4E3220" />
          <circle cx={28} cy={56} r={10} fill="#6E4A2E" stroke="#4A2E1A" strokeWidth={LINE} />
          {eye(24, 53, 2.4)}
        </g>
      );
    case 'tonggeret':
      return (
        <g>
          <path
            d="M46 44 Q76 18 98 34 Q84 48 50 50 Z"
            fill="#EAF4F0"
            stroke="#7FA898"
            strokeWidth={1.3}
            opacity={0.95}
          />
          <path
            d="M46 56 Q78 74 98 62 Q84 50 50 52 Z"
            fill="#EAF4F0"
            stroke="#7FA898"
            strokeWidth={1.3}
            opacity={0.95}
          />
          <path
            d="M52 47 L94 34 M52 53 L94 62 M60 46 L82 30 M60 54 L84 68"
            stroke="#9BBFB2"
            strokeWidth={1}
          />
          <ellipse
            cx={55}
            cy={50}
            rx={18}
            ry={11}
            fill="#6F8A3E"
            stroke="#465A26"
            strokeWidth={LINE}
          />
          <ellipse
            cx={30}
            cy={50}
            rx={11}
            ry={13}
            fill="#7E9A46"
            stroke="#465A26"
            strokeWidth={LINE}
          />
          <circle cx={24} cy={39} r={5} fill="#9A3A2A" />
          <circle cx={24} cy={61} r={5} fill="#9A3A2A" />
        </g>
      );
  }
}

function Sea({ s }: { s: SeaSpec }) {
  switch (s.form) {
    case 'lumba':
      return (
        <g>
          <path
            d="M8 74 Q24 70 30 80 Q36 70 52 74"
            stroke="#8EC9F0"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M14 54 C22 30 62 22 84 44 L96 36 L92 52 L98 64 L84 56 C70 70 30 74 18 62 L6 62 Z"
            fill="#7FA6C9"
            stroke="#4E7398"
            strokeWidth={LINE}
            strokeLinejoin="round"
          />
          <path
            d="M20 60 C40 68 64 64 80 54"
            stroke="#DDEAF5"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M50 32 L58 18 L64 34 Z"
            fill="#7FA6C9"
            stroke="#4E7398"
            strokeWidth={LINE}
            strokeLinejoin="round"
          />
          {eye(24, 48, 2.4)}
          <path d="M8 60 Q12 63 16 60" stroke="#4E7398" strokeWidth={1.5} fill="none" />
        </g>
      );
    case 'paus':
      return (
        <g>
          <path
            d="M26 24 q-4 -10 -10 -12 M30 22 q0 -10 4 -14 M34 24 q4 -8 10 -9"
            stroke="#7FC4EE"
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M8 58 C8 32 52 28 70 50 L88 40 Q98 36 94 48 L86 58 L96 70 Q96 78 86 72 L70 64 C56 84 8 84 8 58 Z"
            fill="#3E73B8"
            stroke="#244E85"
            strokeWidth={LINE}
            strokeLinejoin="round"
          />
          <path
            d="M14 66 C26 78 50 76 64 66"
            fill="none"
            stroke="#C9DDF2"
            strokeWidth={7}
            strokeLinecap="round"
          />
          {eye(24, 54, 2.8)}
          <path d="M10 62 Q22 66 34 62" stroke="#244E85" strokeWidth={1.5} fill="none" />
        </g>
      );
    case 'anjingLaut':
      return (
        <g>
          <path
            d="M20 84 C14 60 30 40 46 42 C66 44 76 70 94 80 L98 86 L82 88 Z"
            fill="#8E949E"
            stroke="#5E646E"
            strokeWidth={LINE}
            strokeLinejoin="round"
          />
          <path d="M84 84 L98 76 L96 90 Z" fill="#7A808A" />
          <path
            d="M46 72 Q40 86 30 88"
            stroke="#7A808A"
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
          />
          <circle cx={34} cy={36} r={14} fill="#8E949E" stroke="#5E646E" strokeWidth={LINE} />
          <ellipse cx={24} cy={42} rx={6} ry={5} fill="#B9BEC6" />
          <ellipse cx={20} cy={39} rx={2.6} ry={2} fill="#2B2B33" />
          {eye(30, 31, 3)}
          <path d="M22 44 l-10 -1 M22 46 l-10 3" stroke="#3A3A44" strokeWidth={0.9} />
        </g>
      );
  }
}

export function AnimalArt({
  spec,
  title,
  className,
}: {
  spec: AnimalSpec;
  title?: string;
  className?: string;
}) {
  let body: React.ReactNode;
  switch (spec.kind) {
    case 'kaki4':
      body = <Quad s={spec} />;
      break;
    case 'primata':
      body = <Primate s={spec} />;
      break;
    case 'burung':
      body = <Bird s={spec} />;
      break;
    case 'reptil':
      body = <Reptile s={spec} />;
      break;
    case 'serangga':
      body = <Bug s={spec} />;
      break;
    case 'laut':
      body = <Sea s={spec} />;
      break;
  }
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {body}
    </svg>
  );
}
