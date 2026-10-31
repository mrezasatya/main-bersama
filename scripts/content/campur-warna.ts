/** Bank konten #2 Campur Warna: 40 percobaan (campur, hasil campuran, terang-gelap, warna benda alam). */
import type { ArtKey } from '../../src/core/art/keys';
import type { ColorName } from '../../src/core/art/colors';
import { writeContent } from './lib';

const items: unknown[] = [];
const sw = (c: ColorName) => ({ t: 'swatch', c });
const add = (id: string, age: string[], diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['warna', tag],
    review: 'ditinjau',
  });

// Laboratorium: buat warna dengan mencampur dua pot cat.
const LAB: [ColorName, ColorName[], string[]][] = [
  ['oranye', ['merah', 'kuning', 'biru'], ['A', 'B', 'C']],
  ['hijau', ['merah', 'kuning', 'biru'], ['A', 'B', 'C']],
  ['ungu', ['merah', 'kuning', 'biru'], ['A', 'B', 'C']],
  ['merah muda', ['merah', 'putih', 'biru'], ['B', 'C']],
  ['biru muda', ['biru', 'putih', 'kuning'], ['B', 'C']],
  ['abu-abu', ['hitam', 'putih', 'merah'], ['B', 'C']],
  ['hijau', ['biru', 'kuning', 'putih', 'merah'], ['C']],
  ['oranye', ['kuning', 'merah', 'putih', 'biru'], ['C']],
  ['ungu', ['biru', 'merah', 'kuning', 'putih'], ['C']],
  ['merah muda', ['putih', 'merah', 'kuning', 'hitam'], ['C']],
];
LAB.forEach(([target, pots, age], i) =>
  add(
    `buat-${i}`,
    age,
    age.length === 3 ? 1 : age.length === 2 ? 2 : 4,
    `Ayo buat warna ${target}! Campur dua warna.${i >= 6 ? ' Ada lebih banyak pilihan.' : ''}`,
    { mode: 'campur', target, pots, instr: sw(target) },
    'campur',
  ),
);
// Hasil campuran (pilih).
const MIX: [ColorName, ColorName, ColorName, ColorName[]][] = [
  ['merah', 'kuning', 'oranye', ['hijau', 'ungu', 'biru']],
  ['kuning', 'biru', 'hijau', ['oranye', 'merah', 'ungu']],
  ['merah', 'biru', 'ungu', ['hijau', 'oranye', 'kuning']],
  ['merah', 'putih', 'merah muda', ['hijau', 'biru', 'ungu']],
  ['biru', 'putih', 'biru muda', ['merah', 'oranye', 'hijau']],
  ['hitam', 'putih', 'abu-abu', ['kuning', 'merah muda', 'hijau']],
  ['kuning', 'merah', 'oranye', ['ungu', 'biru', 'hijau']],
  ['biru', 'kuning', 'hijau', ['merah', 'ungu', 'oranye']],
  ['biru', 'merah', 'ungu', ['kuning', 'hijau', 'oranye']],
  ['putih', 'merah', 'merah muda', ['biru muda', 'ungu', 'oranye']],
];
MIX.forEach(([a, b, res, others], i) =>
  add(
    `hasil-${i}`,
    i < 3 ? ['A', 'B', 'C'] : i < 6 ? ['B', 'C'] : ['C'],
    i < 3 ? 1 : 3,
    `${a[0]!.toUpperCase()}${a.slice(1)} dicampur ${b} jadi warna apa?`,
    {
      cue: { t: 'mix', a, b },
      options: [res, ...others].map(sw),
      labels: [res, ...others],
      speakAlso: [`${a[0]!.toUpperCase()}${a.slice(1)} dan ${b} jadi ${res}!`],
    },
    'hasil',
  ),
);
// Terang dan gelap.
const TERANG: [ColorName, ColorName, 'terang' | 'gelap'][] = [
  ['biru muda', 'biru', 'terang'],
  ['merah muda', 'merah', 'terang'],
  ['abu-abu', 'hitam', 'terang'],
  ['biru', 'biru muda', 'gelap'],
  ['hitam', 'abu-abu', 'gelap'],
  ['merah', 'merah muda', 'gelap'],
];
TERANG.forEach(([ans, other, kind], i) =>
  add(
    `${kind}-${i}`,
    ['B', 'C'],
    3,
    `Mana warna yang lebih ${kind}, ${ans} atau ${other}?`,
    {
      options: [sw(ans), sw(other)],
      labels: [ans, other],
      speakAlso: [`${ans[0]!.toUpperCase()}${ans.slice(1)} lebih ${kind}.`],
    },
    'terang-gelap',
  ),
);
// Warna benda alam.
const ALAM: [ArtKey, string, ColorName, ColorName[]][] = [
  ['daun', 'daun', 'hijau', ['ungu', 'biru', 'merah']],
  ['pisang', 'pisang matang', 'kuning', ['biru', 'ungu', 'hitam']],
  ['tomat', 'tomat', 'merah', ['biru', 'hijau', 'ungu']],
  ['wortel', 'wortel', 'oranye', ['biru', 'ungu', 'hijau']],
  ['anggur', 'anggur ini', 'ungu', ['kuning', 'oranye', 'hijau']],
  ['matahari', 'matahari', 'kuning', ['biru', 'hijau', 'ungu']],
  ['awan', 'awan', 'putih', ['merah', 'hijau', 'oranye']],
  ['batu', 'batu', 'abu-abu', ['merah muda', 'kuning', 'hijau']],
  ['pohon', 'batang pohon', 'cokelat', ['biru', 'merah muda', 'ungu']],
  ['jeruk', 'jeruk', 'oranye', ['ungu', 'biru', 'merah muda']],
  ['tetesAir', 'air laut', 'biru', ['merah', 'cokelat', 'kuning']],
  ['stroberi', 'stroberi', 'merah', ['biru', 'hijau', 'ungu']],
  ['kakao', 'cokelat batangan', 'cokelat', ['biru', 'hijau', 'merah muda']],
  ['semangka', 'kulit semangka', 'hijau', ['merah', 'kuning', 'ungu']],
];
ALAM.forEach(([k, name, ans, others], i) =>
  add(
    `alam-${i}`,
    i < 6 ? ['A', 'B', 'C'] : ['B', 'C'],
    i < 6 ? 1 : 2,
    `Apa warna ${name}?`,
    {
      cue: { t: 'art', k: k === 'kakao' ? 'cokelat' : k },
      options: [ans, ...others].map(sw),
      labels: [ans, ...others],
      speakAlso: [`Warna ${name} ${ans}.`],
    },
    'alam',
  ),
);

await writeContent('campur-warna', items);
