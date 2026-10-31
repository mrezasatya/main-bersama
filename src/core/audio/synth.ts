import { getSettings } from '../progress/settings';
import { getAudioContext } from './tone';

/**
 * Primitif sintesis Web Audio untuk efek dan alat musik.
 * Semua bunyi dibuat dari osilator dan derau (noise); tidak ada sampel rekaman.
 */

interface Ctx {
  c: AudioContext;
  out: GainNode;
  t: number;
}

/** Menyiapkan konteks + gain master sesuai volume pendamping. Null bila audio tidak tersedia. */
export function begin(delay = 0): Ctx | null {
  const c = getAudioContext();
  if (!c) return null;
  if (c.state === 'suspended') void c.resume();
  const vol = getSettings().volume;
  if (vol <= 0) return null;
  const out = c.createGain();
  out.gain.value = vol;
  out.connect(c.destination);
  return { c, out, t: c.currentTime + delay };
}

let noiseBuf: AudioBuffer | null = null;
function noiseBuffer(c: AudioContext): AudioBuffer {
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  const len = c.sampleRate * 2;
  noiseBuf = c.createBuffer(1, len, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

export interface EnvOpts {
  /** Detik relatif terhadap ctx.t */
  at?: number;
  dur: number;
  gain?: number;
  attack?: number;
}

function envelope(x: Ctx, g: GainNode, { at = 0, dur, gain = 0.3, attack = 0.01 }: EnvOpts) {
  const t0 = x.t + at;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  return t0;
}

/** Osilator dengan sapuan frekuensi dan vibrato opsional. */
export function osc(
  x: Ctx,
  o: EnvOpts & {
    type?: OscillatorType;
    freq: number;
    to?: number;
    vibrato?: { rate: number; depth: number };
    filter?: number;
  },
): void {
  const { c } = x;
  const n = c.createOscillator();
  const g = c.createGain();
  n.type = o.type ?? 'sine';
  const t0 = envelope(x, g, o);
  n.frequency.setValueAtTime(o.freq, t0);
  if (o.to) n.frequency.exponentialRampToValueAtTime(o.to, t0 + o.dur);
  if (o.vibrato) {
    const lfo = c.createOscillator();
    const lg = c.createGain();
    lfo.frequency.value = o.vibrato.rate;
    lg.gain.value = o.vibrato.depth;
    lfo.connect(lg).connect(n.frequency);
    lfo.start(t0);
    lfo.stop(t0 + o.dur + 0.05);
  }
  let node: AudioNode = n;
  if (o.filter) {
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = o.filter;
    node = node.connect(f);
  }
  node.connect(g).connect(x.out);
  n.start(t0);
  n.stop(t0 + o.dur + 0.05);
}

/** Derau tersaring (angin, desis, gesekan, letupan). */
export function noise(
  x: Ctx,
  o: EnvOpts & { type?: BiquadFilterType; freq?: number; to?: number; q?: number },
): void {
  const { c } = x;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c);
  const f = c.createBiquadFilter();
  f.type = o.type ?? 'bandpass';
  f.Q.value = o.q ?? 1;
  const g = c.createGain();
  const t0 = envelope(x, g, o);
  f.frequency.setValueAtTime(o.freq ?? 1000, t0);
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t0 + o.dur);
  src.connect(f).connect(g).connect(x.out);
  src.start(t0, Math.random());
  src.stop(t0 + o.dur + 0.05);
}

/** Mengulang fungsi n kali dengan jarak tertentu (detik). */
export function repeat(n: number, gap: number, fn: (at: number, i: number) => void): void {
  for (let i = 0; i < n; i++) fn(i * gap, i);
}

/** Senar dipetik (Karplus-Strong), dibuat sebagai buffer lalu diputar. */
export function pluck(
  x: Ctx,
  freq: number,
  o: { at?: number; dur?: number; gain?: number; bright?: number } = {},
): void {
  const { c } = x;
  const dur = o.dur ?? 1.6;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  const period = Math.max(2, Math.round(c.sampleRate / freq));
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  const damp = 0.996 - (1 - (o.bright ?? 0.5)) * 0.01;
  for (let i = 0; i < len; i++) {
    const j = i % period;
    const next = ring[(j + 1) % period]!;
    const v = ring[j]!;
    d[i] = v;
    ring[j] = ((v + next) / 2) * damp;
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.value = o.gain ?? 0.5;
  src.connect(g).connect(x.out);
  src.start(x.t + (o.at ?? 0));
}
