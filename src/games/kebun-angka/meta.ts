import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'kebun-angka',
  number: 6,
  title: 'Kebun Angka',
  ageMin: 5,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 5,
};

export const guide: CompanionGuide = {
  tujuan:
    'Memahami bilangan dengan alat bantu Singapore Math: kotak sepuluh (ten-frame), ikatan bilangan (number bond), dan model batang (bar model).',
  aktivitas: [
    'Buat kotak sepuluh dari karton telur (potong 2 x 5 lubang). Isi dengan kancing dan hitung bersama.',
    'Pecah 5 kelereng ke dua tangan: 2 dan 3, 4 dan 1. Tanyakan: "Ada berapa cara membuat lima?"',
    'Gambar model batang dari potongan kertas warna untuk cerita sederhana: 3 burung, datang 2 lagi.',
  ],
};
