import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'suara-hewan',
  number: 4,
  title: 'Suara Hewan',
  ageMin: 2,
  ageMax: 4,
  domain: 'sains',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 1,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal hewan Nusantara dan dunia lewat bunyinya: mendengar dengan saksama, lalu mencocokkan bunyi dengan gambar.',
  aktivitas: [
    'Tirukan bunyi hewan bergantian: Anda berbunyi "mbeek", anak menebak hewannya, lalu bertukar peran.',
    'Saat jalan-jalan pagi, dengarkan bunyi di sekitar (ayam, burung, cicak) dan sebut nama hewannya.',
    'Buat kandang dari kardus untuk mainan hewan, lalu kelompokkan: hewan rumah, peternakan, dan hutan.',
  ],
};
