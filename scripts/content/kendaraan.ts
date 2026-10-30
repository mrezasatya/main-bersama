/**
 * Bank konten #26 Kendaraan dan Suaranya.
 * Mode 'nama': "Mana bus?"; mode 'bunyi': "Kendaraan apa yang berbunyi nguing nguing?".
 */
import type { VehicleKey } from '../../src/core/art/vehicles/specs';
import type { EffectName } from '../../src/core/audio/effects';
import { cap, pickFrom, seeded, writeContent } from './lib';

type Cat = 'darat' | 'laut' | 'udara';
type Row = [
  VehicleKey,
  string,
  string,
  EffectName,
  Cat,
  'A' | 'B',
  'nama' | 'bunyi',
  1 | 2 | 3 | 4 | 5,
  string?,
];

const ROWS: Row[] = [
  ['mobil', 'mobil', 'tin tin', 'klakson', 'darat', 'A', 'nama', 1],
  ['bus', 'bus', 'teeet teeet', 'klakson', 'darat', 'A', 'nama', 1],
  ['truk', 'truk', 'brum brum', 'mesin', 'darat', 'A', 'nama', 1],
  ['motor', 'motor', 'brem brem', 'mesin', 'darat', 'A', 'nama', 1],
  ['sepeda', 'sepeda', 'kring kring', 'bel', 'darat', 'A', 'nama', 1],
  ['keretaApi', 'kereta api', 'tut tut', 'peluitKereta', 'darat', 'A', 'nama', 1],
  ['pesawat', 'pesawat', 'ngeeeng', 'jet', 'udara', 'A', 'nama', 1],
  ['kapalFeri', 'kapal feri', 'tuuut', 'tutKapal', 'laut', 'A', 'nama', 2],
  ['perahuLayar', 'perahu layar', 'wuuus', 'angin', 'laut', 'A', 'nama', 2],
  ['helikopter', 'helikopter', 'dug dug dug', 'baling', 'udara', 'A', 'nama', 1],
  ['mobilPolisi', 'mobil polisi', 'uwiu uwiu', 'sirene', 'darat', 'A', 'nama', 2],
  ['pemadam', 'mobil pemadam kebakaran', 'ngiung ngiung', 'sirene', 'darat', 'A', 'nama', 2],
  ['becak', 'becak', 'kring kring', 'bel', 'darat', 'A', 'nama', 2],
  ['traktor', 'traktor', 'dug dug dug', 'mesin', 'darat', 'A', 'nama', 2],
  ['balonUdara', 'balon udara', 'wusss', 'semburApi', 'udara', 'A', 'nama', 2],
  ['roket', 'roket', 'wuuuss', 'roket', 'udara', 'A', 'nama', 2],
  ['sampan', 'sampan', 'plung plung', 'dayung', 'laut', 'A', 'nama', 2],
  ['ekskavator', 'ekskavator', 'grung grung', 'derek', 'darat', 'A', 'nama', 2],
  ['ambulans', 'ambulans', 'nguing nguing', 'sirene', 'darat', 'B', 'bunyi', 2],
  ['bajaj', 'bajaj', 'tek tek tek', 'tekTek', 'darat', 'B', 'bunyi', 3],
  ['delman', 'delman', 'tuk tik tak', 'tapalKuda', 'darat', 'B', 'bunyi', 3],
  ['keretaUap', 'kereta uap', 'jes jes jes', 'rodaKereta', 'darat', 'B', 'bunyi', 3],
  ['kapalSelam', 'kapal selam', 'blub blub', 'gelembung', 'laut', 'B', 'bunyi', 3],
  ['taksi', 'taksi', 'tin tin', 'klakson', 'darat', 'B', 'nama', 2],
  ['angkot', 'angkot', 'tin tin', 'klakson', 'darat', 'B', 'nama', 3],
  ['jip', 'jip', 'brum brum', 'mesin', 'darat', 'B', 'nama', 3],
  ['jeepney', 'jeepney', 'tin tin', 'klakson', 'darat', 'B', 'nama', 4, 'Jeepney ada di Filipina.'],
  ['busSekolah', 'bus sekolah', 'teeet teeet', 'klakson', 'darat', 'B', 'nama', 2],
  ['busTingkat', 'bus tingkat', 'teeet teeet', 'klakson', 'darat', 'B', 'nama', 3],
  ['trem', 'trem', 'ting ting', 'bel', 'darat', 'B', 'nama', 4],
  ['trukSampah', 'truk sampah', 'brum brum', 'mesin', 'darat', 'B', 'nama', 2],
  ['trukMolen', 'truk molen', 'grung grung', 'derek', 'darat', 'B', 'nama', 3],
  ['keretaCepat', 'kereta cepat', 'wuuuss', 'jet', 'darat', 'B', 'nama', 3],
  ['skuter', 'skuter', 'brem brem', 'mesin', 'darat', 'B', 'nama', 3],
  ['tukTuk', 'tuk-tuk', 'tek tek', 'tekTek', 'darat', 'B', 'nama', 4, 'Tuk-tuk ada di Thailand.'],
  ['gerobakSapi', 'gerobak sapi', 'kriet kriet', 'derek', 'darat', 'B', 'nama', 4],
  ['buldoser', 'buldoser', 'grung grung', 'derek', 'darat', 'B', 'nama', 3],
  [
    'pinisi',
    'kapal pinisi',
    'wuuus',
    'angin',
    'laut',
    'B',
    'nama',
    4,
    'Kapal pinisi berasal dari Sulawesi Selatan.',
  ],
  [
    'jukung',
    'jukung',
    'byur byur',
    'dayung',
    'laut',
    'B',
    'nama',
    4,
    'Jukung adalah perahu dari Bali.',
  ],
  [
    'gondola',
    'gondola',
    'plung plung',
    'dayung',
    'laut',
    'B',
    'nama',
    5,
    'Gondola ada di kota Venesia, Italia.',
  ],
  ['speedboat', 'speedboat', 'ngeeeng', 'mesin', 'laut', 'B', 'nama', 3],
  ['pesawatBaling', 'pesawat baling-baling', 'brrrr', 'baling', 'udara', 'B', 'nama', 3],
  ['keretaGantung', 'kereta gantung', 'ting ting', 'bel', 'udara', 'B', 'nama', 4],
];

