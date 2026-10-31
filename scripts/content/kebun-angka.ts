/** Bank konten #6 Kebun Angka (5-6 tahun): ten-frame, ikatan bilangan, model batang (45). */
import { NUMBER_WORDS } from '../../src/core/audio/phrases';
import { writeContent } from './lib';

const items: unknown[] = [];
const num = (n: number) => ({ t: 'num', n });
const others = (n: number, lo: number, hi: number) =>
  [n + 2, n - 1, n + 1, n - 2, n + 3].filter((x) => x >= lo && x <= hi && x !== n).slice(0, 3);
const add = (id: string, diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: ['C'],
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['bilangan', tag],
    review: 'ditinjau',
  });

const TF: [number, string][] = [
  [3, 'apel'],
  [5, 'jeruk'],
  [7, 'tomat'],
  [8, 'stroberi'],
  [10, 'mangga'],
  [6, 'rambutan'],
  [9, 'telur'],
  [12, 'bintang'],
  [15, 'bola'],
  [18, 'kue'],
];
TF.forEach(([n, k], i) =>
  add(
    `tenframe-${n}`,
    i < 6 ? 1 : 3,
    `Berapa ${k} di kotak sepuluh ini?`,
    {
      cue: { t: 'tenframe', n, k },
      options: [n, ...others(n, 1, 20)].map(num),
      speakAlso: [`Ada ${NUMBER_WORDS[n]} ${k}.`],
    },
    'ten-frame',
  ),
);
[9, 7, 6, 8, 5, 4, 3, 2].forEach((n) =>
  add(
    `ke-sepuluh-${n}`,
    3,
    `Ada ${NUMBER_WORDS[n]}. Berapa lagi supaya jadi sepuluh?`,
    {
      cue: { t: 'tenframe', n },
      options: [10 - n, ...others(10 - n, 1, 9)].map(num),
      speakAlso: [`${n} dan ${10 - n} jadi sepuluh.`],
    },
    'pasangan-10',
  ),
);
[
  [2, 3],
  [4, 1],
  [3, 3],
  [5, 2],
  [4, 4],
  [6, 3],
  [5, 5],
  [7, 2],
  [6, 4],
].forEach(([a = 0, b = 0]) =>
  add(
    `ikatan-utuh-${a}-${b}`,
    3,
    `${NUMBER_WORDS[a]![0]!.toUpperCase()}${NUMBER_WORDS[a]!.slice(1)} dan ${NUMBER_WORDS[b]}, jadi berapa?`,
    {
      cue: { t: 'bond', whole: null, a, b },
      options: [a + b, ...others(a + b, 1, 12)].map(num),
      speakAlso: [`${a} dan ${b} jadi ${a + b}.`],
    },
    'ikatan',
  ),
);
[
  [5, 2],
  [6, 4],
  [7, 3],
  [8, 5],
  [9, 4],
  [10, 7],
  [8, 2],
  [6, 1],
  [10, 5],
].forEach(([w = 0, a = 0]) =>
  add(
    `ikatan-bagian-${w}-${a}`,
    4,
    `${NUMBER_WORDS[w]![0]!.toUpperCase()}${NUMBER_WORDS[w]!.slice(1)} itu ${NUMBER_WORDS[a]} dan berapa?`,
    {
      cue: { t: 'bond', whole: w, a, b: null },
      options: [w - a, ...others(w - a, 0, 10)].map(num),
      speakAlso: [`${w} itu ${a} dan ${w - a}.`],
    },
    'ikatan',
  ),
);
const TAMBAH: [number, number, string][] = [
  [3, 2, 'bebek di kolam, datang lagi'],
  [4, 3, 'burung di pohon, hinggap lagi'],
  [5, 4, 'kelereng di toples, dimasukkan lagi'],
  [6, 2, 'ikan di akuarium, dimasukkan lagi'],
  [2, 7, 'kupu-kupu di taman, datang lagi'],
];
TAMBAH.forEach(([a, b, cerita]) => {
  const [benda, ...rest] = cerita.split(' ');
  add(
    `batang-tambah-${a}-${b}`,
    4,
    `Ada ${NUMBER_WORDS[a]} ${benda} ${rest.join(' ')} ${NUMBER_WORDS[b]}. Berapa semuanya?`,
    {
      cue: { t: 'bar', parts: [a, b], total: null },
      options: [a + b, ...others(a + b, 1, 12)].map(num),
      speakAlso: [`${a} tambah ${b} sama dengan ${a + b}.`],
    },
    'model-batang',
  );
});
const KURANG: [number, number, string][] = [
  [8, 3, 'kue, dimakan'],
  [10, 4, 'balon, terbang'],
  [7, 5, 'permen, dibagikan'],
  [9, 2, 'apel, dijual'],
];
KURANG.forEach(([t, a, cerita]) => {
  const [benda, aksi] = cerita.split(', ');
  add(
    `batang-kurang-${t}-${a}`,
    5,
    `Ada ${NUMBER_WORDS[t]} ${benda}, ${aksi} ${NUMBER_WORDS[a]}. Sisa berapa?`,
    {
      cue: { t: 'bar', parts: [a, null], total: t },
      options: [t - a, ...others(t - a, 0, 10)].map(num),
      speakAlso: [`${t} kurang ${a} sama dengan ${t - a}.`],
    },
    'model-batang',
  );
});

await writeContent('kebun-angka', items);
