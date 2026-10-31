import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'pasangan-budaya',
  number: 9,
  title: 'Pasangan Budaya',
  ageMin: 3,
  ageMax: 6,
  domain: 'budaya',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 4,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal kekayaan budaya Nusantara dan dunia (rumah adat, makanan, alat musik, kendaraan tradisional) lewat permainan kartu memori.',
  aktivitas: [
    'Buat kartu memori sendiri dari foto atau gambar makanan khas daerah keluarga Anda.',
    'Saat bepergian atau menonton video, tunjukkan rumah adat atau tarian daerah dan sebut asalnya.',
    'Cicipi makanan khas daerah lain (klepon, soto, pempek) dan ceritakan dari mana asalnya.',
  ],
};
