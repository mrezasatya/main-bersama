import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'cari-yang-beda',
  number: 15,
  title: 'Cari yang Beda',
  ageMin: 3,
  ageMax: 6,
  domain: 'sensorik',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 5,
};

export const guide: CompanionGuide = {
  tujuan:
    'Melatih pengamatan dan berpikir logis: menemukan benda yang berbeda warna, bentuk, jumlah, atau kelompoknya.',
  aktivitas: [
    'Letakkan tiga sendok dan satu garpu di meja. Tanyakan: "Mana yang berbeda? Kenapa?"',
    'Main "Aku melihat": sebutkan ciri benda dan minta anak menemukannya.',
    'Saat membereskan mainan, minta anak memisahkan satu benda yang tidak termasuk kelompoknya.',
  ],
};
