import { useMemo } from 'react';
import { shuffle } from '../../core/engine';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { DragBoard } from '../../core/ui/DragBoard';
import { Visual } from '../../core/visual/Visual';
import { visualLabel, type Visual as VisualSpec } from '../../core/visual/types';
import type { AgeGroup, RoundProps } from '../../types';

export interface SortData {
  bins: { label: string; icon: VisualSpec }[];
  items: { v: VisualSpec; bin: number }[];
}

const PER_BIN: Record<AgeGroup, number> = { A: 2, B: 3, C: 3 };

/** Kelompokkan: seret (atau ketuk lalu ketuk) setiap benda ke wadah yang sesuai aturannya. */
export function Round({ item, ageGroup, onDone }: RoundProps<SortData>) {
  const { bins, items } = item.data;
  const per = bins.length === 2 && ageGroup === 'C' ? 4 : PER_BIN[ageGroup];
  const { pieces, targets } = useMemo(() => {
    const chosen = bins.flatMap((_, b) =>
      items
        .map((x, i) => ({ ...x, i }))
        .filter((x) => x.bin === b)
        .slice(0, per),
    );
    return {
      pieces: shuffle(chosen).map(({ v, i }) => ({
        id: `p${i}`,
        label: visualLabel(v),
        node: <Visual v={v} />,
      })),
      targets: bins.map((b, bi) => ({
        id: `b${bi}`,
        multi: true,
        accepts: chosen.filter((x) => x.bin === bi).map((x) => `p${x.i}`),
        label: `wadah ${b.label}`,
        node: (
          <>
            <Visual v={b.icon} />
            <span>{b.label}</span>
          </>
        ),
      })),
    };
  }, [bins, items, per]);

  useSpeakOnMount(item.speak);

  return (
    <div className="round sort">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <DragBoard
        pieces={pieces}
        targets={targets}
        onMiss={() => feedback.tryAgain()}
        onComplete={(mistakes) =>
          void feedback
            .correct()
            .then(() => onDone({ firstTry: mistakes === 0, attempts: mistakes + 1 }))
        }
      />
    </div>
  );
}
