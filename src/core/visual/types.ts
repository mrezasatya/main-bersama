/**
 * Visual deklaratif: konten menjelaskan APA yang tampil, renderer menggambar.
 * Dipakai untuk petunjuk (cue) dan pilihan pada mesin OptionQuiz dan mesin lain.
 * Berkas ini tanpa React agar bisa dipakai skrip validasi.
 */
import { NAMED_COLORS, type ColorName } from '../art/colors';
import { FLAG_KEYS, type FlagKey } from '../art/flagKeys';
import { ART_KEYS, type ArtKey } from '../art/keys';

export const EMOTIONS = [
  'senang',
  'sedih',
  'marah',
  'takut',
  'terkejut',
  'malu',
  'tenang',
  'bangga',
] as const;
export type Emotion = (typeof EMOTIONS)[number];

export const SHAPES_2D = [
  'lingkaran',
  'segitiga',
  'persegi',
  'persegiPanjang',
  'oval',
  'belahKetupat',
  'trapesium',
  'segiLima',
  'segiEnam',
  'bintang',
  'hati',
  'bulanSabit',
] as const;
export const SHAPES_3D = ['kubus', 'balok', 'bola', 'tabung', 'kerucut', 'limas'] as const;
export const SHAPES = [...SHAPES_2D, ...SHAPES_3D] as const;
export type ShapeKey = (typeof SHAPES)[number];

export const SCENES = [
  'pagi',
  'siang',
  'sore',
  'malam',
  'hujan',
  'berawan',
  'pelangi',
  'kemarau',
] as const;
export type SceneKey = (typeof SCENES)[number];

export const MONEY = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000] as const;
export const LEN_OBJECTS = ['pensil', 'pita', 'ular', 'kereta'] as const;

export type Visual =
  | { t: 'art'; k: ArtKey; color?: ColorName; scale?: number; silhouette?: boolean }
  | { t: 'text'; s: string; size?: 'xl' | 'l' | 'm' }
  | { t: 'num'; n: number }
  | { t: 'dadu'; n: number }
  | { t: 'group'; k: ArtKey; n: number; color?: ColorName }
  | { t: 'tenframe'; n: number; k?: ArtKey }
  | { t: 'bond'; whole: number | null; a: number | null; b: number | null }
  | { t: 'bar'; parts: (number | null)[]; total: number | null }
  | { t: 'clock'; h: number; m?: 0 | 30 }
  | { t: 'flag'; c: FlagKey }
  | { t: 'face'; e: Emotion }
  | { t: 'shape'; s: ShapeKey; color?: ColorName; scale?: number }
  | { t: 'swatch'; c: ColorName }
  | { t: 'mix'; a: ColorName; b: ColorName }
  | { t: 'money'; v: number }
  | { t: 'plant'; stage: 0 | 1 | 2 | 3 | 4 }
  | { t: 'scene'; s: SceneKey }
  | { t: 'len'; n: number; k: (typeof LEN_OBJECTS)[number]; units?: boolean; color?: ColorName }
  | { t: 'neraca'; left: ArtKey; right: ArtKey; tilt: 'kiri' | 'kanan' | 'seimbang' }
  | { t: 'gelas'; fill: number; color?: ColorName }
  | { t: 'row'; items: Visual[] }
  | { t: 'q' };

export const VISUAL_TYPES = [
  'art',
  'text',
  'num',
  'dadu',
  'group',
  'tenframe',
  'bond',
  'bar',
  'clock',
  'flag',
  'face',
  'shape',
  'swatch',
  'mix',
  'money',
  'plant',
  'scene',
  'len',
  'neraca',
  'gelas',
  'row',
  'q',
] as const;

const isArt = (k: unknown) => typeof k === 'string' && (ART_KEYS as readonly string[]).includes(k);
const isColor = (c: unknown) => c === undefined || (typeof c === 'string' && c in NAMED_COLORS);
const inList = (v: unknown, list: readonly unknown[]) => list.includes(v);
const isN = (n: unknown, min: number, max: number) =>
  typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max;

