import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'urutkan-besar-kecil',
  number: 3,
  title: 'Urutkan Besar-Kecil',
  ageMin: 2,
  ageMax: 5,
  domain: 'matematika',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 4,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengurutkan benda menurut ukuran, panjang, jumlah, dan isi (seperti menara merah muda Montessori).',
  aktivitas: [
    'Susun gelas plastik atau mangkuk dari yang terkecil sampai terbesar, lalu tumpuk menjadi menara.',
    'Urutkan anggota keluarga dari yang paling pendek sampai paling tinggi.',
    'Isi botol bekas dengan air berbeda banyak, lalu urutkan dari yang paling sedikit.',
  ],
};
