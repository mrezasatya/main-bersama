import type { Beat } from './rhythm';

export type RhythmSound = 'tepuk' | 'kendang' | 'rebana' | 'kentongan';

export interface IramaData {
  beats: Beat[];
  sound: RhythmSound;
}
