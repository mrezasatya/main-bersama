/** Bank konten #22 Ukur dan Bandingkan: panjang, tinggi, berat, isi, satuan tak baku (40). */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

const items: unknown[] = [];
const len = (n: number, k: string, units = false) => ({
  t: 'len',
  n,
  k,
  ...(units ? { units } : {}),
});
const add = (id: string, age: string[], diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['ukur', tag],
    review: 'ditinjau',
  });

const LEN_NAME: Record<string, string> = {
  pensil: 'pensil',
  pita: 'pita',
  ular: 'ular',
  kereta: 'kereta',
};
// Pasangan kedua dengan benda sama dibuat lebih mirip panjangnya (lebih sulit), kalimatnya beda.
[
  [8, 4, 'pensil'],
  [9, 5, 'pita'],
  [10, 6, 'ular'],
  [6, 3, 'kereta'],
  [7, 5, 'pensil'],
  [9, 7, 'pita'],
].forEach(([a, b, k], i) => {
  const hint = i >= 3 ? ' Lihat baik-baik.' : '';
  add(
    `panjang-${k}-${a}-${b}`,
    i < 3 ? ['B', 'C'] : ['C'],
    i < 3 ? 1 : 3,
    `Mana ${LEN_NAME[k as string]} yang lebih panjang?${hint}`,
    { options: [len(a as number, k as string), len(b as number, k as string)] },
    'panjang',
  );
});
[
  [3, 8, 'ular'],
  [4, 9, 'kereta'],
  [2, 6, 'pensil'],
  [5, 7, 'pita'],
].forEach(([a, b, k], i) =>
  add(
    `pendek-${k}-${a}-${b}`,
    i < 2 ? ['B', 'C'] : ['C'],
    2,
    `Mana ${LEN_NAME[k as string]} yang lebih pendek?`,
    { options: [len(a as number, k as string), len(b as number, k as string)] },
    'panjang',
  ),
);
const TINGGI: [ArtKey, string][] = [
  ['pohon', 'pohon'],
  ['rumahJoglo', 'rumah'],
  ['monas', 'menara'],
];
TINGGI.forEach(([k, name], i) =>
  add(
    `tinggi-${k}`,
    ['B', 'C'],
    2,
    `Mana ${name} yang lebih tinggi?`,
    {
      options: [
        { t: 'art', k, scale: 1 },
        { t: 'art', k, scale: 0.55 },
        ...(i === 0 ? [{ t: 'art', k, scale: 0.75 }] : []),
      ],
      maxOptions: 3,
    },
    'tinggi',
  ),
);
add(
  'rendah-pohon',
  ['C'],
  3,
  'Mana pohon yang paling rendah?',
  {
    options: [
      { t: 'art', k: 'pohon', scale: 0.45 },
      { t: 'art', k: 'pohon', scale: 1 },
      { t: 'art', k: 'pohon', scale: 0.75 },
    ],
  },
  'tinggi',
);
const BERAT: [ArtKey, string, ArtKey, string][] = [
  ['semangka', 'semangka', 'apel', 'apel'],
  ['gajah', 'gajah', 'kucing', 'kucing'],
  ['batu', 'batu', 'kapas', 'kapas'],
  ['buku', 'buku', 'kertas', 'kertas'],
  ['kerbau', 'kerbau', 'ayamBetina', 'ayam'],
  ['nanas', 'nanas', 'stroberi', 'stroberi'],
  ['bola', 'bola', 'balon', 'balon'],
];
BERAT.forEach(([h, hn, l, ln], i) => {
  const heavyLeft = i % 2 === 0;
  add(
    `berat-${h}-${l}`,
    i < 3 ? ['B', 'C'] : ['C'],
    i < 3 ? 2 : 3,
    `Lihat timbangannya. Mana yang lebih berat, ${hn} atau ${ln}?`,
    {
      cue: {
        t: 'neraca',
        left: heavyLeft ? h : l,
        right: heavyLeft ? l : h,
        tilt: heavyLeft ? 'kiri' : 'kanan',
      },
      options: [
        { t: 'art', k: h },
        { t: 'art', k: l },
      ],
      speakAlso: [`${hn[0]!.toUpperCase()}${hn.slice(1)} lebih berat, timbangannya turun.`],
    },
    'berat',
  );
});
add(
  'seimbang',
  ['C'],
  4,
  'Timbangannya seimbang. Apa artinya?',
  {
    cue: { t: 'neraca', left: 'apel', right: 'apel', tilt: 'seimbang' },
    options: [
      { t: 'text', s: 'Sama berat', size: 'm' },
      { t: 'text', s: 'Kiri lebih berat', size: 'm' },
      { t: 'text', s: 'Kanan lebih berat', size: 'm' },
    ],
    speakAlso: ['Seimbang artinya sama berat.'],
  },
  'berat',
);
const ISI_HINT = ['', ' Lihat airnya.', ' Perhatikan airnya.', ' Bandingkan tinggi airnya.'];
[
  [0.9, 0.4],
  [0.3, 0.8],
  [0.7, 0.2],
  [0.85, 0.5],
].forEach(([a = 0, b = 0], i) =>
  add(
    `isi-banyak-${i}`,
    i < 2 ? ['B', 'C'] : ['C'],
    2,
    `Mana gelas yang isinya lebih banyak?${ISI_HINT[i]}`,
    {
      options: [
        { t: 'gelas', fill: Math.max(a, b) },
        { t: 'gelas', fill: Math.min(a, b) },
      ],
    },
    'isi',
  ),
);
[
  [0.2, 0.7],
  [0.6, 0.15],
].forEach(([a = 0, b = 0], i) =>
  add(
    `isi-sedikit-${i}`,
    ['C'],
    3,
    `Mana gelas yang isinya lebih sedikit?${i ? ' Lihat airnya.' : ''}`,
    {
      options: [
        { t: 'gelas', fill: Math.min(a, b) },
        { t: 'gelas', fill: Math.max(a, b) },
      ],
    },
    'isi',
  ),
);
// Satuan tak baku: hitung kotak.
[
  [4, 'pensil'],
  [6, 'pita'],
  [3, 'kereta'],
  [7, 'ular'],
  [5, 'pensil'],
  [8, 'pita'],
  [2, 'kereta'],
  [9, 'ular'],
].forEach(([n, k], i) => {
  const nn = n as number;
  add(
    `kotak-${k}-${nn}`,
    ['C'],
    i < 4 ? 3 : 4,
    `Berapa kotak panjang ${LEN_NAME[k as string]} ini?${i >= 4 ? ' Hitung pelan-pelan.' : ''}`,
    {
      cue: len(nn, k as string, true),
      options: [nn, nn + 1, nn - 1, nn + 2].map((x) => ({ t: 'num', n: x })),
      speakAlso: [`Panjangnya ${nn} kotak.`],
    },
    'satuan',
  );
});
[
  [4, 'pensil'],
  [6, 'pita'],
  [3, 'ular'],
  [5, 'kereta'],
].forEach(([n, k]) => {
  const nn = n as number;
  add(
    `pilih-${k}-${nn}`,
    ['C'],
    5,
    `Mana ${LEN_NAME[k as string]} yang panjangnya ${nn} kotak?`,
    {
      options: [nn, nn + 2, nn - 1].map((x) => len(x, k as string, true)),
    },
    'satuan',
  );
});

await writeContent('ukur-bandingkan', items);
