import { getSettings } from '../progress/settings';
import { getAudioContext } from './tone';
import { EMPTY_MANIFEST, voiceKey, type VoiceManifest } from './voiceKey';
import { useVoiceStatus } from './voiceStore';

const BASE = `${import.meta.env.BASE_URL}voice/`;
const MAX_BUFFERS = 40;

let manifest: VoiceManifest = EMPTY_MANIFEST;
let loading: Promise<void> | null = null;
const buffers = new Map<string, Promise<AudioBuffer>>();
let current: { src: AudioBufferSourceNode; done: () => void } | null = null;

/** Memuat daftar rekaman (berkas kecil, ikut di-precache PWA). Aman dipanggil berkali-kali. */
export function loadClipManifest(): Promise<void> {
  loading ??= fetch(`${BASE}manifest.json`)
    .then((r) => (r.ok ? (r.json() as Promise<VoiceManifest>) : EMPTY_MANIFEST))
    .catch(() => EMPTY_MANIFEST)
    .then((m) => {
      manifest = m?.clips ? m : EMPTY_MANIFEST;
      useVoiceStatus.setState({ clipCount: Object.keys(manifest.clips).length, clipsReady: true });
    });
  return loading;
}

export function clipFor(text: string): string | null {
  return manifest.clips[voiceKey(text)]?.file ?? null;
}

export const clipInfo = () => ({
  voiceId: manifest.voiceId,
  modelId: manifest.modelId,
  generatedAt: manifest.generatedAt,
});

function decode(file: string): Promise<AudioBuffer> {
  let p = buffers.get(file);
  if (!p) {
    const ctx = getAudioContext();
    if (!ctx) return Promise.reject(new Error('Web Audio tidak didukung'));
    p = fetch(BASE + file)
      .then((r) => {
        if (!r.ok) throw new Error(`Rekaman ${file} tidak ditemukan`);
        return r.arrayBuffer();
      })
      .then((buf) => ctx.decodeAudioData(buf));
    p.catch(() => buffers.delete(file));
    buffers.set(file, p);
    if (buffers.size > MAX_BUFFERS) buffers.delete(buffers.keys().next().value!);
  }
  return p;
}

/** Memuat rekaman lebih dulu agar tidak ada jeda saat dibutuhkan. */
export function preloadClip(text: string): void {
  const file = clipFor(text);
  if (file) decode(file).catch(() => undefined);
}

export function stopClip(): void {
  if (!current) return;
  const c = current;
  current = null;
  try {
    c.src.stop();
  } catch {
    /* sudah berhenti */
  }
  c.done();
}

export type ClipOutcome = 'played' | 'stopped' | 'failed';

/** Memutar rekaman lewat Web Audio (sudah dibuka di layar "Ayo Mulai", jadi aman di iOS). */
export async function playClip(file: string): Promise<ClipOutcome> {
  const ctx = getAudioContext();
  if (!ctx) return 'failed';
  stopClip();
  let buffer: AudioBuffer;
  try {
    buffer = await decode(file);
  } catch {
    return 'failed';
  }
  if (ctx.state === 'suspended') await ctx.resume().catch(() => undefined);

  return new Promise<ClipOutcome>((resolve) => {
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = getSettings().volume;
    src.buffer = buffer;
    src.connect(gain).connect(ctx.destination);
    const entry = { src, done: () => resolve('stopped') };
    current = entry;
    src.onended = () => {
      if (current === entry) {
        current = null;
        resolve('played');
      }
    };
    src.start();
  });
}
