import { useRef, useState } from 'react';
import { IconRepeat } from '../../core/art/icons';
import { BigButton, InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { TraceBoard } from '../../core/ui/TraceBoard';
import { TRACE_PASS, type TraceScore } from '../../core/ui/trace';
import { Visual } from '../../core/visual/Visual';
import type { Visual as VisualSpec } from '../../core/visual/types';
import type { RoundProps } from '../../types';

export interface TraceData {
  glyph?: string;
  path?: string;
  cue?: VisualSpec;
  speakAlso?: string[];
}

/** Menelusuri huruf/angka/jalur di papan pasir. Tidak ada "salah": coretan bisa dihapus dan diulang. */
export function TraceRound({ item, ageGroup, onDone }: RoundProps<TraceData>) {
  const d = item.data;
  const [resetKey, setResetKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const resets = useRef(0);
  const target = useRef({ glyph: d.glyph, path: d.path }).current;
  const pass = TRACE_PASS[ageGroup];

  useSpeakOnMount(item.speak);

  const onStroke = (s: TraceScore) => {
    if (done) return;
    setProgress(Math.min(1, s.coverage / pass));
    if (s.coverage >= pass) {
      setDone(true);
      void feedback
        .correct(d.speakAlso?.length ? d.speakAlso : undefined)
        .then(() => onDone({ firstTry: resets.current === 0, attempts: resets.current + 1 }));
    }
  };

  return (
    <div className="round">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <div className="trace-wrap">
        <TraceBoard target={target} onStroke={onStroke} done={done} resetKey={resetKey} />
        <div className="trace-side">
          {d.cue && ageGroup !== 'A' && (
            <div className="trace-cue">
              <Visual v={d.cue} />
            </div>
          )}
          <div className="trace-meter" aria-label={`${Math.round(progress * 100)} persen`}>
            <span style={{ width: `${progress * 100}%` }} />
          </div>
          <BigButton
            variant="soft"
            size="md"
            icon={<IconRepeat />}
            disabled={done}
            onClick={() => {
              resets.current += 1;
              setProgress(0);
              setResetKey((k) => k + 1);
            }}
          >
            Hapus
          </BigButton>
        </div>
      </div>
    </div>
  );
}
