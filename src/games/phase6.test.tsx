import { act, fireEvent, render, screen } from '@testing-library/react';
import { ART_KEYS } from '../core/art';
import type { TraceData } from '../core/ui/TraceRound';
import type { ContentItem, RoundResult } from '../types';
import jalan from './jalan-garis/content.json';
import pola from './pola-batik/content.json';
import { Round as PolaRound, type PolaData } from './pola-batik/Round';
import { GAMES } from './registry';
import toko from './toko-kecil/content.json';
import { Round as TokoRound, type TokoData } from './toko-kecil/Round';
import warna from './warna-batik/content.json';
import type { ColoringData } from './warna-batik/Round';

/** Bisakah harga dibayar pas dengan pecahan di dompet (boleh berulang)? */
const payable = (price: number, wallet: number[]) => {
  const ok = new Array(price + 1).fill(false);
  ok[0] = true;
  for (let s = 1; s <= price; s++) ok[s] = wallet.some((w) => w <= s && ok[s - w]);
  return ok[price];
};

describe('Fase 6', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('lima permainan Fase 6 terdaftar; total 30 permainan katalog', () => {
    const p6 = GAMES.filter((g) => g.meta.phase === 6).map((g) => g.meta.number);
    expect(p6.sort((a, b) => a - b)).toEqual([10, 13, 14, 21, 22]);
    const catalog = GAMES.filter((g) => g.meta.number >= 1)
      .map((g) => g.meta.number)
      .sort((a, b) => a - b);
    expect(catalog).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
  });

  it('toko-kecil: setiap harga bisa dibayar pas', () => {
    for (const it of toko as ContentItem<TokoData>[])
      if (it.data.mode === 'bayar')
        expect(payable(it.data.price, it.data.wallet), it.id).toBe(true);
  });

  it('jalan-garis: ikon awal dan akhir ada di registri gambar', () => {
    for (const it of jalan as ContentItem<TraceData>[]) {
      expect(ART_KEYS).toContain(it.data.start!.k);
      expect(ART_KEYS).toContain(it.data.end!.k);
      expect(it.data.path).toMatch(/^M/);
    }
  });

  it('warna-batik: setiap templat punya area untuk diwarnai', () => {
    for (const it of warna as ContentItem<ColoringData>[]) {
      expect(it.data.regions.length).toBeGreaterThanOrEqual(4);
      for (const r of it.data.regions) expect(r.d).toMatch(/^M[\d. -]+/);
    }
  });

  it('pola-batik: jawaban pola AB sama dengan motif pertama', () => {
    for (const it of pola as ContentItem<PolaData>[]) {
      if (!it.id.startsWith('ab-') || it.data.mode === 'buat') continue;
      const cue = it.data.cue!;
      if (cue.t !== 'row') throw new Error('cue harus baris');
      expect(JSON.stringify(it.data.options[0])).toBe(JSON.stringify(cue.items[0]));
    }
  });

  it('kasir: membayar pas menyelesaikan ronde', async () => {
    const item = (toko as ContentItem<TokoData>[]).find((x) => x.id === 'bayar-telur')!;
    const done = vi.fn<(r: RoundResult) => void>();
    render(<TokoRound item={item} ageGroup="C" level={1} onDone={done} />);
    fireEvent.click(screen.getByRole('button', { name: 'bayar Rp1.000' }));
    fireEvent.click(screen.getByRole('button', { name: 'bayar Rp1.000' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(done).toHaveBeenCalledWith({ firstTry: true, attempts: 1 });
  });

  it('buat pola sendiri: tombol Selesai muncul setelah 6 motif', async () => {
    const item = (pola as ContentItem<PolaData>[]).find((x) => x.data.mode === 'buat')!;
    const done = vi.fn<(r: RoundResult) => void>();
    render(<PolaRound item={item} ageGroup="B" level={1} onDone={done} />);
    const motif = document.querySelectorAll<HTMLButtonElement>('.seq-pool .seq-tile');
    for (let i = 0; i < 6; i++) fireEvent.click(motif[i % motif.length]!);
    fireEvent.click(screen.getByRole('button', { name: 'Selesai' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(done).toHaveBeenCalled();
  });
});
