import type { RoundProps } from '../../types';
import { OptionQuizRound, type OptionQuizData } from './OptionQuiz';
import { SequenceRound, type SequenceData } from './SequenceRound';

export type MixedData = (OptionQuizData & { mode?: undefined }) | (SequenceData & { mode: 'urut' });

/** Permainan yang mencampur ronde "pilih" dan ronde "urutkan" (data.mode = 'urut'). */
export function MixedRound(props: RoundProps<MixedData>) {
  const d = props.item.data;
  if (d.mode === 'urut') return <SequenceRound {...(props as RoundProps<SequenceData>)} />;
  return <OptionQuizRound {...(props as RoundProps<OptionQuizData>)} />;
}
