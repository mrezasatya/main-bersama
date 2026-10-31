import type { ComponentType } from 'react';
import type { Visual } from '../core/visual/types';
import type { CompanionGuide, ContentItem, GameMeta } from '../types';
import * as ayoBerkebun from './ayo-berkebun/meta';
import * as ceritaPilihanku from './cerita-pilihanku/meta';
import * as dariManaAsalnya from './dari-mana-asalnya/meta';
import * as jamDanHari from './jam-dan-hari/meta';
import * as rasaHatiku from './rasa-hatiku/meta';
import * as campurWarna from './campur-warna/meta';
import * as pasangBentuk from './pasang-bentuk/meta';
import * as pasanganBudaya from './pasangan-budaya/meta';
import * as puzzleGambar from './puzzle-gambar/meta';
import * as urutkanBesarKecil from './urutkan-besar-kecil/meta';
import * as cariYangBeda from './cari-yang-beda/meta';
import * as hitungBuah from './hitung-buah/meta';
import * as kebunAngka from './kebun-angka/meta';
import * as kelompokkan from './kelompokkan/meta';
import * as rumahBentuk from './rumah-bentuk/meta';
import * as jalanGaris from './jalan-garis/meta';
import * as polaBatik from './pola-batik/meta';
import * as tokoKecil from './toko-kecil/meta';
import * as ukurBandingkan from './ukur-bandingkan/meta';
import * as warnaBatik from './warna-batik/meta';
import * as cariWarna from './cari-warna/meta';
import * as kendaraan from './kendaraan/meta';
import * as nadaNusantara from './nada-nusantara/meta';
import * as pancaIndra from './panca-indra/meta';
import * as suaraHewan from './suara-hewan/meta';
import * as tiruIrama from './tiru-irama/meta';
import * as gelembungAngka from './gelembung-angka/meta';
import * as hurufPasir from './huruf-pasir/meta';
import * as petaDunia from './peta-dunia/meta';
import * as profesi from './profesi/meta';
import * as rangkaiSukuKata from './rangkai-suku-kata/meta';

export interface GameEntry {
  meta: GameMeta;
  guide: CompanionGuide;
  /** Gambar sampul kartu menu. */
  cover: Visual;
  load: () => Promise<{ default: ComponentType }>;
  loadContent: () => Promise<{ default: unknown }>;
}

