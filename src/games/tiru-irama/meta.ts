import type { CompanionGuide, GameMeta } from '../../types';
import { PHRASES } from './phrases';

export const meta: GameMeta = {
  id: 'tiru-irama',
  number: 29,
  title: 'Tiru Irama',
  ageMin: 3,
  ageMax: 6,
  domain: 'musik',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 1,
};

export const phrases: string[] = Object.values(PHRASES);

export const guide: CompanionGuide = {
  tujuan:
    'Mendengar dan menirukan pola irama (pendek "ta", panjang "taa"); melatih perhatian, ingatan kerja, dan koordinasi.',
  aktivitas: [
    'Main "gema": Anda menepuk pola pendek (ta-ta-taa), anak menirukan. Gantian, biarkan anak membuat pola untuk Anda.',
    'Ketuk meja, panci, atau botol berisi beras sebagai alat musik. Bandingkan bunyinya.',
    'Jalan sesuai irama: langkah cepat untuk "ta", langkah besar dan pelan untuk "taa".',
  ],
};
