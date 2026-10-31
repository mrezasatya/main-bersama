/**
 * Bank konten #21 Toko Kecil (5-6 tahun): kenali rupiah, tukar, bandingkan nilai, bayar belanjaan (40).
 * Uang digambar sederhana (bukan tiruan uang asli), dengan nilai tertulis jelas.
 */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

const items: unknown[] = [];
const money = (v: number) => ({ t: 'money', v });
const rp = (v: number) => `${v.toLocaleString('id-ID')} rupiah`;
const KATA: Record<number, string> = {
  100: 'seratus',
  200: 'dua ratus',
  500: 'lima ratus',
  1000: 'seribu',
  2000: 'dua ribu',
  5000: 'lima ribu',
  10000: 'sepuluh ribu',
  20000: 'dua puluh ribu',
  50000: 'lima puluh ribu',
  100000: 'seratus ribu',
};
const add = (id: string, diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: ['C'],
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['uang', tag],
    review: 'ditinjau',
  });

const ALL = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
ALL.forEach((v, i) => {
  const others = ALL.filter((x) => x !== v);
  const o = [
    others[(i + 3) % others.length]!,
    others[(i + 6) % others.length]!,
    others[(i + 1) % others.length]!,
  ];
  add(
    `kenal-${v}`,
    v <= 1000 ? 2 : 3,
    `Mana uang ${KATA[v]} rupiah?`,
    { options: [v, ...o].map(money), speakAlso: [`Ini uang ${KATA[v]} rupiah.`] },
    'kenal',
  );
});
const TUKAR: [number, number, number, number[]][] = [
  [2, 500, 1000, [500, 2000, 5000]],
  [2, 1000, 2000, [1000, 5000, 500]],
  [5, 1000, 5000, [2000, 10000, 1000]],
  [2, 5000, 10000, [5000, 20000, 2000]],
  [2, 10000, 20000, [10000, 50000, 5000]],
  [5, 100, 500, [100, 1000, 200]],
  [2, 100, 200, [100, 500, 1000]],
  [5, 2000, 10000, [5000, 20000, 2000]],
];
TUKAR.forEach(([n, v, ans, o]) =>
  add(
    `tukar-${n}x${v}`,
    4,
    `${n === 2 ? 'Dua' : 'Lima'} uang ${KATA[v]} sama dengan uang berapa?`,
    {
      cue: { t: 'row', items: Array.from({ length: n }, () => money(v)) },
      options: [ans, ...o].map(money),
      speakAlso: [`${n === 2 ? 'Dua' : 'Lima'} kali ${KATA[v]} sama dengan ${KATA[ans]}.`],
    },
    'tukar',
  ),
);
const BANDING: [number, number][] = [
  [1000, 500],
  [2000, 5000],
  [10000, 2000],
  [500, 200],
  [50000, 20000],
  [100, 1000],
];
BANDING.forEach(([a, b]) =>
  add(
    `banding-${a}-${b}`,
    3,
    `Mana yang nilainya lebih besar, ${KATA[a]} atau ${KATA[b]}?`,
    {
      options: [money(Math.max(a, b)), money(Math.min(a, b))],
      speakAlso: [
        `${KATA[Math.max(a, b)]![0]!.toUpperCase()}${KATA[Math.max(a, b)]!.slice(1)} lebih besar.`,
      ],
    },
    'banding',
  ),
);
/** Bayar: ketuk uang sampai jumlahnya pas dengan harga. */
const BAYAR: [ArtKey, string, number, number[]][] = [
  ['permen', 'permen', 500, [100, 200, 500]],
  ['telur', 'telur', 2000, [500, 1000, 2000]],
  ['pisang', 'pisang', 1500, [500, 1000]],
  ['roti', 'roti', 3000, [1000, 2000]],
  ['apel', 'apel', 2500, [500, 1000, 2000]],
  ['susu', 'susu', 5000, [1000, 2000, 5000]],
  ['kue', 'kue', 1000, [100, 200, 500]],
  ['jeruk', 'jeruk', 700, [100, 200, 500]],
  ['esKrim', 'es krim', 4000, [1000, 2000]],
  ['buku', 'buku', 7000, [1000, 2000, 5000]],
  ['bola', 'bola', 10000, [2000, 5000, 10000]],
  ['kerupuk', 'kerupuk', 1200, [100, 200, 1000]],
  ['klepon', 'klepon', 3500, [500, 1000, 2000]],
  ['yoyo', 'yoyo', 6000, [1000, 5000]],
  ['sate', 'sate', 15000, [5000, 10000]],
  ['balon', 'balon', 2200, [200, 1000, 2000]],
];
BAYAR.forEach(([k, name, price, wallet]) =>
  add(
    `bayar-${k}`,
    price <= 2000 ? 3 : 5,
    `Harga ${name} ${rp(price)}. Ketuk uang untuk membayar pas.`,
    {
      mode: 'bayar',
      item: { t: 'art', k },
      price,
      wallet,
      speakAlso: [`Pas! Uangnya ${rp(price)}. Terima kasih sudah berbelanja.`],
    },
    'bayar',
  ),
);

await writeContent('toko-kecil', items);
