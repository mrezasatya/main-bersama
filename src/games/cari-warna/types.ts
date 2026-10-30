import type { ColorName } from '../../core/art';

export interface CariWarnaData {
  target: ColorName;
  /** Urut dari paling kontras; ronde mengambil sebanyak yang dibutuhkan. */
  distractors: ColorName[];
}
