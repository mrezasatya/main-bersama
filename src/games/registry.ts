import type { ComponentType } from 'react';
import type { ArtKey, ColorName } from '../core/art';
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
  cover: { art: ArtKey; color?: ColorName };
  load: () => Promise<{ default: ComponentType }>;
  loadContent: () => Promise<{ default: unknown }>;
}

/** Tambahkan permainan baru di sini; komponennya dimuat lazy. */
export const GAMES: readonly GameEntry[] = [
  {
    ...suaraHewan,
    cover: { art: 'ayamJago' },
    load: () => import('./suara-hewan'),
    loadContent: () => import('./suara-hewan/content.json'),
  },
  {
    ...kendaraan,
    cover: { art: 'bus' },
    load: () => import('./kendaraan'),
    loadContent: () => import('./kendaraan/content.json'),
  },
  {
    ...nadaNusantara,
    cover: { art: 'lonceng' },
    load: () => import('./nada-nusantara'),
    loadContent: () => import('./nada-nusantara/content.json'),
  },
  {
    ...tiruIrama,
    cover: { art: 'gendang' },
    load: () => import('./tiru-irama'),
    loadContent: () => import('./tiru-irama/content.json'),
  },
  {
    ...pancaIndra,
    cover: { art: 'telinga' },
    load: () => import('./panca-indra'),
    loadContent: () => import('./panca-indra/content.json'),
  },
  {
    ...hurufPasir,
    cover: { art: 'apel' },
    load: () => import('./huruf-pasir'),
    loadContent: () => import('./huruf-pasir/content.json'),
  },
  {
    ...rangkaiSukuKata,
    cover: { art: 'buku' },
    load: () => import('./rangkai-suku-kata'),
    loadContent: () => import('./rangkai-suku-kata/content.json'),
  },
  {
    ...gelembungAngka,
    cover: { art: 'balon' },
    load: () => import('./gelembung-angka'),
    loadContent: () => import('./gelembung-angka/content.json'),
  },
  {
    ...petaDunia,
    cover: { art: 'pesawat' },
    load: () => import('./peta-dunia'),
    loadContent: () => import('./peta-dunia/content.json'),
  },
  {
    ...profesi,
    cover: { art: 'dokter' },
    load: () => import('./profesi'),
    loadContent: () => import('./profesi/content.json'),
  },
  {
    ...rasaHatiku,
    cover: { art: 'hadiah' },
    load: () => import('./rasa-hatiku'),
    loadContent: () => import('./rasa-hatiku/content.json'),
  },
  {
    ...ceritaPilihanku,
    cover: { art: 'tangan' },
    load: () => import('./cerita-pilihanku'),
    loadContent: () => import('./cerita-pilihanku/content.json'),
  },
  {
    ...jamDanHari,
    cover: { art: 'matahari' },
    load: () => import('./jam-dan-hari'),
    loadContent: () => import('./jam-dan-hari/content.json'),
  },
  {
    ...dariManaAsalnya,
    cover: { art: 'susu' },
    load: () => import('./dari-mana-asalnya'),
    loadContent: () => import('./dari-mana-asalnya/content.json'),
  },
  {
    ...ayoBerkebun,
    cover: { art: 'pot' },
    load: () => import('./ayo-berkebun'),
    loadContent: () => import('./ayo-berkebun/content.json'),
  },
  {
    ...pasangBentuk,
    cover: { art: 'bintang' },
    load: () => import('./pasang-bentuk'),
    loadContent: () => import('./pasang-bentuk/content.json'),
  },
  {
    ...campurWarna,
    cover: { art: 'kuas' },
    load: () => import('./campur-warna'),
    loadContent: () => import('./campur-warna/content.json'),
  },
  {
    ...pasanganBudaya,
    cover: { art: 'rumahGadang' },
    load: () => import('./pasangan-budaya'),
    loadContent: () => import('./pasangan-budaya/content.json'),
  },
  {
    ...puzzleGambar,
    cover: { art: 'gajah' },
    load: () => import('./puzzle-gambar'),
    loadContent: () => import('./puzzle-gambar/content.json'),
  },
  {
    ...urutkanBesarKecil,
    cover: { art: 'bola' },
    load: () => import('./urutkan-besar-kecil'),
    loadContent: () => import('./urutkan-besar-kecil/content.json'),
  },
  // Permainan contoh Fase 0 (di luar katalog 30).
  {
    ...cariWarna,
    cover: { art: 'balon', color: 'merah' },
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
