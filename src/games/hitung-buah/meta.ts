import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'hitung-buah',
  number: 5,
  title: 'Hitung Buah',
  ageMin: 3,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 5,
};

export const guide: CompanionGuide = {
  tujuan:
    'Berhitung dengan alur konkret-gambar-lambang: menghitung buah satu per satu, membandingkan banyak-sedikit, lalu menambah dan mengurang.',
  aktivitas: [
    'Hitung buah sungguhan di dapur sambil menyentuh satu per satu: "Satu, dua, tiga apel."',
    'Main warung: anak membeli 2 jeruk, lalu ditambah 1 lagi. Ada berapa sekarang?',
    'Gunakan biji-bijian (kacang merah, jagung) di piring untuk menambah dan mengurangi.',
  ],
};
