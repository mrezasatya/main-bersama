/** Ikon tambahan (Fase 3+): asal makanan, alam, berkebun, benda sehari-hari. Orisinal, viewBox 100x100. */
const st = (c: string, w = 3) => ({
  stroke: c,
  strokeWidth: w,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
});

export const MORE2 = {
  susu: () => (
    <g>
      <path d="M36 8 H64 V22 L74 36 V90 H26 V36 L36 22 Z" fill="#FFFFFF" {...st('#9AA1AB')} />
      <rect x={26} y={50} width={48} height={24} fill="#8EC9F0" />
      <path d="M40 58 q10 -8 20 0" fill="none" {...st('#FFFFFF', 3)} />
    </g>
  ),
  telur: () => (
    <g>
      <ellipse cx={50} cy={56} rx={30} ry={38} fill="#FFF6E6" {...st('#D9B88A')} />
      <ellipse cx={40} cy={40} rx={7} ry={11} fill="#FFFFFF" opacity={0.7} />
    </g>
  ),
  madu: () => (
    <g>
      <rect x={30} y={10} width={40} height={12} rx={3} fill="#C98F4E" />
      <path
        d="M24 26 H76 Q84 60 70 90 H30 Q16 60 24 26 Z"
        fill="#F2A21A"
        {...st('#B07012')}
        opacity={0.95}
      />
      <rect x={34} y={48} width={32} height={20} rx={3} fill="#FFF3D6" />
      <path d="M40 58 h20" {...st('#B07012', 2)} />
    </g>
  ),
  nasi: () => (
    <g>
      <path d="M14 52 H86 Q84 86 50 88 Q16 86 14 52 Z" fill="#E5484D" {...st('#9E2A2E')} />
      <path d="M16 52 Q20 22 50 20 Q80 22 84 52 Z" fill="#FFFFFF" {...st('#D9DDE3', 2)} />
      {[
        [36, 34],
        [50, 28],
        [62, 36],
        [44, 44],
        [58, 46],
      ].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx={2.5} ry={1.5} fill="#E3E7EC" />
      ))}
    </g>
  ),
  padi: () => (
    <g>
      <path
        d="M50 96 V30 M30 96 Q34 60 26 36 M70 96 Q66 60 74 36"
        fill="none"
        {...st('#6E9A3A', 3)}
      />
      {[30, 40, 50, 60].map((y, i) => (
        <g key={y}>
          <ellipse
            cx={44 - i}
            cy={y}
            rx={5}
            ry={3}
            fill="#E3C46A"
            transform={`rotate(-30 ${44 - i} ${y})`}
          />
          <ellipse
            cx={56 + i}
            cy={y + 4}
            rx={5}
            ry={3}
            fill="#E3C46A"
            transform={`rotate(30 ${56 + i} ${y + 4})`}
          />
        </g>
      ))}
      <ellipse cx={50} cy={22} rx={4} ry={6} fill="#E3C46A" />
    </g>
  ),
  gandum: () => (
    <g>
      <path d="M50 96 V20" {...st('#C9A12A', 3)} />
      {[24, 34, 44, 54, 64].map((y) => (
        <g key={y} fill="#E8C35A">
          <ellipse cx={42} cy={y} rx={7} ry={4} transform={`rotate(-35 42 ${y})`} />
          <ellipse cx={58} cy={y} rx={7} ry={4} transform={`rotate(35 58 ${y})`} />
        </g>
      ))}
      <ellipse cx={50} cy={14} rx={4} ry={7} fill="#E8C35A" />
    </g>
  ),
  kedelai: () => (
    <g>
      <path
        d="M14 70 Q30 30 62 30 Q86 30 88 46 Q70 50 56 64 Q40 80 14 70 Z"
        fill="#9BB04A"
        {...st('#5E6E22')}
      />
      {[34, 50, 66].map((x) => (
        <circle key={x} cx={x} cy={52 - (x - 34) / 4} r={7} fill="#E8D48A" />
      ))}
    </g>
  ),
  tempe: () => (
    <g>
      <rect x={14} y={30} width={72} height={44} rx={6} fill="#F6EED6" {...st('#C9B98A')} />
      {Array.from({ length: 18 }, (_, i) => (
        <ellipse
          key={i}
          cx={22 + (i % 6) * 11}
          cy={40 + Math.floor(i / 6) * 11}
          rx={4}
          ry={3}
          fill="#D9C48A"
        />
      ))}
    </g>
  ),
  tebu: () => (
    <g>
      {[38, 56].map((x) => (
        <g key={x}>
          <rect x={x - 5} y={14} width={10} height={80} rx={4} fill="#8A5A9A" />
          {[30, 50, 70].map((y) => (
            <path key={y} d={`M${x - 5} ${y} h10`} {...st('#5A3A6A', 2)} />
          ))}
        </g>
      ))}
      <path d="M38 14 Q22 4 16 12 M56 14 Q70 2 80 10" fill="none" {...st('#34B865', 4)} />
    </g>
  ),
  gula: () => (
    <g>
      <path d="M22 30 H78 L72 90 H28 Z" fill="#FFFFFF" {...st('#9AA1AB')} />
      <rect x={34} y={46} width={32} height={18} rx={3} fill="#8EC9F0" />
      {[
        [40, 20],
        [52, 14],
        [62, 22],
      ].map(([x, y]) => (
        <rect key={x} x={x} y={y} width={7} height={7} fill="#FFFFFF" {...st('#C9CED6', 1.5)} />
      ))}
    </g>
  ),
  cokelat: () => (
    <g>
      <rect x={14} y={24} width={72} height={52} rx={6} fill="#6E3F22" {...st('#4A2A16')} />
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => (
          <rect
            key={`${c}${r}`}
            x={20 + c * 22}
            y={30 + r * 22}
            width={18}
            height={18}
            rx={2}
            fill="#8A5230"
          />
        )),
      )}
      <path d="M14 60 H86 V76 H14 Z" fill="#E5484D" />
    </g>
  ),
  kakao: () => (
    <g>
      <path d="M50 8 V20" {...st('#5A3A22', 4)} />
      <ellipse cx={50} cy={56} rx={26} ry={38} fill="#D9822B" {...st('#9C5A12')} />
      {[34, 42, 50, 58, 66].map((x) => (
        <path
          key={x}
          d={`M${x} 22 Q${x + (x - 50) * 0.2} 56 ${x} 90`}
          fill="none"
          {...st('#B06A1A', 1.5)}
        />
      ))}
    </g>
  ),
  keju: () => (
    <g>
      <path d="M10 70 L80 30 L90 50 V80 H10 Z" fill="#FFD84A" {...st('#C9A12A')} />
      <path d="M10 70 L90 50" {...st('#C9A12A', 2)} />
      {[
        [30, 72],
        [58, 64],
        [72, 74],
        [46, 78],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={4} fill="#E8B830" />
      ))}
    </g>
  ),
  kertas: () => (
    <g>
      <path d="M24 8 H64 L80 24 V92 H24 Z" fill="#FFFFFF" {...st('#9AA1AB')} />
      <path d="M64 8 V24 H80" fill="none" {...st('#9AA1AB', 2)} />
      {[38, 50, 62, 74].map((y) => (
        <path key={y} d={`M32 ${y} H72`} {...st('#C9CED6', 2.5)} />
      ))}
    </g>
  ),
  meja: () => (
    <g>
      <rect x={8} y={36} width={84} height={12} rx={3} fill="#B07A3E" {...st('#7A4B22')} />
      <path d="M18 48 V90 M82 48 V90" {...st('#7A4B22', 7)} />
    </g>
  ),
  pohon: () => (
    <g>
      <path d="M44 96 V58 Q40 50 50 44 Q60 50 56 58 V96 Z" fill="#9C6239" />
      <circle cx={50} cy={36} r={24} fill="#34B865" />
      <circle cx={30} cy={48} r={16} fill="#2F9E5B" />
      <circle cx={70} cy={48} r={16} fill="#2F9E5B" />
    </g>
  ),
  pohonKelapa: () => (
    <g>
      <path d="M48 96 C46 70 50 50 58 32" fill="none" {...st('#9C6239', 7)} />
      {[-70, -30, 10, 50, 100, 150].map((r) => (
        <path
          key={r}
          d="M58 30 Q76 18 94 28 Q76 26 58 32 Z"
          fill="#34B865"
          transform={`rotate(${r} 58 31)`}
        />
      ))}
      <circle cx={54} cy={36} r={5} fill="#7A4B12" />
      <circle cx={62} cy={37} r={5} fill="#7A4B12" />
    </g>
  ),
  awan: () => (
    <g fill="#FFFFFF" stroke="#AEB6C2" strokeWidth={2.5}>
      <path d="M22 70 Q6 70 8 56 Q10 42 26 44 Q28 24 48 24 Q66 24 70 40 Q90 38 92 54 Q94 70 76 70 Z" />
    </g>
  ),
  bulan: () => (
    <g>
      <path d="M64 8 A42 42 0 1 0 64 92 A32 32 0 1 1 64 8 Z" fill="#FFE07A" {...st('#C9A12A')} />
      <circle cx={84} cy={22} r={3} fill="#FFE07A" />
      <circle cx={90} cy={46} r={2} fill="#FFE07A" />
    </g>
  ),
  matahari: () => (
    <g>
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d="M50 4 V16" {...st('#FF9F1C', 5)} transform={`rotate(${i * 30} 50 50)`} />
      ))}
      <circle cx={50} cy={50} r={26} fill="#FFC83A" {...st('#E89B12')} />
    </g>
  ),
  wol: () => (
    <g>
      <circle cx={50} cy={52} r={34} fill="#E9A3B8" {...st('#B5607A')} />
      <path
        d="M22 38 Q50 56 78 36 M18 54 Q50 72 82 52 M28 74 Q50 82 72 72 M36 22 Q44 52 40 84 M60 20 Q54 52 62 84"
        fill="none"
        {...st('#B5607A', 2)}
      />
      <path d="M78 76 Q90 88 96 80" fill="none" {...st('#B5607A', 2.5)} />
    </g>
  ),
  baju: () => (
    <g>
      <path
        d="M32 12 L14 24 L22 44 L30 40 V90 H70 V40 L78 44 L86 24 L68 12 Q60 22 50 22 Q40 22 32 12 Z"
        fill="#3B7BF5"
        {...st('#244E85')}
      />
      <path d="M30 56 H70" {...st('#FFC83A', 4)} />
    </g>
  ),
  penyiram: () => (
    <g>
      <path d="M20 40 H64 V86 H20 Z" fill="#34B865" {...st('#23824A')} />
      <path d="M64 50 L90 30 L94 36 L68 60" fill="#34B865" {...st('#23824A')} />
      <path d="M24 40 Q42 14 60 40" fill="none" {...st('#23824A', 5)} />
      <path d="M94 40 l2 6 M98 34 l3 4 M90 44 l0 6" {...st('#7FC4EE', 2)} />
    </g>
  ),
  sekop: () => (
    <g>
      <path d="M50 8 V56" {...st('#9C6239', 6)} />
      <path d="M40 8 H60" {...st('#9C6239', 6)} />
      <path d="M34 54 H66 V70 Q66 92 50 94 Q34 92 34 70 Z" fill="#9AA1AB" {...st('#5A5560')} />
    </g>
  ),
  pot: () => (
    <g>
      <path d="M50 52 V30" {...st('#2F9E5B', 4)} />
      <ellipse cx={40} cy={34} rx={10} ry={5} fill="#34B865" transform="rotate(-30 40 34)" />
      <ellipse cx={60} cy={30} rx={10} ry={5} fill="#34B865" transform="rotate(30 60 30)" />
      <path d="M20 50 H80 L72 92 H28 Z" fill="#C4552F" {...st('#7D2F16')} />
      <rect x={16} y={46} width={68} height={10} rx={3} fill="#D86A40" {...st('#7D2F16', 2)} />
    </g>
  ),
  tetesAir: () => (
    <g>
      <path
        d="M50 8 C66 36 80 52 80 66 A30 30 0 0 1 20 66 C20 52 34 36 50 8 Z"
        fill="#7FC4EE"
        {...st('#2F8FD8')}
      />
      <ellipse cx={38} cy={64} rx={5} ry={9} fill="#FFFFFF" opacity={0.6} />
    </g>
  ),
  daun: () => (
    <g>
      <path d="M14 86 Q14 20 86 14 Q86 80 14 86 Z" fill="#34B865" {...st('#23824A')} />
      <path d="M14 86 Q50 50 80 20" fill="none" {...st('#23824A', 2)} />
    </g>
  ),
  daunLayu: () => (
    <g>
      <path d="M50 92 V40 Q50 30 60 34" fill="none" {...st('#8A8A40', 3)} />
      <path d="M60 34 Q84 38 82 70 Q66 56 60 34 Z" fill="#B5A84A" {...st('#7A6E2A', 2)} />
      <path d="M50 56 Q26 58 24 86 Q42 76 50 56 Z" fill="#B5A84A" {...st('#7A6E2A', 2)} />
      <path d="M20 96 H80" {...st('#9C6239', 6)} />
    </g>
  ),
  hadiah: () => (
    <g>
      <rect x={14} y={40} width={72} height={52} rx={4} fill="#E5484D" {...st('#9E2A2E')} />
      <rect x={10} y={30} width={80} height={14} rx={3} fill="#FF6B70" {...st('#9E2A2E')} />
      <rect x={44} y={30} width={12} height={62} fill="#FFC83A" />
      <path
        d="M50 30 Q30 8 24 22 Q22 32 50 30 Q78 32 76 22 Q70 8 50 30 Z"
        fill="#FFC83A"
        {...st('#C9952A', 2)}
      />
    </g>
  ),
  mainanRusak: () => (
    <g>
      <path d="M20 70 L44 40 L52 58 Z" fill="#3B7BF5" {...st('#244E85')} />
      <path d="M56 46 L84 26 L80 64 Z" fill="#3B7BF5" {...st('#244E85')} />
      <path d="M46 46 l4 6 l-4 4 l5 5" fill="none" {...st('#2B2B33', 2)} />
      <circle cx={30} cy={82} r={7} fill="#2B2B33" />
      <circle cx={74} cy={80} r={7} fill="#2B2B33" />
    </g>
  ),
  tempatTidur: () => (
    <g>
      <rect x={8} y={50} width={84} height={22} rx={4} fill="#3B7BF5" />
      <rect x={8} y={36} width={22} height={16} rx={5} fill="#FFFFFF" {...st('#C9CED6', 2)} />
      <path d="M30 50 H92 V58 H30 Z" fill="#8EC9F0" />
      <path d="M8 30 V88 M92 50 V88" {...st('#9C6239', 6)} />
    </g>
  ),
  sikatGigiPasta: () => (
    <g>
      <rect x={14} y={58} width={50} height={20} rx={10} fill="#E5484D" {...st('#9E2A2E', 2)} />
      <rect x={62} y={62} width={14} height={12} rx={2} fill="#FFFFFF" {...st('#9AA1AB', 2)} />
      <path d="M20 30 L80 30" {...st('#3B7BF5', 7)} />
      <path d="M66 26 v-12 M72 26 v-12 M78 26 v-12" {...st('#9FD4F5', 3)} />
    </g>
  ),
  piring: () => (
    <g>
      <ellipse cx={50} cy={56} rx={42} ry={30} fill="#FFFFFF" {...st('#9AA1AB')} />
      <ellipse cx={50} cy={56} rx={28} ry={18} fill="none" {...st('#C9CED6', 2)} />
      <path
        d="M14 14 V40 M22 14 V40 M18 40 V60 M86 14 Q94 30 86 44 V62"
        fill="none"
        {...st('#9AA1AB', 3)}
      />
    </g>
  ),
  tasSekolah: () => (
    <g>
      <path d="M36 22 Q36 8 50 8 Q64 8 64 22" fill="none" {...st('#9E2A2E', 4)} />
      <rect x={18} y={22} width={64} height={70} rx={12} fill="#E5484D" {...st('#9E2A2E')} />
      <rect x={28} y={54} width={44} height={26} rx={6} fill="#FF8DB8" {...st('#9E2A2E', 2)} />
    </g>
  ),
} as const;
