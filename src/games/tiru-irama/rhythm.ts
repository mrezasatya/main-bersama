export type Beat = 'ta' | 'taa';

/** Durasi relatif ketukan: ta = 1, taa = 2. */
export const units = (b: Beat) => (b === 'taa' ? 2 : 1);

/**
 * Apakah ketukan anak meniru pola? Jumlah ketukan harus sama; untuk usia 4-6 jarak antarketukan
 * juga dibandingkan secara relatif (panjang/pendek), bukan tempo mutlak, dan toleran.
 */
export function matchRhythm(
  beats: readonly Beat[],
  times: readonly number[],
  checkRhythm: boolean,
): boolean {
  if (times.length !== beats.length) return false;
  if (!checkRhythm || beats.length < 3) return true;

  const iois = times.slice(1).map((t, i) => t - times[i]!);
  const target = beats.slice(0, -1).map(units);
  const minIoi = Math.min(...iois);
  if (minIoi <= 0) return false;
  const ratios = iois.map((x) => x / minIoi);

  // Pola rata (semua sama panjang): cukup tidak ada jeda yang jauh lebih panjang.
  if (target.every((u) => u === target[0])) return Math.max(...ratios) < 1.7;
  return ratios.every((r, i) => (r >= 1.45 ? 2 : 1) === target[i]);
}

/** "ta, ta, taa" */
export const beatsText = (beats: readonly Beat[]) => beats.join(', ');
