import { ENGINE_CONFIG } from './config';
import { classify, updateAdaptive, type AdaptiveState } from './adaptive';

const ok = { firstTry: true, attempts: 1 };
const hard = { firstTry: false, attempts: 3 };
const meh = { firstTry: false, attempts: 2 };

const run = (start: AdaptiveState, results: (typeof ok)[]) =>
  results.reduce((s, r) => updateAdaptive(s, r), start);

describe('mesin adaptif', () => {
  it('mengklasifikasikan hasil', () => {
    expect(classify(ok)).toBe('success');
    expect(classify(hard)).toBe('struggle');
    expect(classify(meh)).toBe('neutral');
  });

  it('naik level setelah 3 keberhasilan beruntun', () => {
    expect(run({ level: 2, streak: 0 }, [ok, ok])).toEqual({ level: 2, streak: 2 });
    expect(run({ level: 2, streak: 0 }, [ok, ok, ok])).toEqual({ level: 3, streak: 0 });
  });

  it('turun level setelah 3 kesulitan beruntun', () => {
    expect(run({ level: 3, streak: 0 }, [hard, hard, hard])).toEqual({ level: 2, streak: 0 });
  });

  it('hasil netral memutus rentetan', () => {
    expect(run({ level: 2, streak: 0 }, [ok, ok, meh, ok]).level).toBe(2);
  });

  it('tidak melewati batas level', () => {
    expect(run({ level: ENGINE_CONFIG.maxLevel, streak: 0 }, [ok, ok, ok]).level).toBe(
      ENGINE_CONFIG.maxLevel,
    );
    expect(run({ level: ENGINE_CONFIG.minLevel, streak: 0 }, [hard, hard, hard]).level).toBe(
      ENGINE_CONFIG.minLevel,
    );
  });

  it('ambang dapat dikonfigurasi', () => {
    const cfg = { ...ENGINE_CONFIG, levelUpStreak: 2 };
    const s = [ok, ok].reduce((st, r) => updateAdaptive(st, r, cfg), { level: 1, streak: 0 });
    expect(s.level).toBe(2);
  });
});
