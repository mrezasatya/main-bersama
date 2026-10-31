import { useMemo } from 'react';
import { Art } from '../../core/art/registry';
import type { ArtKey } from '../../core/art/keys';
import { shuffle } from '../../core/engine';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { DragBoard } from '../../core/ui/DragBoard';
import type { RoundProps } from '../../types';

export interface PuzzleData {
  art: ArtKey;
  cols: number;
  rows: number;
  speakAlso?: string[];
}

/** Potongan gambar: SVG bersarang dengan viewBox yang memotong bagian tertentu. */
function Piece({
  art,
  c,
  r,
  cols,
  rows,
}: {
  art: ArtKey;
  c: number;
  r: number;
  cols: number;
  rows: number;
}) {
  const w = 100 / cols;
  const h = 100 / rows;
  return (
    <svg viewBox={`${c * w} ${r * h} ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <rect x={c * w} y={r * h} width={w} height={h} fill="#FFFFFF" />
      <svg x={0} y={0} width={100} height={100} viewBox="0 0 100 100">
        <Art k={art} />
      </svg>
    </svg>
  );
}

export function Round({ item, ageGroup, onDone }: RoundProps<PuzzleData>) {
  const { art, cols, rows } = item.data;
  const cells = useMemo(
    () =>
      Array.from({ length: cols * rows }, (_, i) => ({ i, c: i % cols, r: Math.floor(i / cols) })),
    [cols, rows],
  );
  const pieces = useMemo(
    () =>
      shuffle(cells).map(({ i, c, r }) => ({
        id: `p${i}`,
        label: `keping ${i + 1}`,
        node: <Piece art={art} c={c} r={r} cols={cols} rows={rows} />,
      })),
    [cells, art, cols, rows],
  );
  const targets = cells.map(({ i }) => ({
    id: `t${i}`,
    accepts: `p${i}`,
    label: `tempat ${i + 1}`,
    node: null,
  }));

  useSpeakOnMount(item.speak);

  return (
    <div className="round puzzle" style={{ '--pa': `${rows} / ${cols}` } as React.CSSProperties}>
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <DragBoard
        pieces={pieces}
        targets={targets}
        grid={{ cols, rows }}
        ghost={ageGroup === 'C' && cols * rows > 9 ? undefined : <Art k={art} />}
        onMiss={() => feedback.tryAgain()}
        onComplete={(mistakes) =>
          void feedback
            .correct(item.data.speakAlso)
            .then(() => onDone({ firstTry: mistakes === 0, attempts: mistakes + 1 }))
        }
      />
    </div>
  );
}
