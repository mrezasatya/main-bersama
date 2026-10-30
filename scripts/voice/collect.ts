import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { stickerLine, uiPhrases } from '../../src/core/audio/phrases';
import { EMPTY_MANIFEST, normalizeSpeech, voiceKey } from '../../src/core/audio/voiceKey';
import type { VoiceManifest } from '../../src/core/audio/voiceKey';
import { STICKERS } from '../../src/core/progress/stickers';
import { ROOT, loadGameFolders } from '../lib/games';

export const VOICE_DIR = join(ROOT, 'public', 'voice');
export const MANIFEST_PATH = join(VOICE_DIR, 'manifest.json');

export interface Phrase {
  key: string;
  text: string;
  /** Asal kalimat, mis. "ui", "stiker", "cari-warna". */
  sources: string[];
}

/** Mengumpulkan semua kalimat yang dibacakan aplikasi, tanpa duplikat. */
export async function collectPhrases(): Promise<Phrase[]> {
  const map = new Map<string, Phrase>();
  const add = (raw: string, source: string) => {
    const text = normalizeSpeech(raw);
    if (!text) return;
    const key = voiceKey(text);
    const hit = map.get(key);
    if (hit) {
      if (hit.text !== text) throw new Error(`Tabrakan kunci rekaman: "${hit.text}" dan "${text}"`);
      if (!hit.sources.includes(source)) hit.sources.push(source);
      return;
    }
    map.set(key, { key, text, sources: [source] });
  };

  for (const t of uiPhrases()) add(t, 'ui');
  for (const s of STICKERS) add(stickerLine(s.name), 'stiker');

  for (const g of await loadGameFolders()) {
    if (g.missing.length) continue;
    const meta = g.meta as { id: string; title: string; usesAudio?: boolean };
    add(meta.title, 'judul');
    for (const it of g.content as { speak?: string }[]) if (it.speak) add(it.speak, meta.id);
  }
  return [...map.values()];
}

export function readManifest(path = MANIFEST_PATH): VoiceManifest {
  if (!existsSync(path)) return { ...EMPTY_MANIFEST, clips: {} };
  const m = JSON.parse(readFileSync(path, 'utf8')) as VoiceManifest;
  return { ...EMPTY_MANIFEST, ...m, clips: m.clips ?? {} };
}

export async function voiceCoverage(): Promise<{
  total: number;
  covered: number;
  missing: number;
}> {
  const phrases = await collectPhrases();
  const { clips } = readManifest();
  const covered = phrases.filter(
    (p) => clips[p.key] && existsSync(join(VOICE_DIR, clips[p.key]!.file)),
  ).length;
  return { total: phrases.length, covered, missing: phrases.length - covered };
}
