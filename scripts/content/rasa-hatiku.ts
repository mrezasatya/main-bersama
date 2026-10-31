/**
 * Bank konten #12 Rasa Hatiku: 45 situasi, kenali emosi lalu dengar cara menghadapinya.
 * Prinsip: semua emosi wajar; tanggapan selalu memvalidasi perasaan, lalu menawarkan tindakan.
 */
import type { ArtKey } from '../../src/core/art/keys';
import type { Emotion, SceneKey } from '../../src/core/visual/types';
import { writeContent } from './lib';

const LABEL: Record<Emotion, string> = {
  senang: 'Senang',
  sedih: 'Sedih',
  marah: 'Marah',
  takut: 'Takut',
  terkejut: 'Terkejut',
  malu: 'Malu',
  tenang: 'Tenang',
  bangga: 'Bangga',
};
/** Pengecoh: emosi yang jelas berbeda dulu. */
const OTHERS: Record<Emotion, Emotion[]> = {
  senang: ['sedih', 'marah', 'takut'],
  sedih: ['senang', 'bangga', 'terkejut'],
  marah: ['senang', 'tenang', 'malu'],
  takut: ['senang', 'marah', 'tenang'],
  terkejut: ['sedih', 'tenang', 'marah'],
  malu: ['marah', 'senang', 'takut'],
  tenang: ['marah', 'takut', 'terkejut'],
  bangga: ['sedih', 'takut', 'marah'],
};
const RESPONSE: Record<Emotion, string> = {
  senang: 'Senang sekali! Bagikan senyummu kepada orang di sekitarmu.',
  sedih: 'Wajar merasa sedih. Kita boleh menangis dan bercerita kepada Ayah atau Ibu.',
  marah:
    'Wajar merasa marah. Tarik napas dalam-dalam, hitung sampai tiga, lalu bicara pelan-pelan.',
  takut: 'Wajar merasa takut. Dekati orang dewasa yang kamu percaya.',
  terkejut: 'Kaget, ya! Tarik napas pelan-pelan supaya tenang lagi.',
  malu: 'Tidak apa-apa merasa malu. Semua orang pernah salah.',
  tenang: 'Rasanya tenang dan nyaman. Kita bisa bernapas pelan dan menikmatinya.',
  bangga: 'Kamu boleh bangga dengan usahamu!',
};

