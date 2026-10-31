/** Bank konten #23 Ayo Berkebun: tahap tumbuh, kebutuhan tanaman, alat dan cara merawat (40). */
import type { ArtKey } from '../../src/core/art/keys';
import { writeContent } from './lib';

const items: unknown[] = [];
const art = (k: ArtKey) => ({ t: 'art', k });
const plant = (stage: number) => ({ t: 'plant', stage });
const STAGE = ['biji', 'kecambah', 'tanaman muda', 'tanaman berbunga', 'tanaman berbuah'];
const add = (id: string, age: string[], diff: number, speak: string, data: object, tag: string) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags: ['berkebun', tag],
    review: 'ditinjau',
  });

// Mengenal tahap.
STAGE.forEach((s, i) =>
  add(
    `mana-${i}`,
    i === 0 || i === 3 || i === 4 ? ['A', 'B', 'C'] : ['B', 'C'],
    1 + (i % 2),
    `Mana ${s}?`,
    {
      options: [i, (i + 2) % 5, (i + 4) % 5, (i + 1) % 5].map(plant),
      labels: [i, (i + 2) % 5, (i + 4) % 5, (i + 1) % 5].map((x) => STAGE[x]!),
      speakAlso: [`Ini ${s}.`],
    },
    'tahap',
  ),
);
// Tahap berikutnya.
for (let i = 0; i < 4; i++)
  add(
    `sesudah-${i}`,
    ['B', 'C'],
    3,
    `Sesudah ${STAGE[i]}, tanaman tumbuh menjadi apa?`,
    {
      cue: plant(i),
      options: [i + 1, (i + 3) % 5, i === 0 ? 4 : 0].map(plant),
      speakAlso: [`Sesudah ${STAGE[i]}, tumbuh menjadi ${STAGE[i + 1]}.`],
    },
    'tahap',
  );
