import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'rumah-bentuk',
  number: 20,
  title: 'Rumah Bentuk',
  ageMin: 3,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 5,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal bangun datar dan bangun ruang, ciri-cirinya (sisi, sudut), dan menemukan bentuk pada benda di sekitar.',
  aktivitas: [
    'Berburu bentuk di rumah: jam (lingkaran), pintu (persegi panjang), atap (segitiga).',
    'Buat bentuk dari sedotan atau lidi dan lilin malam: hitung sisi dan sudutnya.',
    'Kumpulkan kotak, bola, dan kaleng bekas; coba mana yang bisa menggelinding dan mana yang bisa ditumpuk.',
  ],
};
