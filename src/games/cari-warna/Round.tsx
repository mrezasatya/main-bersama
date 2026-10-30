import { useMemo, useState } from 'react';
import { Art, NAMED_COLORS, isArtKey, type ColorName } from '../../core/art';
import { ENGINE_CONFIG, shuffle } from '../../core/engine';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import type { RoundProps } from '../../types';
import type { CariWarnaData } from './types';

/** Setelah sekian percobaan, jawaban yang benar diberi petunjuk lembut (berdenyut). */
const HINT_AFTER = 2;

export function Round({ item, ageGroup, onDone }: RoundProps<CariWarnaData>) {
  const { target, distractors } = item.data;
  const shape = isArtKey(item.assetKey) ? item.assetKey : 'bola';
  const choices = useMemo(
    () => shuffle([target, ...distractors.slice(0, ENGINE_CONFIG.choiceCount[ageGroup] - 1)]),
    [target, distractors, ageGroup],
  );

  const [attempts, setAttempts] = useState(0);
  const [tried, setTried] = useState<ColorName[]>([]);
  const [shaking, setShaking] = useState<ColorName | null>(null);
  const [solved, setSolved] = useState(false);

  useSpeakOnMount(item.speak);

  const choose = (c: ColorName) => {
    if (solved) return;
    const n = attempts + 1;
    setAttempts(n);
    if (c === target) {
      setSolved(true);
      void feedback
        .correct()
        .then(() => window.setTimeout(() => onDone({ firstTry: n === 1, attempts: n }), 250));
      return;
    }
    setTried((t) => (t.includes(c) ? t : [...t, c]));
    setShaking(c);
    window.setTimeout(() => setShaking(null), 500);
    feedback.tryAgain(item.speak);
  };

  return (
    <div className="round">
      <InstructionBar
        text={item.label ?? item.speak}
        speakText={item.speak}
        cue={<span className="swatch" style={{ background: NAMED_COLORS[target] }} />}
      />
      <div className={`choices choices-${choices.length}`}>
        {choices.map((c) => {
          const isTarget = c === target;
          const cls = [
            'choice',
            shaking === c && 'is-shaking',
            tried.includes(c) && 'is-tried',
            solved && isTarget && 'is-correct',
            !solved && isTarget && attempts >= HINT_AFTER && 'is-hint',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <button
              key={c}
              type="button"
              className={cls}
              onClick={() => choose(c)}
              aria-label={`${shape} ${c}`}
              data-color={c}
            >
              <Art k={shape} color={NAMED_COLORS[c]} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
