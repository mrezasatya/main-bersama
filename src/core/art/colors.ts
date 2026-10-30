/** Palet warna bernama. Dipakai konten (kunci) dan gambar (nilai). */
export const NAMED_COLORS = {
  merah: '#E5484D',
  biru: '#3B7BF5',
  kuning: '#FFC83A',
  hijau: '#34B865',
  oranye: '#FF8A33',
  ungu: '#9A62DD',
  cokelat: '#9C6239',
  'merah muda': '#FF8DB8',
  putih: '#FFFFFF',
  hitam: '#2B2B33',
} as const;

export type ColorName = keyof typeof NAMED_COLORS;

export const isColorName = (v: unknown): v is ColorName =>
  typeof v === 'string' && v in NAMED_COLORS;

/** Menggelapkan (amt < 0) atau menerangkan (amt > 0) warna hex. */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = (shift: number) => {
    const c = (n >> shift) & 0xff;
    const v = amt < 0 ? c * (1 + amt) : c + (255 - c) * amt;
    return Math.round(Math.max(0, Math.min(255, v)));
  };
  return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('')}`;
}
