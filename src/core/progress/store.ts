import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AgeGroup, RoundResult } from '../../types';
import { ENGINE_CONFIG, updateAdaptive, type AdaptiveState } from '../engine';
import { safeStorage } from './storage';

export interface GameProgress {
  levels: Partial<Record<AgeGroup, AdaptiveState>>;
  seen: string[];
  stars: number;
  sessions: number;
}

interface ProgressStore {
  games: Record<string, GameProgress>;
  getAdaptive: (gameId: string, age: AgeGroup) => AdaptiveState;
  setSeen: (gameId: string, seen: string[]) => void;
  recordRound: (gameId: string, age: AgeGroup, result: RoundResult) => void;
  finishSession: (gameId: string, stars: number) => void;
  reset: () => void;
}

const emptyGame = (): GameProgress => ({ levels: {}, seen: [], stars: 0, sessions: 0 });

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => {
      const patch = (gameId: string, fn: (g: GameProgress) => GameProgress) =>
        set((s) => ({ games: { ...s.games, [gameId]: fn(s.games[gameId] ?? emptyGame()) } }));

      return {
        games: {},
        getAdaptive: (gameId, age) =>
          get().games[gameId]?.levels[age] ?? { level: ENGINE_CONFIG.startLevel[age], streak: 0 },
        setSeen: (gameId, seen) => patch(gameId, (g) => ({ ...g, seen })),
        recordRound: (gameId, age, result) => {
          const next = updateAdaptive(get().getAdaptive(gameId, age), result);
          patch(gameId, (g) => ({ ...g, levels: { ...g.levels, [age]: next } }));
        },
        finishSession: (gameId, stars) =>
          patch(gameId, (g) => ({
            ...g,
            stars: g.stars + Math.max(0, stars),
            sessions: g.sessions + 1,
          })),
        reset: () => set({ games: {} }),
      };
    },
    {
      name: 'mb-progress',
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ games: s.games }),
    },
  ),
);

export function totalStars(games: Record<string, GameProgress>): number {
  return Object.values(games).reduce((sum, g) => sum + g.stars, 0);
}

export const useTotalStars = () => useProgress((s) => totalStars(s.games));
