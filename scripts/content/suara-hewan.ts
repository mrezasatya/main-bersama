/**
 * Bank konten #4 Suara Hewan Nusantara & Dunia.
 * Kolom: kunci gambar, nama, tiruan bunyi, efek Web Audio, habitat, cocok untuk usia 2-3, kesulitan.
 * Tiruan bunyi dan habitat berstatus 'perlu-ditinjau' sampai diperiksa pemilik.
 */
import { ANIMALS, type AnimalKey } from '../../src/core/art/animals/specs';
import type { EffectName } from '../../src/core/audio/effects';
import { cap, pickFrom, seeded, writeContent } from './lib';

type Row = [AnimalKey | 'ikan', string, string, EffectName, string, boolean, 1 | 2 | 3 | 4 | 5];

const ROWS: Row[] = [
  ['kambing', 'kambing', 'mbeek mbeek', 'embik', 'peternakan', true, 1],
  ['domba', 'domba', 'beee beee', 'embik', 'peternakan', true, 2],
  ['sapi', 'sapi', 'mooo', 'lenguh', 'peternakan', true, 1],
  ['kerbau', 'kerbau', 'nguaak', 'lenguh', 'sawah', false, 3],
  ['kuda', 'kuda', 'hiii hiii', 'ringkik', 'peternakan', true, 1],
  ['keledai', 'keledai', 'hi-ho hi-ho', 'ringkik', 'peternakan', false, 3],
  ['kucing', 'kucing', 'meong', 'meong', 'rumah', true, 1],
  ['anjing', 'anjing', 'guk guk', 'gonggong', 'rumah', true, 1],
  ['singa', 'singa', 'auum', 'auman', 'padang rumput', true, 1],
  ['harimau', 'harimau', 'grrr', 'geram', 'hutan', true, 2],
  ['serigala', 'serigala', 'auuuuu', 'lolong', 'hutan', false, 3],
  ['beruang', 'beruang', 'groar', 'auman', 'hutan', false, 3],
  ['tikus', 'tikus', 'cit cit', 'cicit', 'rumah', true, 2],
  ['gajah', 'gajah', 'prooot', 'terompetGajah', 'hutan', true, 1],
  ['kudaNil', 'kuda nil', 'hoh hoh hoh', 'lenguh', 'sungai', false, 4],
  ['monyet', 'monyet', 'uu uu aa aa', 'koak', 'hutan', true, 1],
  ['gorila', 'gorila', 'dug dug dug', 'pukulDada', 'hutan', false, 3],
  ['owa', 'owa jawa', 'uwa uwa', 'lolong', 'hutan', false, 4],
  ['ayamJago', 'ayam jago', 'kukuruyuk', 'kokok', 'peternakan', true, 1],
  ['ayamBetina', 'ayam betina', 'petok petok', 'koak', 'peternakan', true, 2],
  ['anakAyam', 'anak ayam', 'ciap ciap', 'cicit', 'peternakan', true, 1],
  ['bebek', 'bebek', 'kwek kwek', 'kwek', 'sawah', true, 1],
  ['angsa', 'angsa', 'hong hong', 'kwek', 'danau', false, 3],
  ['kalkun', 'kalkun', 'gluk gluk gluk', 'kwok', 'peternakan', false, 4],
  ['pipit', 'burung pipit', 'cuit cuit', 'kicau', 'taman', true, 2],
  ['burungHantu', 'burung hantu', 'huu huu', 'hu', 'hutan', true, 2],
  ['gagak', 'burung gagak', 'gaak gaak', 'koak', 'hutan', false, 3],
  ['merpati', 'burung merpati', 'kurrr kurrr', 'dekut', 'taman', false, 2],
  ['perkutut', 'burung perkutut', 'perkutuuut', 'dekut', 'taman', false, 4],
  ['tekukur', 'burung tekukur', 'te-ku-kur', 'dekut', 'sawah', false, 5],
  ['kakatua', 'burung kakatua', 'kreeek kreeek', 'pekik', 'hutan', false, 3],
  ['beo', 'burung beo', 'halo halo', 'kicau', 'hutan', false, 3],
  ['elang', 'burung elang', 'kiiik kiiik', 'pekik', 'gunung', false, 3],
  ['pelatuk', 'burung pelatuk', 'tok tok tok', 'ketuk', 'hutan', false, 3],
  ['merak', 'burung merak', 'kiyaau', 'pekik', 'taman', false, 4],
  ['katak', 'katak', 'kwok kwok', 'kwok', 'sawah', true, 1],
  ['tokek', 'tokek', 'tokek tokek', 'decak', 'rumah', false, 2],
  ['cicak', 'cicak', 'cek cek cek', 'decak', 'rumah', false, 3],
  ['ular', 'ular', 'sssss', 'desis', 'hutan', true, 2],
  ['komodo', 'komodo', 'hhhhh', 'desis', 'pulau Komodo', false, 4],
  ['lebah', 'lebah', 'nguung nguung', 'dengung', 'taman', true, 1],
  ['nyamuk', 'nyamuk', 'ngiiing', 'ngiing', 'rumah', false, 2],
  ['jangkrik', 'jangkrik', 'krik krik', 'krik', 'sawah', true, 2],
  ['tonggeret', 'tonggeret', 'kreeeet', 'dengir', 'hutan', false, 4],
  ['lumbaLumba', 'lumba-lumba', 'iik iik iik', 'siulLumba', 'laut', false, 2],
  ['paus', 'paus', 'uuuuung', 'nyanyiPaus', 'laut', false, 3],
  ['ikan', 'ikan', 'blub blub', 'gelembung', 'sungai', true, 1],
  ['anjingLaut', 'anjing laut', 'aur aur', 'gonggong', 'laut', false, 3],
];

const family = (k: Row[0]) => (k === 'ikan' ? 'laut' : ANIMALS[k].kind);
const rng = seeded(4);
const easy = ROWS.filter((r) => r[5]).map((r) => r[0]);
const all = ROWS.map((r) => r[0]);

const items = ROWS.map(([key, name, sound, sfx, habitat, forA, diff]) => {
  // Pengecoh 1: hewan akrab dari keluarga lain (dipakai usia 2-3).
  const d1 = pickFrom(
    rng,
    easy.filter((k) => family(k) !== family(key)),
    1,
    new Set([key]),
  );
  // Pengecoh 2-3: untuk usia 4, boleh dari keluarga yang sama agar lebih menantang.
  const same = all.filter((k) => family(k) === family(key));
  const d2 = pickFrom(rng, diff >= 3 ? same : all, 1, new Set([key, ...d1]));
  const d3 = pickFrom(rng, all, 1, new Set([key, ...d1, ...d2]));
  return {
    id: key,
    ageGroup: forA ? ['A', 'B'] : ['B'],
    difficulty: diff,
    speak: `Siapa yang berbunyi ${sound}?`,
    label: cap(name),
    assetKey: key,
    data: {
      distractors: [...d1, ...d2, ...d3],
      sfx,
      promptSfx: true,
      habitat,
      speakAlso: [`${cap(name)} berbunyi ${sound}!`],
    },
    tags: ['hewan', family(key), habitat],
    review: 'perlu-ditinjau',
  };
});

await writeContent('suara-hewan', items);
