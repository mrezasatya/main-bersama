import type { CompanionGuide, GameMeta } from '../../types';
import { PHRASES } from './phrases';

export const meta: GameMeta = {
  id: 'toko-kecil',
  number: 21,
  title: 'Toko Kecil',
  ageMin: 5,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 6,
};

export const phrases: string[] = Object.values(PHRASES);

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal uang rupiah, menukar nilai uang, membandingkan nilai, dan membayar belanjaan dengan uang pas.',
  aktivitas: [
    'Main warung-warungan dengan uang mainan atau uang asli pecahan kecil. Gantian menjadi penjual dan pembeli.',
    'Ajak anak membayar sendiri jajanan kecil di warung dengan uang pas.',
    'Kumpulkan koin di celengan, lalu hitung bersama setiap minggu.',
  ],
};
