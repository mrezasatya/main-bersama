/** Bank konten #10 Pola Batik: AB, ABC, AAB, ABB, AABB, pola tumbuh, dan buat pola sendiri (45). */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

type M = { v: Record<string, unknown>; name: string };
const motif = (k: ArtKey, name: string): M => ({ v: { t: 'art', k }, name });
const shp = (s: string, color: string, name: string): M => ({ v: { t: 'shape', s, color }, name });

const MOTIF: M[] = [
  motif('batikKawung', 'kawung'),
  motif('parang', 'parang'),
  motif('truntum', 'truntum'),
  motif('megaMendung', 'mega mendung'),
  motif('ceplok', 'ceplok'),
];
const SHAPES: M[] = [
  shp('lingkaran', 'cokelat', 'lingkaran'),
  shp('bintang', 'kuning', 'bintang'),
  shp('belahKetupat', 'biru', 'belah ketupat'),
  shp('hati', 'merah', 'hati'),
  shp('segitiga', 'hijau', 'segitiga'),
  shp('bulanSabit', 'oranye', 'bulan sabit'),
];
const items: unknown[] = [];
const q = { t: 'q' };
const seen = new Set<string>();
const add = (
  id: string,
  age: string[],
  diff: number,
  seq: M[],
  next: M,
  pool: M[],
  tag: string,
) => {
  const speak = `${seq.map((m) => m.name).join(', ')}, lalu apa?`;
  if (seen.has(speak)) return;
  seen.add(speak);
  const others = pool.filter((m) => m.name !== next.name).slice(0, 3);
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak: `${speak[0]!.toUpperCase()}${speak.slice(1)}`,
    label: 'Lanjutkan polanya',
    data: {
      cue: { t: 'row', items: [...seq.map((m) => m.v), q] },
      options: [next, ...others].map((m) => m.v),
      labels: [next, ...others].map((m) => m.name),
      speakAlso: [`${next.name[0]!.toUpperCase()}${next.name.slice(1)}!`],
    },
    tags: ['pola', tag],
    review: 'ditinjau',
  });
};
const pick = (arr: M[], i: number) => arr[i % arr.length]!;

for (let i = 0; i < 10; i++) {
  const pool = i < 5 ? SHAPES : MOTIF;
  const a = pick(pool, i);
  const b = pick(pool, i + 2);
  add(`ab-${i}`, i < 5 ? ['B', 'C'] : ['C'], i < 5 ? 1 : 3, [a, b, a, b], a, [a, b, ...pool], 'AB');
}
for (let i = 0; i < 6; i++) {
  const pool = i < 3 ? SHAPES : MOTIF;
  const a = pick(pool, i + 1);
  const b = pick(pool, i + 3);
  add(`aab-${i}`, i < 3 ? ['B', 'C'] : ['C'], 2, [a, a, b, a, a], b, [b, a, ...pool], 'AAB');
}
for (let i = 0; i < 6; i++) {
  const pool = i < 3 ? SHAPES : MOTIF;
  const a = pick(pool, i + 2);
  const b = pick(pool, i + 4);
  add(`abb-${i}`, ['C'], 3, [a, b, b, a, b], b, [b, a, ...pool], 'ABB');
}
for (let i = 0; i < 8; i++) {
  const pool = i < 4 ? SHAPES : MOTIF;
  const [a, b, c] = [pick(pool, i), pick(pool, i + 1), pick(pool, i + 2)];
  add(`abc-${i}`, i < 2 ? ['B', 'C'] : ['C'], 4, [a, b, c, a, b], c, [c, a, b, ...pool], 'ABC');
}
for (let i = 0; i < 5; i++) {
  const pool = i < 3 ? SHAPES : MOTIF;
  const [a, b] = [pick(pool, i + 3), pick(pool, i + 5)];
  add(`aabb-${i}`, ['C'], 4, [a, a, b, b, a, a, b], b, [b, a, ...pool], 'AABB');
}
// Pola tumbuh: 1, 2, 3, lalu 4.
const GROW: [ArtKey, string, number][] = [
  ['bintang', 'bintang', 1],
  ['bunga', 'bunga', 1],
  ['apel', 'apel', 2],
  ['ikan', 'ikan', 1],
  ['bola', 'bola', 2],
];
GROW.forEach(([k, name, start], i) => {
  const seqN = [start, start + 1, start + 2];
  const ans = start + 3;
  const speak = `${seqN.map((n) => `${n} ${name}`).join(', ')}, lalu berapa ${name}?`;
  items.push({
    id: `tumbuh-${i}`,
    ageGroup: ['C'],
    difficulty: 5,
    speak,
    label: 'Pola tumbuh: lanjutkan',
    data: {
      cue: { t: 'row', items: [...seqN.map((n) => ({ t: 'group', k, n, slots: ans })), q] },
      options: [ans, ans + 2, ans - 2, ans + 1].map((n) => ({ t: 'group', k, n })),
      speakAlso: [`Bertambah satu setiap kali: ${ans} ${name}.`],
    },
    tags: ['pola', 'tumbuh'],
    review: 'ditinjau',
  });
});
// Buat pola sendiri (kreativitas bebas).
const BUAT: [M[], string][] = [
  [[MOTIF[0]!, MOTIF[1]!], 'Buat polamu sendiri dengan kawung dan parang!'],
  [
    [SHAPES[0]!, SHAPES[1]!, SHAPES[3]!],
    'Buat polamu sendiri dengan lingkaran, bintang, dan hati!',
  ],
  [
    [MOTIF[2]!, MOTIF[3]!, MOTIF[4]!],
    'Buat polamu sendiri dengan motif truntum, mega mendung, dan ceplok!',
  ],
  [[SHAPES[2]!, SHAPES[4]!], 'Buat polamu sendiri dengan belah ketupat dan segitiga!'],
  [[MOTIF[0]!, SHAPES[1]!, MOTIF[4]!], 'Buat polamu sendiri dengan kawung, bintang, dan ceplok!'],
];
BUAT.forEach(([palette, speak], i) =>
  items.push({
    id: `buat-${i}`,
    ageGroup: ['B', 'C'],
    difficulty: 2,
    speak,
    label: 'Buat polamu sendiri',
    data: { mode: 'buat', palette: palette.map((m) => m.v), tileSay: palette.map((m) => m.name) },
    tags: ['pola', 'kreasi'],
    review: 'ditinjau',
  }),
);

await writeContent('pola-batik', items);
