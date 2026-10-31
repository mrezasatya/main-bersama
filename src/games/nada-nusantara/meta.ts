import type { CompanionGuide, GameMeta } from '../../types';
import { PHRASES } from './phrases';

export const meta: GameMeta = {
  id: 'nada-nusantara',
  number: 11,
  title: 'Nada Nusantara',
  ageMin: 2,
  ageMax: 6,
  domain: 'musik',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 1,
};

export const phrases: string[] = Object.values(PHRASES);

export const guide: CompanionGuide = {
  tujuan:
    'Bereksplorasi bebas dengan bunyi alat musik Nusantara dan dunia; anak 4-6 tahun juga berlatih mendengar lalu menirukan nada.',
  aktivitas: [
    'Buat "gamelan dapur": isi gelas kaca dengan air setinggi berbeda, lalu ketuk pelan dengan sendok. Mana yang nadanya paling tinggi?',
    'Pukul panci, kardus, dan botol plastik bergantian. Ajak anak menebak benda mana yang berbunyi tanpa melihat.',
    'Nyanyikan dua atau tiga nada ("do-mi-sol"), lalu minta anak menirukan dengan suaranya.',
  ],
};
