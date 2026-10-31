/** Logika murni penilaian menelusuri: grid kasar, cakupan target, dan coretan di luar jalur. */
export const GRID = 48;

export interface TraceScore {
  /** Bagian target yang sudah dilewati jari (0-1). */
  coverage: number;
  /** Bagian sapuan yang jauh dari target (0-1). */
  outside: number;
}

/** Melebarkan mask agar coretan sedikit di tepi tetap dihitung "di jalur". */
export function dilate(mask: Uint8Array, r = 2): Uint8Array {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < GRID; y++)
    for (let x = 0; x < GRID; x++) {
      if (!mask[y * GRID + x]) continue;
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < GRID && ny < GRID) out[ny * GRID + nx] = 1;
        }
    }
  return out;
}

export function score(mask: Uint8Array, visited: Uint8Array): TraceScore {
  let target = 0;
  let hit = 0;
  let strokes = 0;
  let out = 0;
  const near = dilate(mask, 3);
  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) {
      target++;
      if (visited[i]) hit++;
    }
    if (visited[i]) {
      strokes++;
      if (!near[i]) out++;
    }
  }
  return { coverage: target ? hit / target : 0, outside: strokes ? out / strokes : 0 };
}

/** Menandai sel grid yang dilewati jari (radius dalam sel). */
export function markVisited(visited: Uint8Array, gx: number, gy: number, r: number): void {
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++) {
      if (dx * dx + dy * dy > r * r) continue;
      const x = Math.round(gx + dx);
      const y = Math.round(gy + dy);
      if (x >= 0 && y >= 0 && x < GRID && y < GRID) visited[y * GRID + x] = 1;
    }
}

/** Ambang lolos per usia: anak kecil cukup menelusuri sebagian besar. */
export const TRACE_PASS = { A: 0.55, B: 0.65, C: 0.75 } as const;
