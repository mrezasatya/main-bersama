import { begin, noise, osc, pluck, repeat } from './synth';

/**
 * Timbre alat musik yang disintesis sederhana (Web Audio). Bukan tiruan sempurna,
 * cukup untuk mengenalkan karakter bunyi: logam, kayu, bambu, kulit, senar, tiup.
 */
export const TIMBRES = [
  'logam',
  'kayu',
  'bambu',
  'angklung',
  'pencon',
  'gong',
  'kulit',
  'rebana',
  'petik',
  'gesek',
  'tiup',
  'buluh',
  'piano',
  'kalimba',
  'steelpan',
] as const;
export type Timbre = (typeof TIMBRES)[number];

/** Tangga nada dalam sen (100 sen = 1 semiton). Slendro dan pelog adalah pendekatan. */
export const SCALES = {
  slendro: [0, 240, 480, 720, 960],
  pelog: [0, 120, 270, 540, 670],
  diatonis: [0, 200, 400, 500, 700, 900, 1100],
  pentatonis: [0, 200, 400, 700, 900],
  hirajoshi: [0, 200, 300, 700, 800],
} as const;
export type ScaleName = keyof typeof SCALES;

export const isTimbre = (v: unknown): v is Timbre =>
  typeof v === 'string' && (TIMBRES as readonly string[]).includes(v);
export const isScaleName = (v: unknown): v is ScaleName => typeof v === 'string' && v in SCALES;

/** Frekuensi `count` nada naik dari `base` Hz, melanjutkan ke oktaf berikutnya bila perlu. */
export function scaleFreqs(scale: ScaleName, base: number, count: number): number[] {
  const steps = SCALES[scale];
  return Array.from({ length: count }, (_, i) => {
    const cents = steps[i % steps.length]! + 1200 * Math.floor(i / steps.length);
    return base * Math.pow(2, cents / 1200);
  });
}

export function playNote(timbre: Timbre, freq: number, delay = 0): void {
  const x = begin(delay);
  if (!x) return;
  switch (timbre) {
    case 'logam':
      osc(x, { freq, dur: 1.6, gain: 0.25, attack: 0.003 });
      osc(x, { freq: freq * 2.76, dur: 0.5, gain: 0.06, attack: 0.003 });
      osc(x, { freq: freq * 5.4, dur: 0.2, gain: 0.03, attack: 0.002 });
      break;
    case 'kayu':
      osc(x, { freq, dur: 0.55, gain: 0.32, attack: 0.002 });
      osc(x, { freq: freq * 3.9, dur: 0.12, gain: 0.08, attack: 0.002 });
      break;
    case 'bambu':
      osc(x, { type: 'triangle', freq, dur: 0.45, gain: 0.3, attack: 0.002 });
      noise(x, { freq: freq * 4, q: 3, dur: 0.05, gain: 0.15 });
      break;
    case 'angklung':
      repeat(7, 0.075, (at, i) => {
        const g = 0.22 * (1 - i / 9);
        osc(x, { type: 'triangle', freq, dur: 0.12, gain: g, attack: 0.003, at });
        osc(x, { freq: freq * 2, dur: 0.08, gain: g * 0.4, attack: 0.003, at });
      });
      break;
    case 'pencon':
      osc(x, { freq, dur: 1.4, gain: 0.25, attack: 0.004 });
      osc(x, { freq: freq * 1.004, dur: 1.4, gain: 0.12, attack: 0.004 });
      osc(x, { freq: freq * 2.7, dur: 0.35, gain: 0.05, attack: 0.003 });
      break;
    case 'gong':
      osc(x, { freq, dur: 3.5, gain: 0.35, attack: 0.02 });
      osc(x, { freq: freq * 1.007, dur: 3.5, gain: 0.2, attack: 0.02 });
      osc(x, { freq: freq * 2.1, dur: 1.2, gain: 0.06, attack: 0.02 });
      break;
    case 'kulit':
      osc(x, { freq: freq * 1.8, to: freq, dur: 0.35, gain: 0.5, attack: 0.002 });
      noise(x, { type: 'lowpass', freq: 900, dur: 0.08, gain: 0.25 });
      break;
    case 'rebana':
      osc(x, { freq: freq * 1.5, to: freq, dur: 0.2, gain: 0.3, attack: 0.002 });
      noise(x, { type: 'highpass', freq: 6000, dur: 0.25, gain: 0.25 });
      break;
    case 'petik':
      pluck(x, freq, { dur: 1.6, gain: 0.55, bright: 0.6 });
      break;
    case 'gesek':
      osc(x, {
        type: 'sawtooth',
        freq,
        dur: 0.9,
        gain: 0.12,
        attack: 0.12,
        filter: freq * 4,
        vibrato: { rate: 5.5, depth: freq * 0.012 },
      });
      break;
    case 'tiup':
      osc(x, {
        freq,
        dur: 0.8,
        gain: 0.25,
        attack: 0.08,
        vibrato: { rate: 5, depth: freq * 0.01 },
      });
      noise(x, { freq: freq * 2, q: 2, dur: 0.7, gain: 0.04, attack: 0.08 });
      break;
    case 'buluh':
      osc(x, { type: 'square', freq, dur: 0.7, gain: 0.08, attack: 0.04, filter: freq * 5 });
      osc(x, { type: 'sawtooth', freq, dur: 0.7, gain: 0.06, attack: 0.04, filter: freq * 3 });
      break;
    case 'piano':
      osc(x, { type: 'triangle', freq, dur: 1.4, gain: 0.28, attack: 0.003 });
      osc(x, { freq: freq * 2, dur: 0.6, gain: 0.08, attack: 0.003 });
      break;
    case 'kalimba':
      osc(x, { freq, dur: 0.9, gain: 0.3, attack: 0.002 });
      osc(x, { freq: freq * 5.1, dur: 0.08, gain: 0.05, attack: 0.002 });
      break;
    case 'steelpan':
      osc(x, { freq, dur: 1, gain: 0.25, attack: 0.004 });
      osc(x, { freq: freq * 2, dur: 0.6, gain: 0.1, attack: 0.004 });
      osc(x, { freq: freq * 3, dur: 0.3, gain: 0.05, attack: 0.004 });
      break;
  }
}
