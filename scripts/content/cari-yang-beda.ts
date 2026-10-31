/** Bank konten #15 Cari yang Beda: beda warna, bentuk, jumlah, dan kategori (45). */
import type { ArtKey } from '../../src/core/art/keys';
import type { ColorName } from '../../src/core/art/colors';
import type { ShapeKey } from '../../src/core/visual/types';
import { writeContent } from './lib';

const items: unknown[] = [];
const add = (
  id: string,
  age: string[],
  diff: number,
  speak: string,
  options: object[],
  tag: string,
  say?: string,
) =>
  items.push({
    id,
    ageGroup: age,
    difficulty: diff,
    speak,
    label: speak,
    // Jawaban (yang berbeda) di indeks 0; sisanya sama. Minimal 3 pilihan, juga untuk usia 2-3.
    data: { options, minOptions: 3, ...(say ? { speakAlso: [say] } : {}) },
    tags: ['beda', tag],
    review: 'ditinjau',
  });

const WARNA: [ArtKey, string, ColorName, ColorName][] = [
  ['bola', 'bola', 'merah', 'biru'],
  ['balon', 'balon', 'kuning', 'hijau'],
  ['bintang', 'bintang', 'kuning', 'ungu'],
  ['bunga', 'bunga', 'merah muda', 'oranye'],
  ['ikan', 'ikan', 'oranye', 'biru'],
  ['bola', 'bola', 'hijau', 'merah'],
  ['balon', 'balon', 'biru', 'merah'],
  ['bintang', 'bintang', 'hijau', 'merah'],
  ['bunga', 'bunga', 'ungu', 'kuning'],
  ['ikan', 'ikan', 'kuning', 'merah muda'],
  ['bola', 'bola', 'oranye', 'merah'],
  ['balon', 'balon', 'merah muda', 'merah'],
];
WARNA.forEach(([k, name, same, odd], i) =>
  add(
    `warna-${i}`,
    i < 5 ? ['A', 'B', 'C'] : i < 9 ? ['B', 'C'] : ['C'],
    i < 5 ? 1 : i < 9 ? 2 : 4,
    `Ada ${name} ${same}. Mana ${name} yang warnanya berbeda?`,
    [{ t: 'art', k, color: odd }, ...[0, 1, 2].map(() => ({ t: 'art', k, color: same }))],
    'warna',
    `Yang ini ${odd}!`,
  ),
);
const BENTUK: [ShapeKey, ShapeKey, ColorName][] = [
  ['lingkaran', 'segitiga', 'merah'],
  ['persegi', 'bintang', 'biru'],
  ['segitiga', 'hati', 'hijau'],
  ['bintang', 'lingkaran', 'kuning'],
  ['hati', 'persegi', 'merah muda'],
  ['oval', 'segitiga', 'ungu'],
  ['persegi', 'persegiPanjang', 'oranye'],
  ['lingkaran', 'oval', 'biru'],
  ['segiLima', 'segiEnam', 'hijau'],
  ['persegi', 'belahKetupat', 'merah'],
  ['kubus', 'balok', 'kuning'],
  ['tabung', 'kerucut', 'biru'],
];
const SN: Record<string, string> = {
  lingkaran: 'lingkaran',
  segitiga: 'segitiga',
  persegi: 'persegi',
  bintang: 'bintang',
  hati: 'hati',
  oval: 'oval',
  persegiPanjang: 'persegi panjang',
  segiLima: 'segi lima',
  segiEnam: 'segi enam',
  belahKetupat: 'belah ketupat',
  kubus: 'kubus',
  balok: 'balok',
  tabung: 'tabung',
  kerucut: 'kerucut',
};
BENTUK.forEach(([same, odd, color], i) =>
  add(
    `bentuk-${i}`,
    i < 5 ? ['A', 'B', 'C'] : i < 8 ? ['B', 'C'] : ['C'],
    i < 5 ? 1 : i < 8 ? 3 : 5,
    `Ada beberapa ${SN[same]}. Mana yang bentuknya berbeda?${i >= 8 ? ' Lihat baik-baik.' : ''}`.replace(
      'beberapa',
      i % 2 ? 'banyak' : 'beberapa',
    ),
    [{ t: 'shape', s: odd, color }, ...[0, 1, 2].map(() => ({ t: 'shape', s: same, color }))],
    'bentuk',
    `Yang ini ${SN[odd]}!`,
  ),
);
const JUMLAH: [ArtKey, string, number, number][] = [
  ['apel', 'apel', 3, 2],
  ['bintang', 'bintang', 4, 5],
  ['ikan', 'ikan', 2, 4],
  ['jeruk', 'jeruk', 5, 3],
  ['telur', 'telur', 6, 5],
  ['kue', 'kue', 3, 4],
  ['bola', 'bola', 7, 6],
  ['bunga', 'bunga', 8, 9],
];
JUMLAH.forEach(([k, name, same, odd], i) =>
  add(
    `jumlah-${i}`,
    i < 3 ? ['B', 'C'] : ['C'],
    i < 3 ? 3 : 5,
    `Mana kelompok ${name} yang jumlahnya berbeda?`,
    [{ t: 'group', k, n: odd }, ...[0, 1, 2].map(() => ({ t: 'group', k, n: same }))],
    'jumlah',
    `Yang ini ada ${odd}.`,
  ),
);
const KATEGORI: [string, ArtKey, ArtKey[], string][] = [
  ['hewan', 'mobil', ['kucing', 'sapi', 'ayamJago'], 'Mobil bukan hewan.'],
  ['buah', 'bus', ['apel', 'jeruk', 'pisang'], 'Bus bukan buah.'],
  ['kendaraan', 'pisang', ['mobil', 'pesawat', 'perahuLayar'], 'Pisang bukan kendaraan.'],
  ['hewan laut', 'kucing', ['ikan', 'paus', 'lumbaLumba'], 'Kucing tidak hidup di laut.'],
  ['burung', 'katak', ['merpati', 'elang', 'beo'], 'Katak bukan burung.'],
  ['alat musik', 'apel', ['gitar', 'angklung', 'gong'], 'Apel bukan alat musik.'],
  ['makanan', 'palu', ['roti', 'kue', 'sate'], 'Palu tidak bisa dimakan.'],
  ['sayuran', 'bola', ['wortel', 'tomat', 'jagung'], 'Bola bukan sayuran.'],
  ['kendaraan udara', 'bus', ['pesawat', 'helikopter', 'balonUdara'], 'Bus tidak terbang.'],
  ['serangga', 'ikan', ['lebah', 'nyamuk', 'jangkrik'], 'Ikan bukan serangga.'],
  ['rumah adat', 'roket', ['rumahGadang', 'rumahJoglo', 'rumahHonai'], 'Roket bukan rumah.'],
  ['alat tulis dan gambar', 'jeruk', ['kuas', 'buku', 'kertas'], 'Jeruk bukan alat tulis.'],
  ['hewan berkaki empat', 'ayamJago', ['sapi', 'kuda', 'kambing'], 'Ayam berkaki dua.'],
];
KATEGORI.forEach(([cat, odd, same, say], i) =>
  add(
    `kategori-${i}`,
    i < 4 ? ['A', 'B', 'C'] : i < 9 ? ['B', 'C'] : ['C'],
    i < 4 ? 2 : i < 9 ? 3 : 5,
    `Ada beberapa ${cat}. Mana yang bukan ${cat}?`,
    [odd, ...same].map((k) => ({ t: 'art', k })),
    'kategori',
    say,
  ),
);

await writeContent('cari-yang-beda', items);
