import { useState } from 'react';
import { speak } from '../../core/audio';
import { InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import { OptionQuizRound, type OptionQuizData } from '../../core/ui/OptionQuiz';
import { Visual } from '../../core/visual/Visual';
import type { Visual as VisualSpec } from '../../core/visual/types';
import type { RoundProps } from '../../types';
import { PHRASES } from './phrases';

interface PayData {
  mode: 'bayar';
  item: VisualSpec;
  price: number;
  wallet: number[];
  speakAlso?: string[];
}
export type TokoData = PayData | (OptionQuizData & { mode?: undefined });

const rp = (v: number) => `Rp${v.toLocaleString('id-ID')}`;

/** Bermain kasir: ketuk uang di dompet sampai jumlahnya pas; ketuk uang yang sudah dibayar untuk mengambilnya kembali. */
function Pay({ item, onDone }: RoundProps<PayData>) {
  const { price, wallet } = item.data;
  const [paid, setPaid] = useState<number[]>([]);
  const [over, setOver] = useState(0);
  const [done, setDone] = useState(false);
  const total = paid.reduce((a, b) => a + b, 0);
  useSpeakOnMount(item.speak);

  const add = (v: number) => {
    if (done) return;
    const next = [...paid, v];
    const sum = total + v;
    setPaid(next);
    if (sum === price) {
      setDone(true);
      void feedback
        .correct(item.data.speakAlso)
        .then(() => onDone({ firstTry: over === 0, attempts: over + 1 }));
    } else if (sum > price) {
      setOver((o) => o + 1);
      feedback.tryAgain();
      void speak(PHRASES.lebih);
    }
  };

  return (
    <div className="round">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <div className="shop">
        <div className="shop-item">
          <Visual v={item.data.item} />
          <span className="price-tag">{rp(price)}</span>
        </div>
        <div className={`shop-paid ${total > price ? 'is-over' : ''}`} aria-live="polite">
          <span className="shop-total">Dibayar: {rp(total)}</span>
          <span className="shop-coins">
            {paid.map((v, i) => (
              <button
                key={i}
                type="button"
                className="paid-money"
                aria-label={`ambil kembali ${rp(v)}`}
                disabled={done}
                onClick={() => setPaid(paid.filter((_, j) => j !== i))}
              >
                <Visual v={{ t: 'money', v }} />
              </button>
            ))}
          </span>
        </div>
      </div>
      <div className="wallet" aria-label="Dompet">
        {wallet.map((v) => (
          <button
            key={v}
            type="button"
            className="wallet-money"
            onClick={() => add(v)}
            disabled={done}
            aria-label={`bayar ${rp(v)}`}
            data-money={v}
          >
            <Visual v={{ t: 'money', v }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Round(props: RoundProps<TokoData>) {
  if (props.item.data.mode === 'bayar') return <Pay {...(props as RoundProps<PayData>)} />;
  return <OptionQuizRound {...(props as RoundProps<OptionQuizData>)} />;
}
