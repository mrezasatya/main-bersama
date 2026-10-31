import type { CompanionGuide, GameMeta } from '../../types';
import { NAMED_COLORS, type ColorName } from '../../core/art/colors';
import { PHRASES, madeColor } from './mix';

export const meta: GameMeta = {
  id: 'campur-warna',
  number: 2,
  title: 'Campur Warna',
  ageMin: 2,
  ageMax: 5,
  domain: 'sensorik',
  curriculum: ['Cambridge'],
  usesAudio: true,
  phase: 4,
};

/** Kalimat tetap: hasil campuran untuk setiap warna, ditambah petunjuk laboratorium. */
export const phrases: string[] = [
  ...(Object.keys(NAMED_COLORS) as ColorName[]).map(madeColor),
  ...Object.values(PHRASES),
];

export const guide: CompanionGuide = {
  tujuan:
    'Bereksperimen mencampur warna, mengenal warna primer dan sekunder, terang-gelap, dan warna benda di alam.',
  aktivitas: [
    'Campur cat air atau pewarna makanan di gelas plastik bening: merah dan kuning jadi apa?',
    'Main lilin malam (plastisin): uleni dua warna sampai menjadi warna baru.',
    'Jalan-jalan berburu warna: cari benda hijau, kuning, dan merah di halaman.',
  ],
};
