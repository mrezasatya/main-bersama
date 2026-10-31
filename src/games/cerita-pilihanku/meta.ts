import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'cerita-pilihanku',
  number: 28,
  title: 'Cerita Pilihanku',
  ageMin: 4,
  ageMax: 6,
  domain: 'sosial',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 3,
};

export const guide: CompanionGuide = {
  tujuan:
    'Belajar nilai (berbagi, jujur, sabar, menolong, bertanggung jawab) lewat cerita pendek dan pilihan sederhana; pilihan yang kurang baik dijelaskan akibatnya dengan lembut.',
  aktivitas: [
    'Ceritakan pengalaman nyata hari ini dan tanyakan: "Kalau kamu jadi dia, apa yang akan kamu lakukan?"',
    'Bermain peran dengan boneka: satu boneka sedih, ajak anak mencari cara menolongnya.',
    'Puji tindakan baik yang anak lakukan secara spesifik: "Terima kasih sudah berbagi mainan dengan adik."',
  ],
};
