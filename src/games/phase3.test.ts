import type { OptionQuizData } from '../core/ui/OptionQuiz';
import type { ContentItem } from '../types';
import cerita from './cerita-pilihanku/content.json';
import rasa from './rasa-hatiku/content.json';
import { GAMES } from './registry';

describe('konten Fase 3', () => {
  it('lima permainan Fase 3 terdaftar', () => {
    const p3 = GAMES.filter((g) => g.meta.phase === 3).map((g) => g.meta.number);
    expect(p3.sort((a, b) => a - b)).toEqual([12, 19, 23, 24, 28]);
  });

  it('cerita-pilihanku: dua pilihan berlabel, pilihan lain punya tanggapan lembut', () => {
    for (const it of cerita as ContentItem<OptionQuizData>[]) {
      expect(it.data.options).toHaveLength(2);
      expect(it.data.labels).toHaveLength(2);
      expect(it.data.optionSay?.[0]).toBeNull();
      expect(it.data.optionSay?.[1]).toMatch(/Coba pikirkan lagi/);
    }
  });

  it('rasa-hatiku: emosi jawaban tidak muncul ganda di pilihan', () => {
    for (const it of rasa as ContentItem<OptionQuizData>[]) {
      const faces = it.data.options.map((o) => (o.t === 'face' ? o.e : ''));
      expect(new Set(faces).size).toBe(faces.length);
      // Wajah tenang dan bangga mirip; jangan muncul bersamaan sebagai pengecoh.
      expect(
        faces.includes('tenang') &&
          faces.includes('bangga') &&
          faces[0] !== 'tenang' &&
          faces[0] !== 'bangga',
      ).toBe(false);
    }
  });
});
