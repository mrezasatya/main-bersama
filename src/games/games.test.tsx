import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useProgress, useSettings } from '../core/progress';
import type { AgeGroup } from '../types';
import { GAMES } from './registry';

describe('setiap permainan terdaftar bisa dibuka di setiap kelompok usia', () => {
  it('nomor katalog unik', () => {
    const nums = GAMES.map((g) => g.meta.number);
    expect(new Set(nums).size).toBe(nums.length);
  });

  for (const g of GAMES)
    for (const age of ['A', 'B', 'C'] as AgeGroup[])
      it(`${g.meta.id} (${age})`, async () => {
        useProgress.getState().reset();
        useSettings.getState().update({ ageGroup: age });
        const { default: Game } = await g.load();
        const { container, unmount } = render(
          <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Game />
          </MemoryRouter>,
        );
        expect(container.querySelector('.round')).not.toBeNull();
        expect(screen.getByRole('button', { name: /Berhenti/ })).toBeInTheDocument();
        unmount();
      });
});
