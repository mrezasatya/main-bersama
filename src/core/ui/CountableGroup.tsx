import { useState } from 'react';
import { speak } from '../audio';
import { NUMBER_WORDS } from '../audio/phrases';
import { Art } from '../art/registry';
import type { ArtKey } from '../art/keys';

/**
 * Tahap konkret (Singapore Math): anak mengetuk setiap benda untuk menghitung.
 * Setiap ketukan menandai benda dengan angka dan membacakan bilangannya.
 */
export function CountableGroup({ k, n }: { k: ArtKey; n: number }) {
  const [order, setOrder] = useState<number[]>([]);
  const tap = (i: number) => {
    if (order.includes(i)) return;
    const next = [...order, i];
    setOrder(next);
    void speak(NUMBER_WORDS[next.length] ?? String(next.length));
  };
  return (
    <div
      className={`countable countable-${n > 5 ? 'many' : 'few'}`}
      aria-label={`${n} benda, ketuk untuk menghitung`}
    >
      {Array.from({ length: n }, (_, i) => {
        const pos = order.indexOf(i);
        return (
          <button
            key={i}
            type="button"
            className={`count-item ${pos >= 0 ? 'is-counted' : ''}`}
            onClick={() => tap(i)}
            aria-label={`benda ${i + 1}`}
          >
            <Art k={k} />
            {pos >= 0 && <span className="count-badge">{pos + 1}</span>}
          </button>
        );
      })}
    </div>
  );
}
