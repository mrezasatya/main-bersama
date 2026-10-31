/**
 * Bank konten #5 Hitung Buah (Concrete -> Pictorial -> Abstract):
 * usia 3: cocokkan banyak benda; usia 4: hitung (ketuk tiap buah) lalu pilih angka;
 * usia 5-6: tambah dan kurang dengan gambar, lalu lambang bilangan.
 */
import type { ArtKey } from '../../src/core/art/keys';
import { NUMBER_WORDS } from '../../src/core/audio/phrases';
import { writeContent } from './lib';

const FRUITS: [ArtKey, string][] = [
  ['apel', 'apel'],
  ['jeruk', 'jeruk'],
  ['pisang', 'pisang'],
  ['mangga', 'mangga'],
  ['stroberi', 'stroberi'],
  ['tomat', 'tomat'],
  ['rambutan', 'rambutan'],
  ['nanas', 'nanas'],
  ['semangka', 'semangka'],
  ['anggur', 'anggur'],
];
const items: unknown[] = [];
const num = (n: number) => ({ t: 'num', n });
const grp = (k: ArtKey, n: number) => ({ t: 'group', k, n });
const add = (id: string, age: string[], diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['hitung', tag],
    review: 'ditinjau',
  });
const others = (n: number, lo: number, hi: number) =>
  [n + 3, n - 2, n + 1, n - 1, n + 2].filter((x) => x >= lo && x <= hi && x !== n).slice(0, 3);

// Konkret: cocokkan banyaknya (usia 3).
[1, 2, 3, 4, 5, 3, 2, 4].forEach((n, i) => {
  const [k, name] = FRUITS[i]!;
  add(
    `cocok-${k}-${n}`,
    ['A', 'B'],
    1,
    `Mana yang sama banyak dengan ${name} ini?`,
    {
      countable: grp(k, n),
      options: [n, ...others(n, 1, 6)].map((x) => grp(k, x)),
      speakAlso: [`Sama banyak: ${NUMBER_WORDS[n]}!`],
    },
    'cocok',
  );
});
// Konkret -> abstrak: hitung dengan mengetuk, lalu pilih angka.
for (let n = 1; n <= 10; n++) {
  const [k, name] = FRUITS[n % FRUITS.length]!;
  add(
    `hitung-${k}-${n}`,
    n <= 5 ? ['A', 'B', 'C'] : ['B', 'C'],
    n <= 5 ? 1 : 2,
    `Ketuk dan hitung ${name}nya. Ada berapa?`,
    {
      countable: grp(k, n),
      options: [n, ...others(n, 1, 10)].map(num),
      speakAlso: [`Ada ${NUMBER_WORDS[n]} ${name}!`],
    },
    'hitung',
  );
}
// Banyak / sedikit.
[
  [3, 1],
  [2, 5],
  [6, 4],
  [1, 4],
  [7, 3],
  [5, 6],
].forEach(([a = 0, b = 0], i) => {
  const [k, name] = FRUITS[(i + 2) % FRUITS.length]!;
  add(
    `banyak-${i}`,
    i < 3 ? ['A', 'B', 'C'] : ['B', 'C'],
    i < 3 ? 1 : 3,
    `Mana ${name} yang lebih banyak?`,
    {
      options: [grp(k, Math.max(a, b)), grp(k, Math.min(a, b))],
    },
    'banyak',
  );
});
[
  [2, 5],
  [6, 3],
  [4, 8],
  [9, 7],
].forEach(([a = 0, b = 0], i) => {
  const [k, name] = FRUITS[(i + 5) % FRUITS.length]!;
  add(
    `sedikit-${i}`,
    ['B', 'C'],
    2 + (i % 2),
    `Mana ${name} yang lebih sedikit?`,
    {
      options: [grp(k, Math.min(a, b)), grp(k, Math.max(a, b))],
    },
    'sedikit',
  );
});
// Tambah (gambar -> lambang).
[
  [1, 1],
  [2, 1],
  [2, 2],
  [3, 1],
  [3, 2],
  [4, 2],
  [5, 1],
  [3, 3],
  [4, 4],
  [5, 3],
  [6, 2],
  [5, 5],
].forEach(([a = 0, b = 0], i) => {
  const [k, name] = FRUITS[i % FRUITS.length]!;
  add(
    `tambah-${a}-${b}`,
    ['C'],
    i < 6 ? 3 : 4,
    `Ada ${NUMBER_WORDS[a]} ${name}, ditambah ${NUMBER_WORDS[b]} ${name}. Jadi berapa?`,
    {
      cue: {
        t: 'row',
        items: [
          { ...grp(k, a), slots: Math.max(a, b) },
          { t: 'text', s: '+' },
          { ...grp(k, b), slots: Math.max(a, b) },
        ],
      },
      options: [a + b, ...others(a + b, 1, 12)].map(num),
      speakAlso: [`${a} tambah ${b} sama dengan ${a + b}.`],
    },
    'tambah',
  );
});
// Kurang.
[
  [3, 1],
  [4, 2],
  [5, 2],
  [5, 4],
  [6, 3],
  [7, 2],
  [8, 5],
  [10, 4],
  [9, 6],
  [6, 6],
].forEach(([a = 0, b = 0], i) => {
  const [k, name] = FRUITS[(i + 3) % FRUITS.length]!;
  add(
    `kurang-${a}-${b}`,
    ['C'],
    i < 5 ? 4 : 5,
    `Ada ${NUMBER_WORDS[a]} ${name}, dimakan ${NUMBER_WORDS[b]}. Sisa berapa?`,
    {
      cue: { t: 'row', items: [grp(k, a), { t: 'text', s: '−' }, num(b)] },
      options: [a - b, ...others(a - b, 0, 10)].map(num),
      speakAlso: [
        a - b === 0
          ? `${a} kurang ${b} sama dengan nol. Habis!`
          : `${a} kurang ${b} sama dengan ${a - b}.`,
      ],
    },
    'kurang',
  );
});

await writeContent('hitung-buah', items);
