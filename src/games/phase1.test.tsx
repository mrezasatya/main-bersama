import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ART_KEYS } from '../core/art';
import { isEffectName, isScaleName, isTimbre } from '../core/audio';
import { ENGINE_CONFIG } from '../core/engine';
import { useProgress, useSettings } from '../core/progress';
import type { PictureQuizData } from '../core/ui/PictureQuiz';
import type { AgeGroup, ContentItem } from '../types';
import kendaraan from './kendaraan/content.json';
import nada from './nada-nusantara/content.json';
import type { NadaData } from './nada-nusantara/types';
import panca from './panca-indra/content.json';
import { ORGANS, PARTS } from './panca-indra/parts';
import type { IndraData } from './panca-indra/types';
import { GAMES } from './registry';
import hewan from './suara-hewan/content.json';
import irama from './tiru-irama/content.json';
import type { IramaData } from './tiru-irama/types';

const quizBanks = { 'suara-hewan': hewan, kendaraan } as Record<
  string,
  ContentItem<PictureQuizData>[]
>;

describe('konten Fase 1', () => {
  it.each(Object.entries(quizBanks))('%s: pengecoh merujuk item lain yang ada', (_name, bank) => {
    const ids = new Set(bank.map((it) => it.id));
    for (const it of bank) {
      expect(it.data.distractors).toHaveLength(3);
      expect(new Set(it.data.distractors).size).toBe(3);
      expect(it.data.distractors).not.toContain(it.id);
      for (const d of it.data.distractors) expect(ids.has(d)).toBe(true);
      expect(isEffectName(it.data.sfx)).toBe(true);
      expect(ART_KEYS).toContain(it.assetKey);
    }
  });

  it.each(Object.entries(quizBanks))(
    '%s: pengecoh pertama cocok untuk usia 2-3 bila item juga untuk usia 2-3',
    (_name, bank) => {
      const byId = new Map(bank.map((it) => [it.id, it]));
      for (const it of bank.filter((x) => x.ageGroup.includes('A')))
        expect(byId.get(it.data.distractors[0]!)!.ageGroup).toContain('A');
    },
  );

  it('nada-nusantara: timbre, tangga nada, dan melodi valid', () => {
    for (const it of nada as ContentItem<NadaData>[]) {
      expect(isTimbre(it.data.timbre)).toBe(true);
      expect(isScaleName(it.data.scale)).toBe(true);
      expect(it.data.count).toBeGreaterThan(0);
      for (const m of it.data.melody) expect(m).toBeLessThan(Math.min(it.data.count, 5));
    }
  });

  it('tiru-irama: 2-6 ketukan; usia 2-3 hanya pola pendek', () => {
    for (const it of irama as ContentItem<IramaData>[]) {
      expect(it.data.beats.length).toBeGreaterThanOrEqual(2);
      expect(it.data.beats.length).toBeLessThanOrEqual(6);
      if (it.ageGroup.includes('A')) expect(it.data.beats.length).toBeLessThanOrEqual(3);
    }
  });

  it('panca-indra: bagian tubuh, indra, dan gambar petunjuk valid', () => {
    for (const it of panca as ContentItem<IndraData>[]) {
      if (it.data.mode === 'tunjuk') expect(PARTS[it.data.part]).toBeDefined();
      else {
        expect(ORGANS).toContain(it.data.organ);
        expect(it.data.distractors).not.toContain(it.data.organ);
        expect(ART_KEYS).toContain(it.assetKey);
      }
    }
  });
});

describe('setiap permainan bisa dibuka di setiap kelompok usia', () => {
  const phase1 = GAMES.filter((g) => g.meta.phase === 1);
  it('lima permainan Fase 1 terdaftar', () => {
    expect(phase1.map((g) => g.meta.number).sort((a, b) => a - b)).toEqual([4, 11, 26, 27, 29]);
  });

  for (const g of phase1)
    for (const age of ['A', 'B', 'C'] as AgeGroup[])
      it(`${g.meta.id} (${age})`, async () => {
        useProgress.getState().reset();
        useSettings.getState().update({ ageGroup: age });
        const { default: Game } = await g.load();
        const { container, unmount } = render(
          <MemoryRouter>
            <Game />
          </MemoryRouter>,
        );
        expect(container.querySelector('.round')).not.toBeNull();
        expect(screen.getByRole('button', { name: /Berhenti/ })).toBeInTheDocument();
        unmount();
      });
});

describe('Suara Hewan: satu sesi penuh', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useProgress.getState().reset();
    useSettings.getState().update({ ageGroup: 'B' });
  });
  afterEach(() => vi.useRealTimers());

  it('jumlah pilihan sesuai usia, lalu layar hadiah', async () => {
    const { default: Game } = await GAMES.find((g) => g.meta.id === 'suara-hewan')!.load();
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>,
    );
    expect(document.querySelectorAll('.choice')).toHaveLength(ENGINE_CONFIG.choiceCount.B);
    for (let i = 0; i < ENGINE_CONFIG.sessionLength.B; i++) {
      fireEvent.click(document.querySelector('.choice[data-target]')!);
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2500);
      });
    }
    expect(screen.getByRole('dialog', { name: 'Hadiah' })).toBeInTheDocument();
    expect(useProgress.getState().games['suara-hewan']?.stars).toBe(3);
  });
});
