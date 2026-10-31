import type { ColorName } from '../../core/art/colors';

/** Hasil campuran dua warna (urutan bebas). Selain yang tercantum, hasilnya "warna baru". */
const MIX: Record<string, ColorName> = {
  'kuning+merah': 'oranye',
  'biru+kuning': 'hijau',
  'biru+merah': 'ungu',
  'merah+putih': 'merah muda',
  'biru+putih': 'biru muda',
  'hitam+putih': 'abu-abu',
  'hijau+merah': 'cokelat',
};

export function mixColors(a: ColorName, b: ColorName): ColorName | null {
  if (a === b) return a;
  return MIX[[a, b].sort().join('+')] ?? null;
}

export const PHRASES = {
  baru: 'Wah, jadi warna baru!',
  lagi: 'Coba campur warna lain, ya.',
  pilihDua: 'Ketuk dua pot cat.',
} as const;

export const madeColor = (c: ColorName) => `Jadi warna ${c}!`;
