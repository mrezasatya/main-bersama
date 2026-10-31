import type { CompanionGuide, GameMeta } from '../../types';
import { PHRASES } from './phrases';

export const meta: GameMeta = {
  id: 'pola-batik',
  number: 10,
  title: 'Pola Batik',
  ageMin: 4,
  ageMax: 6,
  domain: 'matematika',
  curriculum: ['Singapore Math'],
  usesAudio: true,
  phase: 6,
};

export const phrases: string[] = Object.values(PHRASES);

export const guide: CompanionGuide = {
  tujuan:
    'Mengenali dan melanjutkan pola (AB, AAB, ABB, ABC, AABB, pola tumbuh) dengan motif batik Nusantara, lalu membuat pola sendiri.',
  aktivitas: [
    'Susun pola dengan benda nyata: sendok-garpu-sendok-garpu, atau kancing merah-biru-merah-biru.',
    'Amati kain batik di rumah atau di pasar: motif apa yang berulang?',
    'Buat kalung dari makaroni berwarna dengan pola pilihan anak.',
  ],
};
