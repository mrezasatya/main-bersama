import { getSettings } from '../progress/settings';

let ctx: AudioContext | null = null;

type AudioCtor = typeof AudioContext;

export function getAudioContext(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === 'undefined') return null;
  const Ctor: AudioCtor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

/**
 * Wajib dipanggil dari interaksi pengguna (tombol "Ayo Mulai").
 * Membuka AudioContext dan memancing izin ucapan di iOS.
 */
export async function unlockAudio(): Promise<void> {
  // Safari 17+: tetap berbunyi walau sakelar senyap iPad/iPhone aktif.
  const nav = navigator as Navigator & { audioSession?: { type: string } };
  if (nav.audioSession) {
    try {
      nav.audioSession.type = 'playback';
    } catch {
      /* tidak didukung */
    }
  }
  const c = getAudioContext();
  if (c) {
    if (c.state !== 'running') await c.resume().catch(() => undefined);
    const buf = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start(0);
  }
}

export function audioState(): AudioContextState | 'unsupported' {
  return getAudioContext()?.state ?? 'unsupported';
}

export interface ToneOptions {
  type?: OscillatorType;
  /** 0-1 sebelum dikali volume pengaturan. */
  gain?: number;
  /** Detik dari sekarang. */
  delay?: number;
  attack?: number;
}

/** Membunyikan satu nada; durasi dalam detik. */
export function tone(freq: number, duration = 0.3, opts: ToneOptions = {}): void {
  const c = getAudioContext();
  if (!c) return;
  if (c.state === 'suspended') void c.resume();
  const { type = 'sine', gain = 0.3, delay = 0, attack = 0.015 } = opts;
  const vol = gain * getSettings().volume;
  if (vol <= 0) return;

  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

const NOTE_INDEX: Record<string, number> = {
  C: 0,
  'C#': 1,
  D: 2,
  'D#': 3,
  E: 4,
  F: 5,
  'F#': 6,
  G: 7,
  'G#': 8,
  A: 9,
  'A#': 10,
  B: 11,
};

/** "A4" -> 440 Hz */
export function noteFreq(note: string): number {
  const m = /^([A-G]#?)(-?\d)$/.exec(note);
  if (!m) throw new Error(`Nada tidak dikenal: ${note}`);
  const semis = NOTE_INDEX[m[1]!]! + (Number(m[2]) + 1) * 12;
  return 440 * Math.pow(2, (semis - 69) / 12);
}

/** Efek bawaan yang lembut. Tidak ada bunyi buzzer. */
export const sfx = {
  tap: () => tone(noteFreq('G5'), 0.08, { type: 'triangle', gain: 0.15 }),
  success: () => {
    ['C5', 'E5', 'G5'].forEach((n, i) => tone(noteFreq(n), 0.35, { gain: 0.25, delay: i * 0.09 }));
  },
  /** "Ayo coba lagi": dua nada rendah dan pelan, bukan bunyi salah. */
  tryAgain: () => {
    tone(noteFreq('E4'), 0.18, { type: 'triangle', gain: 0.14 });
    tone(noteFreq('D4'), 0.25, { type: 'triangle', gain: 0.12, delay: 0.14 });
  },
  star: () => {
    ['G5', 'C6', 'E6', 'G6'].forEach((n, i) =>
      tone(noteFreq(n), 0.4, { type: 'sine', gain: 0.18, delay: i * 0.12 }),
    );
  },
};
