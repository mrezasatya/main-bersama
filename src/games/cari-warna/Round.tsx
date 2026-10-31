import { useMemo } from 'react';
import { Art, NAMED_COLORS, isArtKey } from '../../core/art';
import { ENGINE_CONFIG, shuffle } from '../../core/engine';
import { ChoiceGrid, InstructionBar, useSpeakOnMount } from '../../core/ui';
import type { RoundProps } from '../../types';
import type { CariWarnaData } from './types';

export function Round({ item, ageGroup, onDone }: RoundProps<CariWarnaData>) {
  const { target, distractors } = item.data;
  const shape = isArtKey(item.assetKey) ? item.assetKey : 'bola';
  const choices = useMemo(
    () =>
      shuffle([target, ...distractors.slice(0, ENGINE_CONFIG.choiceCount[ageGroup] - 1)]).map(
        (c) => ({
          id: c,
          ariaLabel: `${shape} ${c}`,
          node: <Art k={shape} color={NAMED_COLORS[c]} />,
        }),
      ),
    [target, distractors, ageGroup, shape],
  );

  useSpeakOnMount(item.speak);

  return (
    <div className="round">
      <InstructionBar
        text={item.label ?? item.speak}
        speakText={item.speak}
        cue={<span className="swatch" style={{ background: NAMED_COLORS[target] }} />}
      />
      <ChoiceGrid choices={choices} targetId={target} onDone={onDone} retryHint={item.speak} />
    </div>
  );
}
