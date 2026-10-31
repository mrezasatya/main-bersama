import type { AgeGroup, ContentItem } from '../../types';

export type Rng = () => number;

export interface PickResult<T extends ContentItem<unknown>> {
  item: T;
  /** Daftar id yang sudah dilihat setelah pemilihan ini. */
  seen: string[];
  /** true bila kantong item untuk kelompok usia ini baru saja diisi ulang. */
  bagReset: boolean;
}

export function itemsForAge<T extends ContentItem<unknown>>(
  bank: readonly T[],
  age: AgeGroup,
): T[] {
  return bank.filter((it) => it.ageGroup.includes(age));
}

const AGE_ORDER: AgeGroup[] = ['A', 'B', 'C'];

/**
 * Kelompok usia yang dipakai untuk sebuah bank. Bila permainan tidak mencakup usia anak
 * (mis. permainan 2-4 tahun dibuka anak 5-6 tahun), dipakai kelompok terdekat yang tersedia.
 */
export function effectiveAge(bank: readonly ContentItem<unknown>[], age: AgeGroup): AgeGroup {
  const has = (g: AgeGroup) => bank.some((it) => it.ageGroup.includes(g));
  if (has(age)) return age;
  const i = AGE_ORDER.indexOf(age);
  const byDistance = [...AGE_ORDER].sort(
    (a, b) => Math.abs(AGE_ORDER.indexOf(a) - i) - Math.abs(AGE_ORDER.indexOf(b) - i),
  );
  return byDistance.find(has) ?? age;
}

/**
 * Shuffle-bag adaptif: memilih item yang belum dilihat untuk kelompok usia ini,
 * dengan tingkat kesulitan paling dekat ke level saat ini. Item yang lebih mudah
 * didahulukan bila jaraknya sama. Bila semua item sudah dilihat, kantong diisi ulang.
 */
export function pickNext<T extends ContentItem<unknown>>(
  bank: readonly T[],
  age: AgeGroup,
  level: number,
  seen: readonly string[],
  rng: Rng = Math.random,
): PickResult<T> {
  const pool = itemsForAge(bank, age);
  if (pool.length === 0) throw new Error(`Tidak ada item untuk kelompok usia ${age}`);

  const seenSet = new Set(seen);
  let unseen = pool.filter((it) => !seenSet.has(it.id));
  let nextSeen = [...seen];
  let bagReset = false;

  if (unseen.length === 0) {
    const poolIds = new Set(pool.map((it) => it.id));
    nextSeen = nextSeen.filter((id) => !poolIds.has(id));
    unseen = pool;
    bagReset = true;
  }

  const distance = (it: T) => {
    const d = it.difficulty - level;
    // Item lebih sulit dari level diberi penalti kecil agar yang lebih mudah didahulukan.
    return d > 0 ? d + 0.5 : -d;
  };
  const best = Math.min(...unseen.map(distance));
  const candidates = unseen.filter((it) => distance(it) === best);
  const item = candidates[Math.floor(rng() * candidates.length)] ?? candidates[0]!;

  nextSeen.push(item.id);
  return { item, seen: nextSeen, bagReset };
}

/** Mengacak salinan larik (Fisher-Yates). */
export function shuffle<T>(arr: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}
