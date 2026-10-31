import { fireEvent, render, screen } from '@testing-library/react';
import type { OptionQuizData } from '../core/ui/OptionQuiz';
import { CountableGroup } from '../core/ui/CountableGroup';
import type { Visual } from '../core/visual/types';
import type { ContentItem } from '../types';
import beda from './cari-yang-beda/content.json';
import hitung from './hitung-buah/content.json';
import kebun from './kebun-angka/content.json';
import kelompok from './kelompokkan/content.json';
import type { SortData } from './kelompokkan/Round';
import { GAMES } from './registry';

const nOf = (v: Visual) => (v.t === 'num' || v.t === 'group' ? v.n : NaN);

describe('Fase 5', () => {
  it('lima permainan Fase 5 terdaftar', () => {
    const p5 = GAMES.filter((g) => g.meta.phase === 5).map((g) => g.meta.number);
    expect(p5.sort((a, b) => a - b)).toEqual([5, 6, 15, 16, 20]);
  });

  it('hitung-buah: jawaban tambah, kurang, dan hitung benar', () => {
    for (const it of hitung as ContentItem<OptionQuizData>[]) {
      const ans = nOf(it.data.options[0]!);
      const m = /^(tambah|kurang)-(\d+)-(\d+)$/.exec(it.id);
      if (m) expect(ans).toBe(m[1] === 'tambah' ? +m[2]! + +m[3]! : +m[2]! - +m[3]!);
      if (it.id.startsWith('hitung-')) expect(ans).toBe(it.data.countable!.n);
      // Tidak ada pilihan ganda.
      const ns = it.data.options.map(nOf);
      expect(new Set(ns).size).toBe(ns.length);
    }
  });

  it('kebun-angka: jawaban ikatan bilangan dan kotak sepuluh benar', () => {
    for (const it of kebun as ContentItem<OptionQuizData>[]) {
      const ans = nOf(it.data.options[0]!);
      const cue = it.data.cue!;
      if (cue.t === 'bond')
        expect(ans).toBe(cue.whole === null ? cue.a! + cue.b! : cue.whole - cue.a!);
      if (cue.t === 'tenframe')
        expect(ans).toBe(it.id.startsWith('ke-sepuluh') ? 10 - cue.n : cue.n);
    }
  });

  it('cari-yang-beda: hanya pilihan pertama yang berbeda', () => {
    for (const it of beda as ContentItem<OptionQuizData>[]) {
      const [odd, ...same] = it.data.options.map((o) => JSON.stringify(o));
      if (!it.id.startsWith('kategori')) {
        expect(new Set(same).size, it.id).toBe(1);
        expect(same[0]).not.toBe(odd);
      }
      expect(it.data.minOptions).toBe(3);
    }
  });

  it('kelompokkan: setiap wadah punya cukup benda untuk usia 5-6', () => {
    for (const it of kelompok as ContentItem<SortData>[]) {
      it.data.bins.forEach((_, b) => {
        expect(it.data.items.filter((x) => x.bin === b).length, it.id).toBeGreaterThanOrEqual(3);
      });
    }
  });

  it('menghitung dengan mengetuk memberi nomor urut', () => {
    render(<CountableGroup k="apel" n={3} />);
    fireEvent.click(screen.getByRole('button', { name: 'benda 2' }));
    fireEvent.click(screen.getByRole('button', { name: 'benda 1' }));
    expect(screen.getByRole('button', { name: 'benda 2' }).textContent).toBe('1');
    expect(screen.getByRole('button', { name: 'benda 1' }).textContent).toBe('2');
  });
});
