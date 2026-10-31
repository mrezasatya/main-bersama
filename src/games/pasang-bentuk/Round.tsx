import { useMemo } from 'react';
import { speak } from '../../core/audio';
import { ENGINE_CONFIG, shuffle } from '../../core/engine';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { DragBoard } from '../../core/ui/DragBoard';
import { Visual } from '../../core/visual/Visual';
import type { Visual as VisualSpec } from '../../core/visual/types';
import type { RoundProps } from '../../types';

export interface PasangData {
  pieces: VisualSpec[];
  tileSay: string[];
}

/** Seret setiap benda ke bayangannya (siluet). Ketuk-lalu-ketuk juga bisa. */
export function Round({ item, ageGroup, onDone }: RoundProps<PasangData>) {
  const n = Math.min(
    item.data.pieces.length,
    ENGINE_CONFIG.choiceCount[ageGroup] + (ageGroup === 'C' ? 0 : 0),
  );
  const { pieces, targets } = useMemo(() => {
    const list = item.data.pieces
      .slice(0, n)
      .map((v, i) => ({ v, i, name: item.data.tileSay[i] ?? '' }));
    return {
      pieces: shuffle(list).map(({ v, i, name }) => ({
        id: `p${i}`,
        label: name,
        node: <Visual v={v} />,
      })),
      targets: shuffle(list).map(({ v, i, name }) => ({
        id: `t${i}`,
        accepts: `p${i}`,
        label: `bayangan ${name}`,
        node: (
          <div className="v-silhouette" style={{ width: '100%', height: '100%' }}>
            <Visual v={v} />
          </div>
        ),
      })),
    };
  }, [item.data, n]);

  useSpeakOnMount(item.speak);

  return (
    <div className="round">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <DragBoard
        pieces={pieces}
        targets={targets}
        onPlaced={(id) => void speak(item.data.tileSay[Number(id.slice(1))] ?? '')}
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
