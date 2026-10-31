import { GRID, markVisited, score } from './trace';

const line = (y: number, x0: number, x1: number, m = new Uint8Array(GRID * GRID)) => {
  for (let x = x0; x <= x1; x++) m[y * GRID + x] = 1;
  return m;
};

describe('penilaian menelusuri', () => {
  it('cakupan penuh bila seluruh jalur dilewati', () => {
    const mask = line(20, 5, 40);
    const visited = new Uint8Array(GRID * GRID);
    for (let x = 5; x <= 40; x++) markVisited(visited, x, 20, 1);
    expect(score(mask, visited).coverage).toBe(1);
    expect(score(mask, visited).outside).toBe(0);
  });

  it('cakupan sebagian bila hanya separuh jalur', () => {
    const mask = line(20, 0, 39);
    const visited = new Uint8Array(GRID * GRID);
    for (let x = 0; x < 20; x++) markVisited(visited, x, 20, 0);
    expect(score(mask, visited).coverage).toBeCloseTo(0.5, 1);
  });

  it('coretan jauh dari jalur dihitung di luar', () => {
    const mask = line(5, 0, 10);
    const visited = new Uint8Array(GRID * GRID);
    markVisited(visited, 40, 40, 1);
    expect(score(mask, visited).outside).toBe(1);
  });
});
