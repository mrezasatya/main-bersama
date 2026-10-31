/** Bank konten #19 Jam dan Hari: kegiatan harian, nama hari, bulan, jam bulat (40). */
import type { ArtKey } from '../../src/core/art/keys';
import type { SceneKey } from '../../src/core/visual/types';
import { writeContent } from './lib';

const items: unknown[] = [];
const add = (
  id: string,
  age: string[],
  diff: number,
  speak: string,
  data: object,
  tags: string[],
) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    data,
    tags,
    review: 'ditinjau',
  });
const txt = (s: string) => ({ t: 'text', s, size: 'm' });

// Waktu dalam sehari (gambar suasana).
const WAKTU: Record<SceneKey, string> = {
  pagi: 'Pagi',
  siang: 'Siang',
  sore: 'Sore',
  malam: 'Malam',
} as Record<SceneKey, string>;
const scenes = (ans: SceneKey, others: SceneKey[]) => ({
  options: [ans, ...others].map((s) => ({ t: 'scene', s })),
  labels: [ans, ...others].map((s) => WAKTU[s]),
});
const KAPAN: [string, SceneKey, SceneKey[]][] = [
  ['Kapan kita sarapan?', 'pagi', ['malam', 'sore', 'siang']],
  ['Kapan kita tidur malam?', 'malam', ['siang', 'pagi', 'sore']],
  ['Kapan matahari terbit?', 'pagi', ['malam', 'siang', 'sore']],
  ['Kapan matahari terbenam?', 'sore', ['pagi', 'malam', 'siang']],
  ['Kapan bulan dan bintang terlihat?', 'malam', ['siang', 'pagi', 'sore']],
  ['Kapan matahari bersinar paling tinggi?', 'siang', ['malam', 'pagi', 'sore']],
  ['Kapan kita berangkat sekolah?', 'pagi', ['malam', 'sore', 'siang']],
  ['Kapan kita makan siang?', 'siang', ['malam', 'pagi', 'sore']],
];
KAPAN.forEach(([q, ans, others], i) =>
  add(
    `kapan-${i}`,
    ['B', 'C'],
    1,
    q,
    {
      instr: { t: 'clock', h: 7 },
      ...scenes(ans, others),
      showLabels: true,
      speakAlso: [`${WAKTU[ans]}!`],
    },
    ['waktu'],
  ),
);

// Urutan kegiatan.
const URUT: [string, ArtKey, ArtKey[], string][] = [
  [
    'Apa yang kita lakukan sesudah bangun tidur pagi?',
    'sikatGigiPasta',
    ['tempatTidur', 'bulan'],
    'Menggosok gigi, lalu mandi.',
  ],
  [
    'Apa yang kita lakukan sebelum tidur malam?',
    'sikatGigiPasta',
    ['tasSekolah', 'matahari'],
    'Menggosok gigi sebelum tidur.',
  ],
  [
    'Apa yang kita bawa saat berangkat sekolah?',
    'tasSekolah',
    ['tempatTidur', 'bulan'],
    'Tas sekolah!',
  ],
  [
    'Apa yang kita lakukan saat malam sudah larut?',
    'tempatTidur',
    ['tasSekolah', 'bola'],
    'Tidur supaya badan segar besok.',
  ],
];
URUT.forEach(([q, ans, others, say], i) =>
  add(
    `kegiatan-${i}`,
    ['B', 'C'],
    2,
    q,
    { options: [ans, ...others].map((k) => ({ t: 'art', k })), speakAlso: [say] },
    ['kegiatan'],
  ),
);

// Nama hari.
const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
HARI.forEach((h, i) => {
  const next = HARI[(i + 1) % 7]!;
  const opts = [next, HARI[(i + 3) % 7]!, HARI[(i + 5) % 7]!, h];
  add(
    `sesudah-${h}`,
    ['C'],
    3,
    `Hari apa sesudah ${h}?`,
    { options: opts.map(txt), speakAlso: [`Sesudah ${h} adalah ${next}.`] },
    ['hari'],
  );
});
['Rabu', 'Sabtu', 'Senin'].forEach((h) => {
  const i = HARI.indexOf(h);
  const prev = HARI[(i + 6) % 7]!;
  const opts = [prev, HARI[(i + 2) % 7]!, HARI[(i + 4) % 7]!, h];
  add(
    `sebelum-${h}`,
    ['C'],
    4,
    `Hari apa sebelum ${h}?`,
    { options: opts.map(txt), speakAlso: [`Sebelum ${h} adalah ${prev}.`] },
    ['hari'],
  );
});

// Jam bulat.
const ANGKA = [
  '',
  'satu',
  'dua',
  'tiga',
  'empat',
  'lima',
  'enam',
  'tujuh',
  'delapan',
  'sembilan',
  'sepuluh',
  'sebelas',
  'dua belas',
];
[3, 7, 9, 12, 1, 5, 8, 11].forEach((h, i) => {
  const others = [((h + 5) % 12) + 1, ((h + 2) % 12) + 1, ((h + 8) % 12) + 1];
  add(
    `jam-berapa-${h}`,
    ['C'],
    3 + (i % 2),
    `Jarum pendek menunjuk angka ${h}. Jam berapa ini?`,
    {
      cue: { t: 'clock', h },
      options: [h, ...others].map((x) => txt(`Jam ${x}`)),
      speakAlso: [`Jam ${ANGKA[h]}!`],
    },
    ['jam'],
  );
});
[12, 6, 3, 9, 2, 10].forEach((h, i) => {
  const others = [((h + 5) % 12) + 1, ((h + 2) % 12) + 1, ((h + 8) % 12) + 1];
  add(
    `mana-jam-${h}`,
    i < 2 ? ['B', 'C'] : ['C'],
    i < 2 ? 2 : 3,
    `Mana jam ${ANGKA[h]}?`,
    {
      options: [h, ...others].map((x) => ({ t: 'clock', h: x })),
      speakAlso: [`Jam ${ANGKA[h]}: jarum panjang di angka dua belas, jarum pendek di angka ${h}.`],
    },
    ['jam'],
  );
});

// Bulan.
const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
[0, 3, 6, 10].forEach((i) => {
  const next = BULAN[(i + 1) % 12]!;
  const opts = [next, BULAN[(i + 4) % 12]!, BULAN[(i + 7) % 12]!, BULAN[i]!];
  add(
    `bulan-${BULAN[i]}`,
    ['C'],
    5,
    `Bulan apa sesudah ${BULAN[i]}?`,
    { options: opts.map(txt), speakAlso: [`Sesudah ${BULAN[i]} adalah ${next}.`] },
    ['bulan'],
  );
});

await writeContent('jam-dan-hari', items);
