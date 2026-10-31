import type { ScaleName, Timbre } from '../../core/audio';

export type Layout = 'bilah' | 'tabung' | 'pencon' | 'gong' | 'kulit' | 'senar' | 'lubang' | 'tuts';

export interface NadaData {
  nama: string;
  timbre: Timbre;
  layout: Layout;
  scale: ScaleName;
  /** Nada terendah (Hz). */
  base: number;
  /** Jumlah nada (usia 2-3 dibatasi 5 agar tombol tetap besar). */
  count: number;
  color: string;
  /** Indeks nada untuk "dengar lalu tirukan" (usia 4: 3 nada, usia 5-6: 4 nada). */
  melody: number[];
  /** Asal alat musik; dibacakan untuk usia 4-6. */
  speakAlso: string[];
}
