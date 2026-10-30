/**
 * Validasi bank konten semua permainan (Bagian 6 brief).
 * Dijalankan otomatis oleh `npm run build` dan CI.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ART_KEYS } from '../src/core/art/keys';
import { validateGame, type Report } from './content-rules';

const GAMES_DIR = join(import.meta.dirname, '..', 'src', 'games');

async function main(): Promise<void> {
  const dirs = readdirSync(GAMES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const reports: Report[] = [];
  const ids = new Set<string>();
  let failed = false;

  for (const dir of dirs) {
    const base = join(GAMES_DIR, dir);
    const missing = ['index.tsx', 'meta.ts', 'content.json'].filter(
      (f) => !existsSync(join(base, f)),
    );
    if (missing.length) {
      console.error(`✗ ${dir}: berkas hilang: ${missing.join(', ')}`);
      failed = true;
      continue;
    }
    const { meta } = (await import(pathToFileURL(join(base, 'meta.ts')).href)) as { meta: unknown };
    const content: unknown = JSON.parse(readFileSync(join(base, 'content.json'), 'utf8'));
    const report = validateGame(meta, content, ART_KEYS);
    if (report.gameId !== dir)
      report.errors.push(`meta.id "${report.gameId}" harus sama dengan nama folder "${dir}"`);
    if (ids.has(report.gameId)) report.errors.push(`meta.id duplikat: ${report.gameId}`);
    ids.add(report.gameId);
    reports.push(report);
  }

  console.log('\nValidasi konten Main Bersama');
  console.log('─'.repeat(64));
  for (const r of reports) {
    const ok = r.errors.length === 0;
    if (!ok) failed = true;
    console.log(
      `${ok ? '✓' : '✗'} ${r.gameId.padEnd(24)} ${String(r.itemCount).padStart(3)} item  ` +
        `A:${r.perAge.A} B:${r.perAge.B} C:${r.perAge.C}  perlu-ditinjau: ${r.needsReview}`,
    );
    for (const e of r.errors) console.log(`    - ${e}`);
  }
  console.log('─'.repeat(64));
  console.log(`${reports.length} permainan diperiksa.`);

  if (failed) {
    console.error('Validasi konten GAGAL.');
    process.exit(1);
  }
}

void main();
