/**
 * Bank konten #29 Tiru Irama: 45 pola 2-6 ketukan (ta = pendek, taa = panjang).
 * Usia 2-3 cukup menyamakan jumlah ketukan; usia 4-6 juga panjang-pendeknya.
 */
import type { Beat } from '../../src/games/tiru-irama/rhythm';
import type { RhythmSound } from '../../src/games/tiru-irama/types';
import { seeded, writeContent } from './lib';

const SOUNDS: [RhythmSound, string][] = [
  ['tepuk', 'Tepuk tangan'],
  ['kendang', 'Kendang'],
  ['rebana', 'Rebana'],
  ['kentongan', 'Kentongan'],
];

const allPatterns = (n: number): Beat[][] =>
  Array.from({ length: 2 ** n }, (_, m) =>
    Array.from({ length: n }, (_, i) => ((m >> (n - 1 - i)) & 1 ? 'taa' : 'ta') as Beat),
  );

const rng = seeded(29);
const shuffle = <T>(a: T[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

const groups: { beats: Beat[]; age: string[] }[] = [
  ...[...allPatterns(2), ...allPatterns(3)].map((b) => ({ beats: b, age: ['A', 'B'] })),
  ...shuffle(allPatterns(4))
    .slice(0, 14)
    .map((b) => ({ beats: b, age: ['B', 'C'] })),
  ...shuffle(
    [...allPatterns(5), ...allPatterns(6)].filter((b) => b.includes('taa') && b.includes('ta')),
  )
    .slice(0, 19)
    .map((b) => ({ beats: b, age: ['C'] })),
];

const items = groups.map(({ beats, age }, i) => {
  const [sound, soundName] = SOUNDS[i % SOUNDS.length]!;
  const text = beats.join(', ');
  return {
    id: `${sound}-${beats.join('-')}`,
    ageGroup: age,
    difficulty: Math.min(5, beats.length - 1) as 1 | 2 | 3 | 4 | 5,
    speak: `${soundName}: ${text}. Ayo tiru!`,
    label: text,
    data: { beats, sound },
    tags: ['irama', sound, `${beats.length}-ketukan`],
    review: 'ditinjau',
  };
});

await writeContent('tiru-irama', items);
