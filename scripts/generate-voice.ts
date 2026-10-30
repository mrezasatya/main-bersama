/**
 * Membuat rekaman suara ElevenLabs untuk semua kalimat aplikasi.
 * Rekaman disimpan di public/voice/ dan di-commit ke repositori; aplikasi memutarnya offline.
 *
 *   npm run voice -- --list-voices     daftar suara di akun ElevenLabs Anda
 *   npm run voice -- --dry-run         daftar kalimat yang akan dibuat + jumlah karakter (gratis)
 *   npm run voice -- --limit 5         buat 5 rekaman dulu untuk didengarkan
 *   npm run voice -- --only cari-warna hanya kalimat dari satu sumber (id permainan, ui, stiker, judul)
 *   npm run voice                      buat semua yang belum ada
 *   npm run voice -- --force           buat ulang semua (mis. setelah ganti suara)
 *
 * Konfigurasi lewat .env.local (lihat .env.example). Kunci API tidak pernah di-commit.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { voiceVersion } from '../src/core/audio/voiceKey';
import { ROOT } from './lib/games';
import { MANIFEST_PATH, VOICE_DIR, collectPhrases, readManifest } from './voice/collect';
import { createClient, type ElevenLabsConfig } from './voice/elevenlabs';
import { generateVoice, writeManifest, type GenerateResult } from './voice/generate';

for (const f of ['.env.local', '.env']) {
  const p = join(ROOT, f);
  if (existsSync(p)) process.loadEnvFile(p);
}

const { values: args } = parseArgs({
  options: {
    'dry-run': { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
    'list-voices': { type: 'boolean', default: false },
    limit: { type: 'string' },
    only: { type: 'string' },
    concurrency: { type: 'string' },
  },
});

const env = (k: string, d?: string) => process.env[k]?.trim() || d;
const num = (k: string, d: number) => {
  const v = env(k);
  return v === undefined ? d : Number(v);
};

function config(): ElevenLabsConfig {
  const apiKey = env('ELEVENLABS_API_KEY');
  if (!apiKey) fail('ELEVENLABS_API_KEY belum diisi. Salin .env.example menjadi .env.local.');
  const modelId = env('ELEVENLABS_MODEL_ID', 'eleven_multilingual_v2')!;
  // Penegakan bahasa hanya didukung sebagian model; untuk model lain dikosongkan kecuali diisi manual.
  const lang = env('ELEVENLABS_LANGUAGE_CODE', /_v2_5$/.test(modelId) ? 'id' : '');
  const speed = env('ELEVENLABS_SPEED');
  return {
    apiKey: apiKey!,
    voiceId: env('ELEVENLABS_VOICE_ID', '')!,
    modelId,
    outputFormat: env('ELEVENLABS_OUTPUT_FORMAT', 'mp3_22050_32')!,
    languageCode: lang || undefined,
    voiceSettings: {
      stability: num('ELEVENLABS_STABILITY', 0.5),
      similarity_boost: num('ELEVENLABS_SIMILARITY', 0.75),
      style: num('ELEVENLABS_STYLE', 0),
      use_speaker_boost: env('ELEVENLABS_SPEAKER_BOOST', 'true') === 'true',
      ...(speed ? { speed: Number(speed) } : {}),
    },
    baseUrl: env('ELEVENLABS_BASE_URL'),
  };
}

function fail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

async function main() {
  if (args['list-voices']) {
    const voices = await createClient(config()).listVoices();
    console.log('voice_id                  nama                      kategori   label');
    for (const v of voices)
      console.log(
        `${v.voice_id.padEnd(25)} ${v.name.slice(0, 25).padEnd(25)} ${(v.category ?? '').padEnd(10)} ${Object.values(v.labels ?? {}).join(', ')}`,
      );
    console.log('\nSalin voice_id pilihan ke ELEVENLABS_VOICE_ID di .env.local.');
    return;
  }

  const dryRun = args['dry-run'];
  const cfg = dryRun && !env('ELEVENLABS_API_KEY') ? null : config();
  if (cfg && !cfg.voiceId)
    fail('ELEVENLABS_VOICE_ID belum diisi. Lihat: npm run voice -- --list-voices');

  const voiceId = cfg?.voiceId ?? env('ELEVENLABS_VOICE_ID', '(belum diisi)')!;
  const modelId = cfg?.modelId ?? env('ELEVENLABS_MODEL_ID', 'eleven_multilingual_v2')!;
  const outputFormat = cfg?.outputFormat ?? env('ELEVENLABS_OUTPUT_FORMAT', 'mp3_22050_32')!;
  const version = voiceVersion([
    voiceId,
    modelId,
    outputFormat,
    JSON.stringify(cfg?.voiceSettings ?? {}),
    cfg?.languageCode ?? '',
  ]);

  const phrases = await collectPhrases();
  const client = cfg ? createClient(cfg) : null;
  const limit = args.limit === undefined ? undefined : Number(args.limit);

  let result: GenerateResult;
  try {
    result = await generateVoice({
      phrases,
      manifest: readManifest(),
      outDir: VOICE_DIR,
      client,
      voice: { voiceId, modelId, outputFormat, version },
      force: args.force,
      dryRun,
      limit,
      only: args.only,
      concurrency: args.concurrency ? Number(args.concurrency) : num('ELEVENLABS_CONCURRENCY', 2),
      log: (m) => console.log(m),
    });
  } catch (e) {
    const partial = (e as { partial?: GenerateResult }).partial;
    if (partial) writeManifest(MANIFEST_PATH, partial.manifest);
    fail(`${(e as Error).message}\n  (rekaman yang sudah jadi tetap disimpan)`);
  }

  console.log('─'.repeat(64));
  console.log(`Total kalimat aplikasi : ${phrases.length}`);
  console.log(`Perlu dibuat          : ${result.todo.length} kalimat, ${result.chars} karakter`);
  console.log(`Suara / model / format: ${voiceId} / ${modelId} / ${outputFormat}`);

  if (dryRun) {
    for (const p of result.todo) console.log(`  · [${p.sources.join(',')}] ${p.text}`);
    if (client) {
      const q = await createClient(cfg!).quota();
      if (q) console.log(`Kuota karakter        : terpakai ${q.used} dari ${q.limit} bulan ini`);
    }
    console.log('\n(Uji kering: tidak ada permintaan ke ElevenLabs.)');
    return;
  }

  writeManifest(MANIFEST_PATH, result.manifest);
  console.log(`Dibuat                : ${result.generated}`);
  if (result.pruned) console.log(`Dihapus (tak terpakai): ${result.pruned}`);
  if (result.failed.length) {
    console.log(`Gagal                 : ${result.failed.length}`);
    process.exitCode = 1;
  }
  console.log('\nDengarkan di halaman Uji Suara (npm run dev), lalu commit folder public/voice.');
}

void main();
