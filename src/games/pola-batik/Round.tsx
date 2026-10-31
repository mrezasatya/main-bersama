import { useState } from 'react';
import { IconPlay } from '../../core/art/icons';
import { speak } from '../../core/audio';
import { BigButton, InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { OptionQuizRound, type OptionQuizData } from '../../core/ui/OptionQuiz';
import { Visual } from '../../core/visual/Visual';
import { visualLabel, type Visual as VisualSpec } from '../../core/visual/types';
import type { RoundProps } from '../../types';
import { PHRASES } from './phrases';

interface CreateData {
  mode: 'buat';
  palette: VisualSpec[];
  tileSay: string[];
}
export type PolaData = CreateData | (OptionQuizData & { mode?: undefined });

const SLOTS = 8;
const MIN_TO_FINISH = 6;

/** Kreasi bebas (Finlandia): susun motif menjadi pola sendiri; ketuk motif di jalur untuk menghapusnya. */
function CreatePattern({ item, onDone }: RoundProps<CreateData>) {
  const { palette, tileSay } = item.data;
  const [row, setRow] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  useSpeakOnMount(item.speak);
  return (
    <div className="round">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <div className="pattern-strip" aria-label={`${row.length} motif`}>
        {Array.from({ length: SLOTS }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`pattern-cell ${row[i] !== undefined ? 'is-filled' : ''}`}
            onClick={() => !done && row[i] !== undefined && setRow(row.filter((_, j) => j !== i))}
            aria-label={row[i] !== undefined ? `hapus ${tileSay[row[i]!]}` : 'kosong'}
          >
            {row[i] !== undefined && <Visual v={palette[row[i]!]!} />}
          </button>
        ))}
      </div>
      <div className="seq-pool">
        {palette.map((v, i) => (
          <button
            key={i}
            type="button"
            className="seq-tile"
            disabled={done || row.length >= SLOTS}
            onClick={() => {
              setRow([...row, i]);
              void speak(tileSay[i] ?? '');
            }}
            aria-label={visualLabel(v)}
          >
            <Visual v={v} />
          </button>
        ))}
      </div>
      {row.length >= MIN_TO_FINISH && !done && (
        <BigButton
          icon={<IconPlay />}
          onClick={() => {
            setDone(true);
            void feedback
              .correct(PHRASES.indah)
              .then(() => onDone({ firstTry: true, attempts: 1 }));
          }}
        >
          Selesai
        </BigButton>
      )}
    </div>
  );
}

export function Round(props: RoundProps<PolaData>) {
  if (props.item.data.mode === 'buat')
    return <CreatePattern {...(props as RoundProps<CreateData>)} />;
  return <OptionQuizRound {...(props as RoundProps<OptionQuizData>)} />;
}
