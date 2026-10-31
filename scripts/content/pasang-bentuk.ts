/** Bank konten #1 Pasang Bentuk: 45 set siluet (bentuk dasar, rumah adat, hewan, kendaraan). */
import type { ArtKey } from '../../src/core/art/keys';
import type { ShapeKey } from '../../src/core/visual/types';
import { writeContent } from './lib';

type P = { v: object; name: string };
const shape = (s: ShapeKey, color: string, name: string): P => ({
  v: { t: 'shape', s, color },
  name,
});
const art = (k: ArtKey, name: string): P => ({ v: { t: 'art', k }, name });

const SETS: [P[], string[], number][] = [
  // Bentuk dasar (siluet berbeda jelas dulu).
  [
    [
      shape('lingkaran', 'merah', 'lingkaran'),
      shape('segitiga', 'biru', 'segitiga'),
      shape('persegi', 'kuning', 'persegi'),
      shape('bintang', 'hijau', 'bintang'),
    ],
    ['A', 'B', 'C'],
    1,
  ],
  [
    [
      shape('hati', 'merah muda', 'hati'),
      shape('persegi', 'oranye', 'persegi'),
      shape('bulanSabit', 'kuning', 'bulan sabit'),
      shape('segitiga', 'ungu', 'segitiga'),
    ],
    ['A', 'B', 'C'],
    1,
  ],
  [
    [
      shape('bintang', 'kuning', 'bintang'),
      shape('oval', 'hijau', 'oval'),
      shape('persegiPanjang', 'biru', 'persegi panjang'),
      shape('hati', 'merah', 'hati'),
    ],
    ['A', 'B', 'C'],
    2,
  ],
  [
    [
      shape('segiEnam', 'oranye', 'segi enam'),
      shape('lingkaran', 'biru', 'lingkaran'),
      shape('belahKetupat', 'merah', 'belah ketupat'),
      shape('trapesium', 'hijau', 'trapesium'),
    ],
    ['B', 'C'],
    3,
  ],
  [
    [
      shape('segiLima', 'ungu', 'segi lima'),
      shape('segiEnam', 'kuning', 'segi enam'),
      shape('oval', 'merah', 'oval'),
      shape('lingkaran', 'hijau', 'lingkaran'),
    ],
    ['C'],
    5,
  ],
  [
    [
      shape('persegi', 'biru', 'persegi'),
      shape('persegiPanjang', 'merah', 'persegi panjang'),
      shape('belahKetupat', 'kuning', 'belah ketupat'),
      shape('trapesium', 'ungu', 'trapesium'),
    ],
    ['C'],
    5,
  ],
];
// Hewan: tiap set berisi siluet yang jelas berbeda (set awal), lalu yang mirip (set akhir).
const animalSets: [ArtKey, string][][] = [
  [
    ['gajah', 'gajah'],
    ['ayamJago', 'ayam jago'],
    ['ikan', 'ikan'],
    ['ular', 'ular'],
  ],
  [
    ['kucing', 'kucing'],
    ['burungHantu', 'burung hantu'],
    ['katak', 'katak'],
    ['paus', 'paus'],
  ],
  [
    ['kuda', 'kuda'],
    ['bebek', 'bebek'],
    ['lebah', 'lebah'],
    ['monyet', 'monyet'],
  ],
  [
    ['singa', 'singa'],
    ['angsa', 'angsa'],
    ['tokek', 'tokek'],
    ['lumbaLumba', 'lumba-lumba'],
  ],
  [
    ['sapi', 'sapi'],
    ['anakAyam', 'anak ayam'],
    ['jangkrik', 'jangkrik'],
    ['owa', 'owa'],
  ],
  [
    ['kambing', 'kambing'],
    ['merak', 'merak'],
    ['nyamuk', 'nyamuk'],
    ['anjingLaut', 'anjing laut'],
  ],
  [
    ['beruang', 'beruang'],
    ['kakatua', 'kakatua'],
    ['komodo', 'komodo'],
    ['gorila', 'gorila'],
  ],
  [
    ['tikus', 'tikus'],
    ['elang', 'elang'],
    ['cicak', 'cicak'],
    ['kudaNil', 'kuda nil'],
  ],
  [
    ['harimau', 'harimau'],
    ['kalkun', 'kalkun'],
    ['tonggeret', 'tonggeret'],
    ['zebra', 'zebra'],
  ],
  [
    ['domba', 'domba'],
    ['gagak', 'gagak'],
    ['ikan', 'ikan'],
    ['gajah', 'gajah'],
  ],
  [
    ['anjing', 'anjing'],
    ['pelatuk', 'pelatuk'],
    ['ular', 'ular'],
    ['paus', 'paus'],
  ],
  [
    ['kerbau', 'kerbau'],
    ['pipit', 'burung pipit'],
    ['katak', 'katak'],
    ['monyet', 'monyet'],
  ],
  [
    ['keledai', 'keledai'],
    ['beo', 'beo'],
    ['lebah', 'lebah'],
    ['lumbaLumba', 'lumba-lumba'],
  ],
  [
    ['serigala', 'serigala'],
    ['merpati', 'merpati'],
    ['komodo', 'komodo'],
    ['anakAyam', 'anak ayam'],
  ],
  [
    ['kucing', 'kucing'],
    ['anjing', 'anjing'],
    ['tikus', 'tikus'],
    ['singa', 'singa'],
  ],
  [
    ['bebek', 'bebek'],
    ['angsa', 'angsa'],
    ['ayamBetina', 'ayam betina'],
    ['kalkun', 'kalkun'],
  ],
  [
    ['kuda', 'kuda'],
    ['zebra', 'zebra'],
    ['keledai', 'keledai'],
    ['kambing', 'kambing'],
  ],
  [
    ['lebah', 'lebah'],
    ['nyamuk', 'nyamuk'],
    ['jangkrik', 'jangkrik'],
    ['tonggeret', 'tonggeret'],
  ],
  [
    ['tokek', 'tokek'],
    ['cicak', 'cicak'],
    ['komodo', 'komodo'],
    ['ular', 'ular'],
  ],
  [
    ['paus', 'paus'],
    ['lumbaLumba', 'lumba-lumba'],
    ['ikan', 'ikan'],
    ['anjingLaut', 'anjing laut'],
  ],
];
animalSets.forEach((set, i) =>
  SETS.push([
    set.map(([k, n]) => art(k, n)),
    i < 6 ? ['A', 'B', 'C'] : i < 14 ? ['B', 'C'] : ['C'],
    i < 6 ? 2 : i < 14 ? 3 : 5,
  ]),
);
const BUDAYA: [ArtKey, string][][] = [
  [
    ['rumahGadang', 'rumah gadang'],
    ['rumahJoglo', 'rumah joglo'],
    ['rumahHonai', 'rumah honai'],
    ['rumahTongkonan', 'rumah tongkonan'],
  ],
  [
    ['rumahPanggung', 'rumah panggung'],
    ['rumahHonai', 'rumah honai'],
    ['monas', 'monas'],
    ['borobudur', 'borobudur'],
  ],
  [
    ['angklung', 'angklung'],
    ['gong', 'gong'],
    ['sasando', 'sasando'],
    ['suling', 'suling'],
  ],
  [
    ['wayang', 'wayang'],
    ['ondelOndel', 'ondel-ondel'],
    ['blangkon', 'blangkon'],
    ['kolintang', 'kolintang'],
  ],
  [
    ['menaraEiffel', 'menara Eiffel'],
    ['monas', 'monas'],
    ['borobudur', 'borobudur'],
    ['rumahGadang', 'rumah gadang'],
  ],
];
BUDAYA.forEach((set, i) =>
  SETS.push([set.map(([k, n]) => art(k, n)), i < 2 ? ['B', 'C'] : ['C'], 4]),
);
const KENDARAAN: [ArtKey, string][][] = [
  [
    ['mobil', 'mobil'],
    ['pesawat', 'pesawat'],
    ['perahuLayar', 'perahu layar'],
    ['sepeda', 'sepeda'],
  ],
  [
    ['bus', 'bus'],
    ['helikopter', 'helikopter'],
    ['roket', 'roket'],
    ['becak', 'becak'],
  ],
  [
    ['truk', 'truk'],
    ['balonUdara', 'balon udara'],
    ['kapalSelam', 'kapal selam'],
    ['motor', 'motor'],
  ],
  [
    ['keretaApi', 'kereta api'],
    ['bajaj', 'bajaj'],
    ['pinisi', 'pinisi'],
    ['traktor', 'traktor'],
  ],
  [
    ['ambulans', 'ambulans'],
    ['delman', 'delman'],
    ['gondola', 'gondola'],
    ['ekskavator', 'ekskavator'],
  ],
  [
    ['taksi', 'taksi'],
    ['skuter', 'skuter'],
    ['jukung', 'jukung'],
    ['keretaGantung', 'kereta gantung'],
  ],
  [
    ['busTingkat', 'bus tingkat'],
    ['trem', 'trem'],
    ['keretaUap', 'kereta uap'],
    ['keretaCepat', 'kereta cepat'],
  ],
  [
    ['speedboat', 'speedboat'],
    ['kapalFeri', 'kapal feri'],
    ['sampan', 'sampan'],
    ['pesawatBaling', 'pesawat baling-baling'],
  ],
  [
    ['jip', 'jip'],
    ['jeepney', 'jeepney'],
    ['angkot', 'angkot'],
    ['mobilPolisi', 'mobil polisi'],
  ],
  [
    ['pemadam', 'mobil pemadam'],
    ['trukMolen', 'truk molen'],
    ['buldoser', 'buldoser'],
    ['trukSampah', 'truk sampah'],
  ],
];
KENDARAAN.forEach((set, i) =>
  SETS.push([
    set.map(([k, n]) => art(k, n)),
    i < 4 ? ['A', 'B', 'C'] : i < 6 ? ['B', 'C'] : ['C'],
    i < 4 ? 2 : 4,
  ]),
);

const seen = new Set<string>();
const items = SETS.map(([set, age, diff], i) => {
  let speak = `Pasangkan ${set[0]!.name} dan ${set[1]!.name} ke bayangannya.`;
  if (seen.has(speak)) speak = `Pasangkan ${set[1]!.name} dan ${set[0]!.name} ke bayangannya.`;
  seen.add(speak);
  return {
    id: `set-${i + 1}`,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: 'Pasangkan ke bayangannya',
    data: { pieces: set.map((p) => p.v), tileSay: set.map((p) => p.name) },
    tags: ['bentuk'],
    review: i >= 26 && i < 31 ? 'perlu-ditinjau' : 'ditinjau',
  };
});

await writeContent('pasang-bentuk', items);
