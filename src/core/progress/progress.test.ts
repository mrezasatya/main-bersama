import { STICKER_ART } from '../art/stickers';
import { sessionStars } from './stars';
import {
  FIRST_STICKER_AT,
  STICKERS,
  newlyUnlocked,
  starsToNextSticker,
  stickerThreshold,
  unlockedCount,
} from './stickers';
import { totalStars, useProgress } from './store';

describe('bintang usaha', () => {
  it('memberi 3 bintang untuk sesi selesai, apa pun jawabannya', () => {
    expect(sessionStars(5, 5)).toBe(3);
  });
  it('memberi bintang sebagian saat berhenti lebih awal, tidak pernah negatif', () => {
    expect(sessionStars(3, 6)).toBe(2);
    expect(sessionStars(1, 6)).toBe(1);
    expect(sessionStars(0, 6)).toBe(0);
  });
});

describe('stiker', () => {
  it('setiap stiker punya gambar dan id unik', () => {
    for (const s of STICKERS) expect(STICKER_ART[s.artKey]).toBeDefined();
    expect(new Set(STICKERS.map((s) => s.id)).size).toBe(STICKERS.length);
  });

  it('terbuka bertahap dari akumulasi bintang', () => {
    expect(unlockedCount(0)).toBe(0);
    expect(unlockedCount(FIRST_STICKER_AT)).toBe(1);
    expect(unlockedCount(stickerThreshold(1) - 1)).toBe(1);
    expect(unlockedCount(stickerThreshold(1))).toBe(2);
    expect(unlockedCount(10_000)).toBe(STICKERS.length);
  });

  it('melaporkan stiker yang baru terbuka', () => {
    expect(newlyUnlocked(0, 3).map((s) => s.id)).toEqual([STICKERS[0]!.id]);
    expect(newlyUnlocked(3, 5)).toEqual([]);
    expect(starsToNextSticker(3)).toBe(stickerThreshold(1) - 3);
    expect(starsToNextSticker(10_000)).toBeNull();
  });
});

describe('store progres', () => {
  beforeEach(() => useProgress.getState().reset());

  it('menyimpan level per permainan dan kelompok usia', () => {
    const st = useProgress.getState();
    expect(st.getAdaptive('g', 'A').level).toBe(1);
    expect(st.getAdaptive('g', 'C').level).toBe(3);
    for (let i = 0; i < 3; i++)
      useProgress.getState().recordRound('g', 'A', { firstTry: true, attempts: 1 });
    expect(useProgress.getState().getAdaptive('g', 'A').level).toBe(2);
    expect(useProgress.getState().getAdaptive('g', 'B').level).toBe(2);
  });

  it('menjumlahkan bintang lintas permainan', () => {
    useProgress.getState().finishSession('g1', 3);
    useProgress.getState().finishSession('g2', 2);
    const { games } = useProgress.getState();
    expect(totalStars(games)).toBe(5);
    expect(games.g1?.sessions).toBe(1);
  });

  it('tersimpan ke localStorage', () => {
    useProgress.getState().finishSession('g1', 3);
    expect(window.localStorage.getItem('mb-progress')).toContain('"stars":3');
  });
});
