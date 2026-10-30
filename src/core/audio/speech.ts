import { getSettings } from '../progress/settings';
import { isIndonesian, pickVoice } from './voices';
import { useVoiceStatus } from './voiceStore';

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  /** Paksa suara tertentu (dipakai halaman Uji Suara). */
  voiceURI?: string;
  /** Hentikan ucapan sebelumnya (bawaan: true). */
  interrupt?: boolean;
}

export type SpeakOutcome = 'spoken' | 'no-voice' | 'unsupported' | 'error' | 'interrupted';

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

export function currentVoice(): SpeechSynthesisVoice | null {
  const { voices } = useVoiceStatus.getState();
  return pickVoice(voices, getSettings().voiceURI, navigator.onLine);
}

export function stopSpeaking(): void {
  synth()?.cancel();
  current = null;
}

export function isSpeaking(): boolean {
  return synth()?.speaking ?? false;
}

/**
 * Membacakan teks dengan suara id-ID terbaik yang tersedia.
 * Tidak berbicara bila tidak ada suara Indonesia (suara bahasa lain akan salah lafal);
 * teks dan ikon di layar tetap menjadi jalur utama.
 */
export function speak(text: string, opts: SpeakOptions = {}): Promise<SpeakOutcome> {
  const s = synth();
  if (!s) return Promise.resolve('unsupported');

  const { voices } = useVoiceStatus.getState();
  const settings = getSettings();
  const voice = opts.voiceURI
    ? (voices.find((v) => v.voiceURI === opts.voiceURI) ?? null)
    : currentVoice();

  // Daftar suara kosong = browser belum melaporkan; coba dengan lang saja.
  if (!voice && voices.length > 0) return Promise.resolve('no-voice');

  if (opts.interrupt !== false) s.cancel();
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
