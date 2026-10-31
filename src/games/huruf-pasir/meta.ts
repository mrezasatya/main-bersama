import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'huruf-pasir',
  number: 7,
  title: 'Huruf Pasir',
  ageMin: 3,
  ageMax: 6,
  domain: 'bahasa',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 2,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal bentuk huruf dan angka lewat sentuhan (seperti huruf amplas Montessori), lalu menghubungkannya dengan bunyi dan kata.',
  aktivitas: [
    'Tulis huruf di atas nampan berisi pasir, garam, atau tepung dengan jari. Ucapkan bunyinya sambil menulis.',
    'Gunting huruf dari kertas amplas atau kardus, lalu ajak anak meraba sambil memejamkan mata dan menebak hurufnya.',
    'Main tebak benda: "Aku melihat sesuatu yang dimulai dengan huruf b..." (bola, buku, baju).',
  ],
};
