import { useMemo, useRef, useState } from 'react';
import { sfx, speak } from '../../core/audio';
import { shuffle } from '../../core/engine';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { Visual } from '../../core/visual/Visual';
import type { Visual as VisualSpec } from '../../core/visual/types';
import type { AgeGroup, RoundProps } from '../../types';

export interface MemoryData {
  cards: VisualSpec[];
  tileSay: string[];
}

const PAIRS: Record<AgeGroup, number> = { A: 2, B: 3, C: 6 };

/** Kartu memori: buka dua kartu; bila sama, kartu tetap terbuka dan namanya dibacakan. */
export function Round({ item, ageGroup, onDone }: RoundProps<MemoryData>) {
  const pairs = Math.min(item.data.cards.length, PAIRS[ageGroup]);
  const deck = useMemo(
    () => shuffle(Array.from({ length: pairs * 2 }, (_, i) => ({ key: i, pair: i % pairs }))),
    [pairs],
  );
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const misses = useRef(0);
  const busy = useRef(false);

  useSpeakOnMount(item.speak);

  const flip = (k: number) => {
    if (busy.current || open.includes(k) || matched.includes(deck[k]!.pair)) return;
    sfx.tap();
    const next = [...open, k];
    setOpen(next);
    if (next.length < 2) return;
    const [a, b] = next.map((i) => deck[i]!.pair);
    if (a === b) {
      const m = [...matched, a!];
      setMatched(m);
      setOpen([]);
      if (m.length === pairs) {
        void feedback
          .correct(item.data.tileSay[a!])
          .then(() => onDone({ firstTry: misses.current <= pairs, attempts: misses.current + 1 }));
      } else void speak(item.data.tileSay[a!] ?? '');
      return;
    }
    misses.current += 1;
    busy.current = true;
    window.setTimeout(() => {
      setOpen([]);
      busy.current = false;
    }, 1000);
  };

  return (
    <div className="round">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <div className={`memory memory-${pairs * 2}`}>
        {deck.map((c, i) => {
          const up = open.includes(i) || matched.includes(c.pair);
          return (
            <button
              key={c.key}
              type="button"
              className={`memory-card ${up ? 'is-up' : ''} ${matched.includes(c.pair) ? 'is-matched' : ''}`}
              onClick={() => flip(i)}
              aria-label={up ? (item.data.tileSay[c.pair] ?? 'kartu') : 'kartu tertutup'}
              data-pair={c.pair}
            >
              <span className="memory-face">{up && <Visual v={item.data.cards[c.pair]!} />}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
