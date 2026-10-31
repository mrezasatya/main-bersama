import type { CompanionGuide, GameMeta } from '../../types';
import { PART_KEYS, thatIs } from './parts';

export const meta: GameMeta = {
  id: 'panca-indra',
  number: 27,
  title: 'Panca Indra dan Tubuhku',
  ageMin: 2,
  ageMax: 5,
  domain: 'sains',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 1,
};

export const phrases: string[] = PART_KEYS.map(thatIs);

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal nama bagian tubuh dan lima indra (melihat, mendengar, mencium, mengecap, meraba) beserta kegunaannya.',
  aktivitas: [
    'Nyanyi sambil menunjuk: "Kepala, pundak, lutut, kaki". Pelan dulu, lalu makin cepat.',
    'Kotak misteri: masukkan kapas, batu, dan sendok ke kotak. Anak meraba tanpa melihat, lalu menebak.',
    'Uji rasa dan bau dengan aman: cicipi sedikit gula, garam, dan jeruk; cium bunga atau kayu manis. Bicarakan bedanya.',
  ],
};
