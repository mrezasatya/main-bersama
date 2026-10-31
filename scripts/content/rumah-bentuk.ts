/** Bank konten #20 Rumah Bentuk: bangun datar, bangun ruang, jumlah sisi, bentuk di sekitar kita (40). */
import type { ArtKey } from '../../src/core/art/keys';
import type { ShapeKey } from '../../src/core/visual/types';
import { writeContent } from './lib';

const items: unknown[] = [];
const COLORS = ['merah', 'biru', 'kuning', 'hijau', 'oranye', 'ungu'] as const;
const sh = (s: ShapeKey, i = 0) => ({ t: 'shape', s, color: COLORS[i % COLORS.length] });
const NAME: Record<ShapeKey, string> = {
  lingkaran: 'lingkaran',
  segitiga: 'segitiga',
  persegi: 'persegi',
  persegiPanjang: 'persegi panjang',
  oval: 'oval',
  belahKetupat: 'belah ketupat',
  trapesium: 'trapesium',
  segiLima: 'segi lima',
  segiEnam: 'segi enam',
  bintang: 'bintang',
  hati: 'hati',
  bulanSabit: 'bulan sabit',
  kubus: 'kubus',
  balok: 'balok',
  bola: 'bola',
  tabung: 'tabung',
  kerucut: 'kerucut',
  limas: 'limas',
};
const add = (id: string, age: string[], diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['bentuk', tag],
    review: 'ditinjau',
  });

