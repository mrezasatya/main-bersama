/**
 * Kunci rekaman untuk sebuah kalimat. Dipakai bersama oleh aplikasi (mencari rekaman)
 * dan skrip generate-voice (memberi nama berkas), jadi jangan diubah tanpa membuat ulang rekaman.
 */
export function normalizeSpeech(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/** cyrb53: hash 53-bit sinkron, cukup untuk ribuan kalimat tanpa tabrakan. */
function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function voiceKey(text: string): string {
  return cyrb53(normalizeSpeech(text)).toString(36);
}

/** Sidik pengaturan suara; berubah bila suara/model/format diganti sehingga nama berkas ikut berubah. */
export function voiceVersion(parts: readonly string[]): string {
  return cyrb53(parts.join('|')).toString(36).slice(0, 6);
}

export interface VoiceManifest {
  provider: string;
  voiceId: string;
  modelId: string;
  outputFormat: string;
  generatedAt: string | null;
  /** voiceKey(teks) -> berkas di public/voice/ */
  clips: Record<string, { file: string; text: string }>;
}

export const EMPTY_MANIFEST: VoiceManifest = {
  provider: 'elevenlabs',
  voiceId: '',
  modelId: '',
  outputFormat: '',
  generatedAt: null,
  clips: {},
};
