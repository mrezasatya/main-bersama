import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'kendaraan',
  number: 26,
  title: 'Kendaraan dan Suaranya',
  ageMin: 2,
  ageMax: 4,
  domain: 'sains',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 1,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal nama kendaraan darat, laut, dan udara (termasuk kendaraan tradisional dan dari negara lain) beserta bunyinya.',
  aktivitas: [
    'Saat di jalan, ajak anak menyebut kendaraan yang lewat dan menirukan bunyinya ("tin tin", "kring kring").',
    'Kelompokkan mainan kendaraan menjadi tiga: yang berjalan di darat, berlayar di air, dan terbang di udara.',
    'Bermain peran naik angkot atau becak dengan kursi-kursi berjajar; anak menjadi sopir, Anda penumpangnya.',
  ],
};