const DATAR: [ShapeKey, ShapeKey[], string[]][] = [
  ['lingkaran', ['segitiga', 'persegi', 'bintang'], ['A', 'B', 'C']],
  ['segitiga', ['lingkaran', 'hati', 'persegi'], ['A', 'B', 'C']],
  ['persegi', ['lingkaran', 'segitiga', 'hati'], ['A', 'B', 'C']],
  ['bintang', ['lingkaran', 'persegi', 'segitiga'], ['A', 'B', 'C']],
  ['hati', ['segitiga', 'persegi', 'lingkaran'], ['A', 'B', 'C']],
  ['persegiPanjang', ['lingkaran', 'segitiga', 'hati'], ['A', 'B', 'C']],
  ['oval', ['segitiga', 'persegi', 'bintang'], ['A', 'B', 'C']],
  ['bulanSabit', ['persegi', 'segitiga', 'lingkaran'], ['A', 'B', 'C']],
  ['belahKetupat', ['persegi', 'segitiga', 'oval'], ['C']],
  ['trapesium', ['persegiPanjang', 'segitiga', 'belahKetupat'], ['C']],
  ['segiLima', ['segiEnam', 'persegi', 'lingkaran'], ['C']],
  ['segiEnam', ['segiLima', 'lingkaran', 'belahKetupat'], ['C']],
];
DATAR.forEach(([s, o, age], i) =>
  add(
    `datar-${s}`,
    age,
    age.length === 3 ? 1 : age.length === 2 ? 2 : 4,
    `Mana ${NAME[s]}?`,
    { options: [s, ...o].map((x, j) => sh(x, i + j)), speakAlso: [`Ini ${NAME[s]}.`] },
    'datar',
  ),
);
const RUANG: [ShapeKey, ShapeKey[]][] = [
  ['kubus', ['bola', 'tabung', 'kerucut']],
  ['bola', ['kubus', 'limas', 'balok']],
  ['tabung', ['kerucut', 'kubus', 'bola']],
  ['kerucut', ['tabung', 'limas', 'bola']],
  ['balok', ['kubus', 'tabung', 'kerucut']],
  ['limas', ['kerucut', 'kubus', 'balok']],
];
RUANG.forEach(([s, o], i) =>
  add(
    `ruang-${s}`,
    i < 2 ? ['A', 'B', 'C'] : i < 3 ? ['B', 'C'] : ['C'],
    i < 3 ? 2 : 4,
    `Mana bangun ruang ${NAME[s]}?`,
    { options: [s, ...o].map((x, j) => sh(x, i + j + 2)), speakAlso: [`Ini ${NAME[s]}.`] },
    'ruang',
  ),
);
const SISI: [ShapeKey, number][] = [
  ['segitiga', 3],
  ['persegi', 4],
  ['persegiPanjang', 4],
  ['segiLima', 5],
  ['segiEnam', 6],
  ['trapesium', 4],
];
SISI.forEach(([s, n], i) =>
  add(
    `sisi-${s}`,
    ['C'],
    i < 2 ? 3 : 5,
    `Berapa sisi ${NAME[s]}?`,
    {
      cue: sh(s, i),
      options: [n, n + 1, n - 1, n + 2].map((x) => ({ t: 'num', n: x })),
      speakAlso: [`${NAME[s][0]!.toUpperCase()}${NAME[s].slice(1)} punya ${n} sisi.`],
    },
    'sisi',
  ),
);
const BENDA: [ArtKey, string, ShapeKey, ShapeKey[]][] = [
  ['bola', 'bola', 'bola', ['kubus', 'kerucut', 'balok']],
  ['tumpeng', 'nasi tumpeng', 'kerucut', ['kubus', 'bola', 'tabung']],
  ['hadiah', 'kotak hadiah', 'kubus', ['bola', 'kerucut', 'tabung']],
  ['piramida', 'piramida', 'limas', ['bola', 'tabung', 'kubus']],
  ['gendang', 'kendang', 'tabung', ['kubus', 'kerucut', 'limas']],
  ['buku', 'buku tebal', 'balok', ['bola', 'kerucut', 'tabung']],
  ['jeruk', 'jeruk', 'bola', ['kubus', 'limas', 'balok']],
  ['susu', 'kotak susu', 'balok', ['bola', 'kerucut', 'tabung']],
];
BENDA.forEach(([k, name, s, o], i) =>
  add(
    `benda-${k}`,
    i < 3 ? ['B', 'C'] : ['C'],
    i < 3 ? 2 : 4,
    `${name[0]!.toUpperCase()}${name.slice(1)} mirip bentuk apa?`,
    {
      cue: { t: 'art', k },
      options: [s, ...o].map((x, j) => sh(x, i + j)),
      speakAlso: [`${name[0]!.toUpperCase()}${name.slice(1)} mirip ${NAME[s]}.`],
    },
    'sekitar',
  ),
);
const DATAR_BENDA: [string, ShapeKey, ShapeKey[], { t: string; [k: string]: unknown }][] = [
  ['Jam dinding ini berbentuk apa?', 'lingkaran', ['segitiga', 'persegi'], { t: 'clock', h: 3 }],
  [
    'Bendera ini berbentuk apa?',
    'persegiPanjang',
    ['lingkaran', 'segitiga'],
    { t: 'flag', c: 'indonesia' },
  ],
  [
    'Uang kertas ini berbentuk apa?',
    'persegiPanjang',
    ['lingkaran', 'hati'],
    { t: 'money', v: 5000 },
  ],
  ['Uang logam ini berbentuk apa?', 'lingkaran', ['persegi', 'segitiga'], { t: 'money', v: 500 }],
];
DATAR_BENDA.forEach(([q, s, o, cue], i) =>
  add(
    `sekitar-datar-${i}`,
    ['B', 'C'],
    2,
    q,
    { cue, options: [s, ...o].map((x, j) => sh(x, i + j)), speakAlso: [`Berbentuk ${NAME[s]}.`] },
    'sekitar',
  ),
);
const TANPA_SUDUT: [string, ShapeKey, ShapeKey[]][] = [
  ['Mana bentuk yang tidak punya sudut?', 'lingkaran', ['segitiga', 'persegi', 'bintang']],
  ['Mana bentuk yang punya tiga sudut?', 'segitiga', ['persegi', 'lingkaran', 'segiLima']],
  [
    'Mana bentuk yang punya empat sisi sama panjang?',
    'persegi',
    ['persegiPanjang', 'segitiga', 'oval'],
  ],
  [
    'Mana bangun ruang yang bisa menggelinding ke segala arah?',
    'bola',
    ['kubus', 'balok', 'limas'],
  ],
];
TANPA_SUDUT.forEach(([q, s, o], i) =>
  add(`ciri-${i}`, ['C'], 4, q, { options: [s, ...o].map((x, j) => sh(x, i + j)) }, 'ciri'),
);

await writeContent('rumah-bentuk', items);
