/** Bank konten #25 Profesi dan Alatnya: 42 profesi, alat, tempat kerja, manfaat. */
import type { ArtKey } from '../../src/core/art/keys';
import type { PersonKey } from '../../src/core/art/people/specs';
import { cap, pickFrom, seeded, writeContent } from './lib';

/** [figur, nama, alat (gambar), nama alat, manfaat, tempat, usia] */
type Row = [PersonKey, string, ArtKey, string, string, string, 'ABC' | 'BC' | 'C'];
const ROWS: Row[] = [
  ['dokter', 'dokter', 'stetoskop', 'stetoskop', 'memeriksa orang sakit', 'rumah sakit', 'ABC'],
  ['perawat', 'perawat', 'termometer', 'termometer', 'mengukur suhu badan', 'rumah sakit', 'BC'],
  ['guru', 'guru', 'buku', 'buku', 'mengajar murid', 'sekolah', 'ABC'],
  ['polisi', 'polisi', 'peluit', 'peluit', 'mengatur lalu lintas', 'jalan raya', 'ABC'],
  [
    'petugasPemadam',
    'petugas pemadam kebakaran',
    'selang',
    'selang air',
    'memadamkan api',
    'pos pemadam kebakaran',
    'ABC',
  ],
  ['petani', 'petani', 'cangkul', 'cangkul', 'menggemburkan tanah', 'sawah', 'ABC'],
  ['nelayan', 'nelayan', 'jala', 'jala', 'menangkap ikan', 'laut', 'ABC'],
  ['koki', 'koki', 'wajan', 'wajan', 'memasak makanan', 'dapur', 'ABC'],
  ['pilot', 'pilot', 'pesawat', 'pesawat', 'menerbangkan penumpang', 'bandara', 'ABC'],
  [
    'masinis',
    'masinis',
    'keretaApi',
    'kereta api',
    'membawa penumpang naik kereta',
    'stasiun',
    'BC',
  ],
  ['tukangKayu', 'tukang kayu', 'palu', 'palu', 'membuat meja dan kursi', 'bengkel kayu', 'BC'],
  [
    'montir',
    'montir',
    'kunciInggris',
    'kunci inggris',
    'memperbaiki mobil dan motor',
    'bengkel',
    'BC',
  ],
  ['penjahit', 'penjahit', 'benangJarum', 'benang dan jarum', 'membuat baju', 'rumah jahit', 'BC'],
  ['pelukis', 'pelukis', 'kuas', 'kuas dan cat', 'membuat lukisan', 'sanggar lukis', 'ABC'],
  [
    'penyanyi',
    'penyanyi',
    'mikrofon',
    'mikrofon',
    'bernyanyi untuk banyak orang',
    'panggung',
    'ABC',
  ],
  ['penari', 'penari', 'selendang', 'selendang', 'menari dengan indah', 'sanggar tari', 'BC'],
  [
    'dokterGigi',
    'dokter gigi',
    'sikatGigi',
    'sikat gigi',
    'merawat gigi kita',
    'klinik gigi',
    'ABC',
  ],
  [
    'dokterHewan',
    'dokter hewan',
    'kucing',
    'hewan peliharaan',
    'merawat hewan yang sakit',
    'klinik hewan',
    'BC',
  ],
  ['tukangPos', 'tukang pos', 'amplop', 'surat', 'mengantar surat dan paket', 'kantor pos', 'ABC'],
  ['satpam', 'satpam', 'senter', 'senter', 'menjaga keamanan', 'gedung dan kantor', 'BC'],
  [
    'astronaut',
    'astronaut',
    'roket',
    'roket',
    'menjelajah luar angkasa',
    'stasiun luar angkasa',
    'ABC',
  ],
  ['arsitek', 'arsitek', 'meteran', 'meteran', 'merancang gedung dan rumah', 'kantor arsitek', 'C'],
  ['fotografer', 'fotografer', 'kamera', 'kamera', 'mengambil foto', 'studio foto', 'BC'],
  [
    'petugasKebersihan',
    'petugas kebersihan',
    'sapu',
    'sapu',
    'membersihkan lingkungan',
    'jalan dan taman',
    'BC',
  ],
  ['pedagang', 'pedagang', 'timbangan', 'timbangan', 'menimbang barang dagangan', 'pasar', 'BC'],
  ['tukangRoti', 'tukang roti', 'roti', 'roti', 'membuat roti dan kue', 'toko roti', 'BC'],
  ['peternak', 'peternak', 'sapi', 'sapi', 'merawat hewan ternak', 'peternakan', 'BC'],
  ['nakhoda', 'nakhoda', 'kemudi', 'kemudi kapal', 'mengemudikan kapal', 'kapal laut', 'C'],
  [
    'pustakawan',
    'pustakawan',
    'rakBuku',
    'rak buku',
    'merapikan dan meminjamkan buku',
    'perpustakaan',
    'C',
  ],
  [
    'ilmuwan',
    'ilmuwan',
    'mikroskop',
    'mikroskop',
    'meneliti benda yang sangat kecil',
    'laboratorium',
    'C',
  ],
  ['pemrogram', 'pemrogram', 'laptop', 'laptop', 'membuat aplikasi dan permainan', 'kantor', 'C'],
  ['pemainBola', 'pemain sepak bola', 'bola', 'bola', 'bermain sepak bola', 'lapangan', 'ABC'],
  [
    'wasit',
    'wasit',
    'kartuKuning',
    'kartu kuning',
    'menjaga pertandingan tetap adil',
    'lapangan',
    'C',
  ],
  ['musisi', 'musisi', 'gitar', 'gitar', 'memainkan musik', 'panggung', 'BC'],
  ['dalang', 'dalang', 'wayang', 'wayang', 'memainkan pertunjukan wayang', 'panggung wayang', 'C'],
  ['pembatik', 'pembatik', 'canting', 'canting', 'membuat kain batik', 'rumah batik', 'C'],
  [
    'tukangCukur',
    'tukang cukur',
    'gunting',
    'gunting',
    'merapikan rambut',
    'tempat pangkas rambut',
    'BC',
  ],
  ['kasir', 'kasir', 'mesinKasir', 'mesin kasir', 'menerima pembayaran', 'toko', 'BC'],
  ['sopir', 'sopir bus', 'bus', 'bus', 'mengantar penumpang', 'terminal', 'ABC'],
  ['penjualSayur', 'penjual sayur', 'wortel', 'sayuran', 'menjual sayur segar', 'pasar', 'BC'],
  [
    'pembuatGerabah',
    'pembuat gerabah',
    'vas',
    'vas tanah liat',
    'membuat vas dan periuk',
    'rumah gerabah',
    'C',
  ],
  [
    'penjagaPantai',
    'penjaga pantai',
    'speedboat',
    'perahu motor',
    'menolong orang di laut',
    'pantai',
    'C',
  ],
];

