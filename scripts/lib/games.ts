import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export const ROOT = join(import.meta.dirname, '..', '..');
export const GAMES_DIR = join(ROOT, 'src', 'games');
export const REQUIRED_FILES = ['index.tsx', 'meta.ts', 'content.json'] as const;

export interface GameFolder {
  dir: string;
  missing: string[];
  meta: unknown;
  /** Kalimat tetap khusus permainan (ekspor `phrases` dari meta.ts), ikut dibuatkan rekaman. */
  phrases: string[];
  content: unknown;
}

/** Membaca semua folder permainan: meta.ts (via import) dan content.json. */
export async function loadGameFolders(): Promise<GameFolder[]> {
  const dirs = readdirSync(GAMES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const out: GameFolder[] = [];
  for (const dir of dirs) {
    const base = join(GAMES_DIR, dir);
    const missing = REQUIRED_FILES.filter((f) => !existsSync(join(base, f)));
    if (missing.length) {
      out.push({ dir, missing, meta: null, phrases: [], content: null });
      continue;
    }
    const { meta, phrases = [] } = (await import(pathToFileURL(join(base, 'meta.ts')).href)) as {
      meta: unknown;
      phrases?: string[];
    };
    const content: unknown = JSON.parse(readFileSync(join(base, 'content.json'), 'utf8'));
    out.push({ dir, missing: [], meta, phrases, content });
  }
  return out;
}
