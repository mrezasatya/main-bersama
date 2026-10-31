import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ART_KEYS } from '../src/core/art/keys';
import { ageGroupsFor, validateGame } from './content-rules';

const meta = {
  id: 'uji',
  number: 1,
  title: 'Uji',
  ageMin: 2,
  ageMax: 6,
  domain: 'sensorik',
  curriculum: ['Montessori'],
  usesAudio: true,
  phase: 1,
};

const item = (i: number, over: Record<string, unknown> = {}) => ({
  id: `item-${i}`,
  ageGroup: ['A', 'B', 'C'],
  difficulty: 1,
  speak: `kalimat ${i}`,
  assetKey: 'bola',
  data: {},
  tags: [],
  review: 'ditinjau',
  ...over,
});

const bank = (n: number) => Array.from({ length: n }, (_, i) => item(i));

describe('aturan validasi konten', () => {
  it('lolos untuk bank yang benar', () => {
    expect(validateGame(meta, bank(40), ART_KEYS).errors).toEqual([]);
  });

  it('1. menolak jumlah item di luar 40-50', () => {
    expect(validateGame(meta, bank(39), ART_KEYS).errors.join()).toMatch(/jumlah item/);
    expect(validateGame(meta, bank(51), ART_KEYS).errors.join()).toMatch(/jumlah item/);
  });

  it('2. menolak id dan speak duplikat', () => {
    const b = bank(40);
    b[1] = item(1, { id: 'item-0' });
    b[2] = item(2, { speak: 'Kalimat 3' });
    const errs = validateGame(meta, b, ART_KEYS).errors.join('\n');
    expect(errs).toMatch(/id duplikat/);
    expect(errs).toMatch(/speak duplikat/);
  });

  it('3. menolak assetKey yang tidak ada', () => {
    const b = bank(40);
    b[0] = item(0, { assetKey: 'naga' });
    expect(validateGame(meta, b, ART_KEYS).errors.join()).toMatch(/assetKey "naga"/);
  });

  it('4. menolak kelompok usia dengan kurang dari 10 item', () => {
    const b = bank(40).map((it, i) => ({ ...it, ageGroup: i < 5 ? ['A'] : ['B', 'C'] }));
    expect(validateGame(meta, b, ART_KEYS).errors.join()).toMatch(/kelompok usia A hanya 5/);
  });

  it('5. menolak speak kosong pada permainan bersuara', () => {
    const b = bank(40);
    b[0] = item(0, { speak: '  ' });
    expect(validateGame(meta, b, ART_KEYS).errors.join()).toMatch(/speak kosong/);
  });

  it('menolak data.speakAlso yang bukan larik teks', () => {
    const b = bank(40);
    b[0] = item(0, { data: { speakAlso: ['ok', ''] } });
    expect(validateGame(meta, b, ART_KEYS).errors.join()).toMatch(/speakAlso/);
  });

  it('6. menghitung item perlu-ditinjau', () => {
    const b = bank(40);
    b[0] = item(0, { review: 'perlu-ditinjau' });
    expect(validateGame(meta, b, ART_KEYS).needsReview).toBe(1);
  });

  it('memetakan rentang usia ke kelompok', () => {
    expect(ageGroupsFor({ ageMin: 2, ageMax: 4 })).toEqual(['A', 'B']);
    expect(ageGroupsFor({ ageMin: 5, ageMax: 6 })).toEqual(['C']);
    expect(ageGroupsFor({ ageMin: 3, ageMax: 6 })).toEqual(['A', 'B', 'C']);
  });

  it('semua content.json di repositori lolos', async () => {
    const dir = join(import.meta.dirname, '..', 'src', 'games');
    const games = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
    expect(games.length).toBeGreaterThan(0);
    for (const g of games) {
      const { meta: m } = (await import(`../src/games/${g.name}/meta.ts`)) as { meta: unknown };
      const content: unknown = JSON.parse(readFileSync(join(dir, g.name, 'content.json'), 'utf8'));
      expect(validateGame(m, content, ART_KEYS).errors, g.name).toEqual([]);
    }
  });
});
