/** Bank konten #17 Puzzle Gambar: 40 puzzle 2-20 keping (hewan, kendaraan, rumah adat, tempat dunia). */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

/** [gambar, nama, kolom, baris] */
const ROWS: [ArtKey, string, number, number][] = [
  ['bola', 'bola', 2, 1],
  ['bintang', 'bintang', 2, 1],
  ['apel', 'apel', 2, 1],
  ['ikan', 'ikan', 2, 1],
  ['kucing', 'kucing', 2, 2],
  ['gajah', 'gajah', 2, 2],
  ['mobil', 'mobil', 2, 2],
  ['balon', 'balon', 3, 1],
  ['ayamJago', 'ayam jago', 2, 2],
  ['bus', 'bus', 2, 2],
  ['katak', 'katak', 2, 2],
  ['singa', 'singa', 2, 2],
  ['kuda', 'kuda', 3, 2],
  ['pesawat', 'pesawat', 3, 2],
  ['burungHantu', 'burung hantu', 3, 2],
  ['perahuLayar', 'perahu layar', 3, 2],
  ['rumahJoglo', 'rumah joglo', 3, 2],
  ['monas', 'Monas', 3, 2],
  ['harimau', 'harimau', 3, 2],
  ['helikopter', 'helikopter', 3, 2],
  ['merak', 'merak', 3, 3],
  ['rumahGadang', 'rumah gadang', 3, 3],
  ['borobudur', 'Candi Borobudur', 3, 3],
  ['keretaUap', 'kereta uap', 3, 3],
  ['menaraEiffel', 'Menara Eiffel', 3, 3],
  ['piramida', 'piramida', 3, 3],
  ['zebra', 'zebra', 3, 3],
  ['pinisi', 'kapal pinisi', 3, 3],
  ['rumahTongkonan', 'rumah tongkonan', 4, 3],
  ['ondelOndel', 'ondel-ondel', 4, 3],
  ['tembokBesar', 'Tembok Besar Tiongkok', 4, 3],
  ['komodo', 'komodo', 4, 3],
  ['balonUdara', 'balon udara', 4, 3],
  ['rumahHonai', 'rumah honai', 4, 3],
  ['kapalSelam', 'kapal selam', 4, 4],
  ['paus', 'paus', 4, 4],
  ['gorila', 'gorila', 4, 4],
  ['wayang', 'wayang', 4, 4],
  ['keretaApi', 'kereta api', 5, 4],
  ['tumpeng', 'nasi tumpeng', 5, 4],
];

const items = ROWS.map(([art, name, cols, rows]) => {
  const n = cols * rows;
  return {
    id: art,
    ageGroup: n <= 4 ? ['A', 'B'] : n <= 6 ? ['B', 'C'] : ['C'],
    difficulty: n <= 2 ? 1 : n <= 4 ? 2 : n <= 6 ? 3 : n <= 9 ? 4 : 5,
    speak: `Susun puzzle ${name}!`,
    label: `Puzzle ${name} (${n} keping)`,
    data: { art, cols, rows, speakAlso: [`Hore, ${name}!`] },
    tags: ['puzzle', `${n}-keping`],
    review: [
      'rumahJoglo',
      'rumahGadang',
      'rumahTongkonan',
      'rumahHonai',
      'ondelOndel',
      'wayang',
      'tumpeng',
      'borobudur',
      'monas',
    ].includes(art)
      ? 'perlu-ditinjau'
      : 'ditinjau',
  };
});

await writeContent('puzzle-gambar', items);
