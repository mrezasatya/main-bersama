import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'dari-mana-asalnya',
  number: 24,
  title: 'Dari Mana Asalnya?',
  ageMin: 4,
  ageMax: 6,
  domain: 'sains',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 3,
};

export const guide: CompanionGuide = {
  tujuan:
    'Memahami asal makanan dan benda sehari-hari (susu, telur, nasi, kertas), serta cuaca, siang-malam, dan musim.',
  aktivitas: [
    'Saat ke pasar atau dapur, tanyakan asal bahan makanan: "Telur ini dari mana? Nasi ini dari mana?"',
    'Amati langit setiap hari selama seminggu dan gambar cuacanya: cerah, berawan, atau hujan.',
    'Tanam kacang hijau di kapas basah, lalu amati bersama setiap hari.',
  ],
};
