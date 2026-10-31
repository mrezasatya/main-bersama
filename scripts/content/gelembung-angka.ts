/** Bank konten #18 Gelembung Angka: kenali angka, urutan, lebih besar/kecil, loncat bilangan (50). */
import { seeded, writeContent } from './lib';

const rng = seeded(18);
const num = (n: number) => ({ t: 'num', n });
const near = (n: number, k: number, lo = 0, hi = 20) => {
  const out: number[] = [];
  for (let d = 1; out.length < k && d < 25; d++)
    for (const c of [n + d, n - d])
      if (c >= lo && c <= hi && out.length < k && !out.includes(c)) out.push(c);
  return out;
};
// Pengecoh pertama jauh (mudah), lalu yang dekat (lebih menantang).
const opts = (ans: number, lo = 0, hi = 20) => {
  const far = ans + 6 <= hi ? ans + 6 : ans - 6 >= lo ? ans - 6 : ans === hi ? lo : hi;
  const close = near(ans, 3, lo, hi).filter((c) => c !== far);
  return [ans, far, ...close].slice(0, 4).map(num);
};

const items: unknown[] = [];
const add = (id: string, age: string[], diff: number, speak: string, data: object) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data: { layout: 'bubbles', ...data },
    tags: ['angka'],
    review: 'ditinjau',
  });

for (let n = 1; n <= 10; n++)
  add(`kenal-${n}`, n <= 6 ? ['A', 'B'] : ['B', 'C'], n <= 6 ? 1 : 2, `Mana angka ${n}?`, {
    options: opts(n, 1, 10),
  });
for (let n = 11; n <= 20; n++)
  add(`kenal-${n}`, ['C'], 3, `Mana angka ${n}?`, { options: opts(n, 10, 20) });
for (let n = 1; n <= 8; n++)
  add(`sesudah-${n}`, n <= 4 ? ['B', 'C'] : ['C'], 3, `Angka berapa sesudah ${n}?`, {
    cue: { t: 'row', items: [num(n), { t: 'q' }] },
    options: opts(n + 1, 1, 10),
  });
for (const n of [3, 5, 7, 9, 10])
  add(`sebelum-${n}`, ['C'], 4, `Angka berapa sebelum ${n}?`, {
    cue: { t: 'row', items: [{ t: 'q' }, num(n)] },
    options: opts(n - 1, 1, 10),
  });
const pairs: [number, number][] = [
  [2, 7],
  [5, 3],
  [8, 4],
  [1, 6],
  [9, 6],
  [4, 10],
  [7, 8],
];
pairs.forEach(([a, b], i) =>
  add(
    `besar-${a}-${b}`,
    i < 3 ? ['A', 'B', 'C'] : i < 4 ? ['B', 'C'] : ['C'],
    i < 4 ? 2 : 4,
    `Mana yang lebih besar, ${a} atau ${b}?`,
    {
      options: [num(Math.max(a, b)), num(Math.min(a, b))],
    },
  ),
);
const small: [number, number][] = [
  [3, 8],
  [6, 2],
  [9, 5],
  [7, 10],
];
small.forEach(([a, b], i) =>
  add(
    `kecil-${a}-${b}`,
    i < 2 ? ['B', 'C'] : ['C'],
    i < 2 ? 3 : 4,
    `Mana yang lebih kecil, ${a} atau ${b}?`,
    {
      options: [num(Math.min(a, b)), num(Math.max(a, b))],
    },
  ),
);
const skips: [number[], number, string][] = [
  [[2, 4, 6], 8, 'Dua, empat, enam, lalu berapa?'],
  [[5, 10, 15], 20, 'Lima, sepuluh, lima belas, lalu berapa?'],
  [[1, 3, 5], 7, 'Satu, tiga, lima, lalu berapa?'],
];
skips.forEach(([seq, ans, text], i) =>
  add(`loncat-${i}`, ['C'], 5, text, {
    cue: { t: 'row', items: [...seq.map(num), { t: 'q' }] },
    options: opts(ans, 1, 20),
  }),
);
const urut: [number, number, string[]][] = [
  [1, 3, ['A', 'B']],
  [1, 5, ['A', 'B', 'C']],
  [1, 8, ['B', 'C']],
];
urut.forEach(([a, b, age]) => {
  const tiles = Array.from({ length: b - a + 1 }, (_, i) => num(a + i));
  items.push({
    id: `urut-${a}-${b}`,
    ageGroup: age,
    difficulty: b <= 3 ? 1 : b <= 5 ? 2 : 3,
    speak: `Pecahkan gelembung dari ${a} sampai ${b}!`,
    label: `Pecahkan gelembung ${a} sampai ${b}`,
    data: { mode: 'urut', tiles },
    tags: ['angka', 'urutan'],
    review: 'ditinjau',
  });
});
void rng;

await writeContent('gelembung-angka', items);
