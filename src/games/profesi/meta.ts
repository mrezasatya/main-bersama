import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'profesi',
  number: 25,
  title: 'Profesi dan Alatnya',
  ageMin: 3,
  ageMax: 6,
  domain: 'sosial',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 2,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal pekerjaan di sekitar kita, alat yang dipakai, tempat bekerja, dan manfaatnya bagi orang lain.',
  aktivitas: [
    'Bermain peran: dokter-dokteran, warung-warungan, atau tukang pos yang mengantar surat ke kamar.',
    'Saat keluar rumah, sebut pekerjaan yang terlihat (satpam, penjual sayur, sopir) dan ucapkan terima kasih kepada mereka.',
    'Tanyakan "Kalau besar mau jadi apa?" lalu cari bersama alat yang dipakai pekerjaan itu.',
  ],
};
