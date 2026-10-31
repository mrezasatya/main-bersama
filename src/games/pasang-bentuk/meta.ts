import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'pasang-bentuk',
  number: 1,
  title: 'Pasang Bentuk',
  ageMin: 2,
  ageMax: 4,
  domain: 'sensorik',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 4,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mencocokkan benda dengan bayangannya (siluet): melatih persepsi bentuk, koordinasi mata-tangan, dan motorik halus.',
  aktivitas: [
    'Jiplak benda dapur (gelas, sendok, tutup panci) di kertas, lalu minta anak meletakkan benda di atas bayangannya.',
    'Main bayangan dengan senter di dinding: tebak benda dari bayangannya.',
    'Gunakan papan bentuk kayu atau potongan kardus berbentuk lingkaran, segitiga, dan persegi.',
  ],
};