/** Tambahkan permainan baru di sini; komponennya dimuat lazy. */
export const GAMES: readonly GameEntry[] = [
  {
    ...suaraHewan,
    cover: { t: 'art', k: 'ayamJago' },
    load: () => import('./suara-hewan'),
    loadContent: () => import('./suara-hewan/content.json'),
  },
  {
    ...kendaraan,
    cover: { t: 'art', k: 'bus' },
    load: () => import('./kendaraan'),
    loadContent: () => import('./kendaraan/content.json'),
  },
  {
    ...nadaNusantara,
    cover: { t: 'art', k: 'lonceng' },
    load: () => import('./nada-nusantara'),
    loadContent: () => import('./nada-nusantara/content.json'),
  },
  {
    ...tiruIrama,
    cover: { t: 'art', k: 'gendang' },
    load: () => import('./tiru-irama'),
    loadContent: () => import('./tiru-irama/content.json'),
  },
  {
    ...pancaIndra,
    cover: { t: 'art', k: 'telinga' },
    load: () => import('./panca-indra'),
    loadContent: () => import('./panca-indra/content.json'),
  },
  {
    ...hurufPasir,
    cover: { t: 'text', s: 'Aa', size: 'xl' },
    load: () => import('./huruf-pasir'),
    loadContent: () => import('./huruf-pasir/content.json'),
  },
  {
    ...rangkaiSukuKata,
    cover: { t: 'art', k: 'buku' },
    load: () => import('./rangkai-suku-kata'),
    loadContent: () => import('./rangkai-suku-kata/content.json'),
  },
  {
    ...gelembungAngka,
    cover: { t: 'text', s: '123' },
    load: () => import('./gelembung-angka'),
    loadContent: () => import('./gelembung-angka/content.json'),
  },
  {
    ...petaDunia,
    cover: { t: 'flag', c: 'indonesia' },
    load: () => import('./peta-dunia'),
    loadContent: () => import('./peta-dunia/content.json'),
  },
  {
    ...profesi,
    cover: { t: 'art', k: 'dokter' },
    load: () => import('./profesi'),
    loadContent: () => import('./profesi/content.json'),
  },
  {
    ...rasaHatiku,
    cover: { t: 'face', e: 'senang' },
    load: () => import('./rasa-hatiku'),
    loadContent: () => import('./rasa-hatiku/content.json'),
  },
  {
    ...ceritaPilihanku,
    cover: { t: 'art', k: 'tangan' },
    load: () => import('./cerita-pilihanku'),
    loadContent: () => import('./cerita-pilihanku/content.json'),
  },
  {
    ...jamDanHari,
    cover: { t: 'clock', h: 7 },
    load: () => import('./jam-dan-hari'),
    loadContent: () => import('./jam-dan-hari/content.json'),
  },
  {
    ...dariManaAsalnya,
    cover: { t: 'art', k: 'susu' },
    load: () => import('./dari-mana-asalnya'),
    loadContent: () => import('./dari-mana-asalnya/content.json'),
  },
  {
    ...ayoBerkebun,
    cover: { t: 'art', k: 'pot' },
    load: () => import('./ayo-berkebun'),
    loadContent: () => import('./ayo-berkebun/content.json'),
  },
  {
    ...pasangBentuk,
    cover: { t: 'art', k: 'bintang' },
    load: () => import('./pasang-bentuk'),
    loadContent: () => import('./pasang-bentuk/content.json'),
  },
  {
    ...campurWarna,
    cover: { t: 'mix', a: 'merah', b: 'kuning' },
    load: () => import('./campur-warna'),
    loadContent: () => import('./campur-warna/content.json'),
  },
  {
    ...pasanganBudaya,
    cover: { t: 'art', k: 'rumahGadang' },
    load: () => import('./pasangan-budaya'),
    loadContent: () => import('./pasangan-budaya/content.json'),
  },
  {
    ...puzzleGambar,
    cover: { t: 'art', k: 'gajah' },
    load: () => import('./puzzle-gambar'),
    loadContent: () => import('./puzzle-gambar/content.json'),
  },
  {
    ...urutkanBesarKecil,
    cover: { t: 'art', k: 'bola' },
    load: () => import('./urutkan-besar-kecil'),
    loadContent: () => import('./urutkan-besar-kecil/content.json'),
  },
  {
    ...hitungBuah,
    cover: { t: 'group', k: 'apel', n: 3 },
    load: () => import('./hitung-buah'),
    loadContent: () => import('./hitung-buah/content.json'),
  },
  {
    ...kebunAngka,
    cover: { t: 'tenframe', n: 7 },
    load: () => import('./kebun-angka'),
    loadContent: () => import('./kebun-angka/content.json'),
  },
  {
    ...rumahBentuk,
    cover: { t: 'shape', s: 'kubus', color: 'kuning' },
    load: () => import('./rumah-bentuk'),
    loadContent: () => import('./rumah-bentuk/content.json'),
  },
  {
    ...cariYangBeda,
    cover: { t: 'art', k: 'burungHantu' },
    load: () => import('./cari-yang-beda'),
    loadContent: () => import('./cari-yang-beda/content.json'),
  },
  {
    ...kelompokkan,
    cover: { t: 'art', k: 'tasSekolah' },
    load: () => import('./kelompokkan'),
    loadContent: () => import('./kelompokkan/content.json'),
  },
  {
    ...polaBatik,
    cover: { t: 'art', k: 'batikKawung' },
    load: () => import('./pola-batik'),
    loadContent: () => import('./pola-batik/content.json'),
  },
  {
    ...jalanGaris,
    cover: { t: 'art', k: 'lebah' },
    load: () => import('./jalan-garis'),
    loadContent: () => import('./jalan-garis/content.json'),
  },
  {
    ...warnaBatik,
    cover: { t: 'art', k: 'megaMendung' },
    load: () => import('./warna-batik'),
    loadContent: () => import('./warna-batik/content.json'),
  },
  {
    ...tokoKecil,
    cover: { t: 'money', v: 5000 },
    load: () => import('./toko-kecil'),
    loadContent: () => import('./toko-kecil/content.json'),
  },
  {
    ...ukurBandingkan,
    cover: { t: 'art', k: 'timbangan' },
    load: () => import('./ukur-bandingkan'),
    loadContent: () => import('./ukur-bandingkan/content.json'),
  },
  // Permainan contoh Fase 0 (di luar katalog 30).
  {
    ...cariWarna,
    cover: { t: 'art', k: 'balon', color: 'merah' },
    load: () => import('./cari-warna'),
    loadContent: () => import('./cari-warna/content.json'),
  },
];

export const findGame = (id: string) => GAMES.find((g) => g.meta.id === id);

export async function loadAllContent(): Promise<{ game: GameEntry; items: ContentItem[] }[]> {
  return Promise.all(
    GAMES.map(async (game) => ({
      game,
      items: (await game.loadContent()).default as ContentItem[],
    })),
  );
}
