/**
 * Validasi bank konten semua permainan (Bagian 6 brief).
 * Dijalankan otomatis oleh `npm run build` dan CI.
 */
import { ART_KEYS } from '../src/core/art/keys';
import { validateGame, type Report } from './content-rules';
import { loadGameFolders } from './lib/games';
import { voiceCoverage } from './voice/collect';

async function main(): Promise<void> {
  const reports: Report[] = [];
  const ids = new Set<string>();
  let failed = false;

  for (const g of await loadGameFolders()) {
    if (g.missing.length) {
      console.error(`✗ ${g.dir}: berkas hilang: ${g.missing.join(', ')}`);
      failed = true;
      continue;
    }
    const report = validateGame(g.meta, g.content, ART_KEYS);
    if (report.gameId !== g.dir)
      report.errors.push(`meta.id "${report.gameId}" harus sama dengan nama folder "${g.dir}"`);
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

  // Rekaman suara bukan syarat build: kalimat tanpa rekaman dibacakan suara perangkat.
  const cov = await voiceCoverage();
  console.log(
    `Rekaman suara: ${cov.covered}/${cov.total} kalimat` +
      (cov.missing > 0 ? ` (${cov.missing} belum ada, jalankan "npm run voice")` : ' ✓'),
  );

  if (failed) {
    console.error('Validasi konten GAGAL.');
    process.exit(1);
  }
}

void main();
