import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'cari-warna',
  number: 0,
  title: 'Cari Warna',
  ageMin: 2,
  ageMax: 6,
  domain: 'sensorik',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 0,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenal dan menyebut nama warna. Bentuk benda dibuat sama dalam satu soal agar anak hanya fokus pada warna.',
  aktivitas: [
    'Kumpulkan 3 benda di rumah dengan warna berbeda (mis. tutup botol). Sebut warnanya, lalu minta anak menunjuk "Mana yang merah?".',
    'Berburu warna: ajak anak mencari satu benda berwarna kuning di dalam rumah.',
    'Untuk 5-6 tahun: pasangkan dua benda yang warnanya mirip tetapi berbeda (oranye dan kuning), lalu bicarakan bedanya.',
  ],
};
