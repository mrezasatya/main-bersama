/** Bank konten #9 Pasangan Budaya: 50 papan kartu memori (rumah adat, makanan, alat musik, budaya). */
import type { ArtKey } from '../../src/core/art/keys';
import { seeded, writeContent } from './lib';

type C = [ArtKey, string];
const THEMES: [string, C[]][] = [
  [
    'rumah adat',
    [
      ['rumahGadang', 'rumah gadang dari Sumatera Barat'],
      ['rumahJoglo', 'rumah joglo dari Jawa'],
      ['rumahHonai', 'rumah honai dari Papua'],
      ['rumahTongkonan', 'rumah tongkonan dari Sulawesi Selatan'],
      ['rumahPanggung', 'rumah panggung'],
    ],
  ],
  [
    'makanan',
    [
      ['rendang', 'rendang'],
      ['sate', 'sate'],
      ['tumpeng', 'nasi tumpeng'],
      ['soto', 'soto'],
      ['klepon', 'klepon'],
      ['kerupuk', 'kerupuk'],
    ],
  ],
  [
    'alat musik',
    [
      ['angklung', 'angklung'],
      ['sasando', 'sasando'],
      ['kolintang', 'kolintang'],
      ['gong', 'gong'],
      ['suling', 'suling'],
      ['gendang', 'kendang'],
    ],
  ],
  [
    'budaya',
    [
      ['wayang', 'wayang'],
      ['ondelOndel', 'ondel-ondel'],
      ['batikKawung', 'batik kawung'],
      ['blangkon', 'blangkon'],
      ['canting', 'canting batik'],
      ['selendang', 'selendang'],
    ],
  ],
  [
    'hewan khas',
    [
      ['komodo', 'komodo'],
      ['owa', 'owa jawa'],
      ['merak', 'merak'],
      ['elang', 'elang'],
      ['harimau', 'harimau'],
      ['gajah', 'gajah'],
    ],
  ],
  [
    'kendaraan tradisional',
    [
      ['becak', 'becak'],
      ['bajaj', 'bajaj'],
      ['delman', 'delman'],
      ['pinisi', 'kapal pinisi'],
      ['jukung', 'jukung'],
      ['sampan', 'sampan'],
    ],
  ],
  [
    'tempat terkenal',
    [
      ['monas', 'Monas'],
      ['borobudur', 'Candi Borobudur'],
      ['menaraEiffel', 'Menara Eiffel'],
      ['piramida', 'piramida'],
      ['tembokBesar', 'Tembok Besar Tiongkok'],
    ],
  ],
];

const rng = seeded(9);
const shuffle = <T>(a: T[]) => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [x[i], x[j]] = [x[j]!, x[i]!];
  }
  return x;
};

const all = THEMES.flatMap(([, cs]) => cs);
const items: unknown[] = [];
const seen = new Set<string>();
let n = 0;
while (items.length < 50 && n < 500) {
  n++;
  // Papan bertema (35) lalu papan campuran (15).
  const themed = items.length < 35;
  const [theme, cards] = themed ? THEMES[items.length % THEMES.length]! : ['campuran', all];
  const pick = shuffle(cards).slice(0, Math.min(6, cards.length));
  const speak = `Cari pasangan ${pick[0]![1].split(' dari ')[0]} dan ${pick[1]![1].split(' dari ')[0]}!`;
  if (seen.has(speak)) continue;
  seen.add(speak);
  const i = items.length;
  items.push({
    id: `papan-${i + 1}`,
    ageGroup: i % 5 < 2 ? ['A', 'B', 'C'] : i % 5 < 4 ? ['B', 'C'] : ['C'],
    difficulty: themed ? 2 + (i % 3) : 4,
    speak,
    label: `Cari pasangan: ${theme}`,
    data: {
      cards: pick.map(([k]) => ({ t: 'art', k })),
      tileSay: pick.map(([, name]) => `${name[0]!.toUpperCase()}${name.slice(1)}.`),
    },
    tags: ['budaya', theme],
    review: 'perlu-ditinjau',
  });
}

await writeContent('pasangan-budaya', items);
