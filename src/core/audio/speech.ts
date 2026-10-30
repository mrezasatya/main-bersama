import { getSettings } from '../progress/settings';
import { clipFor, playClip, stopClip } from './clips';
import { isIndonesian, pickVoice } from './voices';
import { useVoiceStatus } from './voiceStore';

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  /** Paksa suara tertentu (dipakai halaman Uji Suara). */
  voiceURI?: string;
  /** Hentikan ucapan sebelumnya (bawaan: true). */
  interrupt?: boolean;
  /** Abaikan rekaman dan pakai suara perangkat (dipakai halaman Uji Suara). */
  device?: boolean;
}

export type SpeakOutcome = 'clip' | 'spoken' | 'no-voice' | 'unsupported' | 'error' | 'interrupted';

const synth = (): SpeechSynthesis | null =>
  typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

// Referensi disimpan agar Safari tidak membuang ucapan sebelum onend terpanggil.
let current: SpeechSynthesisUtterance | null = null;

function refreshVoices(): void {
  const s = synth();
  if (!s) {
    useVoiceStatus.setState({ supported: false, ready: true });
    return;
  }
  const voices = s.getVoices();
  if (voices.length > 0) {
    useVoiceStatus.setState({ ready: true, voices, hasIndonesian: voices.some(isIndonesian) });
  }
}

/** Memuat daftar suara. Safari kadang tidak memicu voiceschanged, jadi juga di-poll. */
export function initVoices(): void {
  const s = synth();
  if (!s) {
    refreshVoices();
    return;
  }
  refreshVoices();
  s.addEventListener?.('voiceschanged', refreshVoices);
  let tries = 0;
  const timer = window.setInterval(() => {
    tries++;
    refreshVoices();
    if (useVoiceStatus.getState().voices.length > 0 || tries >= 20) {
      window.clearInterval(timer);
      useVoiceStatus.setState({ ready: true });
    }
  }, 250);
}

/**
 * iOS hanya mengizinkan ucapan setelah ucapan pertama dipicu langsung oleh gestur.
 * Panggil secara sinkron di dalam handler tombol "Ayo Mulai".
 */
export function primeSpeech(): void {
  const s = synth();
  if (!s) return;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  s.speak(u);
}

export function currentVoice(): SpeechSynthesisVoice | null {
  const { voices } = useVoiceStatus.getState();
  return pickVoice(voices, getSettings().voiceURI, navigator.onLine);
}

// Setiap panggilan speak/stop menaikkan token, sehingga rangkaian yang lama berhenti.
let token = 0;

export function stopSpeaking(): void {
  token++;
  stopClip();
  synth()?.cancel();
  current = null;
}

export function isSpeaking(): boolean {
  return synth()?.speaking ?? false;
}

/**
 * Membacakan teks. Urutan sumber:
 * 1. Rekaman ElevenLabs (public/voice) bila ada untuk kalimat ini.
 * 2. Suara id-ID terbaik di perangkat.
 * Tidak berbicara bila keduanya tidak ada (suara bahasa lain akan salah lafal);
 * teks dan ikon di layar tetap menjadi jalur utama.
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<SpeakOutcome> {
  if (opts.interrupt !== false) stopSpeaking();
  const my = token;
  const file = opts.device || getSettings().voiceSource === 'perangkat' ? null : clipFor(text);
  if (file) {
    const out = await playClip(file);
    if (out === 'played') return 'clip';
    if (out === 'stopped' || my !== token) return 'interrupted';
    // Rekaman gagal dimuat: lanjut ke suara perangkat.
  }
  return speakDevice(text, opts);
}

/** Membacakan beberapa kalimat berurutan; berhenti bila ada ucapan baru. */
export async function speakSequence(texts: readonly string[]): Promise<SpeakOutcome> {
  stopSpeaking();
  const my = token;
  let out: SpeakOutcome = 'spoken';
  for (const t of texts) {
    if (my !== token) return 'interrupted';
    out = await speak(t, { interrupt: false });
    if (out === 'interrupted') return out;
  }
  return out;
}

function speakDevice(text: string, opts: SpeakOptions): Promise<SpeakOutcome> {
  const s = synth();
  if (!s) return Promise.resolve('unsupported');

  const { voices } = useVoiceStatus.getState();
  const settings = getSettings();
  const voice = opts.voiceURI
    ? (voices.find((v) => v.voiceURI === opts.voiceURI) ?? null)
    : currentVoice();

  // Daftar suara kosong = browser belum melaporkan; coba dengan lang saja.
  if (!voice && voices.length > 0) return Promise.resolve('no-voice');

  // Chrome bisa tertahan dalam keadaan "paused" setelah tab di latar.
  if (s.paused) s.resume();

  return new Promise<SpeakOutcome>((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice?.lang ?? 'id-ID';
    if (voice) u.voice = voice;
    u.rate = opts.rate ?? settings.speechRate;
    u.pitch = opts.pitch ?? 1.05;
    u.volume = settings.volume;

    let settled = false;
    const finish = (out: SpeakOutcome) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(guard);
      if (current === u) current = null;
      resolve(out);
    };
    // Pengaman: beberapa browser tidak pernah memicu onend.
    const guard = window.setTimeout(() => finish('spoken'), 1500 + text.length * 120);
    u.onend = () => finish('spoken');
    u.onerror = (e) =>
      finish(e.error === 'interrupted' || e.error === 'canceled' ? 'interrupted' : 'error');

    current = u;
    s.speak(u);
  });
}
