import { OptionQuizRound, type OptionQuizData } from '../../core/ui/OptionQuiz';
import { SequenceRound, type SequenceData } from '../../core/ui/SequenceRound';
import type { RoundProps } from '../../types';

type Data = (OptionQuizData & { mode?: undefined }) | (SequenceData & { mode: 'urut' });

/** Dua jenis ronde: pilih gelembung yang tepat, atau pecahkan gelembung sesuai urutan. */
export function Round(props: RoundProps<unknown>) {
  const d = props.item.data as Data;
  if (d.mode === 'urut')
    return (
      <div className="bubbles">{<SequenceRound {...(props as RoundProps<SequenceData>)} />}</div>
    );
  return <OptionQuizRound {...(props as RoundProps<OptionQuizData>)} />;
}
