import { useMemo, useState } from 'react';
import { sfx, speak } from '../audio';
import { shuffle } from '../engine';
import { Visual } from '../visual/Visual';
import { visualLabel, type Visual as VisualSpec } from '../visual/types';
import type { RoundProps } from '../../types';
import { InstructionBar } from './InstructionBar';
import { feedback } from './feedback';
import { useSpeakOnMount } from './useSpeak';

export interface SequenceData {
  /** Kepingan dalam urutan yang benar. */
  tiles: VisualSpec[];
  /** Diucapkan saat keping ke-i dipasang (mis. suku kata). */
  tileSay?: string[];
  /** Keping pengecoh tambahan untuk usia 5-6. */
  extra?: VisualSpec[];
  /** Gambar petunjuk (mis. gambar kata yang disusun). */
  cue?: VisualSpec;
  speakAlso?: string[];
  /** Tampilkan keping yang sudah dipasang berdampingan rapat (kata). */
  joined?: boolean;
}

/** Ketuk kepingan sesuai urutan. Salah keping: goyang lembut, tetap di tempat. */
export function SequenceRound({ item, ageGroup, onDone }: RoundProps<SequenceData>) {
  const d = item.data;
  const pool = useMemo(() => {
    const base = d.tiles.map((v, i) => ({ v, key: `t${i}`, order: i }));
    const extra =
      ageGroup === 'C' ? (d.extra ?? []).map((v, i) => ({ v, key: `x${i}`, order: -1 })) : [];
    return shuffle([...base, ...extra]);
  }, [d.tiles, d.extra, ageGroup]);
  const [placed, setPlaced] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [shaking, setShaking] = useState<string | null>(null);
  const done = placed >= d.tiles.length;

  useSpeakOnMount(item.speak);

  const tap = (t: (typeof pool)[number]) => {
    if (done || t.order < placed) return;
    if (t.order === placed) {
      const n = placed + 1;
      setPlaced(n);
      sfx.tap();
      const say = d.tileSay?.[t.order];
      if (n >= d.tiles.length) {
        void (say ? speak(say) : Promise.resolve()).then(() =>
          feedback
            .correct(d.speakAlso?.length ? d.speakAlso : undefined)
            .then(() => onDone({ firstTry: mistakes === 0, attempts: mistakes + 1 })),
        );
      } else if (say) void speak(say);
      return;
    }
    setMistakes((m) => m + 1);
    setShaking(t.key);
    window.setTimeout(() => setShaking(null), 500);
    feedback.tryAgain();
  };

  const hint = mistakes >= 2 && !done ? `t${placed}` : null;

  return (
    <div className="round">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      {d.cue && (
        <div className="quiz-cue">
          <Visual v={d.cue} />
        </div>
      )}
      <div
        className={`seq-slots ${d.joined ? 'is-joined' : ''}`}
        aria-label={`${placed} dari ${d.tiles.length}`}
      >
        {d.tiles.map((v, i) => (
          <span key={i} className={`seq-slot ${i < placed ? 'is-filled' : ''}`}>
            {i < placed && <Visual v={v} />}
          </span>
        ))}
      </div>
      <div className="seq-pool">
        {pool.map((t) => {
          const used = t.order >= 0 && t.order < placed;
          return (
            <button
              key={t.key}
              type="button"
              className={[
                'seq-tile',
                used && 'is-used',
                shaking === t.key && 'is-shaking',
                hint === t.key && 'is-hint',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => tap(t)}
              disabled={used || done}
              aria-label={visualLabel(t.v)}
              data-order={t.order}
            >
              <Visual v={t.v} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
