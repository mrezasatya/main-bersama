/** Bank konten #16 Kelompokkan: 45 aturan (warna, bentuk, habitat hewan, buah/sayur, kendaraan, ...). */
import type { ArtKey } from '../../src/core/art/keys';
import type { ColorName } from '../../src/core/art/colors';
import type { ShapeKey } from '../../src/core/visual/types';
import { writeContent } from './lib';

type V = Record<string, unknown>;
type Bin = { label: string; icon: V; items: V[] };
const items: unknown[] = [];
const art = (k: ArtKey, color?: ColorName) => ({ t: 'art', k, ...(color ? { color } : {}) });
const sh = (s: ShapeKey, color: ColorName) => ({ t: 'shape', s, color });

/** Semua isi wadah dicampur oleh komponen; usia menentukan jumlah benda per wadah. */
const add = (id: string, age: string[], diff: number, speak: string, bins: Bin[], tag: string) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data: {
      bins: bins.map((b) => ({ label: b.label, icon: b.icon })),
      items: bins.flatMap((b, i) => b.items.map((v) => ({ v, bin: i }))),
    },
    tags: ['kelompok', tag],
    review: 'ditinjau',
  });

// Warna.
const WARNA: [ColorName, ColorName][] = [
  ['merah', 'biru'],
  ['kuning', 'hijau'],
  ['ungu', 'oranye'],
  ['merah muda', 'biru muda'],
  ['merah', 'kuning'],
];
const OBJ: ArtKey[] = ['bola', 'balon', 'bintang', 'bunga', 'ikan'];
WARNA.forEach(([a, b], i) =>
  add(
    `warna-${a}-${b}`,
    i < 3 ? ['A', 'B', 'C'] : ['B', 'C'],
    i < 3 ? 1 : 2,
    `Kelompokkan warna ${a} dan warna ${b}.`,
    [
      { label: a, icon: { t: 'swatch', c: a }, items: OBJ.map((k) => art(k, a)) },
      { label: b, icon: { t: 'swatch', c: b }, items: [...OBJ].reverse().map((k) => art(k, b)) },
    ],
    'warna',
  ),
);
// Bentuk.
const BENTUK: [ShapeKey, ShapeKey, string, string][] = [
  ['lingkaran', 'segitiga', 'lingkaran', 'segitiga'],
  ['persegi', 'bintang', 'persegi', 'bintang'],
  ['hati', 'lingkaran', 'hati', 'lingkaran'],
  ['kubus', 'bola', 'kubus', 'bola'],
  ['segitiga', 'persegi', 'segitiga', 'persegi'],
];
const CS: ColorName[] = ['merah', 'biru', 'kuning', 'hijau', 'ungu'];
BENTUK.forEach(([a, b, na, nb], i) =>
  add(
    `bentuk-${a}-${b}`,
    i < 3 ? ['A', 'B', 'C'] : ['B', 'C'],
    i < 3 ? 1 : 3,
    `Kelompokkan bentuk ${na} dan ${nb}.`,
    [
      { label: na, icon: sh(a, 'abu-abu'), items: CS.map((c) => sh(a, c)) },
      { label: nb, icon: sh(b, 'abu-abu'), items: [...CS].reverse().map((c) => sh(b, c)) },
    ],
    'bentuk',
  ),
);
// Hewan darat, air, udara.
const DARAT: ArtKey[] = ['kucing', 'sapi', 'kuda', 'gajah', 'singa', 'kambing', 'harimau', 'zebra'];
const AIR: ArtKey[] = ['ikan', 'paus', 'lumbaLumba', 'anjingLaut', 'katak'];
const UDARA: ArtKey[] = ['merpati', 'elang', 'lebah', 'burungHantu', 'kakatua', 'pipit'];
for (let i = 0; i < 5; i++) {
  const d = DARAT.slice(i, i + 5)
    .concat(DARAT)
    .slice(0, 5);
  const a = AIR.slice(i).concat(AIR).slice(0, 5);
  const u = UDARA.slice(i).concat(UDARA).slice(0, 5);
  if (i < 2)
    add(
      `habitat2-${i}`,
      ['A', 'B', 'C'],
      2,
      `Kelompokkan hewan darat dan hewan air, mulai dari ${d[0]}.`,
      [
        { label: 'darat', icon: art('pohon'), items: d.map((k) => art(k)) },
        { label: 'air', icon: art('tetesAir'), items: a.map((k) => art(k)) },
      ],
      'habitat',
    );
  else
    add(
      `habitat3-${i}`,
      ['C'],
      4,
      `Kelompokkan hewan darat, air, dan udara, mulai dari ${d[0]}.`,
      [
        { label: 'darat', icon: art('pohon'), items: d.map((k) => art(k)) },
        { label: 'air', icon: art('tetesAir'), items: a.map((k) => art(k)) },
        { label: 'udara', icon: art('awan'), items: u.map((k) => art(k)) },
      ],
      'habitat',
    );
}
// Buah dan sayur.
const BUAH: ArtKey[] = [
  'apel',
  'jeruk',
  'pisang',
  'mangga',
  'anggur',
  'stroberi',
  'semangka',
  'nanas',
];
const SAYUR: ArtKey[] = ['wortel', 'tomat', 'jagung', 'cabai', 'kedelai'];
for (let i = 0; i < 4; i++)
  add(
    `buah-sayur-${i}`,
    i < 2 ? ['A', 'B', 'C'] : ['B', 'C'],
    2,
    `Kelompokkan buah dan sayur, mulai dari ${BUAH[i]}.`,
    [
      {
        label: 'buah',
        icon: art('apel'),
        items: BUAH.slice(i, i + 5)
          .concat(BUAH)
          .slice(0, 5)
          .map((k) => art(k)),
      },
      {
        label: 'sayur',
        icon: art('wortel'),
        items: SAYUR.slice(i % 2)
          .concat(SAYUR)
          .slice(0, 5)
          .map((k) => art(k)),
      },
    ],
    'buah-sayur',
  );
