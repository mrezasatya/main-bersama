import { useMemo, useState } from 'react';
import { Art, ThingArt, isArtKey } from '../../core/art';
import { sfx, speakSequence } from '../../core/audio';
import { ENGINE_CONFIG, shuffle } from '../../core/engine';
import { ChoiceGrid, InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import type { RoundProps } from '../../types';
import { Figure } from './Figure';
import { ORGAN_LABEL, PARTS, thatIs, type PartKey } from './parts';
import type { IndraData } from './types';

const HINT_AFTER = 2;

function Tunjuk({ item, onDone }: RoundProps<IndraData>) {
  const part = item.data.mode === 'tunjuk' ? item.data.part : 'mata';
  const [attempts, setAttempts] = useState(0);
  const [miss, setMiss] = useState<PartKey | null>(null);
  const [solved, setSolved] = useState(false);

  const tap = (p: PartKey) => {
    if (solved) return;
    const n = attempts + 1;
    setAttempts(n);
    if (p === part) {
      setSolved(true);
      void feedback.correct().then(() => onDone({ firstTry: n === 1, attempts: n }));
      return;
    }
    // Menunjuk bagian lain: sebut namanya, lalu ulangi pertanyaan.
    setMiss(p);
    window.setTimeout(() => setMiss(null), 700);
    sfx.tryAgain();
    void speakSequence([thatIs(p), item.speak]);
  };

  return (
    <>
      <InstructionBar text={item.speak} cue={<ThingArt k="tangan" />} />
      <Figure
        view={PARTS[part].view}
        target={part}
        solved={solved}
        hint={attempts >= HINT_AFTER}
        miss={miss}
        onTap={tap}
      />
    </>
  );
}

function Indra({ item, ageGroup, onDone }: RoundProps<IndraData>) {
  const d = item.data.mode === 'indra' ? item.data : null;
  const choices = useMemo(() => {
    if (!d) return [];
    const opts = [d.organ, ...d.distractors.slice(0, ENGINE_CONFIG.choiceCount[ageGroup] - 1)];
    return shuffle(opts).map((o) => ({
      id: o,
      ariaLabel: ORGAN_LABEL[o],
      label: ORGAN_LABEL[o],
      node: <ThingArt k={o} />,
    }));
  }, [d, ageGroup]);
  if (!d) return null;
  return (
    <>
      <InstructionBar
        text={item.speak}
        cue={isArtKey(item.assetKey) ? <Art k={item.assetKey} /> : undefined}
      />
      <ChoiceGrid
        choices={choices}
        targetId={d.organ}
        onDone={onDone}
        retryHint={item.speak}
        correctSay={d.speakAlso}
        showLabels={ageGroup === 'C'}
      />
    </>
  );
}

export function Round(props: RoundProps<IndraData>) {
  useSpeakOnMount(props.item.speak);
  return (
    <div className="round">
      {props.item.data.mode === 'tunjuk' ? <Tunjuk {...props} /> : <Indra {...props} />}
    </div>
  );
}
