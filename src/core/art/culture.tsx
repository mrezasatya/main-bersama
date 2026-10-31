/**
 * Ikon budaya Nusantara dan landmark dunia (orisinal, disederhanakan, viewBox 100x100).
 * Semua berstatus perlu ditinjau oleh pemilik untuk kesesuaian bentuk.
 */
const st = (c: string, w = 2.5) => ({
  stroke: c,
  strokeWidth: w,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
});

export const CULTURE = {
  rumahGadang: () => (
    <g>
      <path
        d="M6 34 Q16 50 26 48 Q38 34 50 48 Q62 34 74 48 Q84 50 94 34 Q86 56 80 60 H20 Q14 56 6 34 Z"
        fill="#5A3A26"
        {...st('#3B2416')}
      />
      <rect x={20} y={60} width={60} height={22} fill="#C4552F" {...st('#7D2F16')} />
      <path d="M20 66 H80 M20 76 H80" {...st('#FFC83A', 2)} />
      <rect x={44} y={64} width={12} height={18} fill="#7D2F16" />
      <path d="M24 82 V94 M40 82 V94 M60 82 V94 M76 82 V94" {...st('#5A3A26', 4)} />
    </g>
  ),
  rumahJoglo: () => (
    <g>
      <path d="M38 14 H62 L74 34 H26 Z" fill="#7A4B2A" {...st('#4A2A16')} />
      <path d="M26 34 H74 L94 54 H6 Z" fill="#9C6239" {...st('#4A2A16')} />
      <rect x={14} y={54} width={72} height={34} fill="#E3B877" {...st('#9C7A3E')} />
      <rect x={42} y={62} width={16} height={26} fill="#7A4B2A" />
      <rect x={20} y={62} width={14} height={12} fill="#7A4B2A" />
      <rect x={66} y={62} width={14} height={12} fill="#7A4B2A" />
    </g>
  ),
  rumahHonai: () => (
    <g>
      <path d="M50 8 Q90 30 88 58 H12 Q10 30 50 8 Z" fill="#B5A06A" {...st('#7A6A3A')} />
      {[20, 30, 40].map((y) => (
        <path
          key={y}
          d={`M${24 - y / 10} ${y + 18} Q50 ${y + 8} ${76 + y / 10} ${y + 18}`}
          fill="none"
          {...st('#7A6A3A', 1.5)}
        />
      ))}
      <rect x={16} y={56} width={68} height={32} rx={4} fill="#8A5A33" {...st('#5A3A22')} />
      <rect x={42} y={64} width={16} height={24} rx={2} fill="#3B2416" />
    </g>
  ),
  rumahTongkonan: () => (
    <g>
      <path d="M4 22 Q50 46 96 22 L84 50 H16 Z" fill="#3A2A20" {...st('#22160E')} />
      <rect x={20} y={50} width={60} height={24} fill="#B5442E" {...st('#6A2416')} />
      <path
        d="M26 56 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6"
        fill="none"
        {...st('#FFC83A', 2)}
      />
      <path d="M26 74 V94 M42 74 V94 M58 74 V94 M74 74 V94" {...st('#3A2A20', 4)} />
      <path d="M50 74 V60" {...st('#FFFFFF', 1.5)} />
    </g>
  ),
  rumahPanggung: () => (
    <g>
      <path d="M10 44 L50 14 L90 44 Z" fill="#C4552F" {...st('#7D2F16')} />
      <rect x={18} y={44} width={64} height={30} fill="#E3B877" {...st('#9C7A3E')} />
      <rect x={30} y={52} width={12} height={12} fill="#7A4B2A" />
      <rect x={58} y={52} width={12} height={12} fill="#7A4B2A" />
      <path d="M22 74 V94 M40 74 V94 M60 74 V94 M78 74 V94" {...st('#7A4B2A', 4)} />
      <path d="M44 74 L36 94 M56 74 L64 94" {...st('#9C6239', 2)} />
    </g>
  ),
  rendang: () => (
    <g>
      <ellipse cx={50} cy={66} rx={42} ry={18} fill="#FFFFFF" {...st('#C9CED6')} />
      {[
        [34, 58],
        [52, 54],
        [66, 62],
        [44, 68],
        [60, 70],
      ].map(([x = 0, y = 0]) => (
        <path
          key={`${x}${y}`}
          d={`M${x - 9} ${y} Q${x} ${y - 9} ${x + 9} ${y} Q${x} ${y + 7} ${x - 9} ${y} Z`}
          fill="#6E3418"
          {...st('#4A2010', 1.5)}
        />
      ))}
      <circle cx={70} cy={50} r={3} fill="#E5302B" />
    </g>
  ),
  sate: () => (
    <g>
      {[30, 50, 70].map((y, i) => (
        <g key={y} transform={`rotate(-12 50 ${y})`}>
          <path d={`M8 ${y} H92`} {...st('#C9A97A', 2.5)} />
          {[28, 42, 56, 70].map((x) => (
            <rect
              key={x}
              x={x - 6}
              y={y - 7}
              width={12}
              height={14}
              rx={4}
              fill={i === 1 ? '#8A4A22' : '#9C5A2A'}
              {...st('#5A3018', 1.5)}
            />
          ))}
        </g>
      ))}
    </g>
  ),
  tumpeng: () => (
    <g>
      <ellipse cx={50} cy={84} rx={44} ry={10} fill="#34B865" />
      <path d="M50 12 L76 80 H24 Z" fill="#FFD84A" {...st('#C9A12A')} />
      {[
        [18, 76],
        [82, 76],
        [30, 86],
        [70, 86],
      ].map(([x = 0, y = 0]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={6} fill={x < 50 ? '#E5484D' : '#9C5A2A'} />
      ))}
      <path d="M46 12 h8" {...st('#E5484D', 4)} />
    </g>
  ),
  soto: () => (
    <g>
      <path d="M10 46 H90 Q88 86 50 88 Q12 86 10 46 Z" fill="#FFFFFF" {...st('#C9CED6')} />
      <ellipse cx={50} cy={46} rx={40} ry={9} fill="#F2C24A" />
      <path d="M30 44 h10 M54 42 h12" {...st('#34B865', 3)} />
      <circle cx={46} cy={46} r={4} fill="#FFF3D6" />
      <path d="M36 30 q-4 -8 0 -14 M56 30 q-4 -8 0 -14" fill="none" {...st('#C9CED6', 2)} />
    </g>
  ),
  klepon: () => (
    <g>
      <ellipse cx={50} cy={74} rx={42} ry={12} fill="#9BB04A" />
      {[
        [34, 62],
        [56, 60],
        [46, 46],
        [68, 50],
      ].map(([x = 0, y = 0]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r={12} fill="#34B865" {...st('#23824A', 1.5)} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={x - 5 + i * 5} cy={y - 6 + (i % 2) * 3} r={1.4} fill="#FFFFFF" />
          ))}
        </g>
      ))}
    </g>
  ),
  kerupuk: () => (
    <g>
      <path
        d="M50 10 Q74 14 84 34 Q96 56 80 76 Q62 94 40 88 Q14 80 12 54 Q12 22 50 10 Z"
        fill="#FFF3D6"
        {...st('#E3C46A')}
      />
      {[
        [36, 34],
        [60, 30],
        [48, 54],
        [70, 60],
        [30, 64],
      ].map(([x = 0, y = 0]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={5} fill="#F6E3B0" />
      ))}
    </g>
  ),
  angklung: () => (
    <g>
      <rect x={16} y={12} width={68} height={8} rx={4} fill="#C98F4E" {...st('#8A5A28', 2)} />
      <rect x={16} y={76} width={68} height={10} rx={4} fill="#C98F4E" {...st('#8A5A28', 2)} />
      <rect x={12} y={10} width={7} height={80} rx={3} fill="#B07A3E" />
      <rect x={81} y={10} width={7} height={80} rx={3} fill="#B07A3E" />
      <rect x={28} y={26} width={16} height={50} rx={6} fill="#E3B877" {...st('#8A5A28')} />
      <rect x={54} y={40} width={14} height={36} rx={6} fill="#E3B877" {...st('#8A5A28')} />
    </g>
  ),
  sasando: () => (
    <g>
      <path
        d="M50 30 Q6 30 12 64 Q20 92 50 92 Q80 92 88 64 Q94 30 50 30 Z"
        fill="#D9B26A"
        {...st('#9C7A3E')}
      />
      <rect x={42} y={6} width={16} height={86} rx={8} fill="#C98F4E" {...st('#8A5A28')} />
      {[45, 48, 51, 54].map((x) => (
        <path key={x} d={`M${x} 10 V88`} {...st('#5A3A22', 1)} />
      ))}
    </g>
  ),
  kolintang: () => (
    <g>
      <path d="M8 80 L14 40 H86 L92 80 Z" fill="#7A4B2A" {...st('#4A2A16')} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={18 + i * 11}
          y={28 + i * 2}
          width={9}
          height={42 - i * 4}
          rx={2}
          fill="#C98F4E"
          {...st('#8A5A28', 1.5)}
        />
      ))}
    </g>
  ),
  gong: () => (
    <g>
      <path d="M14 10 V92 M86 10 V92 M10 14 H90" {...st('#7A4B2A', 5)} />
      <path d="M50 14 V26" {...st('#5A5560', 2)} />
      <circle cx={50} cy={56} r={30} fill="#D4AF37" {...st('#9C7A1E')} />
      <circle cx={50} cy={56} r={9} fill="#E8C55A" {...st('#9C7A1E', 2)} />
    </g>
  ),
  suling: () => (
    <g>
      <rect
        x={8}
        y={42}
        width={84}
        height={14}
        rx={7}
        fill="#D9B26A"
        {...st('#9C7A3E')}
        transform="rotate(-20 50 49)"
      />
      {[28, 40, 52, 64, 76].map((x) => (
        <circle key={x} cx={x} cy={49 - (x - 50) * 0.36} r={2.6} fill="#5A3A22" />
      ))}
      <path d="M14 58 q-4 6 0 10" fill="none" {...st('#7FC4EE', 2)} />
    </g>
  ),
  ondelOndel: () => (
    <g>
      <path d="M30 18 Q30 4 50 4 Q70 4 70 18 L74 24 H26 Z" fill="#E5484D" {...st('#9E2A2E', 2)} />
      {[34, 42, 50, 58, 66].map((x) => (
        <circle key={x} cx={x} cy={14} r={3} fill="#FFC83A" />
      ))}
      <circle cx={50} cy={36} r={14} fill="#E5484D" {...st('#9E2A2E', 2)} />
      <circle cx={45} cy={34} r={2.5} fill="#FFFFFF" />
      <circle cx={55} cy={34} r={2.5} fill="#FFFFFF" />
      <path d="M44 42 Q50 46 56 42" fill="none" {...st('#FFFFFF', 2)} />
      <path d="M30 50 H70 L80 96 H20 Z" fill="#34B865" {...st('#23824A')} />
      <path d="M26 70 H74" {...st('#FFC83A', 4)} />
    </g>
  ),
  batikKawung: () => (
    <g>
      <rect x={6} y={6} width={88} height={88} rx={8} fill="#F4E4C2" {...st('#9C6239')} />
      {[28, 72].map((cx) =>
        [28, 72].map((cy) => (
          <g key={`${cx}${cy}`} fill="#7A4B2A">
            <ellipse cx={cx} cy={cy - 11} rx={7} ry={11} />
            <ellipse cx={cx} cy={cy + 11} rx={7} ry={11} />
            <ellipse cx={cx - 11} cy={cy} rx={11} ry={7} />
            <ellipse cx={cx + 11} cy={cy} rx={11} ry={7} />
            <circle cx={cx} cy={cy} r={3} fill="#F4E4C2" />
          </g>
        )),
      )}
    </g>
  ),
  blangkon: () => (
    <g>
      <path d="M14 66 Q12 26 50 22 Q88 26 86 66 Q50 74 14 66 Z" fill="#7A4B2A" {...st('#4A2A16')} />
      <path d="M20 56 Q50 44 80 56 M24 40 Q50 30 76 40" fill="none" {...st('#E3B877', 2)} />
      <ellipse cx={80} cy={70} rx={10} ry={8} fill="#7A4B2A" {...st('#4A2A16')} />
    </g>
  ),
  monas: () => (
    <g>
      <path d="M44 22 Q50 6 56 22 Z" fill="#FFC83A" {...st('#C9952A', 2)} />
      <rect x={44} y={22} width={12} height={6} fill="#D9DDE3" />
      <path d="M45 28 L42 72 H58 L55 28 Z" fill="#F5F7FA" {...st('#9AA1AB')} />
      <path d="M20 72 H80 L72 84 H28 Z" fill="#E3E7EC" {...st('#9AA1AB')} />
      <rect x={10} y={84} width={80} height={8} fill="#C9CED6" />
    </g>
  ),
  borobudur: () => (
    <g>
      <path d="M8 90 H92 L86 76 H14 Z" fill="#8E8A80" {...st('#5E5A52')} />
      <path d="M16 76 H84 L78 62 H22 Z" fill="#9E9A90" {...st('#5E5A52')} />
      <path d="M24 62 H76 L70 50 H30 Z" fill="#AEAAA0" {...st('#5E5A52')} />
      <path d="M32 50 H68 L62 40 H38 Z" fill="#BEBAB0" {...st('#5E5A52')} />
      <path d="M40 40 Q50 18 60 40 Z" fill="#BEBAB0" {...st('#5E5A52')} />
      <path d="M50 22 V12" {...st('#5E5A52', 3)} />
      {[22, 34, 46, 58, 70].map((x) => (
        <circle key={x} cx={x + 4} cy={70} r={2.5} fill="#5E5A52" />
      ))}
    </g>
  ),
  menaraEiffel: () => (
    <g fill="none" {...st('#8A6A4A', 3)}>
      <path d="M50 6 V18 M44 18 H56 L62 46 H38 L44 18 Z M38 46 H62 L74 92 M38 46 L26 92 M30 72 H70" />
      <path d="M36 92 Q50 70 64 92" />
      <path d="M44 30 H56" />
    </g>
  ),
  piramida: () => (
    <g>
      <rect x={0} y={0} width={100} height={100} rx={10} fill="#FFE7B8" />
      <circle cx={80} cy={20} r={9} fill="#FFC83A" />
      <path d="M8 88 L40 30 L72 88 Z" fill="#E3B877" {...st('#9C7A3E')} />
      <path d="M40 30 L72 88 L58 88 Z" fill="#C98F4E" />
      <path d="M56 88 L76 52 L96 88 Z" fill="#E3B877" {...st('#9C7A3E')} />
    </g>
  ),
  tembokBesar: () => (
    <g>
      <rect x={0} y={0} width={100} height={100} rx={10} fill="#BFE3F7" />
      <path d="M0 70 Q30 50 50 58 Q72 66 100 40 V100 H0 Z" fill="#7FB86A" />
      <path d="M0 64 Q30 44 50 52 Q72 60 100 34" fill="none" {...st('#9E9A90', 9)} />
      <rect x={42} y={34} width={14} height={18} fill="#9E9A90" {...st('#5E5A52', 2)} />
    </g>
  ),
  parang: () => (
    <g>
      <rect x={6} y={6} width={88} height={88} rx={8} fill="#F4E4C2" {...st('#9C6239')} />
      {[-40, -10, 20, 50].map((o) => (
        <g key={o}>
          <path d={`M${o} 100 L${o + 60} 6`} {...st('#7A4B2A', 9)} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={o + 12 + i * 15} cy={82 - i * 23} r={4} fill="#E3B877" />
          ))}
        </g>
      ))}
    </g>
  ),
  truntum: () => (
    <g>
      <rect x={6} y={6} width={88} height={88} rx={8} fill="#22314F" {...st('#111A2E')} />
      {[
        [28, 28],
        [72, 28],
        [50, 50],
        [28, 72],
        [72, 72],
      ].map(([x = 0, y = 0]) => (
        <g key={`${x}${y}`} fill="#F4E4C2">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle
              key={a}
              cx={x + Math.cos((a * Math.PI) / 180) * 8}
              cy={y + Math.sin((a * Math.PI) / 180) * 8}
              r={3.5}
            />
          ))}
          <circle cx={x} cy={y} r={3} />
        </g>
      ))}
    </g>
  ),
  megaMendung: () => (
    <g>
      <rect x={6} y={6} width={88} height={88} rx={8} fill="#E8F2FA" {...st('#1F4E9C')} />
      {['#1F4E9C', '#3B7BF5', '#8EC9F0', '#E8F2FA'].map((c, i) => (
        <path
          key={c}
          d={`M${18 + i * 5} ${66 - i * 4} Q${18 + i * 5} ${44 + i * 3} ${36 + i * 2} ${46 + i * 2} Q${40 + i} ${28 + i * 4} ${56} ${34 + i * 4} Q${76 - i * 3} ${30 + i * 4} ${78 - i * 5} ${50 + i * 2} Q${86 - i * 5} ${66 - i * 4} ${70 - i * 3} ${68 - i * 4} Z`}
          fill={c}
        />
      ))}
    </g>
  ),
  ceplok: () => (
    <g>
      <rect x={6} y={6} width={88} height={88} rx={8} fill="#F4E4C2" {...st('#9C6239')} />
      {[30, 70].map((cx) =>
        [30, 70].map((cy) => (
          <g key={`${cx}${cy}`}>
            <path
              d={`M${cx} ${cy - 16} L${cx + 6} ${cy - 6} L${cx + 16} ${cy} L${cx + 6} ${cy + 6} L${cx} ${cy + 16} L${cx - 6} ${cy + 6} L${cx - 16} ${cy} L${cx - 6} ${cy - 6} Z`}
              fill="#B5442E"
            />
            <circle cx={cx} cy={cy} r={4} fill="#F4E4C2" />
          </g>
        )),
      )}
    </g>
  ),
} as const;