type Cue = ArtKey | { scene: SceneKey };
/** [petunjuk, situasi, emosi, untuk usia 4?] */
const ROWS: [Cue, string, Emotion, boolean][] = [
  ['balon', 'Balonmu terbang terbawa angin', 'sedih', true],
  ['hadiah', 'Kamu mendapat hadiah ulang tahun', 'senang', true],
  ['esKrim', 'Es krimmu jatuh ke tanah', 'sedih', true],
  ['yoyo', 'Mainanmu direbut teman tanpa izin', 'marah', true],
  [{ scene: 'hujan' }, 'Petir menyambar dengan suara keras', 'takut', true],
  [{ scene: 'malam' }, 'Lampu tiba-tiba mati saat malam', 'takut', true],
  ['sepeda', 'Kamu berhasil naik sepeda sendiri', 'bangga', true],
  ['kucing', 'Kucing kesayanganmu mendekat dan mengeong manja', 'senang', true],
  ['bintang', 'Kamu selesai menyusun puzzle sendiri', 'bangga', true],
  ['katak', 'Tiba-tiba seekor katak melompat di depanmu', 'terkejut', true],
  ['mikrofon', 'Kamu diminta bernyanyi di depan banyak orang', 'malu', false],
  ['tempatTidur', 'Kamu berbaring sambil mendengarkan suara hujan', 'tenang', false],
  ['bola', 'Temanmu tidak mau bermain bersamamu', 'sedih', true],
  ['tasSekolah', 'Hari pertama sekolah, kamu belum kenal siapa pun', 'takut', false],
  ['sikatGigiPasta', 'Kamu bisa menggosok gigi sendiri', 'bangga', true],
  ['kertas', 'Gambarmu disobek oleh kakak', 'marah', true],
  ['pesawat', 'Nenek datang berkunjung dari kota yang jauh', 'senang', true],
  ['anjing', 'Anjing peliharaanmu sedang sakit', 'sedih', false],
  ['senter', 'Kamar gelap dan kamu mendengar suara aneh', 'takut', false],
  ['piring', 'Piring jatuh dan pecah dengan bunyi keras', 'terkejut', true],
  ['kuas', 'Temanmu bilang gambarmu bagus sekali', 'senang', true],
  ['kue', 'Kue buatanmu dimakan habis oleh keluarga', 'bangga', false],
  ['bunga', 'Kamu duduk di taman melihat bunga dan kupu-kupu', 'tenang', false],
  ['buku', 'Kamu salah membaca kata di depan kelas', 'malu', false],
  ['ambulans', 'Ambulans lewat dengan sirene yang sangat keras', 'terkejut', false],
  [{ scene: 'hujan' }, 'Hujan turun, kamu tidak bisa bermain di luar', 'sedih', false],
  ['hadiah', 'Guru memberimu stiker bintang', 'senang', false],
  ['tempatTidur', 'Kamu tidur siang setelah lelah bermain', 'tenang', false],
  ['timbangan', 'Di pasar yang ramai kamu tidak melihat ibumu', 'takut', false],
  ['baju', 'Kamu berhasil memakai baju sendiri', 'bangga', true],
  ['anjing', 'Ada anjing besar menggonggong keras ke arahmu', 'takut', false],
  ['bus', 'Sahabatmu pindah ke kota lain', 'sedih', false],
  ['amplop', 'Kamu mendapat surat dari sahabatmu', 'senang', false],
  ['susu', 'Kamu tidak sengaja menumpahkan susu di depan tamu', 'malu', false],
  ['gitar', 'Ayah memainkan lagu yang lembut sebelum tidur', 'tenang', false],
  ['pot', 'Bunga yang kamu tanam akhirnya mekar', 'bangga', false],
  ['roti', 'Ayah pulang membawa roti kesukaanmu', 'senang', false],
  ['ular', 'Kamu melihat ular di kebun', 'takut', false],
  ['bintang', 'Kembang api meletus tiba-tiba di langit', 'terkejut', false],
  ['tangan', 'Kamu menolong teman yang jatuh', 'bangga', false],
  ['kue', 'Adikmu mengambil kuemu tanpa bertanya', 'marah', false],
  ['mainanRusak', 'Mainan kesayanganmu rusak', 'sedih', false],
  ['lonceng', 'Bel berbunyi keras tepat di sebelahmu', 'terkejut', false],
  ['selendang', 'Bajumu terbalik dan teman-teman menunjuknya', 'malu', false],
  ['penyiram', 'Kamu menyiram tanaman di pagi yang sejuk', 'tenang', false],
];

const items = ROWS.map(([cue, situasi, emo, easy], i) => {
  const opts = [emo, ...OTHERS[emo]];
  return {
    id: `rasa-${i + 1}`,
    ageGroup: easy ? ['B', 'C'] : ['C'],
    difficulty: easy ? 2 : 3,
    speak: `${situasi}. Bagaimana perasaanmu?`,
    label: `${situasi}. Bagaimana perasaanmu?`,
    data: {
      cue: typeof cue === 'string' ? { t: 'art', k: cue } : { t: 'scene', s: cue.scene },
      options: opts.map((e) => ({ t: 'face', e })),
      labels: opts.map((e) => LABEL[e]),
      speakAlso: [`${LABEL[emo]}. ${RESPONSE[emo]}`],
    },
    tags: ['emosi', emo],
    review: 'ditinjau',
  };
});

await writeContent('rasa-hatiku', items);
