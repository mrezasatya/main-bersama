import type { ComponentType } from 'react';
import type { ArtKey, ColorName } from '../core/art';
import type { CompanionGuide, ContentItem, GameMeta } from '../types';
import * as cariWarna from './cari-warna/meta';

export interface GameEntry {
  meta: GameMeta;
  guide: CompanionGuide;
  /** Gambar sampul kartu menu. */
  cover: { art: ArtKey; color: ColorName };
  load: () => Promise<{ default: ComponentType }>;
  loadContent: () => Promise<{ default: unknown }>;
}

/** Tambahkan permainan baru di sini; komponennya dimuat lazy. */
export const GAMES: readonly GameEntry[] = [
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