// Kendaraan darat, laut, udara.
const KD: ArtKey[] = ['mobil', 'bus', 'truk', 'motor', 'sepeda', 'becak', 'bajaj', 'keretaApi'];
const KL: ArtKey[] = ['perahuLayar', 'kapalFeri', 'sampan', 'pinisi', 'speedboat', 'kapalSelam'];
const KU: ArtKey[] = ['pesawat', 'helikopter', 'balonUdara', 'roket', 'pesawatBaling'];
for (let i = 0; i < 6; i++) {
  const d = KD.slice(i)
    .concat(KD)
    .slice(0, 5)
    .map((k) => art(k));
  const l = KL.slice(i)
    .concat(KL)
    .slice(0, 5)
    .map((k) => art(k));
  const u = KU.slice(i % 5)
    .concat(KU)
    .slice(0, 5)
    .map((k) => art(k));
  if (i < 3)
    add(
      `kendaraan2-${i}`,
      i < 2 ? ['A', 'B', 'C'] : ['B', 'C'],
      2,
      `Kelompokkan kendaraan darat dan kendaraan laut, mulai dari ${KD[i]}.`,
      [
        { label: 'darat', icon: art('mobil'), items: d },
        { label: 'laut', icon: art('perahuLayar'), items: l },
      ],
      'kendaraan',
    );
  else
    add(
      `kendaraan3-${i}`,
      ['C'],
      4,
      `Kelompokkan kendaraan darat, laut, dan udara, mulai dari ${KD[i]}.`,
      [
        { label: 'darat', icon: art('mobil'), items: d },
        { label: 'laut', icon: art('perahuLayar'), items: l },
        { label: 'udara', icon: art('pesawat'), items: u },
      ],
      'kendaraan',
    );
}
// Aturan lain.
const LAIN: [string, string, Bin[], string[]][] = [
  [
    'makanan',
    'Kelompokkan makanan dan mainan.',
    [
      {
        label: 'makanan',
        icon: art('piring'),
        items: ['roti', 'kue', 'sate', 'nasi', 'permen'].map((k) => art(k as ArtKey)),
      },
      {
        label: 'mainan',
        icon: art('yoyo'),
        items: ['bola', 'yoyo', 'balon', 'mainanRusak', 'gitar'].map((k) => art(k as ArtKey)),
      },
    ],
    ['A', 'B', 'C'],
  ],
  [
    'langit',
    'Kelompokkan benda di langit siang dan langit malam.',
    [
      {
        label: 'siang',
        icon: { t: 'scene', s: 'siang' },
        items: [
          art('matahari'),
          art('awan'),
          art('pesawat'),
          art('balonUdara'),
          art('pelangiPlaceholder' as ArtKey),
        ],
      },
      {
        label: 'malam',
        icon: { t: 'scene', s: 'malam' },
        items: [
          art('bulan'),
          art('bintang', 'kuning'),
          art('burungHantu'),
          art('tempatTidur'),
          art('senter'),
        ],
      },
    ],
    ['B', 'C'],
  ],
  [
    'kaki',
    'Kelompokkan hewan berkaki dua dan berkaki empat.',
    [
      {
        label: 'kaki dua',
        icon: { t: 'num', n: 2 },
        items: ['ayamJago', 'bebek', 'angsa', 'merpati', 'burungHantu'].map((k) =>
          art(k as ArtKey),
        ),
      },
      {
        label: 'kaki empat',
        icon: { t: 'num', n: 4 },
        items: ['kucing', 'anjing', 'sapi', 'kuda', 'kambing'].map((k) => art(k as ArtKey)),
      },
    ],
    ['C'],
  ],
  [
    'dingin-panas',
    'Kelompokkan benda dingin dan benda panas.',
    [
      {
        label: 'dingin',
        icon: art('esBatu'),
        items: ['esBatu', 'esKrim', 'susu', 'semangka', 'tetesAir'].map((k) => art(k as ArtKey)),
      },
      {
        label: 'panas',
        icon: art('matahari'),
        items: ['tehHangat', 'soto', 'matahari', 'obor', 'wajan'].map((k) => art(k as ArtKey)),
      },
    ],
    ['C'],
  ],
  [
    'ukuran',
    'Kelompokkan hewan besar dan hewan kecil.',
    [
      {
        label: 'besar',
        icon: art('gajah'),
        items: ['gajah', 'paus', 'kudaNil', 'kerbau', 'beruang'].map((k) => art(k as ArtKey)),
      },
      {
        label: 'kecil',
        icon: art('tikus'),
        items: ['tikus', 'lebah', 'nyamuk', 'cicak', 'anakAyam'].map((k) => art(k as ArtKey)),
      },
    ],
    ['B', 'C'],
  ],
  [
    'alat',
    'Kelompokkan alat makan dan alat tulis.',
    [
      {
        label: 'makan',
        icon: art('piring'),
        items: ['piring', 'wajan', 'nasi', 'susu', 'kue'].map((k) => art(k as ArtKey)),
      },
      {
        label: 'tulis',
        icon: art('buku'),
        items: ['buku', 'kuas', 'kertas', 'tasSekolah', 'canting'].map((k) => art(k as ArtKey)),
      },
    ],
    ['C'],
  ],
  [
    'budaya',
    'Kelompokkan rumah adat dan makanan khas.',
    [
      {
        label: 'rumah adat',
        icon: art('rumahJoglo'),
        items: ['rumahGadang', 'rumahJoglo', 'rumahHonai', 'rumahTongkonan', 'rumahPanggung'].map(
          (k) => art(k as ArtKey),
        ),
      },
      {
        label: 'makanan',
        icon: art('piring'),
        items: ['rendang', 'sate', 'tumpeng', 'soto', 'klepon'].map((k) => art(k as ArtKey)),
      },
    ],
    ['C'],
  ],
  [
    'angka',
    'Kelompokkan angka kecil dan angka besar.',
    [
      {
        label: '1 sampai 5',
        icon: { t: 'num', n: 5 },
        items: [1, 2, 3, 4, 5].map((n) => ({ t: 'num', n })),
      },
      {
        label: '6 sampai 10',
        icon: { t: 'num', n: 10 },
        items: [6, 7, 8, 9, 10].map((n) => ({ t: 'num', n })),
      },
    ],
    ['C'],
  ],
  [
    'huruf',
    'Kelompokkan huruf vokal dan huruf lainnya.',
    [
      {
        label: 'vokal',
        icon: { t: 'text', s: 'a i u' },
        items: ['a', 'i', 'u', 'e', 'o'].map((s) => ({ t: 'text', s, size: 'xl' })),
      },
      {
        label: 'lainnya',
        icon: { t: 'text', s: 'b c d' },
        items: ['b', 'm', 's', 'k', 't'].map((s) => ({ t: 'text', s, size: 'xl' })),
      },
    ],
    ['C'],
  ],
];
LAIN.forEach(([tag, speak, bins, age]) =>
  add(
    `lain-${tag}`,
    age,
    age.length === 3 ? 1 : 4,
    speak,
    bins.map((b) => ({
      ...b,
      items: b.items.map((v) => (v.k === 'pelangiPlaceholder' ? art('bintang', 'kuning') : v)),
    })),
    tag,
  ),
);
// Usia 4-6 tambahan: warna campuran tiga wadah.
[
  ['merah', 'kuning', 'biru'],
  ['hijau', 'ungu', 'oranye'],
  ['merah muda', 'biru muda', 'abu-abu'],
  ['cokelat', 'hitam', 'putih'],
].forEach((cs, i) =>
  add(
    `warna3-${i}`,
    ['C'],
    5,
    `Kelompokkan warna ${cs[0]}, ${cs[1]}, dan ${cs[2]}.`,
    (cs as ColorName[]).map((c) => ({
      label: c,
      icon: { t: 'swatch', c },
      items: OBJ.slice(0, 4).map((k) => art(k, c)),
    })),
    'warna',
  ),
);
// Bentuk tiga wadah dan bangun ruang.
[
  ['lingkaran', 'segitiga', 'persegi'],
  ['bintang', 'hati', 'oval'],
  ['kubus', 'bola', 'tabung'],
  ['kerucut', 'limas', 'balok'],
].forEach((ss, i) =>
  add(
    `bentuk3-${i}`,
    ['C'],
    5,
    `Kelompokkan bentuk ${ss.join(', ').replace(/, ([^,]*)$/, ', dan $1')}.`,
    (ss as ShapeKey[]).map((s) => ({
      label: s,
      icon: sh(s, 'abu-abu'),
      items: CS.slice(0, 4).map((c) => sh(s, c)),
    })),
    'bentuk',
  ),
);

await writeContent('kelompokkan', items);
