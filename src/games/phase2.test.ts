import type { OptionQuizData } from '../core/ui/OptionQuiz';
import type { SequenceData } from '../core/ui/SequenceRound';
import type { ContentItem } from '../types';
import gelembung from './gelembung-angka/content.json';
import huruf from './huruf-pasir/content.json';
import peta from './peta-dunia/content.json';
import profesi from './profesi/content.json';
import rangkai from './rangkai-suku-kata/content.json';
import { GAMES } from './registry';

const optionKey = (v: unknown) => JSON.stringify(v);

describe('konten Fase 2', () => {
  it('lima permainan Fase 2 terdaftar', () => {
    const p2 = GAMES.filter((g) => g.meta.phase === 2).map((g) => g.meta.number);
    expect(p2.sort((a, b) => a - b)).toEqual([7, 8, 18, 25, 30]);
  });

  it.each([
    ['gelembung-angka', gelembung],
    ['peta-dunia', peta],
    ['profesi', profesi],
  ])('%s: pilihan tidak ganda', (_n, bank) => {
    for (const it of bank as ContentItem<OptionQuizData>[]) {
      if (!it.data.options) continue;
      const keys = it.data.options.map(optionKey);
      expect(new Set(keys).size, it.id).toBe(keys.length);
      expect(keys.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('huruf-pasir: satu huruf/angka per item', () => {
    for (const it of huruf as ContentItem<{ glyph: string }>[])
      expect(it.data.glyph).toHaveLength(1);
  });

  it('rangkai-suku-kata: suku kata membentuk kata, ucapan per keping lengkap', () => {
    for (const it of rangkai as ContentItem<SequenceData>[]) {
      const word = it.data.tiles.map((t) => (t.t === 'text' ? t.s : '')).join('');
      expect(word).toBe(it.id);
      expect(it.data.tileSay).toHaveLength(it.data.tiles.length);
    }
  });
});
