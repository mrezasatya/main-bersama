import { shade } from '../colors';
import type { VehicleSpec } from './specs';

/** Renderer kendaraan orisinal, tampak samping menghadap kanan, viewBox 100x100. */

const GLASS = '#BFE3F7';
const TIRE = '#2B2B33';

const wheel = (x: number, y: number, r = 8, hub = '#C9CED6') => (
  <g key={`w${x}-${y}`}>
    <circle cx={x} cy={y} r={r} fill={TIRE} />
    <circle cx={x} cy={y} r={r * 0.45} fill={hub} />
  </g>
);

const water = (y = 82) => (
  <path
    d={`M0 ${y} Q12 ${y - 4} 25 ${y} T50 ${y} T75 ${y} T100 ${y} V100 H0 Z`}
    fill="#8EC9F0"
    opacity={0.85}
  />
);

function Body({ s }: { s: VehicleSpec }) {
  const c = s.color;
  const a = s.accent ?? '#2B2B33';
  const ink = shade(c === '#FFFFFF' || c === '#F5F7FA' ? '#AEB6C2' : c, -0.35);
  const st = { stroke: ink, strokeWidth: 2, strokeLinejoin: 'round' as const };

  switch (s.form) {
    case 'sedan':
      return (
        <g>
          <path
            d="M8 74 V62 Q8 56 16 55 L28 54 L38 40 H66 L78 54 L88 56 Q94 58 94 66 V74 Z"
            fill={c}
            {...st}
          />
          <path d="M41 43 H52 V54 H33 Z M55 43 H65 L74 54 H55 Z" fill={GLASS} />
          {s.mark === 'polisi' && (
            <>
              <rect x={10} y={60} width={84} height={6} fill={a} />
              <rect x={46} y={34} width={12} height={6} rx={2} fill="#3B7BF5" />
              <rect x={52} y={34} width={6} height={6} rx={2} fill="#E5484D" />
            </>
          )}
          {s.mark === 'taksi' && (
            <>
              <rect
                x={46}
                y={32}
                width={14}
                height={8}
                rx={2}
                fill="#FFC83A"
                stroke={ink}
                strokeWidth={1.5}
              />
              <rect x={10} y={62} width={84} height={3} fill="#FFFFFF" opacity={0.8} />
            </>
          )}
          <circle cx={91} cy={61} r={2.5} fill="#FFE07A" />
          {wheel(28, 76)}
          {wheel(74, 76)}
        </g>
      );
    case 'van':
      return (
        <g>
          <path
            d="M6 74 V30 Q6 26 10 26 H66 Q72 26 76 32 L90 50 Q94 54 94 60 V74 Z"
            fill={c}
            {...st}
          />
          <path d="M68 32 L84 52 H68 Z" fill={GLASS} />
          <rect x={6} y={56} width={88} height={6} fill={a} />
          <rect x={30} y={34} width={14} height={14} fill={a} />
          <rect x={20} y={38} width={34} height={6} fill={a} />
          <rect x={30} y={18} width={14} height={8} rx={2} fill="#3B7BF5" />
          <rect x={37} y={18} width={7} height={8} rx={2} fill={a} />
          {wheel(24, 76)}
          {wheel(76, 76)}
        </g>
      );
    case 'angkot':
      return (
        <g>
          <path d="M6 74 V36 Q6 32 10 32 H72 Q78 32 82 38 L92 54 V74 Z" fill={c} {...st} />
          <path d="M74 38 L88 56 H74 Z" fill={GLASS} />
          {[12, 30, 48].map((x) => (
            <rect key={x} x={x} y={38} width={14} height={14} rx={2} fill={GLASS} />
          ))}
          <rect x={6} y={58} width={86} height={4} fill={a} />
          <rect x={6} y={64} width={86} height={3} fill="#FFFFFF" />
          {wheel(24, 76)}
          {wheel(74, 76)}
        </g>
      );
    case 'jip':
      return (
        <g>
          <rect x={4} y={50} width={8} height={18} rx={4} fill={TIRE} />
          <path d="M10 74 V50 H30 V34 H64 L72 50 H90 Q94 50 94 56 V74 Z" fill={c} {...st} />
          <path d="M34 38 H48 V50 H34 Z M52 38 H62 L68 50 H52 Z" fill={GLASS} />
          {wheel(28, 76, 9)}
          {wheel(76, 76, 9)}
        </g>
      );
    case 'jeepney':
      return (
        <g>
          <path d="M4 74 V40 H70 V48 H86 Q94 50 94 58 V74 Z" fill={c} {...st} />
          <rect x={4} y={32} width={66} height={8} fill={a} {...st} />
          {[8, 22, 36, 50].map((x) => (
            <rect key={x} x={x} y={44} width={11} height={10} rx={2} fill={GLASS} />
          ))}
          <path d="M4 60 H94" stroke={a} strokeWidth={4} />
          <path d="M4 66 H94" stroke="#FFC83A" strokeWidth={3} />
          <path d="M82 40 l4 -8 l4 8 z" fill="#C9CED6" stroke={ink} strokeWidth={1.2} />
          {wheel(22, 76)}
          {wheel(76, 76)}
        </g>
      );
    case 'bus':
      return (
        <g>
          <rect x={4} y={26} width={90} height={48} rx={8} fill={c} {...st} />
          {[10, 26, 42, 58].map((x) => (
            <rect key={x} x={x} y={32} width={13} height={16} rx={2} fill={GLASS} />
          ))}
          <rect x={76} y={32} width={14} height={32} rx={2} fill={GLASS} />
          <rect x={4} y={54} width={70} height={5} fill={a} />
          {s.mark === 'sekolah' && <rect x={20} y={60} width={40} height={6} fill={a} />}
          {wheel(22, 76)}
          {wheel(74, 76)}
        </g>
      );
    case 'busTingkat':
      return (
        <g>
          <rect x={6} y={10} width={86} height={64} rx={8} fill={c} {...st} />
          {[12, 28, 44, 60, 76].map((x) => (
            <g key={x}>
              <rect x={x} y={16} width={12} height={14} rx={2} fill={GLASS} />
              <rect x={x} y={40} width={12} height={14} rx={2} fill={GLASS} />
            </g>
          ))}
          <rect x={6} y={34} width={86} height={3} fill={shade(c, -0.3)} />
          {wheel(24, 76)}
          {wheel(74, 76)}
        </g>
      );
    case 'trem':
      return (
        <g>
          <path d="M40 22 L52 10 L64 22 M46 10 H58" stroke={ink} strokeWidth={2} fill="none" />
          <rect x={8} y={22} width={84} height={52} rx={10} fill={c} {...st} />
          <rect x={8} y={50} width={84} height={8} fill={a} />
          {[14, 32, 50, 68].map((x) => (
            <rect key={x} x={x} y={28} width={14} height={16} rx={3} fill={GLASS} />
          ))}
          <path d="M0 86 H100" stroke="#7A808A" strokeWidth={3} />
          {wheel(26, 78, 6)}
          {wheel(74, 78, 6)}
        </g>
      );
    case 'truk':
      return (
        <g>
          <rect
            x={4}
            y={26}
            width={60}
            height={44}
            rx={3}
            fill={s.mark === 'sampah' ? c : a}
            {...st}
          />
          {s.mark === 'sampah' && <path d="M18 36 h28 l-3 22 h-22 z" fill={a} />}
          <path d="M66 74 V40 H82 L94 54 V74 Z" fill={c} {...st} />
          <path d="M70 44 H81 L89 54 H70 Z" fill={GLASS} />
          <rect x={4} y={68} width={90} height={6} fill="#5A5560" />
          {wheel(20, 76)}
          {wheel(38, 76)}
          {wheel(80, 76)}
        </g>
      );
    case 'pemadam':
      return (
        <g>
          <rect x={4} y={36} width={64} height={38} rx={3} fill={c} {...st} />
          <path d="M70 74 V38 H84 L94 52 V74 Z" fill={c} {...st} />
          <path d="M73 42 H83 L90 52 H73 Z" fill={GLASS} />
          <g stroke={a} strokeWidth={3}>
            <path d="M6 30 L66 22 M8 34 L68 26" />
            {[14, 26, 38, 50, 62].map((x) => (
              <path key={x} d={`M${x} ${31 - (x - 6) * 0.13} l0 4`} />
            ))}
          </g>
          <rect x={76} y={32} width={10} height={6} rx={2} fill="#3B7BF5" />
          <rect x={6} y={50} width={60} height={6} fill="#FFFFFF" opacity={0.85} />
          {wheel(20, 76)}
          {wheel(40, 76)}
          {wheel(82, 76)}
        </g>
      );
    case 'molen':
      return (
        <g>
          <ellipse cx={34} cy={46} rx={28} ry={18} fill={a} {...st} transform="rotate(-12 34 46)" />
          <path d="M14 36 L50 60 M24 30 L58 52" stroke={c} strokeWidth={5} />
          <path d="M66 74 V40 H82 L94 54 V74 Z" fill={c} {...st} />
          <path d="M70 44 H81 L89 54 H70 Z" fill={GLASS} />
          <rect x={4} y={66} width={90} height={8} fill="#5A5560" />
          {wheel(20, 76)}
          {wheel(40, 76)}
          {wheel(80, 76)}
        </g>
      );
    case 'kereta':
      return (
        <g>
          <path d="M2 74 V34 Q2 30 6 30 H76 Q90 30 96 52 V74 Z" fill={c} {...st} />
          <path d="M78 34 Q88 36 92 50 H78 Z" fill={GLASS} />
          {[8, 24, 40, 56].map((x) => (
            <rect key={x} x={x} y={38} width={12} height={12} rx={2} fill={GLASS} />
          ))}
          <rect x={2} y={56} width={94} height={6} fill={a} />
          <path d="M0 86 H100" stroke="#7A808A" strokeWidth={3} />
          {[16, 34, 66, 84].map((x) => wheel(x, 78, 6))}
        </g>
      );
    case 'keretaUap':
      return (
        <g>
          <circle cx={18} cy={14} r={6} fill="#D7DCE3" />
          <circle cx={10} cy={8} r={5} fill="#E7EAEF" />
          <rect x={18} y={24} width={10} height={16} fill={c} {...st} />
          <rect x={10} y={40} width={50} height={26} rx={8} fill={c} {...st} />
          <rect x={58} y={28} width={30} height={40} rx={3} fill={a} {...st} />
          <rect x={64} y={34} width={18} height={12} rx={2} fill={GLASS} />
          <path d="M4 70 L10 60 V68 Z" fill={a} />
          <path d="M0 86 H100" stroke="#7A808A" strokeWidth={3} />
          {wheel(22, 76, 9, a)}
          {wheel(44, 76, 9, a)}
          {wheel(74, 78, 7, a)}
        </g>
      );
    case 'keretaCepat':
      return (
        <g>
          <path d="M2 72 V40 Q2 34 8 34 H58 Q84 34 98 66 Q98 72 92 72 Z" fill={c} {...st} />
          <path d="M60 38 Q78 40 88 54 H62 Z" fill={GLASS} />
          {[8, 22, 36].map((x) => (
            <rect key={x} x={x} y={42} width={10} height={9} rx={2} fill={GLASS} />
          ))}
          <path d="M2 60 H96" stroke={a} strokeWidth={4} />
          <path d="M0 84 H100" stroke="#7A808A" strokeWidth={3} />
          {[14, 32, 70].map((x) => wheel(x, 76, 5))}
        </g>
      );
    case 'motor':
      return (
        <g>
          {wheel(22, 70, 13)}
          {wheel(80, 70, 13)}
          <path d="M22 70 L44 52 H70 L80 70" stroke="#5A5560" strokeWidth={4} fill="none" />
          <path d="M36 50 Q42 38 58 40 H70 Q76 44 72 52 H40 Z" fill={c} {...st} />
          <rect x={34} y={40} width={22} height={6} rx={3} fill="#2B2B33" />
          <path
            d="M70 40 L76 28 H84"
            stroke="#2B2B33"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
          <circle cx={78} cy={36} r={3} fill="#FFE07A" />
        </g>
      );
    case 'skuter':
      return (
        <g>
          {wheel(24, 72, 10)}
          {wheel(78, 72, 10)}
          <path
            d="M14 70 Q12 50 26 48 H48 L52 62 H68 L72 30 H78"
            fill="none"
            stroke={c}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14 56 Q14 46 26 46 H44 V56 Z" fill={c} {...st} />
          <rect x={20} y={40} width={20} height={6} rx={3} fill="#5A4A40" />
          <path
            d="M72 30 L66 24 M72 30 L82 24"
            stroke="#2B2B33"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
    case 'sepeda':
      return (
        <g>
          {wheel(24, 66, 16, '#EEF1F5')}
          {wheel(78, 66, 16, '#EEF1F5')}
          <g stroke={c} strokeWidth={4} fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d="M24 66 L42 44 H70 L78 66 M42 44 L52 66 L70 44 M52 66 L24 66" />
            <path d="M70 44 L66 30 H74" />
            <path d="M42 44 L40 36" />
          </g>
          <rect x={33} y={32} width={14} height={5} rx={2.5} fill="#2B2B33" />
          <circle cx={52} cy={66} r={4} fill="#5A5560" />
        </g>
      );
    case 'becak':
      return (
        <g>
          <path d="M6 30 Q26 16 46 30 V40 H6 Z" fill={a} {...st} />
          <path d="M6 40 H46 V62 H6 Z" fill={c} {...st} />
          <rect x={10} y={46} width={32} height={8} rx={3} fill={shade(c, 0.4)} />
          {wheel(18, 74, 9)}
          <g stroke="#5A5560" strokeWidth={3.5} fill="none" strokeLinecap="round">
            <path d="M46 56 L66 46 L80 70 M66 46 L64 36" />
          </g>
          <rect x={58} y={32} width={14} height={5} rx={2.5} fill="#2B2B33" />
          {wheel(80, 70, 14, '#EEF1F5')}
        </g>
      );
    case 'bajaj':
      return (
        <g>
          <path d="M12 72 V40 Q12 24 34 22 H62 Q80 22 86 40 L90 56 V72 Z" fill={c} {...st} />
          <path d="M20 30 Q24 28 36 28 V48 H20 Z M42 28 H60 V48 H42 Z" fill={GLASS} />
          <path d="M66 28 Q78 30 82 46 H66 Z" fill={GLASS} />
          <rect x={12} y={52} width={78} height={5} fill={a} />
          <rect x={10} y={18} width={78} height={6} rx={3} fill={a} />
          {wheel(24, 74, 8)}
          {wheel(80, 74, 8)}
        </g>
      );
    case 'delman':
      return (
        <g>
          <g fill="#9B5A2E" stroke="#5A3418" strokeWidth={1.8}>
            <rect x={66} y={58} width={5} height={24} rx={2} />
            <rect x={86} y={58} width={5} height={24} rx={2} />
            <ellipse cx={78} cy={56} rx={14} ry={9} />
            <path d="M86 54 L94 36 L100 40 L94 56 Z" />
          </g>
          <path d="M92 38 L88 52" stroke="#3B2414" strokeWidth={3} />
          <path d="M44 58 L66 56" stroke="#5A3418" strokeWidth={2.5} />
          <path d="M8 30 Q28 18 48 30 V36 H8 Z" fill={a} {...st} />
          <path d="M10 36 H46 V62 H10 Z" fill={c} {...st} />
          {wheel(28, 70, 13, '#E3B877')}
        </g>
      );
    case 'gerobakSapi':
      return (
        <g>
          <g fill="#FFFFFF" stroke="#8A8A90" strokeWidth={1.8}>
            <rect x={68} y={58} width={5} height={22} rx={2} />
            <rect x={86} y={58} width={5} height={22} rx={2} />
            <ellipse cx={80} cy={54} rx={14} ry={10} />
            <circle cx={94} cy={46} r={7} />
          </g>
          <ellipse cx={76} cy={52} rx={4} ry={3} fill="#2E2B2B" />
          <path d="M44 56 L68 52" stroke="#5A3418" strokeWidth={2.5} />
          <path d="M6 34 Q26 14 48 34 Z" fill={a} {...st} />
          <rect x={6} y={34} width={42} height={24} fill={c} {...st} />
          {wheel(27, 68, 15, '#E3B877')}
        </g>
      );
    case 'ekskavator':
      return (
        <g>
          <rect x={6} y={66} width={56} height={14} rx={7} fill={a} />
          {[14, 26, 38, 50].map((x) => (
            <circle key={x} cx={x} cy={73} r={4} fill="#7A808A" />
          ))}
          <rect x={10} y={42} width={48} height={22} rx={3} fill={c} {...st} />
          <rect x={14} y={24} width={20} height={20} rx={2} fill={c} {...st} />
          <rect x={17} y={27} width={14} height={12} fill={GLASS} />
          <path
            d="M50 46 L74 20 L92 46"
            stroke={c}
            strokeWidth={7}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d="M86 46 L98 50 L94 64 L82 58 Z" fill={a} />
        </g>
      );
    case 'traktor':
      return (
        <g>
          <rect x={30} y={44} width={50} height={20} rx={3} fill={c} {...st} />
          <rect
            x={30}
            y={22}
            width={26}
            height={24}
            rx={2}
            fill="none"
            stroke={a}
            strokeWidth={3}
          />
          <rect x={58} y={36} width={4} height={10} fill={a} />
          {wheel(34, 66, 20, '#FFC83A')}
          {wheel(82, 72, 11, '#FFC83A')}
        </g>
      );
    case 'buldoser':
      return (
        <g>
          <rect x={20} y={64} width={64} height={16} rx={8} fill={a} />
          {[30, 44, 58, 72].map((x) => (
            <circle key={x} cx={x} cy={72} r={4.5} fill="#7A808A" />
          ))}
          <rect x={26} y={40} width={50} height={24} rx={3} fill={c} {...st} />
          <rect x={30} y={22} width={22} height={20} rx={2} fill={c} {...st} />
          <rect x={33} y={25} width={16} height={12} fill={GLASS} />
          <path
            d="M76 52 L88 52 M84 40 Q94 58 84 80 L96 80 Q98 58 92 40 Z"
            fill={c}
            stroke={ink}
            strokeWidth={2}
          />
        </g>
      );
    case 'sampan':
      return (
        <g>
          <path d="M66 20 L52 78" stroke="#7A4B2A" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={51} cy={80} rx={4} ry={7} fill="#7A4B2A" transform="rotate(14 51 80)" />
          <path d="M4 60 H96 Q88 78 70 80 H30 Q12 78 4 60 Z" fill={c} {...st} />
          <path d="M10 64 H90" stroke={shade(c, 0.3)} strokeWidth={2} />
          {water(80)}
        </g>
      );
    case 'perahuLayar':
      return (
        <g>
          <path d="M50 10 V62" stroke="#7A4B2A" strokeWidth={3} />
          <path
            d="M53 12 L86 58 H53 Z"
            fill={c}
            stroke="#AEB6C2"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M47 18 L22 58 H47 Z"
            fill={a}
            stroke={shade(a, -0.3)}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M8 64 H92 L80 80 H20 Z"
            fill="#3B7BF5"
            stroke="#244E85"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {water(80)}
        </g>
      );
    case 'pinisi':
      return (
        <g>
          <path d="M36 6 V60 M66 10 V60" stroke="#5A3418" strokeWidth={2.5} />
          {[
            'M38 10 L58 30 H38 Z',
            'M38 32 L60 54 H38 Z',
            'M68 14 L86 34 H68 Z',
            'M68 36 L90 56 H68 Z',
            'M34 12 L10 52 H34 Z',
          ].map((d) => (
            <path
              key={d}
              d={d}
              fill={a}
              stroke="#B8A98A"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          ))}
          <path d="M2 56 L14 60 H86 L98 52 Q90 76 74 80 H26 Q10 76 2 56 Z" fill={c} {...st} />
          <path d="M10 66 H90" stroke={shade(c, 0.35)} strokeWidth={2} />
          {water(82)}
        </g>
      );
    case 'jukung':
      return (
        <g>
          <path d="M48 12 V62" stroke="#7A4B2A" strokeWidth={2.5} />
          <path
            d="M50 14 L82 56 L50 50 Z"
            fill={a}
            stroke={shade(a, -0.3)}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
          <path
            d="M20 54 Q40 46 30 62 M70 50 Q84 44 78 62"
            stroke="#9C6239"
            strokeWidth={2.5}
            fill="none"
          />
          <path
            d="M6 62 Q4 56 14 58 H86 Q96 56 94 62 Q84 72 50 72 Q16 72 6 62 Z"
            fill={c}
            {...st}
          />
          <circle cx={14} cy={62} r={2.5} fill="#FFFFFF" />
          <rect x={4} y={72} width={92} height={4} rx={2} fill="#E3B877" />
          {water(80)}
        </g>
      );
    case 'gondola':
      return (
        <g>
          <path d="M74 20 L64 76" stroke="#7A4B2A" strokeWidth={2.5} />
          <path
            d="M2 50 Q6 64 20 66 H80 Q94 64 98 48 L94 46 Q88 58 78 58 H22 Q10 58 6 46 Z"
            fill={c}
            {...st}
          />
          <path d="M94 46 l4 -8 l2 6 z" fill={a} />
          <rect x={40} y={48} width={20} height={10} rx={3} fill="#9C2A2A" />
          {water(70)}
        </g>
      );
    case 'speedboat':
      return (
        <g>
          <path d="M8 60 H82 L96 50 L92 64 Q86 74 70 74 H16 Z" fill={c} {...st} />
          <path d="M8 66 H88" stroke={a} strokeWidth={4} />
          <path d="M44 60 L52 46 H66 L70 60" fill={GLASS} stroke={ink} strokeWidth={1.5} />
          <path d="M0 76 Q8 72 16 76" stroke="#FFFFFF" strokeWidth={3} fill="none" />
          {water(76)}
        </g>
      );
    case 'feri':
      return (
        <g>
          <rect x={58} y={14} width={10} height={16} fill={a} />
          <rect x={20} y={28} width={60} height={14} rx={2} fill={c} {...st} />
          <rect x={12} y={40} width={76} height={14} rx={2} fill={c} {...st} />
          {[24, 34, 44, 54, 64].map((x) => (
            <circle key={x} cx={x} cy={35} r={2.5} fill={GLASS} />
          ))}
          {[18, 30, 42, 54, 66, 78].map((x) => (
            <rect key={x} x={x} y={44} width={6} height={6} rx={1} fill={GLASS} />
          ))}
          <path
            d="M2 54 H98 L88 76 H12 Z"
            fill={a}
            stroke={shade(a, -0.3)}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {water(76)}
        </g>
      );
    case 'kapalSelam':
      return (
        <g>
          <rect x={0} y={0} width={100} height={100} fill="#BFE3F7" opacity={0.5} />
          <path d="M54 30 V18 H62" stroke={a} strokeWidth={3} fill="none" />
          <rect x={44} y={30} width={18} height={14} rx={4} fill={c} {...st} />
          <path
            d="M10 56 Q10 40 30 40 H76 Q92 40 92 56 Q92 72 76 72 H30 Q10 72 10 56 Z"
            fill={c}
            {...st}
          />
          {[34, 50, 66].map((x) => (
            <circle key={x} cx={x} cy={56} r={5} fill={GLASS} stroke={ink} strokeWidth={1.5} />
          ))}
          <path d="M10 56 L2 46 V66 Z" fill={a} />
          {[
            [86, 30, 3],
            [92, 22, 2],
            [82, 18, 2.5],
          ].map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r} fill="none" stroke="#FFFFFF" strokeWidth={1.5} />
          ))}
        </g>
      );
    case 'jet':
      return (
        <g>
          <path d="M44 50 L30 80 H40 L62 52 Z" fill={a} />
          <path
            d="M8 46 Q8 40 18 40 H82 Q96 42 98 48 Q96 54 82 56 H18 Q8 54 8 48 Z"
            fill={c}
            {...st}
          />
          <path d="M14 42 L6 22 H14 L28 42 Z" fill={a} />
          <path d="M44 46 L34 24 H42 L58 46 Z" fill={a} opacity={0.7} />
          {[30, 38, 46, 54, 62, 70].map((x) => (
            <circle key={x} cx={x} cy={46} r={1.8} fill={GLASS} />
          ))}
          <path d="M84 42 Q92 43 94 47 H84 Z" fill={GLASS} />
        </g>
      );
    case 'balingBaling':
      return (
        <g>
          <path d="M20 40 H72" stroke={a} strokeWidth={6} strokeLinecap="round" />
          <path
            d="M10 54 Q10 46 22 46 H78 Q88 46 88 54 Q88 62 78 62 H22 Q10 62 10 54 Z"
            fill={c}
            {...st}
          />
          <path d="M10 50 L4 34 H12 L22 48 Z" fill={a} />
          <path d="M70 48 H80 L84 54 H70 Z" fill={GLASS} />
          <rect x={88} y={51} width={4} height={6} fill="#5A5560" />
          <ellipse cx={93} cy={54} rx={2.5} ry={13} fill="#5A5560" opacity={0.7} />
          {wheel(44, 70, 4)}
          {wheel(70, 70, 4)}
        </g>
      );
    case 'helikopter':
      return (
        <g>
          <path d="M10 26 H90" stroke={a} strokeWidth={3} strokeLinecap="round" />
          <rect x={48} y={26} width={4} height={10} fill={a} />
          <path d="M6 50 H40" stroke={c} strokeWidth={6} strokeLinecap="round" />
          <path d="M4 40 V60" stroke={a} strokeWidth={3} strokeLinecap="round" />
          <path
            d="M34 56 Q34 36 58 36 Q84 36 84 56 Q84 66 70 66 H44 Q34 66 34 56 Z"
            fill={c}
            {...st}
          />
          <path d="M60 40 Q78 40 80 54 H60 Z" fill={GLASS} />
          <path
            d="M40 76 H84 M48 66 V76 M74 66 V76"
            stroke={a}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
    case 'balonUdara':
      return (
        <g>
          <path
            d="M50 6 C76 6 86 26 80 44 C76 56 62 64 58 70 H42 C38 64 24 56 20 44 C14 26 24 6 50 6 Z"
            fill={c}
            {...st}
          />
          <path
            d="M50 6 C40 20 38 50 42 70 M50 6 C60 20 62 50 58 70"
            stroke={a}
            strokeWidth={6}
            fill="none"
          />
          <path d="M42 70 L42 80 M58 70 L58 80" stroke="#7A4B2A" strokeWidth={1.5} />
          <rect
            x={40}
            y={80}
            width={20}
            height={12}
            rx={2}
            fill="#B07A3E"
            stroke="#7A4B2A"
            strokeWidth={1.5}
          />
        </g>
      );
    case 'roket':
      return (
        <g>
          <path d="M42 78 Q50 98 58 78 Z" fill="#FFC83A" />
          <path d="M45 78 Q50 90 55 78 Z" fill="#E5484D" />
          <path d="M50 4 C64 16 64 46 62 76 H38 C36 46 36 16 50 4 Z" fill={c} {...st} />
          <path d="M44 22 Q50 8 56 22 Z" fill={a} />
          <circle cx={50} cy={36} r={6} fill={GLASS} stroke={ink} strokeWidth={2} />
          <path d="M38 56 L26 78 H38 Z M62 56 L74 78 H62 Z" fill={a} />
        </g>
      );
    case 'keretaGantung':
      return (
        <g>
          <path d="M0 18 L100 6" stroke="#5A5560" strokeWidth={2} />
          <circle cx={50} cy={12} r={4} fill="#5A5560" />
          <path d="M50 12 V34" stroke="#5A5560" strokeWidth={3} />
          <rect x={26} y={34} width={48} height={42} rx={8} fill={c} {...st} />
          <rect x={31} y={40} width={17} height={18} rx={2} fill={GLASS} />
          <rect x={52} y={40} width={17} height={18} rx={2} fill={GLASS} />
          <rect x={26} y={64} width={48} height={4} fill={a} />
        </g>
      );
  }
}

export function VehicleArt({
  spec,
  title,
  className,
}: {
  spec: VehicleSpec;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <Body s={spec} />
    </svg>
  );
}
