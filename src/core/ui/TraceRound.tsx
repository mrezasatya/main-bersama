import { useRef, useState } from 'react';
import { IconRepeat } from '../art/icons';
import { Art } from '../art/registry';
import type { ArtKey } from '../art/keys';
import { Visual } from '../visual/Visual';
import type { Visual as VisualSpec } from '../visual/types';
import type { RoundProps } from '../../types';
import { BigButton } from './BigButton';
import { InstructionBar } from './InstructionBar';
import { TraceBoard } from './TraceBoard';
import { TRACE_PASS, type TraceScore } from './trace';
import { feedback } from './feedback';
import { useSpeakOnMount } from './useSpeak';

/** Ikon di ujung jalur (koordinat 0-100). */
interface Endpoint {
  k: ArtKey;
  x: number;
  y: number;
}

export interface TraceData {
  glyph?: string;
  path?: string;
  cue?: VisualSpec;
  start?: Endpoint;
  end?: Endpoint;
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
  // Jalur tertutup (lingkaran, kotak): awal = akhir, cukup satu ikon.
  const closed = !!d.start && !!d.end && Math.hypot(d.start.x - d.end.x, d.start.y - d.end.y) < 6;
  const ends = closed ? [d.start] : [d.start, d.end];

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
        <div className="trace-stage">
          <TraceBoard target={target} onStroke={onStroke} done={done} resetKey={resetKey} />
          {ends.map(
            (p, i) =>
              p && (
                <span
                  key={i}
                  className={`trace-end ${i === 1 && done ? 'is-arrived' : ''}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-hidden="true"
                >
                  <Art k={p.k} />
                </span>
              ),
          )}
        </div>
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
