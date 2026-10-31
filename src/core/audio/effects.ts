import { begin, noise, osc, repeat } from './synth';

/**
 * Efek tambahan Web Audio untuk hewan dan kendaraan. Ini bukan tiruan realistis,
 * hanya "warna" yang menemani tiruan bunyi yang dibacakan (Bagian 8.4 brief).
 * content.json merujuk efek lewat data.sfx.
 */
const EFFECTS = {
  // --- hewan ---
  embik: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 420,
        to: 380,
        dur: 0.7,
        gain: 0.12,
        filter: 1400,
        vibrato: { rate: 22, depth: 30 },
      });
  },
  lenguh: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 130,
        to: 105,
        dur: 1.1,
        gain: 0.18,
        filter: 600,
        attack: 0.15,
      });
  },
  ringkik: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 900,
        to: 500,
        dur: 0.9,
        gain: 0.1,
        filter: 2200,
        vibrato: { rate: 28, depth: 80 },
      });
  },
  meong: () => {
    const x = begin();
    if (!x) return;
    osc(x, { type: 'triangle', freq: 500, to: 800, dur: 0.25, gain: 0.15 });
    osc(x, { type: 'triangle', freq: 800, to: 420, dur: 0.4, gain: 0.15, at: 0.22 });
  },
  gonggong: () => {
    const x = begin();
    if (x)
      repeat(2, 0.3, (at) =>
        osc(x, { type: 'square', freq: 320, to: 180, dur: 0.15, gain: 0.12, filter: 1200, at }),
      );
  },
  auman: () => {
    const x = begin();
    if (!x) return;
    noise(x, { type: 'lowpass', freq: 500, to: 200, dur: 1.2, gain: 0.35, attack: 0.15 });
    osc(x, { type: 'sawtooth', freq: 90, to: 60, dur: 1.2, gain: 0.15, filter: 400, attack: 0.15 });
  },
  geram: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 70,
        dur: 0.9,
        gain: 0.2,
        filter: 300,
        vibrato: { rate: 18, depth: 12 },
        attack: 0.1,
      });
  },
  terompetGajah: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 300,
        to: 700,
        dur: 0.9,
        gain: 0.14,
        filter: 2000,
        vibrato: { rate: 6, depth: 25 },
      });
  },
  lolong: () => {
    const x = begin();
    if (!x) return;
    osc(x, { type: 'sine', freq: 350, to: 650, dur: 0.6, gain: 0.2 });
    osc(x, { type: 'sine', freq: 650, to: 400, dur: 1, gain: 0.2, at: 0.55 });
  },
  cicit: () => {
    const x = begin();
    if (x) repeat(3, 0.12, (at) => osc(x, { freq: 3200, to: 4200, dur: 0.06, gain: 0.08, at }));
  },
  kicau: () => {
    const x = begin();
    if (x)
      repeat(4, 0.14, (at, i) =>
        osc(x, { freq: 2400 + i * 200, to: 3600, dur: 0.09, gain: 0.1, at }),
      );
  },
  kokok: () => {
    const x = begin();
    if (!x) return;
    [600, 750, 750, 900].forEach((f, i) =>
      osc(x, {
        type: 'sawtooth',
        freq: f,
        to: f * 0.9,
        dur: i === 3 ? 0.6 : 0.15,
        gain: 0.1,
        filter: 2500,
        at: i * 0.18,
      }),
    );
  },
  kwek: () => {
    const x = begin();
    if (x)
      repeat(2, 0.25, (at) =>
        osc(x, { type: 'square', freq: 400, to: 300, dur: 0.16, gain: 0.08, filter: 1100, at }),
      );
  },
  hu: () => {
    const x = begin();
    if (x)
      repeat(2, 0.45, (at) =>
        osc(x, { freq: 380, to: 340, dur: 0.35, gain: 0.2, attack: 0.08, at }),
      );
  },
  dekut: () => {
    const x = begin();
    if (x)
      repeat(3, 0.3, (at) =>
        osc(x, { freq: 420, to: 380, dur: 0.25, gain: 0.16, vibrato: { rate: 30, depth: 20 }, at }),
      );
  },
  koak: () => {
    const x = begin();
    if (x)
      repeat(2, 0.35, (at) =>
        osc(x, { type: 'sawtooth', freq: 700, to: 500, dur: 0.22, gain: 0.08, filter: 1800, at }),
      );
  },
  pekik: () => {
    const x = begin();
    if (x) osc(x, { type: 'triangle', freq: 2600, to: 1800, dur: 0.7, gain: 0.1 });
  },
  ketuk: () => {
    const x = begin();
    if (x) repeat(4, 0.1, (at) => noise(x, { freq: 1800, q: 6, dur: 0.05, gain: 0.5, at }));
  },
  dengung: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 220,
        dur: 1.2,
        gain: 0.06,
        filter: 900,
        vibrato: { rate: 9, depth: 15 },
        attack: 0.1,
      });
  },
  ngiing: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 600,
        to: 640,
        dur: 1.2,
        gain: 0.04,
        filter: 3000,
        vibrato: { rate: 12, depth: 20 },
        attack: 0.2,
      });
  },
  krik: () => {
    const x = begin();
    if (x)
      repeat(6, 0.1, (at) => osc(x, { type: 'square', freq: 4300, dur: 0.05, gain: 0.04, at }));
  },
  dengir: () => {
    const x = begin();
    if (x) repeat(12, 0.06, (at) => noise(x, { freq: 5000, q: 4, dur: 0.05, gain: 0.25, at }));
  },
  desis: () => {
    const x = begin();
    if (x) noise(x, { type: 'highpass', freq: 4000, dur: 1.2, gain: 0.25, attack: 0.2 });
  },
  kwok: () => {
    const x = begin();
    if (x)
      repeat(2, 0.35, (at) =>
        osc(x, { type: 'square', freq: 180, to: 140, dur: 0.18, gain: 0.12, filter: 700, at }),
      );
  },
  decak: () => {
    const x = begin();
    if (x) repeat(4, 0.12, (at) => noise(x, { freq: 3000, q: 8, dur: 0.03, gain: 0.5, at }));
  },
  siulLumba: () => {
    const x = begin();
    if (x) repeat(3, 0.22, (at) => osc(x, { freq: 3000, to: 5000, dur: 0.15, gain: 0.08, at }));
  },
  nyanyiPaus: () => {
    const x = begin();
    if (x)
      osc(x, {
        freq: 180,
        to: 420,
        dur: 2,
        gain: 0.25,
        attack: 0.4,
        vibrato: { rate: 3, depth: 15 },
      });
  },
  gelembung: () => {
    const x = begin();
    if (x)
      repeat(4, 0.16, (at, i) =>
        osc(x, { freq: 300 + i * 80, to: 900 + i * 80, dur: 0.08, gain: 0.15, at }),
      );
  },
  pukulDada: () => {
    const x = begin();
    if (x) repeat(4, 0.13, (at) => osc(x, { freq: 110, to: 55, dur: 0.15, gain: 0.4, at }));
  },
  tepuk: () => {
    const x = begin();
    if (x) noise(x, { freq: 1400, q: 0.8, dur: 0.12, gain: 0.7, attack: 0.002 });
  },
  // --- kendaraan ---
  klakson: () => {
    const x = begin();
    if (!x) return;
    repeat(2, 0.3, (at) => {
      osc(x, { type: 'square', freq: 440, dur: 0.18, gain: 0.07, filter: 1600, at });
      osc(x, { type: 'square', freq: 554, dur: 0.18, gain: 0.07, filter: 1600, at });
    });
  },
  mesin: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 55,
        to: 90,
        dur: 1.2,
        gain: 0.2,
        filter: 400,
        vibrato: { rate: 25, depth: 8 },
        attack: 0.1,
      });
  },
  sirene: () => {
    const x = begin();
    if (x)
      repeat(2, 0.8, (at) => {
        osc(x, { type: 'triangle', freq: 650, to: 950, dur: 0.4, gain: 0.12, at });
        osc(x, { type: 'triangle', freq: 950, to: 650, dur: 0.4, gain: 0.12, at: at + 0.4 });
      });
  },
  peluitKereta: () => {
    const x = begin();
    if (!x) return;
    repeat(2, 0.55, (at) => {
      osc(x, { freq: 587, dur: 0.45, gain: 0.12, attack: 0.05, at });
      osc(x, { freq: 740, dur: 0.45, gain: 0.1, attack: 0.05, at });
      noise(x, { freq: 2500, dur: 0.45, gain: 0.05, at });
    });
  },
  rodaKereta: () => {
    const x = begin();
    if (x)
      repeat(6, 0.18, (at, i) =>
        noise(x, { type: 'lowpass', freq: 500, dur: 0.12, gain: i % 2 ? 0.3 : 0.45, at }),
      );
  },
  bel: () => {
    const x = begin();
    if (x)
      repeat(2, 0.22, (at) => {
        osc(x, { freq: 2100, dur: 0.4, gain: 0.08, at });
        osc(x, { freq: 3150, dur: 0.3, gain: 0.05, at });
      });
  },
  baling: () => {
    const x = begin();
    if (x)
      repeat(14, 0.08, (at) => noise(x, { type: 'lowpass', freq: 300, dur: 0.07, gain: 0.45, at }));
  },
  jet: () => {
    const x = begin();
    if (x)
      noise(x, {
        type: 'bandpass',
        freq: 600,
        to: 3000,
        dur: 1.6,
        gain: 0.35,
        attack: 0.4,
        q: 0.7,
      });
  },
  tutKapal: () => {
    const x = begin();
    if (x) osc(x, { type: 'sawtooth', freq: 98, dur: 1.4, gain: 0.2, filter: 500, attack: 0.1 });
  },
  tekTek: () => {
    const x = begin();
    if (x)
      repeat(10, 0.09, (at) =>
        osc(x, { type: 'square', freq: 90, dur: 0.06, gain: 0.15, filter: 600, at }),
      );
  },
  tapalKuda: () => {
    const x = begin();
    if (x)
      repeat(4, 0.2, (at, i) =>
        noise(x, { freq: i % 2 ? 1300 : 1000, q: 10, dur: 0.06, gain: 0.6, at }),
      );
  },
  roket: () => {
    const x = begin();
    if (x) noise(x, { type: 'lowpass', freq: 200, to: 2500, dur: 1.8, gain: 0.45, attack: 0.3 });
  },
  semburApi: () => {
    const x = begin();
    if (x) noise(x, { type: 'bandpass', freq: 400, dur: 1, gain: 0.4, attack: 0.15, q: 0.6 });
  },
  dayung: () => {
    const x = begin();
    if (x) repeat(2, 0.6, (at) => noise(x, { freq: 900, to: 400, dur: 0.4, gain: 0.25, at }));
  },
  angin: () => {
    const x = begin();
    if (x)
      noise(x, { type: 'bandpass', freq: 500, to: 900, dur: 1.5, gain: 0.25, attack: 0.5, q: 0.5 });
  },
  derek: () => {
    const x = begin();
    if (x)
      osc(x, {
        type: 'sawtooth',
        freq: 80,
        to: 110,
        dur: 1.2,
        gain: 0.15,
        filter: 350,
        vibrato: { rate: 14, depth: 10 },
      });
  },
} satisfies Record<string, () => void>;

export type EffectName = keyof typeof EFFECTS;
export const EFFECT_NAMES = Object.keys(EFFECTS) as EffectName[];

export const isEffectName = (v: unknown): v is EffectName => typeof v === 'string' && v in EFFECTS;

export function playEffect(name: string): void {
  if (isEffectName(name)) EFFECTS[name]();
}
