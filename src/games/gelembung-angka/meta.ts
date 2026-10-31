import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'gelembung-angka',
  number: 18,
  title: 'Gelembung Angka',
  ageMin: 3,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 2,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal lambang bilangan, urutan, membandingkan lebih besar dan lebih kecil, serta loncat bilangan.',
  aktivitas: [
    'Tempel kertas bernomor 1-10 di lantai. Lompat sambil menyebut angka, maju dan mundur.',
    'Bandingkan dua tumpukan kancing: mana yang lebih banyak? Lalu tulis angkanya.',
    'Hitung loncat dua-dua dengan sepasang kaus kaki atau sepatu: 2, 4, 6, 8.',
  ],
};