// Urutkan tahap (Sequence).
[
  [0, 1, 2],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4],
  [2, 3, 4],
].forEach((st, i) =>
  items.push({
    id: `urutkan-${i}`,
    ageGroup: st.length <= 3 ? ['A', 'B', 'C'] : st.length === 4 ? ['B', 'C'] : ['C'],
    difficulty: st.length,
    speak: `Urutkan tanaman dari ${STAGE[st[0]!]} sampai ${STAGE[st[st.length - 1]!]}.`,
    label: `Urutkan dari ${STAGE[st[0]!]} sampai ${STAGE[st[st.length - 1]!]}`,
    data: {
      mode: 'urut',
      tiles: st.map(plant),
      speakAlso: ['Tanaman tumbuh sedikit demi sedikit.'],
    },
    tags: ['berkebun', 'urutan'],
    review: 'ditinjau',
  }),
);
// Kebutuhan tanaman.
const BUTUH: [string, ArtKey, ArtKey[], string, boolean][] = [
  [
    'Tanaman perlu minum apa?',
    'tetesAir',
    ['susu', 'permen', 'esKrim'],
    'Tanaman perlu air.',
    true,
  ],
  [
    'Tanaman perlu cahaya dari mana?',
    'matahari',
    ['televisi', 'senter', 'lonceng'],
    'Tanaman perlu sinar matahari.',
    true,
  ],
  [
    'Biji ditanam di mana?',
    'pot',
    ['piring', 'tasSekolah', 'meja'],
    'Biji ditanam di tanah, misalnya di pot.',
    true,
  ],
  [
    'Apa yang membuat tanaman tetap segar?',
    'tetesAir',
    ['batu', 'kertas', 'mainanRusak'],
    'Air membuat tanaman segar.',
    true,
  ],
  [
    'Daunnya layu. Tanaman butuh apa?',
    'tetesAir',
    ['permen', 'yoyo', 'kertas'],
    'Daun layu tandanya tanaman kehausan.',
    false,
  ],
  [
    'Tanaman di dalam kamar gelap jadi pucat. Ia butuh apa?',
    'matahari',
    ['bantal', 'selimutPlaceholder' as ArtKey, 'buku'],
    'Tanaman butuh cahaya matahari.',
    false,
  ],
];
BUTUH.forEach(([q, ans, others, say, easy], i) =>
  add(
    `butuh-${i}`,
    easy ? ['A', 'B', 'C'] : ['B', 'C'],
    easy ? 1 : 3,
    q,
    {
      options: [
        ans,
        ...others.map((o) => (o === ('selimutPlaceholder' as ArtKey) ? 'tempatTidur' : o)),
      ].map(art),
      speakAlso: [say],
    },
    'kebutuhan',
  ),
);
// Alat dan merawat.
const ALAT: [string, ArtKey, ArtKey[], string, boolean][] = [
  [
    'Alat untuk menyiram tanaman?',
    'penyiram',
    ['gunting', 'piring', 'buku'],
    'Penyiram untuk menyiram tanaman.',
    true,
  ],
  [
    'Alat untuk menggali tanah?',
    'sekop',
    ['sikatGigi', 'piring', 'yoyo'],
    'Sekop untuk menggali tanah.',
    true,
  ],
  [
    'Wadah untuk menanam bunga?',
    'pot',
    ['piring', 'tasSekolah', 'gelasPlaceholder' as ArtKey],
    'Pot untuk menanam bunga.',
    true,
  ],
  [
    'Alat petani untuk mencangkul sawah?',
    'cangkul',
    ['gitar', 'mikrofon', 'kamera'],
    'Cangkul untuk menggemburkan tanah.',
    false,
  ],
  [
    'Daun ini layu. Apa yang kita pakai?',
    'penyiram',
    ['sapu', 'gunting', 'buku'],
    'Kita siram dengan penyiram.',
    false,
  ],
  [
    'Hewan apa yang membantu bunga berbuah?',
    'lebah',
    ['tikus', 'nyamuk', 'cicak'],
    'Lebah membantu penyerbukan bunga.',
    false,
  ],
];
ALAT.forEach(([q, ans, others, say, easy], i) =>
  add(
    `alat-${i}`,
    easy ? ['A', 'B', 'C'] : ['B', 'C'],
    easy ? 2 : 3,
    q,
    {
      ...(q.startsWith('Daun ini') ? { cue: art('daunLayu') } : {}),
      options: [ans, ...others.map((o) => (o === ('gelasPlaceholder' as ArtKey) ? 'meja' : o))].map(
        art,
      ),
      speakAlso: [say],
    },
    'merawat',
  ),
);
// Hasil kebun: dari tanaman apa?
const HASIL: [string, ArtKey, ArtKey[]][] = [
  [
    'Mana sayuran berwarna oranye yang tumbuh di dalam tanah?',
    'wortel',
    ['tomat', 'jagung', 'apel'],
  ],
  ['Mana buah merah yang bisa dijadikan sambal?', 'tomat', ['wortel', 'pisang', 'anggur']],
  ['Mana jagung?', 'jagung', ['wortel', 'nanas', 'tomat']],
  ['Mana buah yang berduri dan berbau tajam?', 'durian', ['apel', 'pisang', 'jeruk']],
  ['Mana buah yang kulitnya berambut?', 'rambutan', ['apel', 'jeruk', 'mangga']],
  ['Mana buah semangka?', 'semangka', ['nanas', 'apel', 'anggur']],
  ['Mana buah anggur?', 'anggur', ['stroberi', 'jeruk', 'pisang']],
  ['Mana buah stroberi?', 'stroberi', ['anggur', 'tomat', 'apel']],
  ['Mana buah mangga?', 'mangga', ['apel', 'pisang', 'nanas']],
  ['Mana buah nanas?', 'nanas', ['jagung', 'durian', 'jeruk']],
  ['Mana sayur yang bisa dimasak menjadi sup jagung?', 'jagung', ['durian', 'stroberi', 'anggur']],
  ['Mana buah yang tumbuh dari bunga di pohon jeruk?', 'jeruk', ['apel', 'tomat', 'wortel']],
  ['Mana buah apel?', 'apel', ['tomat', 'jeruk', 'rambutan']],
  ['Mana buah pisang?', 'pisang', ['jagung', 'mangga', 'wortel']],
  ['Mana padi, tanaman yang menghasilkan beras?', 'padi', ['gandum', 'tebu', 'jagung']],
];
HASIL.forEach(([q, ans, others], i) =>
  add(
    `hasil-${i}`,
    i < 10 && q.startsWith('Mana buah') ? ['A', 'B', 'C'] : ['B', 'C'],
    i < 10 ? 1 : 2,
    q,
    {
      options: [ans, ...others].map(art),
    },
    'hasil',
  ),
);

await writeContent('ayo-berkebun', items);
