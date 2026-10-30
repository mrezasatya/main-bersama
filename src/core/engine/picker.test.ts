import type { AgeGroup, ContentItem, Difficulty } from '../../types';
import { itemsForAge, pickNext, shuffle } from './picker';

const mk = (id: string, ageGroup: AgeGroup[], difficulty: Difficulty): ContentItem => ({
  id,
  ageGroup,
  difficulty,
  speak: id,
  data: {},
  tags: [],
  review: 'ditinjau',
});

/** RNG deterministik untuk tes. */
const seeded =
  (seed = 1) =>
  () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

const bank: ContentItem[] = [
  ...Array.from({ length: 6 }, (_, i) => mk(`a${i}`, ['A', 'B'], 1)),
  ...Array.from({ length: 6 }, (_, i) => mk(`b${i}`, ['B', 'C'], 3)),
  ...Array.from({ length: 6 }, (_, i) => mk(`c${i}`, ['C'], 5)),
];

describe('pickNext', () => {
  it('hanya memilih item untuk kelompok usia yang diminta', () => {
    let seen: string[] = [];
    for (let i = 0; i < 30; i++) {
      const r = pickNext(bank, 'A', 3, seen, seeded(i + 1));
      expect(r.item.ageGroup).toContain('A');
      seen = r.seen;
    }
  });

  it('tidak mengulang item sebelum seluruh bank kelompok usia terpakai', () => {
    const pool = itemsForAge(bank, 'B');
    let seen: string[] = [];
    const picked: string[] = [];
    for (let i = 0; i < pool.length; i++) {
      const r = pickNext(bank, 'B', 1, seen, seeded(i + 7));
      expect(r.bagReset).toBe(false);
      picked.push(r.item.id);
      seen = r.seen;
    }
    expect(new Set(picked).size).toBe(pool.length);

    const next = pickNext(bank, 'B', 1, seen, seeded(99));
    expect(next.bagReset).toBe(true);
    expect(next.seen).toEqual([next.item.id]);
  });

  it('isi ulang kantong tidak menghapus riwayat kelompok usia lain', () => {
    const seenC = ['c0', 'c1'];
    const allA = itemsForAge(bank, 'A').map((i) => i.id);
    const r = pickNext(bank, 'A', 1, [...seenC, ...allA]);
    expect(r.bagReset).toBe(true);
    expect(r.seen).toEqual(expect.arrayContaining(seenC));
  });

  it('mendahulukan item dengan kesulitan paling dekat ke level', () => {
    expect(pickNext(bank, 'C', 5, []).item.difficulty).toBe(5);
    expect(pickNext(bank, 'C', 3, []).item.difficulty).toBe(3);
    // Level 4: jarak ke 3 dan 5 sama, yang lebih mudah didahulukan.
    expect(pickNext(bank, 'C', 4, []).item.difficulty).toBe(3);
  });

  it('melempar galat bila tidak ada item untuk kelompok usia', () => {
    expect(() => pickNext([mk('x', ['C'], 1)], 'A', 1, [])).toThrow();
  });
});

describe('shuffle', () => {
  it('mempertahankan semua elemen tanpa mengubah larik asli', () => {
    const src = [1, 2, 3, 4, 5];
    const out = shuffle(src, seeded(3));
    expect(out.sort()).toEqual([1, 2, 3, 4, 5]);
    expect(src).toEqual([1, 2, 3, 4, 5]);
  });
});
