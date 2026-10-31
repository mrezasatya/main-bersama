import { MixedRound, type MixedData } from '../../core/ui/MixedRound';
import type { RoundProps } from '../../types';

/** Pilih gelembung yang tepat, atau pecahkan gelembung sesuai urutan. */
export function Round(props: RoundProps<MixedData>) {
  return (
    <div className="bubbles">
      <MixedRound {...props} />
    </div>
  );
}
