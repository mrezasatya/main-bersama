/** Bank konten #3 Urutkan Besar-Kecil: 45 set (ukuran, panjang, jumlah, isi), 3-10 benda. */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

const items: unknown[] = [];
const scales = (n: number) =>
  Array.from({ length: n }, (_, i) => +(0.35 + (0.65 * i) / (n - 1)).toFixed(2));
const add = (id: string, n: number, speak: string, tiles: object[], tag: string, extra = 0) =>
  items.push({
    id,
    ageGroup: n <= 3 ? ['A', 'B'] : n <= 4 ? ['B', 'C'] : ['C'],
    difficulty: Math.min(5, n - 2 + extra),
    speak,
    label: speak,
    data: { tiles },
    tags: ['urutan', tag],
    review: 'ditinjau',
  });

// Ukuran: kecil ke besar (dan sebaliknya untuk 5-6 tahun).
const UKURAN: [ArtKey, string][] = [
  ['bola', 'bola'],
  ['apel', 'apel'],
  ['bintang', 'bintang'],
  ['ikan', 'ikan'],
  ['gajah', 'gajah'],
  ['kucing', 'kucing'],
  ['balon', 'balon'],
  ['pohon', 'pohon'],
  ['rumahJoglo', 'rumah'],
  ['mobil', 'mobil'],
  ['bunga', 'bunga'],
  ['jeruk', 'jeruk'],
  ['kue', 'kue'],
  ['katak', 'katak'],
  ['semangka', 'semangka'],
  ['beruang', 'beruang'],
];
UKURAN.forEach(([k, name], i) => {
  const n = 3 + (i % 3);
  add(
    `ukuran-${k}`,
    n,
    `Urutkan ${name} dari yang paling kecil ke paling besar.`,
    scales(n).map((scale) => ({ t: 'art', k, scale })),
    'ukuran',
  );
});
UKURAN.slice(0, 6).forEach(([k, name], i) => {
  const n = 5 + (i % 2);
  add(
    `besar-${k}`,
    n,
    `Urutkan ${name} dari yang paling besar ke paling kecil.`,
    scales(n)
      .reverse()
      .map((scale) => ({ t: 'art', k, scale })),
    'ukuran',
    1,
  );
});
// Panjang.
const PANJANG: ['pensil' | 'pita' | 'ular' | 'kereta', string][] = [
  ['pensil', 'pensil'],
  ['pita', 'pita'],
  ['ular', 'ular'],
  ['kereta', 'kereta'],
];
PANJANG.forEach(([k, name], i) => {
  for (const n of [3, 5])
    add(
      `panjang-${k}-${n}`,
      n + (i % 2),
      `Urutkan ${name} dari yang paling pendek ke paling panjang${n === 5 ? ', ada lebih banyak' : ''}.`,
      Array.from({ length: n + (i % 2) }, (_, j) => ({ t: 'len', n: 2 + j * 2, k })),
      'panjang',
    );
});
// Jumlah benda (3-10).
const JUMLAH: [ArtKey, string, number[]][] = [
  ['apel', 'apel', [1, 2, 3]],
  ['bintang', 'bintang', [2, 4, 6]],
  ['ikan', 'ikan', [1, 3, 5, 7]],
  ['bola', 'bola', [3, 5, 8, 10]],
  ['bunga', 'bunga', [2, 3, 4, 5, 6]],
  ['jeruk', 'jeruk', [1, 4, 7, 10]],
  ['kue', 'kue', [5, 6, 7]],
  ['telur', 'telur', [2, 5, 6, 9, 10]],
];
JUMLAH.forEach(([k, name, ns]) =>
  add(
    `jumlah-${k}`,
    ns.length,
    `Urutkan dari ${name} yang paling sedikit ke paling banyak.`,
    ns.map((n) => ({ t: 'group', k, n })),
    'jumlah',
  ),
);
// Isi gelas.
[
  [0.2, 0.55, 0.9],
  [0.15, 0.4, 0.65, 0.9],
  [0.1, 0.3, 0.5, 0.7, 0.9],
].forEach((fills, i) =>
  add(
    `isi-${i}`,
    fills.length,
    `Urutkan gelas dari yang isinya paling sedikit ke paling banyak${i > 0 ? `, ${fills.length} gelas` : ''}.`,
    fills.map((fill) => ({ t: 'gelas', fill })),
    'isi',
  ),
);

await writeContent('urutkan-besar-kecil', items);