const rng = seeded(25);
const AGES = { ABC: ['A', 'B', 'C'], BC: ['B', 'C'], C: ['C'] } as const;
const easyTools = ROWS.filter((r) => r[6] === 'ABC').map((r) => r[2]);
const allTools = ROWS.map((r) => r[2]);

const items = ROWS.map(([who, name, tool, toolName, use, place, age]) => {
  const d = [
    ...pickFrom(rng, easyTools, 1, new Set([tool])),
    ...pickFrom(rng, allTools, 2, new Set([tool])),
  ];
  const uniq = [...new Set(d)];
  while (uniq.length < 3) uniq.push(...pickFrom(rng, allTools, 1, new Set([tool, ...uniq])));
  return {
    id: who,
    ageGroup: AGES[age],
    difficulty: age === 'ABC' ? 1 : age === 'BC' ? 3 : 4,
    speak: `Apa alat seorang ${name}?`,
    label: `Apa alat seorang ${name}?`,
    data: {
      cue: { t: 'art', k: who },
      options: [tool, ...uniq].map((k) => ({ t: 'art', k })),
      speakAlso: [
        `${cap(name)} memakai ${toolName} untuk ${use}.`,
        `${cap(name)} bekerja di ${place}.`,
      ],
    },
    tags: ['profesi'],
    review: 'ditinjau',
  };
});

await writeContent('profesi', items);
