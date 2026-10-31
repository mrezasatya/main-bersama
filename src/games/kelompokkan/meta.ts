import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'kelompokkan',
  number: 16,
  title: 'Kelompokkan',
  ageMin: 3,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 5,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengelompokkan benda menurut aturan (warna, bentuk, tempat hidup hewan, buah-sayur, jenis kendaraan): dasar berpikir logis dan klasifikasi.',
  aktivitas: [
    'Pilah cucian: kaus kaki dan baju, atau baju ayah dan baju anak.',
    'Saat belanja, kelompokkan belanjaan: buah, sayur, dan bukan makanan.',
    'Gunakan mangkuk berwarna untuk mengelompokkan kancing atau mainan kecil menurut warnanya.',
  ],
};
