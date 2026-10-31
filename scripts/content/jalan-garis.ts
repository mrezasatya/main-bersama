/** Bank konten #13 Jalan Garis: 45 jalur (lurus, lengkung, gelombang, zigzag, lingkaran, spiral, huruf, angka). */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

type Path = { d: string; s: [number, number]; e: [number, number] };
const r = (n: number) => Math.round(n * 10) / 10;
const zigzag = (teeth: number, amp = 22, y = 50): Path => {
  const pts = Array.from(
    { length: teeth * 2 + 1 },
    (_, i) => [r(12 + (76 * i) / (teeth * 2)), i % 2 ? y - amp : y + amp] as const,
  );
  return {
    d: `M${pts.map(([x, yy]) => `${x} ${yy}`).join(' L')}`,
    s: [pts[0]![0], pts[0]![1]],
    e: [pts.at(-1)![0], pts.at(-1)![1]],
  };
};
const wave = (waves: number, amp = 20, y = 50): Path => {
  const step = 76 / (waves * 2);
  let d = `M12 ${y}`;
  for (let i = 0; i < waves * 2; i++)
    d += ` Q${r(12 + step * i + step / 2)} ${i % 2 ? y + amp * 2 : y - amp * 2} ${r(12 + step * (i + 1))} ${y}`;
  return { d, s: [12, y], e: [88, y] };
};
const spiral = (turns: number): Path => {
  const pts: string[] = [];
  const n = turns * 24;
  for (let i = 0; i <= n; i++) {
    const a = (i / 24) * Math.PI * 2;
    const rr = 4 + (34 * i) / n;
    pts.push(`${r(50 + rr * Math.cos(a))} ${r(50 + rr * Math.sin(a))}`);
  }
  const last = pts.at(-1)!.split(' ').map(Number);
  return { d: `M${pts.join(' L')}`, s: [54, 50], e: [last[0]!, last[1]!] };
};
const PATHS: [string, Path, string[], number][] = [
  ['lurus mendatar', { d: 'M12 50 H88', s: [12, 50], e: [88, 50] }, ['A', 'B', 'C'], 1],
  ['lurus ke bawah', { d: 'M50 12 V88', s: [50, 12], e: [50, 88] }, ['A', 'B', 'C'], 1],
  ['miring', { d: 'M14 84 L86 16', s: [14, 84], e: [86, 16] }, ['A', 'B', 'C'], 1],
  ['miring turun', { d: 'M14 16 L86 84', s: [14, 16], e: [86, 84] }, ['A', 'B', 'C'], 1],
  ['lengkung bukit', { d: 'M12 72 Q50 4 88 72', s: [12, 72], e: [88, 72] }, ['A', 'B', 'C'], 1],
  ['lengkung lembah', { d: 'M12 28 Q50 96 88 28', s: [12, 28], e: [88, 28] }, ['A', 'B', 'C'], 1],
  ['gelombang', wave(1), ['A', 'B', 'C'], 2],
  ['gelombang dua', wave(2, 14), ['A', 'B', 'C'], 2],
  ['zigzag besar', zigzag(1, 26), ['A', 'B', 'C'], 2],
  ['zigzag', zigzag(2), ['A', 'B', 'C'], 2],
  ['tangga', { d: 'M12 84 H32 V64 H52 V44 H72 V24 H88', s: [12, 84], e: [88, 24] }, ['B', 'C'], 3],
  ['zigzag rapat', zigzag(3, 18), ['B', 'C'], 3],
  ['gelombang tiga', wave(3, 10), ['B', 'C'], 3],
  ['lingkaran', { d: 'M50 14 A36 36 0 1 1 49.9 14', s: [50, 14], e: [49.9, 14] }, ['B', 'C'], 3],
  ['busur besar', { d: 'M14 80 A40 40 0 0 1 86 80', s: [14, 80], e: [86, 80] }, ['B', 'C'], 2],
  [
    'huruf U',
    { d: 'M24 16 V60 Q24 86 50 86 Q76 86 76 60 V16', s: [24, 16], e: [76, 16] },
    ['B', 'C'],
    3,
  ],
  ['huruf L', { d: 'M28 14 V84 H76', s: [28, 14], e: [76, 84] }, ['B', 'C'], 2],
  ['huruf V', { d: 'M18 16 L50 84 L82 16', s: [18, 16], e: [82, 16] }, ['B', 'C'], 2],
  ['huruf W', { d: 'M12 18 L30 82 L50 34 L70 82 L88 18', s: [12, 18], e: [88, 18] }, ['C'], 3],
  ['huruf M', { d: 'M14 84 V18 L50 60 L86 18 V84', s: [14, 84], e: [86, 84] }, ['C'], 3],
  ['huruf N', { d: 'M22 84 V18 L78 84 V18', s: [22, 84], e: [78, 18] }, ['C'], 3],
  ['huruf Z', { d: 'M18 18 H82 L18 82 H82', s: [18, 18], e: [82, 82] }, ['C'], 3],
  [
    'huruf S',
    { d: 'M76 22 Q50 6 30 22 Q14 40 50 50 Q86 60 70 78 Q50 94 24 78', s: [76, 22], e: [24, 78] },
    ['C'],
    4,
  ],
  [
    'huruf C',
    { d: 'M78 26 Q50 4 26 26 Q8 50 26 74 Q50 96 78 74', s: [78, 26], e: [78, 74] },
    ['C'],
    3,
  ],
  [
    'huruf O',
    {
      d: 'M50 12 Q86 12 86 50 Q86 88 50 88 Q14 88 14 50 Q14 12 49.9 12',
      s: [50, 12],
      e: [49.9, 12],
    },
    ['C'],
    3,
  ],
  ['angka 1', { d: 'M34 30 L54 14 V86', s: [34, 30], e: [54, 86] }, ['B', 'C'], 2],
  [
    'angka 2',
    { d: 'M24 32 Q30 10 52 12 Q78 16 72 40 Q66 58 24 86 H78', s: [24, 32], e: [78, 86] },
    ['C'],
    4,
  ],
  [
    'angka 3',
    { d: 'M24 22 Q50 2 70 22 Q80 44 46 48 Q82 52 72 76 Q50 98 24 78', s: [24, 22], e: [24, 78] },
    ['C'],
    4,
  ],
  ['angka 4', { d: 'M62 86 V14 L20 64 H82', s: [62, 86], e: [82, 64] }, ['C'], 4],
  ['angka 7', { d: 'M22 16 H78 L42 86', s: [22, 16], e: [42, 86] }, ['C'], 3],
  ['spiral', spiral(2), ['C'], 5],
  ['spiral kecil', spiral(1), ['B', 'C'], 4],
  ['kotak', { d: 'M18 18 H82 V82 H18 V18.1', s: [18, 18], e: [18, 18.1] }, ['B', 'C'], 3],
  ['segitiga', { d: 'M50 12 L88 84 H12 L49.9 12.1', s: [50, 12], e: [49.9, 12.1] }, ['B', 'C'], 3],
  [
    'loncat katak',
    { d: 'M10 80 Q22 30 34 80 Q46 30 58 80 Q70 30 82 80', s: [10, 80], e: [82, 80] },
    ['B', 'C'],
    3,
  ],
  ['ombak kecil', wave(4, 8), ['C'], 4],
  ['zigzag kecil', zigzag(4, 14), ['C'], 4],
  [
    'jalan berkelok',
    { d: 'M12 20 Q88 20 50 50 Q12 80 88 80', s: [12, 20], e: [88, 80] },
    ['B', 'C'],
    3,
  ],
  [
    'bukit kembar',
    { d: 'M10 74 Q30 20 50 74 Q70 20 90 74', s: [10, 74], e: [90, 74] },
    ['A', 'B', 'C'],
    2,
  ],
  [
    'naik turun',
    { d: 'M10 80 L30 30 L50 80 L70 30 L90 80', s: [10, 80], e: [90, 80] },
    ['B', 'C'],
    2,
  ],
  [
    'angka 0',
    {
      d: 'M50 10 Q78 10 78 50 Q78 90 50 90 Q22 90 22 50 Q22 10 49.9 10',
      s: [50, 10],
      e: [49.9, 10],
    },
    ['C'],
    3,
  ],
  [
    'hati',
    {
      d: 'M50 84 Q12 58 16 34 Q22 12 50 30 Q78 12 84 34 Q88 58 50.1 84',
      s: [50, 84],
      e: [50.1, 84],
    },
    ['C'],
    4,
  ],
  [
    'bintang',
    {
      d: 'M50 10 L61 40 L92 40 L67 58 L77 88 L50 70 L23 88 L33 58 L8 40 L39 40 L49.9 10',
      s: [50, 10],
      e: [49.9, 10],
    },
    ['C'],
    5,
  ],
  ['huruf A', { d: 'M18 86 L50 14 L82 86 M32 58 H68', s: [18, 86], e: [68, 58] }, ['C'], 4],
  ['jembatan', { d: 'M10 70 H26 Q50 20 74 70 H90', s: [10, 70], e: [90, 70] }, ['A', 'B', 'C'], 2],
];
/** [pemeran, tujuan, kalimat] */
const STORIES: [ArtKey, ArtKey, string, string][] = [
  ['lebah', 'bunga', 'lebah', 'bunga'],
  ['kucing', 'ikan', 'kucing', 'ikan'],
  ['monyet', 'pisang', 'monyet', 'pisang'],
  ['ayamBetina', 'jagung', 'ayam', 'jagung'],
  ['mobil', 'rumahJoglo', 'mobil', 'rumah'],
  ['bebek', 'tetesAir', 'bebek', 'kolam'],
  ['anjing', 'bola', 'anjing', 'bola'],
  ['kupuKupu' as ArtKey, 'bunga', 'kupu-kupu', 'bunga'],
  ['sapi', 'padi', 'sapi', 'rumput'],
  ['pesawat', 'awan', 'pesawat', 'awan'],
  ['perahuLayar', 'pohonKelapa', 'perahu', 'pulau'],
  ['tikus', 'keju', 'tikus', 'keju'],
];

const items = PATHS.map(([name, p, age, diff], i) => {
  const [who, goal, whoName, goalName] = STORIES[i % STORIES.length]!;
  const actor = who === ('kupuKupu' as ArtKey) ? 'lebah' : who;
  return {
    id: name.replace(/\s+/g, '-'),
    ageGroup: age,
    difficulty: diff,
    speak: `Bantu ${whoName} menuju ${goalName}. Ikuti jalan ${name}.`,
    label: `Ikuti jalan ${name}`,
    data: {
      path: p.d,
      start: { k: actor, x: p.s[0], y: p.s[1] },
      end: { k: goal, x: p.e[0], y: p.e[1] },
      speakAlso: [`${whoName[0]!.toUpperCase()}${whoName.slice(1)} sampai di ${goalName}!`],
    },
    tags: ['garis'],
    review: 'ditinjau',
  };
});

await writeContent('jalan-garis', items);
