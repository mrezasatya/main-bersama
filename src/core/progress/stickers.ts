import type { ReviewStatus } from '../../types';

export type StickerCategory = 'alam' | 'hewan' | 'budaya' | 'benda';

export interface Sticker {
  id: string;
  name: string;
  category: StickerCategory;
  /** Kunci komponen di core/art/stickers. */
  artKey: string;
  review: ReviewStatus;
}

/**
 * Urutan = urutan terbuka. Fase 0 memuat 12 stiker pertama; album ditambah
 * bertahap sampai minimal 60 stiker (Bagian 7 brief).
 */
export const STICKERS: readonly Sticker[] = [
  { id: 'matahari', name: 'Matahari', category: 'alam', artKey: 'matahari', review: 'ditinjau' },
  { id: 'pelangi', name: 'Pelangi', category: 'alam', artKey: 'pelangi', review: 'ditinjau' },
  { id: 'kupu-kupu', name: 'Kupu-kupu', category: 'hewan', artKey: 'kupuKupu', review: 'ditinjau' },
  { id: 'ikan', name: 'Ikan', category: 'hewan', artKey: 'ikan', review: 'ditinjau' },
  { id: 'gunung', name: 'Gunung', category: 'alam', artKey: 'gunung', review: 'ditinjau' },
  {
    id: 'layang-layang',
    name: 'Layang-layang',
    category: 'benda',
    artKey: 'layangan',
    review: 'ditinjau',
  },
  {
    id: 'pohon-kelapa',
    name: 'Pohon Kelapa',
    category: 'alam',
    artKey: 'kelapa',
    review: 'ditinjau',
  },
  {
    id: 'perahu-layar',
    name: 'Perahu Layar',
    category: 'benda',
    artKey: 'perahu',
    review: 'ditinjau',
  },
  {
    id: 'bunga-melati',
    name: 'Bunga Melati',
    category: 'budaya',
    artKey: 'melati',
    review: 'perlu-ditinjau',
  },
  {
    id: 'angklung',
    name: 'Angklung',
    category: 'budaya',
    artKey: 'angklung',
    review: 'perlu-ditinjau',
  },
  {
    id: 'rumah-gadang',
    name: 'Rumah Gadang',
    category: 'budaya',
    artKey: 'rumahGadang',
    review: 'perlu-ditinjau',
  },
  { id: 'komodo', name: 'Komodo', category: 'hewan', artKey: 'komodo', review: 'perlu-ditinjau' },
];

export const FIRST_STICKER_AT = 3;
export const STARS_PER_STICKER = 4;

export function stickerThreshold(index: number): number {
  return FIRST_STICKER_AT + index * STARS_PER_STICKER;
}

export function unlockedCount(totalStars: number, total = STICKERS.length): number {
  if (totalStars < FIRST_STICKER_AT) return 0;
  return Math.min(total, Math.floor((totalStars - FIRST_STICKER_AT) / STARS_PER_STICKER) + 1);
}

/** Stiker yang baru terbuka ketika total bintang naik dari `before` ke `after`. */
export function newlyUnlocked(before: number, after: number): Sticker[] {
  return STICKERS.slice(unlockedCount(before), unlockedCount(after));
}

export function starsToNextSticker(totalStars: number): number | null {
  const n = unlockedCount(totalStars);
  if (n >= STICKERS.length) return null;
  return stickerThreshold(n) - totalStars;
}
