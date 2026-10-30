import { playEffect, playNote } from '../../core/audio';
import type { RhythmSound } from './types';

export function playBeat(s: RhythmSound): void {
  switch (s) {
    case 'tepuk':
      return playEffect('tepuk');
    case 'kendang':
      return playNote('kulit', 110);
    case 'rebana':
      return playNote('rebana', 180);
    case 'kentongan':
      return playNote('bambu', 520);
  }
}
