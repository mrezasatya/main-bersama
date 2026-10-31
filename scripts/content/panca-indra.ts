/**
 * Bank konten #27 Panca Indra dan Tubuhku.
 * Mode 'tunjuk': tunjuk bagian tubuh pada gambar. Mode 'indra': pilih indra untuk sebuah kegiatan.
 */
import type { ArtKey } from '../../src/core/art/keys';
import {
  ORGANS,
  ORGAN_SAY,
  PARTS,
  type Organ,
  type PartKey,
} from '../../src/games/panca-indra/parts';
import { pickFrom, seeded, writeContent } from './lib';

const TUNJUK: [PartKey, string[], 1 | 2 | 3 | 4 | 5][] = [
  ['rambut', ['A', 'B'], 1],
  ['mata', ['A', 'B'], 1],
  ['hidung', ['A', 'B'], 1],
  ['mulut', ['A', 'B'], 1],
  ['telinga', ['A', 'B'], 1],
  ['kepala', ['A', 'B'], 1],
  ['perut', ['A', 'B'], 1],
  ['tangan', ['A', 'B'], 1],
  ['kaki', ['A', 'B'], 1],
  ['pipi', ['B', 'C'], 2],
  ['leher', ['B', 'C'], 2],
  ['bahu', ['B', 'C'], 3],
  ['lutut', ['B', 'C'], 2],
  ['alis', ['C'], 3],
  ['dahi', ['C'], 4],
  ['dagu', ['C'], 4],
  ['siku', ['C'], 4],
  ['dada', ['C'], 3],
];

/** [indra, gambar petunjuk, kegiatan, untuk usia 2-3] */
const INDRA: [Organ, ArtKey, string, boolean][] = [
  ['mata', 'televisi', 'menonton televisi', true],
  ['mata', 'buku', 'melihat gambar di buku', false],
  ['mata', 'bintang', 'melihat bintang di langit', false],
  ['mata', 'balon', 'melihat warna balon', false],
  ['mata', 'merak', 'melihat bulu merak yang indah', false],
  ['telinga', 'ayamJago', 'mendengar ayam berkokok', true],
  ['telinga', 'ambulans', 'mendengar suara ambulans', false],
  ['telinga', 'lonceng', 'mendengar bunyi lonceng', false],
  ['telinga', 'gendang', 'mendengar suara gendang', false],
  ['telinga', 'kucing', 'mendengar kucing mengeong', false],
  ['hidung', 'bunga', 'mencium wangi bunga', true],
  ['hidung', 'kue', 'mencium kue yang harum', false],
  ['hidung', 'sabun', 'mencium sabun yang wangi', false],
  ['hidung', 'durian', 'mencium bau durian', false],
  ['hidung', 'roti', 'mencium roti yang baru matang', false],
  ['lidah', 'permen', 'merasakan permen yang manis', true],
  ['lidah', 'jeruk', 'merasakan jeruk yang asam', false],
  ['lidah', 'garam', 'merasakan garam yang asin', false],
  ['lidah', 'cabai', 'merasakan cabai yang pedas', false],
  ['lidah', 'pisang', 'merasakan pisang yang manis', false],
  ['tangan', 'esBatu', 'merasakan es batu yang dingin', true],
  ['tangan', 'bantal', 'merasakan bantal yang empuk', false],
  ['tangan', 'batu', 'merasakan batu yang keras', false],
  ['tangan', 'kapas', 'merasakan kapas yang lembut', false],
  ['tangan', 'tehHangat', 'merasakan gelas teh yang hangat', false],
];

const rng = seeded(27);

const tunjuk = TUNJUK.map(([part, age, diff]) => ({
  id: `tunjuk-${part}`,
  ageGroup: age,
  difficulty: diff,
  speak: `Mana ${PARTS[part].name}?`,
  label: `Mana ${PARTS[part].name}?`,
  data: { mode: 'tunjuk', part },
  tags: ['tubuh', PARTS[part].view],
  review: 'ditinjau',
}));

const indra = INDRA.map(([organ, art, kegiatan, forA], i) => ({
  id: `indra-${organ}-${art}`,
  ageGroup: forA ? ['A', 'B', 'C'] : ['B', 'C'],
  difficulty: forA ? 1 : 2 + (i % 3),
  speak: `Untuk ${kegiatan}, kita pakai apa?`,
  label: `Untuk ${kegiatan}, kita pakai apa?`,
  assetKey: art,
  data: {
    mode: 'indra',
    organ,
    distractors: pickFrom(rng, ORGANS, 3, new Set([organ])),
    speakAlso: [ORGAN_SAY[organ]],
  },
  tags: ['indra', organ],
  review: 'ditinjau',
}));

await writeContent('panca-indra', [...tunjuk, ...indra]);
