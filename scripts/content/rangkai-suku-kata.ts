/** Bank konten #8 Rangkai Suku Kata: 50 kata bergambar, 2-3 suku kata. */
import type { ArtKey } from '../../src/core/art/keys';
import { pickFrom, seeded, writeContent } from './lib';

const WORDS: [ArtKey, string][] = [
  ['balon', 'ba-lon'],
  ['bintang', 'bin-tang'],
  ['bunga', 'bu-nga'],
  ['ikan', 'i-kan'],
  ['bola', 'bo-la'],
  ['kambing', 'kam-bing'],
  ['domba', 'dom-ba'],
  ['sapi', 'sa-pi'],
  ['kerbau', 'ker-bau'],
  ['kuda', 'ku-da'],
  ['kucing', 'ku-cing'],
  ['anjing', 'an-jing'],
  ['singa', 'si-nga'],
  ['harimau', 'ha-ri-mau'],
  ['tikus', 'ti-kus'],
  ['gajah', 'ga-jah'],
  ['monyet', 'mo-nyet'],
  ['katak', 'ka-tak'],
  ['tokek', 'to-kek'],
  ['cicak', 'ci-cak'],
  ['ular', 'u-lar'],
  ['lebah', 'le-bah'],
  ['nyamuk', 'nya-muk'],
  ['bebek', 'be-bek'],
  ['angsa', 'ang-sa'],
  ['merpati', 'mer-pa-ti'],
  ['taksi', 'tak-si'],
  ['motor', 'mo-tor'],
  ['sepeda', 'se-pe-da'],
  ['becak', 'be-cak'],
  ['sampan', 'sam-pan'],
  ['roket', 'ro-ket'],
  ['jeruk', 'je-ruk'],
  ['permen', 'per-men'],
  ['roti', 'ro-ti'],
  ['sabun', 'sa-bun'],
  ['durian', 'du-ri-an'],
  ['pisang', 'pi-sang'],
  ['bantal', 'ban-tal'],
  ['batu', 'ba-tu'],
  ['buku', 'bu-ku'],
  ['lonceng', 'lon-ceng'],
  ['gendang', 'gen-dang'],
  ['mata', 'ma-ta'],
  ['hidung', 'hi-dung'],
  ['apel', 'a-pel'],
  ['nanas', 'na-nas'],
  ['wortel', 'wor-tel'],
  ['tomat', 'to-mat'],
  ['kamera', 'ka-me-ra'],
];

const rng = seeded(8);
const allSyll = [...new Set(WORDS.flatMap(([, s]) => s.split('-')))];

const items = WORDS.map(([art, s]) => {
  const syl = s.split('-');
  const word = syl.join('');
  return {
    id: word,
    ageGroup: ['C'],
    difficulty: syl.length === 2 ? 2 : 4,
    speak: `Susun suku kata menjadi kata ${word}.`,
    label: `Susun: ${word}`,
    data: {
      tiles: syl.map((x) => ({ t: 'text', s: x })),
      tileSay: syl,
      extra: pickFrom(rng, allSyll, 1, new Set(syl)).map((x) => ({ t: 'text', s: x })),
      cue: { t: 'art', k: art },
      joined: true,
      speakAlso: [`${syl.join(', ')}. ${word[0]!.toUpperCase()}${word.slice(1)}!`],
    },
    tags: ['suku-kata', `${syl.length}-suku`],
    review: 'ditinjau',
  };
});

await writeContent('rangkai-suku-kata', items);
