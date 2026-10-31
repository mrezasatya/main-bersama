import type { ComponentType } from 'react';
import type { ArtKey, ColorName } from '../core/art';
import type { CompanionGuide, ContentItem, GameMeta } from '../types';
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
