import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { VoiceManifest } from '../../src/core/audio/voiceKey';
import type { ElevenLabsClient } from './elevenlabs';
import { ElevenLabsError } from './elevenlabs';
import type { Phrase } from './collect';

export interface GenerateOptions {
  phrases: Phrase[];
  manifest: VoiceManifest;
  outDir: string;
  client: Pick<ElevenLabsClient, 'synthesize'> | null;
  /** Identitas pengaturan suara; bagian dari nama berkas. */
  voice: { voiceId: string; modelId: string; outputFormat: string; version: string };
  force?: boolean;
  dryRun?: boolean;
  limit?: number;
  only?: string;
  concurrency?: number;
  retries?: number;
  sleep?: (ms: number) => Promise<void>;
  log?: (msg: string) => void;
}

export interface GenerateResult {
  manifest: VoiceManifest;
  todo: Phrase[];
  generated: number;
  failed: { text: string; error: string }[];
  pruned: number;
  chars: number;
}

export const clipFile = (key: string, version: string) => `${key}-${version}.mp3`;

/**
 * Membuat rekaman untuk kalimat yang belum punya (atau semua, dengan force).
 * Rekaman yang sudah ada dan cocok dengan pengaturan suara dilewati, jadi aman dijalankan ulang
 * dan tidak menghabiskan kuota untuk kalimat yang sama.
 */
export async function generateVoice(o: GenerateOptions): Promise<GenerateResult> {
  const log = o.log ?? (() => undefined);
  const sleep = o.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  const retries = o.retries ?? 4;

  const manifest: VoiceManifest = {
    ...o.manifest,
    provider: 'elevenlabs',
    voiceId: o.voice.voiceId,
    modelId: o.voice.modelId,
    outputFormat: o.voice.outputFormat,
    clips: { ...o.manifest.clips },
  };

  const upToDate = (p: Phrase) => {
    const c = manifest.clips[p.key];
    return (
      !o.force && c?.file === clipFile(p.key, o.voice.version) && existsSync(join(o.outDir, c.file))
    );
  };

  let todo = o.phrases.filter((p) => !upToDate(p));
  if (o.only) todo = todo.filter((p) => p.sources.includes(o.only!));
  if (o.limit !== undefined) todo = todo.slice(0, o.limit);
  const chars = todo.reduce((n, p) => n + p.text.length, 0);

  const result: GenerateResult = { manifest, todo, generated: 0, failed: [], pruned: 0, chars };
  if (o.dryRun) return result;
  if (todo.length > 0 && !o.client) throw new Error('Klien ElevenLabs belum disiapkan');
  const client = o.client!;

  mkdirSync(o.outDir, { recursive: true });
  let fatal: Error | null = null;
  const queue = [...todo];

  const work = async () => {
    for (let p = queue.shift(); p && !fatal; p = queue.shift()) {
      for (let attempt = 0; ; attempt++) {
        try {
          const audio = await client.synthesize(p.text);
          const file = clipFile(p.key, o.voice.version);
          writeFileSync(join(o.outDir, file), audio);
          const old = manifest.clips[p.key]?.file;
          if (old && old !== file) rmSync(join(o.outDir, old), { force: true });
          manifest.clips[p.key] = { file, text: p.text };
          result.generated++;
          log(`✓ [${result.generated}/${todo.length}] ${p.text}`);
          break;
        } catch (e) {
          const err = e as Error;
          const retryable = err instanceof ElevenLabsError ? err.retryable : true;
          if (retryable && attempt < retries) {
            const wait = 1000 * 2 ** attempt;
            log(`… ${err.message} — coba lagi dalam ${wait / 1000} dtk`);
            await sleep(wait);
            continue;
          }
          // 401/403 (kunci salah, kuota habis): hentikan semua, jangan buang permintaan.
          if (err instanceof ElevenLabsError && [401, 403].includes(err.status)) fatal = err;
          result.failed.push({ text: p.text, error: err.message });
          log(`✗ ${p.text}: ${err.message}`);
          break;
        }
      }
    }
  };

  await Promise.all(Array.from({ length: Math.max(1, o.concurrency ?? 2) }, work));

  // Bersihkan hanya pada proses penuh, agar uji coba sebagian tidak menghapus rekaman lain.
  if (!o.only && o.limit === undefined && !fatal) {
    const keep = new Set(o.phrases.map((p) => p.key));
    for (const k of Object.keys(manifest.clips)) if (!keep.has(k)) delete manifest.clips[k];
    const used = new Set(Object.values(manifest.clips).map((c) => c.file));
    for (const f of readdirSync(o.outDir))
      if (f.endsWith('.mp3') && !used.has(f)) {
        rmSync(join(o.outDir, f));
        result.pruned++;
      }
  }

  manifest.clips = Object.fromEntries(
    Object.entries(manifest.clips).sort(([a], [b]) => a.localeCompare(b)),
  );
  if (result.generated > 0 || result.pruned > 0) manifest.generatedAt = new Date().toISOString();
  if (fatal) throw Object.assign(fatal, { partial: result });
  return result;
}

export function writeManifest(path: string, m: VoiceManifest): void {
  writeFileSync(path, JSON.stringify(m, null, 2) + '\n');
}
