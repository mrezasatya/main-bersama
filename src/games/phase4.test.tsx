import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useProgress, useSettings } from '../core/progress';
import type { ContentItem, RoundResult } from '../types';
import { mixColors } from './campur-warna/mix';
import { Round as CampurRound } from './campur-warna/Round';
import pasangContent from './pasang-bentuk/content.json';
import { Round as PasangRound, type PasangData } from './pasang-bentuk/Round';
import budayaContent from './pasangan-budaya/content.json';
import { Round as MemoryRound, type MemoryData } from './pasangan-budaya/Round';
import puzzleContent from './puzzle-gambar/content.json';
import { GAMES } from './registry';

const flush = async (ms = 2000) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};

describe('Fase 4', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useProgress.getState().reset();
    useSettings.getState().update({ ageGroup: 'B' });
  });
  afterEach(() => vi.useRealTimers());

  it('lima permainan Fase 4 terdaftar', () => {
    const p4 = GAMES.filter((g) => g.meta.phase === 4).map((g) => g.meta.number);
    expect(p4.sort((a, b) => a - b)).toEqual([1, 2, 3, 9, 17]);
  });

  it('campuran warna dasar', () => {
    expect(mixColors('merah', 'kuning')).toBe('oranye');
    expect(mixColors('kuning', 'biru')).toBe('hijau');
    expect(mixColors('biru', 'merah')).toBe('ungu');
    expect(mixColors('merah', 'hitam')).toBeNull();
  });

  it('pasang bentuk: ketuk keping lalu ketuk bayangannya sampai selesai', async () => {
    const item = (pasangContent as ContentItem<PasangData>[])[0]!;
    const done = vi.fn<(r: RoundResult) => void>();
    render(<PasangRound item={item} ageGroup="B" level={1} onDone={done} />);
    for (let i = 0; i < 3; i++) {
      const piece = document.querySelector<HTMLElement>('[data-piece]')!;
      const id = piece.dataset.piece!;
      fireEvent.pointerDown(piece, { clientX: 0, clientY: 0, pointerId: 1 });
      fireEvent.pointerUp(piece, { clientX: 0, clientY: 0, pointerId: 1 });
      fireEvent.click(
        screen.getByRole('button', { name: `bayangan ${item.data.tileSay[Number(id.slice(1))]}` }),
      );
    }
    await flush();
    expect(done).toHaveBeenCalledWith({ firstTry: true, attempts: 1 });
  });

  it('kartu memori: membuka semua pasangan menyelesaikan ronde', async () => {
    const item = (budayaContent as ContentItem<MemoryData>[])[0]!;
    const done = vi.fn<(r: RoundResult) => void>();
    render(<MemoryRound item={item} ageGroup="A" level={1} onDone={done} />);
    for (const pair of [0, 1]) {
      const cards = document.querySelectorAll<HTMLElement>(`[data-pair="${pair}"]`);
      fireEvent.click(cards[0]!);
      fireEvent.click(cards[1]!);
    }
    await flush();
    expect(done).toHaveBeenCalled();
  });

  it('laboratorium warna: merah + kuning membuat oranye', async () => {
    const item = {
      id: 'x',
      ageGroup: ['A'],
      difficulty: 1,
      speak: 'Ayo buat warna oranye!',
      data: {
        mode: 'campur',
        target: 'oranye',
        pots: ['merah', 'kuning', 'biru'],
        instr: { t: 'swatch', c: 'oranye' },
      },
      tags: [],
      review: 'ditinjau',
    } as unknown as Parameters<typeof CampurRound>[0]['item'];
    const done = vi.fn<(r: RoundResult) => void>();
    render(<CampurRound item={item} ageGroup="A" level={1} onDone={done} />);
    fireEvent.click(document.querySelector('[data-color="merah"]')!);
    fireEvent.click(document.querySelector('[data-color="kuning"]')!);
    await flush();
    expect(done).toHaveBeenCalledWith({ firstTry: true, attempts: 1 });
  });

  it('puzzle: jumlah keping 2-20 dan kelompok usia sesuai', () => {
    for (const it of puzzleContent as ContentItem<{ cols: number; rows: number }>[]) {
      const n = it.data.cols * it.data.rows;
      expect(n).toBeGreaterThanOrEqual(2);
      expect(n).toBeLessThanOrEqual(20);
      if (it.ageGroup.includes('A')) expect(n).toBeLessThanOrEqual(4);
    }
  });

  it('semua permainan Fase 4 terbuka dalam sesi', async () => {
    for (const g of GAMES.filter((x) => x.meta.phase === 4)) {
      const { default: Game } = await g.load();
      const { unmount, container } = render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Game />
        </MemoryRouter>,
      );
      expect(container.querySelector('.round')).not.toBeNull();
      unmount();
    }
  });
});
