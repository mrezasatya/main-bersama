import type { FlagKey } from '../art/flagKeys';
import type { ArtKey } from '../art/keys';
import type { ReviewStatus } from '../../types';

export type StickerCategory = 'alam' | 'hewan' | 'budaya' | 'benda' | 'dunia';

export interface Sticker {
  id: string;
  name: string;
  category: StickerCategory;
  /** Gambar khusus stiker di core/art/stickers (salah satu dari artKey/art/flag). */
  artKey?: string;
  /** Gambar dari registri gambar umum. */
  art?: ArtKey;
  flag?: FlagKey;
  review: ReviewStatus;
}

const S = (
  id: string,
  name: string,
  category: StickerCategory,
  art: ArtKey,
  review: ReviewStatus = 'perlu-ditinjau',
): Sticker => ({
  id,
  name,
  category,
  art,
  review,
});

/** Urutan = urutan terbuka. 60 stiker (Bagian 7 brief); stiker pertama di 3 bintang, lalu tiap 4 bintang. */
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
  // Fase 1-6: diambil dari gambar permainan.
  S('gajah', 'Gajah', 'hewan', 'gajah', 'ditinjau'),
  S('wayang', 'Wayang', 'budaya', 'wayang'),
  S('monas', 'Monas', 'budaya', 'monas'),
  S('harimau', 'Harimau', 'hewan', 'harimau', 'ditinjau'),
  S('ondel-ondel', 'Ondel-ondel', 'budaya', 'ondelOndel'),
  S('menara-eiffel', 'Menara Eiffel', 'dunia', 'menaraEiffel'),
  S('owa-jawa', 'Owa Jawa', 'hewan', 'owa'),
  S('batik-kawung', 'Batik Kawung', 'budaya', 'batikKawung'),
  S('pinisi', 'Kapal Pinisi', 'benda', 'pinisi'),
  S('merak', 'Merak', 'hewan', 'merak', 'ditinjau'),
  S('gong', 'Gong', 'budaya', 'gong'),
  S('piramida', 'Piramida', 'dunia', 'piramida'),
  S('elang', 'Elang', 'hewan', 'elang', 'ditinjau'),
  S('rumah-joglo', 'Rumah Joglo', 'budaya', 'rumahJoglo'),
  S('becak', 'Becak', 'benda', 'becak', 'ditinjau'),
  S('lumba-lumba', 'Lumba-lumba', 'hewan', 'lumbaLumba', 'ditinjau'),
  S('sasando', 'Sasando', 'budaya', 'sasando'),
  S('tembok-besar', 'Tembok Besar Tiongkok', 'dunia', 'tembokBesar'),
  S('borobudur', 'Candi Borobudur', 'budaya', 'borobudur'),
  S('burung-hantu', 'Burung Hantu', 'hewan', 'burungHantu', 'ditinjau'),
  S('tumpeng', 'Nasi Tumpeng', 'budaya', 'tumpeng'),
  S('gondola', 'Gondola', 'dunia', 'gondola'),
  S('kolintang', 'Kolintang', 'budaya', 'kolintang'),
  S('paus', 'Paus', 'hewan', 'paus', 'ditinjau'),
  S('bajaj', 'Bajaj', 'benda', 'bajaj', 'ditinjau'),
  S('rumah-honai', 'Rumah Honai', 'budaya', 'rumahHonai'),
  S('bus-tingkat', 'Bus Tingkat', 'dunia', 'busTingkat'),
  S('rendang', 'Rendang', 'budaya', 'rendang'),
  S('kakatua', 'Kakatua', 'hewan', 'kakatua', 'ditinjau'),
  S('suling', 'Suling', 'budaya', 'suling'),
  S('delman', 'Delman', 'benda', 'delman', 'ditinjau'),
  S('rumah-tongkonan', 'Rumah Tongkonan', 'budaya', 'rumahTongkonan'),
  S('tuk-tuk', 'Tuk-tuk', 'dunia', 'tukTuk'),
  S('zebra', 'Zebra', 'hewan', 'zebra', 'ditinjau'),
  S('sate', 'Sate', 'budaya', 'sate'),
  S('jukung', 'Jukung', 'benda', 'jukung'),
  S('blangkon', 'Blangkon', 'budaya', 'blangkon'),
  S('jeepney', 'Jeepney', 'dunia', 'jeepney'),
  S('singa', 'Singa', 'hewan', 'singa', 'ditinjau'),
  S('rumah-panggung', 'Rumah Panggung', 'budaya', 'rumahPanggung'),
  S('klepon', 'Klepon', 'budaya', 'klepon'),
  S('kereta-cepat', 'Kereta Cepat', 'dunia', 'keretaCepat'),
  S('beo', 'Burung Beo', 'hewan', 'beo', 'ditinjau'),
  S('soto', 'Soto', 'budaya', 'soto'),
  {
    id: 'bendera-jepang',
    name: 'Bendera Jepang',
    category: 'dunia',
    flag: 'jepang',
    review: 'perlu-ditinjau',
  },
  {
    id: 'bendera-brasil',
    name: 'Bendera Brasil',
    category: 'dunia',
    flag: 'brasil',
    review: 'perlu-ditinjau',
  },
  {
    id: 'bendera-india',
    name: 'Bendera India',
    category: 'dunia',
    flag: 'india',
    review: 'perlu-ditinjau',
  },
  {
    id: 'bendera-italia',
    name: 'Bendera Italia',
    category: 'dunia',
    flag: 'italia',
    review: 'perlu-ditinjau',
  },
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
