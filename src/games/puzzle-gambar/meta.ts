import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'puzzle-gambar',
  number: 17,
  title: 'Puzzle Gambar',
  ageMin: 2,
  ageMax: 6,
  domain: 'motorik',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 4,
};

export const guide: CompanionGuide = {
  tujuan:
    'Menyusun potongan gambar (2-20 keping): melatih pemecahan masalah, persepsi ruang, dan ketekunan.',
  aktivitas: [
    'Gunting gambar dari kardus bekas kemasan menjadi 2-6 potong, lalu susun bersama.',
    'Mulai dari puzzle kayu sederhana; tambah jumlah keping perlahan sesuai kemampuan anak.',
    'Biarkan anak mencoba sendiri dulu. Bantu dengan pertanyaan: "Bagian ini mirip kepala atau kaki?"',
  ],
};