/** Daftar galat untuk satu visual (kosong = valid). */
export function visualErrors(v: unknown, path = 'visual'): string[] {
  if (!v || typeof v !== 'object' || !('t' in v)) return [`${path}: bukan visual`];
  const x = v as Record<string, unknown>;
  const e: string[] = [];
  const need = (ok: boolean, msg: string) => ok || e.push(`${path} (${String(x.t)}): ${msg}`);
  switch (x.t) {
    case 'art':
      need(isArt(x.k), `gambar "${String(x.k)}" tidak ada`);
      need(isColor(x.color), 'warna tidak dikenal');
      break;
    case 'text':
      need(typeof x.s === 'string' && x.s.length > 0, 'teks kosong');
      break;
    case 'num':
      need(isN(x.n, 0, 1000), 'angka di luar 0-1000');
      break;
    case 'dadu':
      need(isN(x.n, 1, 6), 'dadu 1-6');
      break;
    case 'group':
      need(isArt(x.k), `gambar "${String(x.k)}" tidak ada`);
      need(isN(x.n, 0, 20), 'jumlah 0-20');
      break;
    case 'tenframe':
      need(isN(x.n, 0, 20), 'ten-frame 0-20');
      need(x.k === undefined || isArt(x.k), 'gambar tidak ada');
      break;
    case 'bond':
      for (const k of ['whole', 'a', 'b'])
        need(x[k] === null || isN(x[k], 0, 100), `${k} tidak valid`);
      break;
    case 'bar':
      need(Array.isArray(x.parts) && x.parts.length >= 1, 'bagian kosong');
      break;
    case 'clock':
      need(
        isN(x.h, 1, 12) && (x.m === undefined || x.m === 0 || x.m === 30),
        'jam 1-12, menit 0/30',
      );
      break;
    case 'flag':
      need(inList(x.c, FLAG_KEYS), `bendera "${String(x.c)}" tidak ada`);
      break;
    case 'face':
      need(inList(x.e, EMOTIONS), `emosi "${String(x.e)}" tidak ada`);
      break;
    case 'shape':
      need(inList(x.s, SHAPES), `bentuk "${String(x.s)}" tidak ada`);
      need(isColor(x.color), 'warna tidak dikenal');
      break;
    case 'swatch':
      need(isColor(x.c) && x.c !== undefined, 'warna tidak dikenal');
      break;
    case 'mix':
      need(isColor(x.a) && isColor(x.b), 'warna tidak dikenal');
      break;
    case 'money':
      need(inList(x.v, MONEY), `nilai uang ${String(x.v)} tidak dikenal`);
      break;
    case 'plant':
      need(isN(x.stage, 0, 4), 'tahap 0-4');
      break;
    case 'scene':
      need(inList(x.s, SCENES), `adegan "${String(x.s)}" tidak ada`);
      break;
    case 'len':
      need(isN(x.n, 1, 12) && inList(x.k, LEN_OBJECTS), 'panjang 1-12 dan benda dikenal');
      break;
    case 'neraca':
      need(isArt(x.left) && isArt(x.right), 'gambar neraca tidak ada');
      need(inList(x.tilt, ['kiri', 'kanan', 'seimbang']), 'kemiringan tidak dikenal');
      break;
    case 'gelas':
      need(isN(x.fill, 0, 1), 'isi 0-1');
      break;
    case 'row':
      need(Array.isArray(x.items) && x.items.length > 0, 'baris kosong');
      if (Array.isArray(x.items))
        x.items.forEach((it, i) => e.push(...visualErrors(it, `${path}.items[${i}]`)));
      break;
    case 'q':
      break;
    default:
      e.push(`${path}: tipe visual "${String(x.t)}" tidak dikenal`);
  }
  return e;
}

/** Mencari semua visual di dalam data konten (objek dengan kunci `t`). */
export function findVisuals(data: unknown, path = 'data'): [string, unknown][] {
  if (!data || typeof data !== 'object') return [];
  if (!Array.isArray(data) && typeof (data as { t?: unknown }).t === 'string')
    return [[path, data]];
  const out: [string, unknown][] = [];
  for (const [k, v] of Object.entries(data)) out.push(...findVisuals(v, `${path}.${k}`));
  return out;
}

/** Teks sederhana untuk label aksesibilitas. */
export function visualLabel(v: Visual): string {
  switch (v.t) {
    case 'art':
      return v.k;
    case 'text':
      return v.s;
    case 'num':
    case 'dadu':
      return String(v.n);
    case 'group':
      return `${v.n} ${v.k}`;
    case 'tenframe':
      return `${v.n} pada kotak sepuluh`;
    case 'clock':
      return `jam ${v.h}${v.m === 30 ? ' lewat 30' : ''}`;
    case 'flag':
      return `bendera ${v.c}`;
    case 'face':
      return v.e;
    case 'shape':
      return v.s;
    case 'swatch':
      return v.c;
    case 'money':
      return `${v.v} rupiah`;
    case 'scene':
      return v.s;
    case 'q':
      return 'tanda tanya';
    default:
      return v.t;
  }
}
