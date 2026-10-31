import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'warna-batik',
  number: 14,
  title: 'Warna Batik',
  ageMin: 3,
  ageMax: 6,
  domain: 'budaya',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 6,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mewarnai bebas templat batik, wayang, dan flora-fauna: mengekspresikan kreativitas sambil mengenal motif Nusantara.',
  aktivitas: [
    'Warnai kain putih bekas dengan spidol kain atau cat air, lalu pajang hasilnya.',
    'Cap motif dengan potongan kentang atau wortel yang dicelup cat.',
    'Ceritakan arti motif batik sederhana, misalnya kawung yang mirip buah aren.',
  ],
};
