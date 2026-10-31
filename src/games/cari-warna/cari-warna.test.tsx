import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ENGINE_CONFIG } from '../../core/engine';
import { useProgress, useSettings } from '../../core/progress';
import CariWarna from './index';

describe('Cari Warna (permainan contoh)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useProgress.getState().reset();
    useSettings.getState().update({ ageGroup: 'A' });
  });
  afterEach(() => vi.useRealTimers());

  const targetColor = () =>
    /^Mana \S+ (.+)\?$/.exec(screen.getByText(/^Mana /).textContent ?? '')?.[1];
  const choice = (sel: string) => document.querySelector<HTMLButtonElement>(`.choice${sel}`)!;

  it('kelompok A mendapat 2 pilihan dan sesi berakhir di layar hadiah', async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CariWarna />
      </MemoryRouter>,
    );
    expect(document.querySelectorAll('.choice')).toHaveLength(ENGINE_CONFIG.choiceCount.A);

    const len = ENGINE_CONFIG.sessionLength.A;
    for (let i = 0; i < len; i++) {
      // Satu pilihan salah dulu: umpan balik lembut, bukan kekalahan.
      const color = targetColor();
      fireEvent.click(choice(`:not([data-choice="${color}"])`));
      expect(screen.queryByRole('dialog')).toBeNull();
      fireEvent.click(choice(`[data-choice="${color}"]`));
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2000);
      });
    }

    expect(screen.getByRole('dialog', { name: 'Hadiah' })).toBeInTheDocument();
    expect(screen.getByLabelText('3 bintang')).toBeInTheDocument();
    const progress = useProgress.getState().games['cari-warna'];
    expect(progress?.stars).toBe(3);
    expect(progress?.seen).toHaveLength(len);
    expect(new Set(progress?.seen).size).toBe(len);
  });
});
