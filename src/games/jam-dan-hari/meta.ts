import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'jam-dan-hari',
  number: 19,
  title: 'Jam dan Hari',
  ageMin: 4,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 3,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal waktu: pagi-siang-sore-malam, urutan kegiatan harian, nama hari dan bulan, serta membaca jam bulat.',
  aktivitas: [
    'Buat jadwal bergambar kegiatan harian (bangun, mandi, makan, sekolah, tidur) dan tempel di dinding.',
    'Nyanyikan nama-nama hari setiap pagi, lalu tanyakan: "Hari ini hari apa? Besok hari apa?"',
    'Gunakan jam dinding sungguhan: "Kalau jarum pendek di angka 7, kita sarapan."',
  ],
};