const rng = seeded(26);
const catOf = new Map(ROWS.map((r) => [r[0], r[4]]));
const easy = ROWS.filter((r) => r[5] === 'A').map((r) => r[0]);
const all = ROWS.map((r) => r[0]);

const items = ROWS.map(([key, name, sound, sfx, cat, age, mode, diff, fact]) => {
  // Usia 2-3: pengecoh dari kategori lain (darat vs laut vs udara) agar mudah dibedakan.
  const d1 = pickFrom(
    rng,
    easy.filter((k) => catOf.get(k) !== cat),
    1,
    new Set([key]),
  );
  // Usia 4: pengecoh dari kategori yang sama.
  const rest = pickFrom(
    rng,
    all.filter((k) => catOf.get(k) === cat),
    2,
    new Set([key, ...d1]),
  );
  return {
    id: key,
    ageGroup: age === 'A' ? ['A', 'B'] : ['B'],
    difficulty: diff,
    speak: mode === 'nama' ? `Mana ${name}?` : `Kendaraan apa yang berbunyi ${sound}?`,
    label: cap(name),
    assetKey: key,
    data: {
      distractors: [...d1, ...rest],
      sfx,
      promptSfx: mode === 'bunyi',
      mode,
      kategori: cat,
      speakAlso: [`${cap(name)} berbunyi ${sound}!`, ...(fact ? [fact] : [])],
    },
    tags: ['kendaraan', cat],
    review: fact ? 'perlu-ditinjau' : 'ditinjau',
  };
});

await writeContent('kendaraan', items);
