import type { AgeGroup } from '../../types';

export interface EngineConfig {
  minLevel: number;
  maxLevel: number;
  /** Keberhasilan beruntun untuk naik level. */
  levelUpStreak: number;
  /** Kesulitan beruntun untuk turun level. */
  levelDownStreak: number;
  /** Item dianggap "sulit" bila butuh sebanyak ini percobaan atau lebih. */
  struggleAttempts: number;
  startLevel: Record<AgeGroup, number>;
  sessionLength: Record<AgeGroup, number>;
  choiceCount: Record<AgeGroup, number>;
}

export const ENGINE_CONFIG: EngineConfig = {
  minLevel: 1,
  maxLevel: 5,
  levelUpStreak: 3,
  levelDownStreak: 3,
  struggleAttempts: 3,
  startLevel: { A: 1, B: 2, C: 3 },
  sessionLength: { A: 5, B: 6, C: 8 },
  choiceCount: { A: 2, B: 3, C: 4 },
};
