import type { ComponentType } from 'react';
import { Ikan } from './objects';

/** Ilustrasi stiker orisinal, viewBox 100x100, tanpa latar (latar dari kartu stiker). */
type StickerArt = ComponentType;

const S = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    {children}
  </svg>
);

const Matahari = () => (
  <S>
    {Array.from({ length: 12 }, (_, i) => (
      <path
        key={i}
        d="M50 6 L50 20"
        stroke="#FF9F1C"
        strokeWidth="6"
        strokeLinecap="round"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="24" fill="#FFC83A" stroke="#E89B12" strokeWidth="3" />
    <circle cx="42" cy="47" r="3" fill="#7a4b12" />
    <circle cx="58" cy="47" r="3" fill="#7a4b12" />
    <path
      d="M41 57 Q50 65 59 57"
      fill="none"
      stroke="#7a4b12"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </S>
);

const Pelangi = () => (
  <S>
    {['#E5484D', '#FF8A33', '#FFC83A', '#34B865', '#3B7BF5', '#9A62DD'].map((c, i) => (
      <path
        key={c}
        d={`M${12 + i * 5} 72 A ${38 - i * 5} ${38 - i * 5} 0 0 1 ${88 - i * 5} 72`}
        fill="none"
        stroke={c}
        strokeWidth="5.5"
      />
    ))}
    <ellipse cx="18" cy="74" rx="14" ry="8" fill="#fff" stroke="#cfd8e8" strokeWidth="2" />
    <ellipse cx="82" cy="74" rx="14" ry="8" fill="#fff" stroke="#cfd8e8" strokeWidth="2" />
  </S>
);

const KupuKupu = () => (
  <S>
    <ellipse
      cx="32"
      cy="38"
      rx="20"
      ry="16"
      fill="#9A62DD"
      stroke="#5f3a91"
      strokeWidth="3"
      transform="rotate(-20 32 38)"
    />
    <ellipse
      cx="68"
      cy="38"
      rx="20"
      ry="16"
      fill="#9A62DD"
      stroke="#5f3a91"
      strokeWidth="3"
      transform="rotate(20 68 38)"
    />
    <ellipse cx="35" cy="64" rx="13" ry="11" fill="#FF8DB8" stroke="#b34f78" strokeWidth="3" />
    <ellipse cx="65" cy="64" rx="13" ry="11" fill="#FF8DB8" stroke="#b34f78" strokeWidth="3" />
    <circle cx="30" cy="38" r="5" fill="#FFC83A" />
    <circle cx="70" cy="38" r="5" fill="#FFC83A" />
    <rect x="46" y="28" width="8" height="48" rx="4" fill="#4a3426" />
    <path
      d="M48 29 Q42 16 36 14 M52 29 Q58 16 64 14"
      fill="none"
      stroke="#4a3426"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </S>
);

const IkanSticker = () => <Ikan color="#3B7BF5" />;

const Gunung = () => (
  <S>
    <circle cx="76" cy="24" r="10" fill="#FFC83A" />
    <path
      d="M4 86 L40 26 L76 86 Z"
      fill="#5c8f6b"
      stroke="#3d6a4c"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M40 86 L66 46 L96 86 Z"
      fill="#78a886"
      stroke="#3d6a4c"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M30 42 L40 26 L50 42 L44 38 L40 44 L35 38 Z" fill="#fff" />
    <path d="M2 86 H98" stroke="#3d6a4c" strokeWidth="3" />
  </S>
);

const Layangan = () => (
  <S>
    <path
      d="M50 8 L80 40 L50 76 L20 40 Z"
      fill="#E5484D"
      stroke="#9e2a2e"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M50 8 L50 76 M20 40 H80" stroke="#FFC83A" strokeWidth="3" />
    <path d="M50 76 Q40 84 50 90 Q60 96 50 100" fill="none" stroke="#8a8a96" strokeWidth="2" />
    <path d="M44 84 l6 3 -6 3z M52 93 l6 3 -6 3z" fill="#3B7BF5" />
  </S>
);

const Kelapa = () => (
  <S>
    <path
      d="M52 92 C 50 70, 54 50, 62 34"
      fill="none"
      stroke="#9C6239"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {[-70, -30, 10, 50, 100, 150].map((r) => (
      <path
        key={r}
        d="M62 32 Q 80 20 96 30 Q 80 28 62 34 Z"
        fill="#34B865"
        stroke="#23824a"
        strokeWidth="2"
        transform={`rotate(${r} 62 33)`}
      />
    ))}
    <circle cx="58" cy="38" r="5" fill="#7a4b12" />
    <circle cx="66" cy="39" r="5" fill="#7a4b12" />
    <path d="M10 92 Q 50 80 90 92 Z" fill="#FFE2A8" />
  </S>
);

const Perahu = () => (
  <S>
    <path d="M52 14 L52 66" stroke="#7a4b12" strokeWidth="4" />
    <path
      d="M55 16 L84 60 L55 60 Z"
      fill="#fff"
      stroke="#9aa6bd"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M49 22 L24 60 L49 60 Z"
      fill="#FFC83A"
      stroke="#c9952a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M14 68 H88 L76 84 H26 Z"
      fill="#9C6239"
      stroke="#6a3f22"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M4 92 Q 16 86 28 92 T 52 92 T 76 92 T 100 92"
      fill="none"
      stroke="#3B7BF5"
      strokeWidth="4"
    />
  </S>
);

const Melati = () => {
  const flower = (cx: number, cy: number, r: number) => (
    <g>
      {[0, 72, 144, 216, 288].map((d) => (
        <ellipse
          key={d}
          cx={cx}
          cy={cy - r}
          rx={r * 0.55}
          ry={r * 0.9}
          fill="#fff"
          stroke="#c7cbd6"
          strokeWidth="2"
          transform={`rotate(${d} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.35} fill="#FFE07A" />
    </g>
  );
  return (
    <S>
      <ellipse cx="30" cy="78" rx="18" ry="8" fill="#34B865" transform="rotate(-20 30 78)" />
      <ellipse cx="72" cy="80" rx="18" ry="8" fill="#34B865" transform="rotate(20 72 80)" />
      {flower(36, 48, 15)}
      {flower(66, 40, 12)}
      {flower(58, 70, 10)}
    </S>
  );
};

const Angklung = () => (
  <S>
    <rect
      x="16"
      y="12"
      width="68"
      height="8"
      rx="4"
      fill="#C98F4E"
      stroke="#8a5a28"
      strokeWidth="2"
    />
    <rect
      x="16"
      y="76"
      width="68"
      height="10"
      rx="4"
      fill="#C98F4E"
      stroke="#8a5a28"
      strokeWidth="2"
    />
    <rect x="12" y="10" width="7" height="80" rx="3" fill="#B07A3E" />
    <rect x="81" y="10" width="7" height="80" rx="3" fill="#B07A3E" />
    <rect
      x="28"
      y="26"
      width="16"
      height="50"
      rx="6"
      fill="#E3B877"
      stroke="#8a5a28"
      strokeWidth="2.5"
    />
    <rect
      x="54"
      y="40"
      width="14"
      height="36"
      rx="6"
      fill="#E3B877"
      stroke="#8a5a28"
      strokeWidth="2.5"
    />
    <path d="M30 40 H42 M56 52 H66" stroke="#8a5a28" strokeWidth="2" />
  </S>
);

const RumahGadang = () => (
  <S>
    <path
      d="M6 30 Q 16 46 26 44 Q 38 32 50 44 Q 62 32 74 44 Q 84 46 94 30 Q 86 52 80 56 H20 Q 14 52 6 30 Z"
      fill="#5a3a26"
      stroke="#3b2416"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <rect x="20" y="56" width="60" height="22" fill="#C4552F" stroke="#7d2f16" strokeWidth="2.5" />
    <path d="M20 62 H80 M20 72 H80" stroke="#FFC83A" strokeWidth="2" />
    <rect x="44" y="60" width="12" height="18" fill="#7d2f16" />
    <path d="M24 78 V90 M40 78 V90 M60 78 V90 M76 78 V90" stroke="#5a3a26" strokeWidth="4" />
  </S>
);

const Komodo = () => (
  <S>
    <path
      d="M70 58 Q 90 60 96 76 Q 84 66 70 68 Z"
      fill="#7d8c5a"
      stroke="#4f5a37"
      strokeWidth="2.5"
    />
    <ellipse cx="50" cy="60" rx="26" ry="12" fill="#8c9b66" stroke="#4f5a37" strokeWidth="2.5" />
    <path
      d="M28 54 Q 12 50 6 58 Q 12 66 28 64 Z"
      fill="#8c9b66"
      stroke="#4f5a37"
      strokeWidth="2.5"
    />
    <circle cx="16" cy="56" r="2.2" fill="#2B2B33" />
    <path d="M6 60 l-5 2 l5 1" fill="none" stroke="#E5484D" strokeWidth="1.8" />
    <path
      d="M36 70 l-6 12 M44 71 l2 12 M60 70 l-4 12 M68 68 l6 11"
      stroke="#4f5a37"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path d="M36 54 q4 -3 8 0 q4 -3 8 0 q4 -3 8 0" fill="none" stroke="#5f6d41" strokeWidth="2" />
  </S>
);

export const STICKER_ART: Record<string, StickerArt> = {
  matahari: Matahari,
  pelangi: Pelangi,
  kupuKupu: KupuKupu,
  ikan: IkanSticker,
  gunung: Gunung,
  layangan: Layangan,
  kelapa: Kelapa,
  perahu: Perahu,
  melati: Melati,
  angklung: Angklung,
  rumahGadang: RumahGadang,
  komodo: Komodo,
};
