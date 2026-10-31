import { useCallback, useEffect, useMemo } from 'react';
import { Art, ThingArt, isArtKey } from '../art';
import { playEffect, speak } from '../audio';
import { ENGINE_CONFIG, shuffle } from '../engine';
import type { ContentItem, RoundProps } from '../../types';
import { ChoiceGrid } from './ChoiceGrid';
import { InstructionBar } from './InstructionBar';

export interface PictureQuizData {
  /** id item lain di bank yang sama, urut dari paling mudah dibedakan. */
  distractors: string[];
  /** Efek Web Audio (core/audio/effects). */
  sfx?: string;
  /** Putar efek bersama pertanyaan (soal "dengar bunyinya"). */
  promptSfx?: boolean;
  /** Kalimat setelah benar, mis. "Kambing berbunyi mbeek mbeek!". */
  speakAlso?: string[];
}

/**
 * Ronde "dengar lalu pilih gambar" yang dipakai beberapa permainan.
 * Pilihan pengecoh diambil dari bank konten yang sama lewat data.distractors.
 */
export function makePictureQuiz(bank: readonly ContentItem<PictureQuizData>[]) {
  const byId = new Map(bank.map((it) => [it.id, it]));

  return function PictureQuizRound({ item, ageGroup, onDone }: RoundProps<PictureQuizData>) {
    const { distractors, sfx, promptSfx, speakAlso } = item.data;

    const choices = useMemo(() => {
      const others = distractors
        .map((id) => byId.get(id))
        .filter((x): x is ContentItem<PictureQuizData> => !!x)
        .slice(0, ENGINE_CONFIG.choiceCount[ageGroup] - 1);
      return shuffle([item, ...others]).map((it) => ({
        id: it.id,
        ariaLabel: it.label ?? it.id,
        label: it.label,
        node: isArtKey(it.assetKey) ? <Art k={it.assetKey} /> : null,
      }));
    }, [item, distractors, ageGroup]);

    const prompt = useCallback(() => {
      if (promptSfx && sfx) {
        playEffect(sfx);
        window.setTimeout(() => void speak(item.speak), 900);
      } else void speak(item.speak);
    }, [promptSfx, sfx, item.speak]);

    useEffect(() => {
      const t = window.setTimeout(prompt, 350);
      return () => window.clearTimeout(t);
    }, [prompt]);

    return (
      <div className="round">
        <InstructionBar
          text={item.speak}
          onReplay={prompt}
          cue={<ThingArt k={promptSfx ? 'telinga' : 'mata'} />}
        />
        <ChoiceGrid
          choices={choices}
          targetId={item.id}
          onDone={onDone}
          retryHint={item.speak}
          correctSay={speakAlso?.length ? speakAlso : undefined}
          onCorrect={() => sfx && playEffect(sfx)}
        />
      </div>
    );
  };
}
