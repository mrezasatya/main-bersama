/** Ikon tambahan (Fase 2+): buah, sayur, dan alat profesi. Orisinal, viewBox 100x100. */
const st = (c: string, w = 3) => ({
  stroke: c,
  strokeWidth: w,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
});

export const MORE = {
  apel: () => (
    <g>
      <path
        d="M50 30 C30 18 10 34 14 58 C18 84 38 92 50 84 C62 92 82 84 86 58 C90 34 70 18 50 30 Z"
        fill="#E5484D"
        {...st('#9E2A2E')}
      />
      <path d="M50 30 Q50 18 56 10" fill="none" {...st('#5A3A22', 4)} />
      <ellipse cx={64} cy={16} rx={10} ry={5} fill="#34B865" transform="rotate(-25 64 16)" />
      <ellipse cx={32} cy={44} rx={6} ry={9} fill="#fff" opacity={0.4} />
    </g>
  ),
  mangga: () => (
    <g>
      <path
        d="M30 20 C70 8 92 40 80 70 C70 92 36 94 24 72 C14 52 16 28 30 20 Z"
        fill="#F2B233"
        {...st('#B07A12')}
      />
      <path
        d="M30 20 C40 40 60 50 80 70"
        fill="none"
        stroke="#E5484D"
        strokeWidth={6}
        opacity={0.35}
      />
      <path d="M30 20 L24 10" {...st('#5A3A22', 4)} />
    </g>
  ),
  semangka: () => (
    <g>
      <path d="M8 40 A42 42 0 0 0 92 40 Z" fill="#34B865" {...st('#23824A')} />
      <path d="M14 40 A36 36 0 0 0 86 40 Z" fill="#E5484D" />
      {[30, 42, 50, 58, 70, 40, 60].map((x, i) => (
        <ellipse key={i} cx={x} cy={i > 4 ? 64 : 52} rx={2} ry={3.5} fill="#2B2B33" />
      ))}
    </g>
  ),
  anggur: () => (
    <g fill="#9A62DD" stroke="#5F3A91" strokeWidth={2}>
      <path d="M50 18 Q52 8 60 6" fill="none" stroke="#5A3A22" strokeWidth={4} />
      {[
        [38, 28],
        [52, 28],
        [66, 28],
        [44, 42],
        [58, 42],
        [72, 42],
        [36, 42],
        [50, 56],
        [64, 56],
        [44, 70],
        [58, 70],
        [52, 84],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={8} />
      ))}
    </g>
  ),
  stroberi: () => (
    <g>
      <path d="M20 30 Q50 22 80 30 Q80 70 50 94 Q20 70 20 30 Z" fill="#E5302B" {...st('#9E1F1A')} />
      <path
        d="M28 26 L38 14 L46 24 L54 12 L60 24 L72 16 L72 30 Z"
        fill="#34B865"
        {...st('#23824A', 2)}
      />
      {[
        [36, 44],
        [52, 42],
        [66, 46],
        [42, 60],
        [58, 60],
        [50, 76],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={1.8} ry={2.6} fill="#FFE07A" />
      ))}
    </g>
  ),
  nanas: () => (
    <g>
      <path
        d="M50 30 L40 4 L50 18 L56 2 L58 20 L72 8 L62 30 Z"
        fill="#34B865"
        {...st('#23824A', 2)}
      />
      <ellipse cx={50} cy={62} rx={26} ry={32} fill="#F2B233" {...st('#B07A12')} />
      <path
        d="M30 44 L70 84 M26 62 L58 92 M38 34 L74 70 M70 44 L30 84 M74 62 L42 92 M62 34 L26 70"
        stroke="#B07A12"
        strokeWidth={2}
      />
    </g>
  ),
  rambutan: () => (
    <g>
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return (
          <path
            key={i}
            d={`M${50 + Math.cos(a) * 30} ${54 + Math.sin(a) * 30} q${Math.cos(a + 0.6) * 10} ${Math.sin(a + 0.6) * 10} ${Math.cos(a) * 12} ${Math.sin(a) * 12}`}
            stroke="#34B865"
            strokeWidth={2.5}
            fill="none"
          />
        );
      })}
      <circle cx={50} cy={54} r={30} fill="#D83A34" {...st('#9E1F1A')} />
    </g>
  ),
  wortel: () => (
    <g>
      <path d="M44 22 Q30 6 34 2 Q46 8 50 20 Q54 4 64 4 Q62 14 56 22 Z" fill="#34B865" />
      <path d="M36 24 Q50 18 64 24 Q60 60 50 96 Q40 60 36 24 Z" fill="#FF8A33" {...st('#C25A12')} />
      <path d="M42 38 h8 M48 52 h8 M44 66 h6" {...st('#C25A12', 2)} />
    </g>
  ),
  tomat: () => (
    <g>
      <circle cx={50} cy={56} r={34} fill="#E5302B" {...st('#9E1F1A')} />
      <path d="M36 26 L44 30 L50 20 L56 30 L66 26 L60 36 L50 32 L40 36 Z" fill="#34B865" />
      <ellipse cx={36} cy={46} rx={6} ry={9} fill="#fff" opacity={0.35} />
    </g>
  ),
  jagung: () => (
    <g>
      <path
        d="M30 96 Q20 50 40 30 Q34 70 50 96 Z M70 96 Q80 50 60 30 Q66 70 50 96 Z"
        fill="#34B865"
      />
      <ellipse cx={50} cy={46} rx={14} ry={34} fill="#FFD84A" {...st('#C9A12A')} />
      {[24, 34, 44, 54, 64].map((y) => (
        <path key={y} d={`M38 ${y} H62`} stroke="#C9A12A" strokeWidth={1.5} />
      ))}
    </g>
  ),
  yoyo: () => (
    <g>
      <path d="M50 4 V40" {...st('#5A5560', 2)} />
      <circle cx={50} cy={62} r={30} fill="#3B7BF5" {...st('#244E85')} />
      <circle cx={50} cy={62} r={16} fill="#FFC83A" />
      <circle cx={50} cy={62} r={5} fill="#244E85" />
    </g>
  ),
  vas: () => (
    <g>
      <path
        d="M36 10 H64 V20 Q82 40 74 70 Q68 92 50 94 Q32 92 26 70 Q18 40 36 20 Z"
        fill="#2F8FD8"
        {...st('#1C5A8A')}
      />
      <path d="M26 54 H74" stroke="#FFC83A" strokeWidth={5} />
    </g>
  ),
  obor: () => (
    <g>
      <path d="M50 10 C64 24 62 38 50 46 C38 38 36 24 50 10 Z" fill="#FF9F1C" />
      <path d="M50 22 C56 30 56 38 50 42 C44 38 44 30 50 22 Z" fill="#FFE07A" />
      <path d="M40 46 H60 L54 94 H46 Z" fill="#9C6239" {...st('#6A3F22')} />
    </g>
  ),
  xilofon: () => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={10 + i * 17}
          y={20 + i * 6}
          width={13}
          height={64 - i * 12}
          rx={3}
          fill={['#E5484D', '#FF8A33', '#FFC83A', '#34B865', '#3B7BF5'][i]}
          stroke="#5A5560"
          strokeWidth={1.5}
        />
      ))}
      <path d="M70 10 L92 30 M92 30 l3 3" {...st('#7A4B2A', 3)} />
      <circle cx={94} cy={32} r={4} fill="#E5484D" />
    </g>
  ),
  stetoskop: () => (
    <g fill="none">
      <path d="M30 10 V40 Q30 62 50 62 Q70 62 70 40 V10" {...st('#5A5560', 4)} />
      <path d="M50 62 V74 Q50 88 64 88" {...st('#5A5560', 4)} />
      <circle cx={72} cy={84} r={10} fill="#C9CED6" {...st('#5A5560')} />
      <circle cx={30} cy={10} r={4} fill="#5A5560" />
      <circle cx={70} cy={10} r={4} fill="#5A5560" />
    </g>
  ),
  termometer: () => (
    <g>
      <rect x={42} y={8} width={16} height={68} rx={8} fill="#FFFFFF" {...st('#7A808A')} />
      <rect x={47} y={36} width={6} height={44} fill="#E5302B" />
      <circle cx={50} cy={82} r={12} fill="#E5302B" {...st('#9E1F1A')} />
      {[20, 30, 40, 50, 60].map((y) => (
        <path key={y} d={`M58 ${y} h6`} {...st('#7A808A', 2)} />
      ))}
    </g>
  ),
  peluit: () => (
    <g>
      <path
        d="M14 40 H54 Q76 40 82 58 Q86 80 64 84 Q44 86 42 66 V56 H14 Z"
        fill="#C9CED6"
        {...st('#5A5560')}
      />
      <circle cx={64} cy={64} r={8} fill="#5A5560" />
      <path d="M14 40 V56" {...st('#5A5560', 4)} />
      <path d="M86 30 q6 -6 12 0 M84 20 q10 -10 18 -2" fill="none" {...st('#7FC4EE', 2)} />
    </g>
  ),
  selang: () => (
    <g fill="none">
      <path d="M20 90 Q10 60 40 56 Q70 52 60 30 Q54 18 70 14" {...st('#E5484D', 9)} />
      <path d="M68 8 L86 4 L84 20 L70 22 Z" fill="#C9CED6" {...st('#5A5560', 2)} />
      <path d="M88 6 q8 2 6 12 M92 2 q12 6 6 22" {...st('#7FC4EE', 2)} />
    </g>
  ),
  cangkul: () => (
    <g>
      <path d="M30 90 L66 26" {...st('#9C6239', 6)} />
      <path d="M50 18 L88 22 L84 48 L58 36 Z" fill="#9AA1AB" {...st('#5A5560')} />
    </g>
  ),
  jala: () => (
    <g fill="none" stroke="#7A808A" strokeWidth={2}>
      <path d="M50 8 L12 88 H88 Z" fill="#EEF1F5" />
      {[30, 46, 62, 78].map((y) => (
        <path key={y} d={`M${50 - (y - 8) * 0.47} ${y} H${50 + (y - 8) * 0.47}`} />
      ))}
      {[30, 40, 50, 60, 70].map((x) => (
        <path key={x} d={`M50 8 L${x * 1.6 - 30} 88`} />
      ))}
      {[16, 32, 50, 68, 84].map((x) => (
        <circle key={x} cx={x} cy={90} r={3.5} fill="#5A5560" />
      ))}
    </g>
  ),
  wajan: () => (
    <g>
      <path d="M8 44 H76 Q74 76 42 78 Q12 76 8 44 Z" fill="#3A3A44" {...st('#22222A')} />
      <path d="M76 48 L96 40" {...st('#9C6239', 6)} />
      <path d="M30 30 q-4 -8 0 -16 M44 30 q-4 -8 0 -16" fill="none" {...st('#C9CED6', 2.5)} />
    </g>
  ),
  palu: () => (
    <g>
      <path d="M36 92 L62 40" {...st('#9C6239', 8)} />
      <path d="M40 22 L80 42 L72 58 L32 38 Z" fill="#7A808A" {...st('#4A4E56')} />
    </g>
  ),
  kunciInggris: () => (
    <g>
      <path d="M24 86 L62 48" {...st('#9AA1AB', 12)} />
      <path
        d="M58 30 A20 20 0 1 0 82 58 L70 54 L62 46 L66 34 Z"
        fill="#9AA1AB"
        {...st('#5A5560')}
      />
    </g>
  ),
  gunting: () => (
    <g>
      <path d="M50 52 L84 14 M50 52 L86 30" {...st('#9AA1AB', 6)} />
      <circle cx={30} cy={68} r={13} fill="none" {...st('#E5484D', 6)} />
      <circle cx={54} cy={82} r={13} fill="none" {...st('#E5484D', 6)} />
      <path d="M38 60 L50 52 L46 70" {...st('#E5484D', 6)} />
    </g>
  ),
  benangJarum: () => (
    <g>
      <rect x={24} y={30} width={40} height={50} rx={6} fill="#E5484D" {...st('#9E2A2E')} />
      <rect x={20} y={24} width={48} height={8} rx={3} fill="#C98F4E" />
      <rect x={20} y={78} width={48} height={8} rx={3} fill="#C98F4E" />
      <path d="M86 10 L66 76" {...st('#9AA1AB', 3)} />
      <path d="M66 76 Q50 90 30 86" fill="none" {...st('#E5484D', 1.5)} />
    </g>
  ),
  kuas: () => (
    <g>
      <ellipse cx={34} cy={60} rx={30} ry={24} fill="#F4E4C2" {...st('#C9A97A')} />
      {[
        ['#E5484D', 20, 52],
        ['#3B7BF5', 34, 46],
        ['#FFC83A', 46, 56],
        ['#34B865', 28, 68],
      ].map(([c, x, y]) => (
        <circle key={String(c)} cx={Number(x)} cy={Number(y)} r={5} fill={String(c)} />
      ))}
      <path d="M58 86 L90 20" {...st('#9C6239', 6)} />
      <path d="M86 20 L94 8 L96 22 Z" fill="#3B7BF5" />
    </g>
  ),
  mikrofon: () => (
    <g>
      <rect x={36} y={8} width={28} height={44} rx={14} fill="#5A5560" {...st('#2B2B33')} />
      <path d="M44 18 H56 M44 26 H56 M44 34 H56" {...st('#9AA1AB', 2)} />
      <path d="M28 40 Q28 66 50 66 Q72 66 72 40" fill="none" {...st('#2B2B33')} />
      <path d="M50 66 V86 M36 88 H64" {...st('#2B2B33', 4)} />
    </g>
  ),
  sikatGigi: () => (
    <g>
      <path d="M10 76 L74 34" {...st('#3B7BF5', 9)} />
      <path d="M66 28 L90 14" {...st('#3B7BF5', 9)} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${68 + i * 6} ${30 - i * 3.5} l-6 -10`} {...st('#FFFFFF', 4)} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={`b${i}`}
          d={`M${68 + i * 6} ${30 - i * 3.5} l-6 -10`}
          fill="none"
          stroke="#9FD4F5"
          strokeWidth={1}
        />
      ))}
    </g>
  ),
  amplop: () => (
    <g>
      <rect x={8} y={24} width={84} height={56} rx={4} fill="#FFFFFF" {...st('#9AA1AB')} />
      <path d="M8 24 L50 58 L92 24" fill="none" {...st('#9AA1AB')} />
      <rect x={70} y={32} width={14} height={16} fill="#E5484D" />
    </g>
  ),
  senter: () => (
    <g>
      <path d="M60 30 L92 14 V86 L60 70 Z" fill="#FFF3C9" opacity={0.8} />
      <rect x={10} y={38} width={40} height={24} rx={6} fill="#2B2B33" />
      <path d="M50 32 H62 V68 H50 Z" fill="#5A5560" />
      <rect x={22} y={44} width={12} height={4} rx={2} fill="#FFC83A" />
    </g>
  ),
  meteran: () => (
    <g>
      <rect x={10} y={30} width={48} height={48} rx={10} fill="#FFC83A" {...st('#B07A12')} />
      <circle cx={34} cy={54} r={10} fill="#2B2B33" />
      <rect x={56} y={64} width={38} height={12} fill="#FFE07A" {...st('#B07A12', 2)} />
      {[62, 70, 78, 86].map((x) => (
        <path key={x} d={`M${x} 64 v6`} {...st('#2B2B33', 1.5)} />
      ))}
    </g>
  ),
  helmProyek: () => (
    <g>
      <path d="M14 66 Q14 26 50 24 Q86 26 86 66 Z" fill="#FFC83A" {...st('#B07A12')} />
      <path d="M8 66 H92 V74 H8 Z" fill="#F2B233" {...st('#B07A12')} />
      <path d="M50 24 V66" {...st('#B07A12', 4)} />
    </g>
  ),
  kamera: () => (
    <g>
      <rect x={8} y={30} width={84} height={56} rx={8} fill="#3A3A44" {...st('#22222A')} />
      <path d="M32 30 L38 18 H62 L68 30 Z" fill="#3A3A44" />
      <circle cx={50} cy={58} r={18} fill="#8EC9F0" stroke="#C9CED6" strokeWidth={5} />
      <circle cx={78} cy={40} r={4} fill="#FFC83A" />
    </g>
  ),
  sapu: () => (
    <g>
      <path d="M72 6 L44 64" {...st('#9C6239', 5)} />
      <path d="M36 60 L58 70 L44 98 L10 88 Z" fill="#E3B877" {...st('#9C7A3E')} />
      <path d="M22 88 L36 64 M30 92 L44 68 M38 96 L50 70" {...st('#9C7A3E', 1.5)} />
    </g>
  ),
  timbangan: () => (
    <g>
      <path d="M50 14 V82 M30 86 H70" {...st('#5A5560', 4)} />
      <path d="M18 28 H82" {...st('#5A5560', 4)} />
      <path d="M18 28 L8 56 H28 Z M82 28 L72 56 H92 Z" fill="none" {...st('#5A5560', 2)} />
      <path d="M6 56 Q18 66 30 56 Z M70 56 Q82 66 94 56 Z" fill="#FFC83A" {...st('#B07A12', 2)} />
    </g>
  ),
  mikroskop: () => (
    <g>
      <path d="M20 90 H80" {...st('#3A3A44', 6)} />
      <path d="M36 84 Q30 60 48 50" fill="none" {...st('#3A3A44', 7)} />
      <rect
        x={44}
        y={14}
        width={14}
        height={40}
        rx={4}
        fill="#7A808A"
        transform="rotate(-20 51 34)"
        {...st('#3A3A44', 2)}
      />
      <rect x={36} y={64} width={34} height={6} rx={2} fill="#5A5560" />
      <circle cx={46} cy={12} r={4} fill="#3A3A44" />
    </g>
  ),
  laptop: () => (
    <g>
      <rect x={18} y={18} width={64} height={44} rx={4} fill="#3A3A44" />
      <rect x={23} y={23} width={54} height={34} fill="#8EC9F0" />
      <path d="M30 34 H52 M30 42 H64 M30 50 H46" {...st('#FFFFFF', 3)} />
      <path d="M8 66 H92 L86 78 H14 Z" fill="#9AA1AB" {...st('#5A5560', 2)} />
    </g>
  ),
  kartuKuning: () => (
    <g>
      <rect
        x={28}
        y={12}
        width={44}
        height={64}
        rx={5}
        fill="#FFD23F"
        {...st('#C9A12A')}
        transform="rotate(10 50 44)"
      />
      <path d="M40 92 L50 72 L60 92" fill="none" {...st('#E8B48A', 8)} />
    </g>
  ),
  gitar: () => (
    <g>
      <path d="M58 40 L88 10" {...st('#7A4B2A', 8)} />
      <circle cx={40} cy={62} r={22} fill="#D49A5A" {...st('#8A5A28')} />
      <circle cx={58} cy={44} r={14} fill="#D49A5A" {...st('#8A5A28')} />
      <circle cx={42} cy={60} r={7} fill="#3A2A20" />
      <path d="M30 72 L86 12" stroke="#F4E4C2" strokeWidth={1} />
    </g>
  ),
  wayang: () => (
    <g>
      <path d="M50 4 V96" {...st('#9C6239', 3)} />
      <path d="M44 14 Q50 4 58 12 L60 22 Q54 26 50 24 Z" fill="#2B2B33" />
      <path
        d="M48 24 Q40 30 42 44 L36 62 L46 66 L44 88 H58 L58 64 L66 60 L60 42 Q62 30 54 24 Z"
        fill="#B5442E"
        {...st('#6A2416', 1.5)}
      />
      <path d="M42 40 Q24 52 20 72 M60 42 Q76 54 80 74" fill="none" {...st('#2B2B33', 3)} />
      <path d="M44 50 H58 M44 56 H58" {...st('#FFC83A', 2)} />
    </g>
  ),
  canting: () => (
    <g>
      <path d="M10 88 L56 42" {...st('#C98F4E', 6)} />
      <path
        d="M54 32 Q66 26 76 34 Q80 46 66 50 Q56 50 54 40 Z"
        fill="#D4AF37"
        {...st('#9C7A1E', 2)}
      />
      <path d="M76 40 Q86 46 90 56" fill="none" {...st('#9C7A1E', 2)} />
      <circle cx={90} cy={62} r={3} fill="#3A2A20" />
    </g>
  ),
  mesinKasir: () => (
    <g>
      <rect x={14} y={44} width={72} height={40} rx={4} fill="#9AA1AB" {...st('#5A5560')} />
      <rect x={22} y={16} width={40} height={24} rx={3} fill="#3A3A44" />
      <rect x={26} y={20} width={32} height={10} fill="#34B865" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}${c}`}
            x={24 + c * 12}
            y={50 + r * 9}
            width={8}
            height={6}
            rx={1}
            fill="#FFFFFF"
          />
        )),
      )}
      <rect x={14} y={80} width={72} height={8} fill="#5A5560" />
    </g>
  ),
  kemudi: () => (
    <g fill="none">
      <circle cx={50} cy={50} r={32} {...st('#9C6239', 6)} />
      <circle cx={50} cy={50} r={8} fill="#9C6239" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          d={`M50 50 L${50 + Math.cos((a * Math.PI) / 180) * 44} ${50 + Math.sin((a * Math.PI) / 180) * 44}`}
          {...st('#9C6239', 4)}
        />
      ))}
    </g>
  ),
  selendang: () => (
    <g>
      <path d="M14 20 Q50 40 86 20 L80 50 Q50 64 20 50 Z" fill="#E5484D" {...st('#9E2A2E')} />
      <path
        d="M20 50 L12 92 L28 88 L30 54 M80 50 L88 92 L72 88 L70 54"
        fill="#E5484D"
        {...st('#9E2A2E')}
      />
      <path d="M20 36 Q50 50 80 36" fill="none" {...st('#FFC83A', 3)} />
    </g>
  ),
  rakBuku: () => (
    <g>
      <rect x={10} y={8} width={80} height={86} rx={3} fill="#9C6239" {...st('#6A3F22')} />
      {[34, 62].map((y) => (
        <rect key={y} x={10} y={y} width={80} height={5} fill="#6A3F22" />
      ))}
      {[
        ['#E5484D', 16, 14],
        ['#3B7BF5', 26, 16],
        ['#FFC83A', 36, 12],
        ['#34B865', 46, 18],
        ['#9A62DD', 18, 42],
        ['#FF8A33', 30, 44],
        ['#3B7BF5', 44, 40],
        ['#E5484D', 60, 46],
        ['#34B865', 22, 70],
        ['#FFC83A', 40, 72],
      ].map(([c, x, y], i) => (
        <rect
          key={i}
          x={Number(x)}
          y={Number(y)}
          width={9}
          height={(Number(y) < 34 ? 34 : Number(y) < 62 ? 62 : 90) - Number(y)}
          fill={String(c)}
        />
      ))}
    </g>
  ),
} as const;
