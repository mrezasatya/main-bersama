import { matchRhythm, type Beat } from './rhythm';

const at = (...ms: number[]) => ms;

describe('matchRhythm', () => {
  const p: Beat[] = ['ta', 'ta', 'taa', 'ta'];

  it('menolak jumlah ketukan yang berbeda', () => {
    expect(matchRhythm(p, at(0, 500, 1000), true)).toBe(false);
  });

  it('usia 2-3: cukup jumlah ketukan sama', () => {
    expect(matchRhythm(p, at(0, 100, 900, 950), false)).toBe(true);
  });

  it('menerima panjang-pendek yang benar walau tempo berbeda', () => {
    expect(matchRhythm(p, at(0, 500, 1000, 2000), true)).toBe(true);
    expect(matchRhythm(p, at(0, 300, 600, 1250), true)).toBe(true);
  });

  it('menolak bila ketukan panjang di tempat yang salah', () => {
    expect(matchRhythm(p, at(0, 1000, 1500, 2000), true)).toBe(false);
  });

  it('pola rata: menerima ketukan yang kira-kira sama jarak', () => {
    expect(matchRhythm(['ta', 'ta', 'ta'], at(0, 450, 1000), true)).toBe(true);
    expect(matchRhythm(['ta', 'ta', 'ta'], at(0, 300, 1100), true)).toBe(false);
  });
});
