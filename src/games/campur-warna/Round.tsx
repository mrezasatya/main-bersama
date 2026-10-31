import { useState } from 'react';
import { NAMED_COLORS, type ColorName } from '../../core/art/colors';
import { speak, speakSequence } from '../../core/audio';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { OptionQuizRound, type OptionQuizData } from '../../core/ui/OptionQuiz';
import { Visual } from '../../core/visual/Visual';
import type { Visual as VisualSpec } from '../../core/visual/types';
import type { RoundProps } from '../../types';
import { PHRASES, madeColor, mixColors } from './mix';

interface LabData {
  mode: 'campur';
  target: ColorName;
  pots: ColorName[];
  instr: VisualSpec;
}
export type Data = LabData | (OptionQuizData & { mode?: undefined });

/** Rata-rata RGB untuk campuran yang tidak ada di tabel (tetap tampil sebagai warna baru). */
function blend(a: string, b: string) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x
    .map((v, i) =>
      Math.round((v + y[i]!) / 2)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

/** Laboratorium warna: ketuk dua pot cat, lihat hasil campurannya di mangkuk. */
function MixLab({ item, onDone }: RoundProps<LabData>) {
  const { target, pots, instr } = item.data;
  const [picked, setPicked] = useState<ColorName[]>([]);
  const [bowl, setBowl] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const [done, setDone] = useState(false);

  useSpeakOnMount(item.speak);

  const tap = (c: ColorName) => {
    if (done || picked.length >= 2) return;
    const next = [...picked, c];
    setPicked(next);
    setBowl(NAMED_COLORS[c]);
    if (next.length < 2) return;
    const res = mixColors(next[0]!, next[1]!);
    setBowl(res ? NAMED_COLORS[res] : blend(NAMED_COLORS[next[0]!], NAMED_COLORS[next[1]!]));
    if (res === target) {
      setDone(true);
      void feedback
        .correct(madeColor(res))
        .then(() => onDone({ firstTry: tries === 0, attempts: tries + 1 }));
      return;
    }
    setTries((t) => t + 1);
    void speakSequence([res ? madeColor(res) : PHRASES.baru, PHRASES.lagi]);
    window.setTimeout(() => {
      setPicked([]);
      setBowl(null);
    }, 2200);
  };

  return (
    <div className="round">
      <InstructionBar
        text={item.label ?? item.speak}
        speakText={item.speak}
        cue={<Visual v={instr} />}
      />
      <div className="mix-bowl" aria-label="Mangkuk campuran">
        <svg viewBox="0 0 100 70" aria-hidden="true">
          <path
            d="M6 20 H94 Q90 66 50 66 Q10 66 6 20 Z"
            fill="#FFFFFF"
            stroke="#9AA1AB"
            strokeWidth={3}
          />
          {bowl && <ellipse cx={50} cy={24} rx={40} ry={9} fill={bowl} className="mix-paint" />}
        </svg>
      </div>
      <div className="mix-pots">
        {pots.map((c) => (
          <button
            key={c}
            type="button"
            className={`mix-pot ${picked.includes(c) ? 'is-picked' : ''}`}
            onClick={() => tap(c)}
            aria-label={`cat ${c}`}
            data-color={c}
            disabled={done}
          >
            <Visual v={{ t: 'swatch', c }} />
            <span>{c}</span>
          </button>
        ))}
      </div>
      <p className="muted mix-hint" onClick={() => void speak(PHRASES.pilihDua)}>
        {PHRASES.pilihDua}
      </p>
    </div>
  );
}

export function Round(props: RoundProps<Data>) {
  const d = props.item.data;
  if (d.mode === 'campur') return <MixLab {...(props as RoundProps<LabData>)} />;
  return <OptionQuizRound {...(props as RoundProps<OptionQuizData>)} />;
}
