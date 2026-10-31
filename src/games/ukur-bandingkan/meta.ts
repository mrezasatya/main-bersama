import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'ukur-bandingkan',
  number: 22,
  title: 'Ukur dan Bandingkan',
  ageMin: 4,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 6,
};

export const guide: CompanionGuide = {
  tujuan:
    'Membandingkan panjang, tinggi, berat, dan isi, lalu mengukur dengan satuan tidak baku (kotak, jengkal, langkah).',
  aktivitas: [
    'Ukur panjang meja dengan jengkal tangan anak dan tangan Anda. Kenapa hasilnya berbeda?',
    'Buat timbangan dari gantungan baju dan dua kantong plastik untuk membandingkan berat mainan.',
    'Saat mandi, tuang air dari gelas ke botol: mana yang muat lebih banyak?',
  ],
};
