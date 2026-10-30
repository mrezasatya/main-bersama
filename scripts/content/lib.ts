import { writeFileSync } from 'node:fs';
import { format } from 'prettier';
import { join } from 'node:path';
import { GAMES_DIR } from '../lib/games';

/** RNG deterministik agar content.json stabil antar-generasi. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function pickFrom<T>(
  rng: () => number,
  pool: readonly T[],
  n: number,
  exclude: Set<T>,
): T[] {
  const out: T[] = [];
  const cand = pool.filter((x) => !exclude.has(x));
  while (out.length < n && cand.length) {
    const i = Math.floor(rng() * cand.length);
    out.push(cand.splice(i, 1)[0]!);
  }
  return out;
}

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Ditulis dengan format Prettier agar `format:check` tetap lolos. */
export async function writeContent(game: string, items: unknown[]): Promise<void> {
  const json = await format(JSON.stringify(items), { parser: 'json', printWidth: 100 });
  writeFileSync(join(GAMES_DIR, game, 'content.json'), json);
  console.log(`✓ ${game}: ${items.length} item`);
}
