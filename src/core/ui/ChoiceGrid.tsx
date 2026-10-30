import { useState, type ReactNode } from 'react';
import type { RoundResult } from '../../types';
import { feedback } from './feedback';

export interface Choice {
  id: string;
  node: ReactNode;
  /** Nama untuk pembaca layar dan tes. */
  ariaLabel: string;
  /** Teks pendukung di bawah gambar (muncul setelah benar, atau selalu bila showLabels). */
  label?: string;
}

interface Props {
  /** Sudah diacak oleh pemanggil (agar stabil antar-render). */
  choices: Choice[];
  targetId: string;
  onDone: (result: RoundResult) => void;
  /** Kalimat yang diulang setelah "Ayo coba lagi". */
  retryHint?: string;
  /** Kalimat saat benar (satu atau beberapa); bawaan pujian acak. */
  correctSay?: string | readonly string[];
  /** Dipanggil saat benar, sebelum suara (mis. efek bunyi hewan). */
  onCorrect?: () => void;
  /** Dipanggil saat salah; bila mengembalikan true, umpan balik bawaan dilewati. */
  onWrong?: (id: string) => boolean | void;
  showLabels?: boolean;
  /** Setelah sekian percobaan, jawaban benar diberi petunjuk berdenyut. */
  hintAfter?: number;
}

/**
 * Ronde pilihan bergambar: kontrol kesalahan mandiri (goyang lembut, pilihan yang sudah dicoba
 * memudar), petunjuk setelah beberapa percobaan, tanpa layar "salah".
 */
export function ChoiceGrid({
  choices,
  targetId,
  onDone,
  retryHint,
  correctSay,
  onCorrect,
  onWrong,
  showLabels = false,
  hintAfter = 2,
}: Props) {
  const [attempts, setAttempts] = useState(0);
  const [tried, setTried] = useState<string[]>([]);
  const [shaking, setShaking] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const choose = (id: string) => {
    if (solved) return;
    const n = attempts + 1;
    setAttempts(n);
    if (id === targetId) {
      setSolved(true);
      onCorrect?.();
      void feedback
        .correct(correctSay)
        .then(() => window.setTimeout(() => onDone({ firstTry: n === 1, attempts: n }), 250));
      return;
    }
    setTried((t) => (t.includes(id) ? t : [...t, id]));
    setShaking(id);
    window.setTimeout(() => setShaking(null), 500);
    if (!onWrong?.(id)) feedback.tryAgain(retryHint);
  };

  return (
    <div className={`choices choices-${choices.length}`}>
      {choices.map((c) => {
        const isTarget = c.id === targetId;
        const cls = [
          'choice',
          shaking === c.id && 'is-shaking',
          tried.includes(c.id) && 'is-tried',
          solved && isTarget && 'is-correct',
          !solved && isTarget && attempts >= hintAfter && 'is-hint',
        ]
          .filter(Boolean)
          .join(' ');
        const label = showLabels || (solved && isTarget) ? c.label : undefined;
        return (
          <button
            key={c.id}
            type="button"
            className={cls}
            onClick={() => choose(c.id)}
            aria-label={c.ariaLabel}
            data-choice={c.id}
            data-target={isTarget || undefined}
          >
            <span className="choice-art">{c.node}</span>
            {label && <span className="choice-label">{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
