import type { RoundResult } from '../../types';
import { ENGINE_CONFIG, type EngineConfig } from './config';

export interface AdaptiveState {
  level: number;
  /** Positif = keberhasilan beruntun, negatif = kesulitan beruntun. */
  streak: number;
}

export type ItemOutcome = 'success' | 'struggle' | 'neutral';

export function classify(result: RoundResult, cfg: EngineConfig = ENGINE_CONFIG): ItemOutcome {
  if (result.firstTry) return 'success';
  if (result.attempts >= cfg.struggleAttempts) return 'struggle';
  return 'neutral';
}

/**
 * Naik level setelah N keberhasilan beruntun, turun setelah N kesulitan beruntun.
 * Turun level tidak pernah ditampilkan ke anak.
 */
export function updateAdaptive(
  state: AdaptiveState,
  result: RoundResult,
  cfg: EngineConfig = ENGINE_CONFIG,
): AdaptiveState {
  const outcome = classify(result, cfg);
  let { level, streak } = state;

  if (outcome === 'success') streak = streak > 0 ? streak + 1 : 1;
  else if (outcome === 'struggle') streak = streak < 0 ? streak - 1 : -1;
  else streak = 0;

  if (streak >= cfg.levelUpStreak) {
    level = Math.min(cfg.maxLevel, level + 1);
    streak = 0;
  } else if (-streak >= cfg.levelDownStreak) {
    level = Math.max(cfg.minLevel, level - 1);
    streak = 0;
  }
  return { level, streak };
}
