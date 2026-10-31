import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'ayo-berkebun',
  number: 23,
  title: 'Ayo Berkebun',
  ageMin: 3,
  ageMax: 6,
  domain: 'sains',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 3,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal tahap tumbuh tanaman (biji sampai berbuah), kebutuhan tanaman (air, cahaya, tanah), alat berkebun, dan hasil kebun.',
  aktivitas: [
    'Tanam biji cabai, tomat, atau kacang di pot kecil. Beri anak tugas menyiram setiap pagi.',
    'Ukur tinggi tanaman tiap minggu dengan sedotan atau stik es krim, lalu bandingkan.',
    'Saat makan buah, kumpulkan bijinya dan bicarakan: "Kalau ditanam, biji ini akan tumbuh jadi apa?"',
  ],
};
