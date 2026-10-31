import { safeToApply } from './pwa';

describe('kapan pembaruan dipasang otomatis', () => {
  it('di layar Ayo Mulai: selalu', () => {
    expect(safeToApply(false, 0, false)).toBe(true);
  });
  it('sedang bermain atau baru sebentar di latar: tidak', () => {
    expect(safeToApply(true, 0, false)).toBe(false);
    expect(safeToApply(true, 10 * 60 * 1000, true)).toBe(false);
  });
  it('kembali setelah lama di latar dan tidak di dalam permainan: ya', () => {
    expect(safeToApply(true, 10 * 60 * 1000, false)).toBe(true);
  });
});
