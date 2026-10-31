import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'rangkai-suku-kata',
  number: 8,
  title: 'Rangkai Suku Kata',
  ageMin: 5,
  ageMax: 6,
  domain: 'bahasa',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 2,
};

export const guide: CompanionGuide = {
  tujuan: 'Membaca permulaan: menyusun suku kata menjadi kata bergambar dan mendengarkan bunyinya.',
  aktivitas: [
    'Tulis suku kata (ba, bi, bu, la, lo) di kartu kecil. Susun bersama menjadi kata nyata: ba-la, bo-la, bu-ku.',
    'Tepuk tangan untuk setiap suku kata: ku-cing (dua tepukan), ha-ri-mau (tiga tepukan).',
    'Beri label nama pada benda di rumah (meja, pintu, kursi) dan bacakan bersama setiap hari.',
  ],
};
