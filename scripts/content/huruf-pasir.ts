/** Bank konten #7 Huruf Pasir: 26 huruf kecil, 10 huruf besar, 10 angka (46). */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

const WORDS: Record<string, [string, ArtKey] | null> = {
  a: ['apel', 'apel'],
  b: ['bola', 'bola'],
  c: ['cicak', 'cicak'],
  d: ['durian', 'durian'],
  e: ['es krim', 'esKrim'],
  f: ['foto', 'kamera'],
  g: ['gajah', 'gajah'],
  h: ['harimau', 'harimau'],
  i: ['ikan', 'ikan'],
  j: ['jeruk', 'jeruk'],
  k: ['kucing', 'kucing'],
  l: ['lebah', 'lebah'],
  m: ['monyet', 'monyet'],
  n: ['nanas', 'nanas'],
  o: ['obor', 'obor'],
  p: ['pisang', 'pisang'],
  q: null,
  r: ['roti', 'roti'],
  s: ['sapi', 'sapi'],
  t: ['tikus', 'tikus'],
  u: ['ular', 'ular'],
  v: ['vas', 'vas'],
  w: ['wortel', 'wortel'],
  x: ['xilofon', 'xilofon'],
  y: ['yoyo', 'yoyo'],
  z: ['zebra', 'zebra'],
};
const EASY = new Set(['a', 'i', 'u', 'e', 'o', 'l', 'c', 'o']);
const MEDIUM = new Set(['b', 'd', 'p', 's', 't', 'n', 'm', 'r', 'v', 'w', 'x', 'j', 'h']);
const DIGITS = [
  'nol',
  'satu',
  'dua',
  'tiga',
  'empat',
  'lima',
  'enam',
  'tujuh',
  'delapan',
  'sembilan',
];
const UPPER = ['A', 'I', 'U', 'E', 'O', 'B', 'M', 'S', 'K', 'P'];

const letterItem = (ch: string, upper: boolean) => {
  const w = WORDS[ch.toLowerCase()];
  const name = upper ? `${ch} besar` : ch;
  return {
    id: upper ? `besar-${ch}` : `kecil-${ch}`,
    ageGroup: upper ? ['B', 'C'] : EASY.has(ch) ? ['A', 'B', 'C'] : ['B', 'C'],
    difficulty: upper ? 3 : EASY.has(ch) ? 1 : MEDIUM.has(ch) ? 2 : 3,
    speak: `Ini huruf ${name}. Ayo telusuri dengan jarimu.`,
    label: `Telusuri huruf ${ch}`,
    data: {
      glyph: ch,
      ...(w ? { cue: { t: 'art', k: w[1] } } : {}),
      speakAlso: [
        w ? `${name}, seperti ${w[0]}!` : 'Huruf q jarang dipakai dalam bahasa Indonesia.',
      ],
    },
    tags: ['huruf', upper ? 'besar' : 'kecil'],
    review: 'ditinjau',
  };
};

const items = [
  ...Object.keys(WORDS).map((ch) => letterItem(ch, false)),
  ...UPPER.map((ch) => letterItem(ch, true)),
  ...DIGITS.map((name, n) => ({
    id: `angka-${n}`,
    ageGroup: n >= 1 && n <= 5 ? ['A', 'B', 'C'] : ['B', 'C'],
    difficulty: n <= 3 ? 1 : 2,
    speak: `Ini angka ${name}. Ayo telusuri dengan jarimu.`,
    label: `Telusuri angka ${n}`,
    data: {
      glyph: String(n),
      ...(n > 0 ? { cue: { t: 'group', k: 'bintang', n } } : {}),
      speakAlso: [
        n === 0 ? 'Nol artinya tidak ada.' : `${name[0]!.toUpperCase()}${name.slice(1)}!`,
      ],
    },
    tags: ['angka'],
    review: 'ditinjau',
  })),
];

await writeContent('huruf-pasir', items);
