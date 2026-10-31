import { useCallback, useEffect, useMemo } from 'react';
import { playEffect, sfx as sounds, speak, speakSequence } from '../audio';
import { ENGINE_CONFIG, shuffle } from '../engine';
import { Visual } from '../visual/Visual';
import { visualLabel, type Visual as VisualSpec } from '../visual/types';
import type { RoundProps } from '../../types';
import type { ArtKey } from '../art/keys';
import { ChoiceGrid } from './ChoiceGrid';
import { CountableGroup } from './CountableGroup';
import { InstructionBar } from './InstructionBar';

export interface OptionQuizData {
  /** Petunjuk besar di atas pilihan (mis. kelompok buah yang dihitung). */
  cue?: VisualSpec;
  /** Ikon kecil di bilah instruksi. */
  instr?: VisualSpec;
  /** Pilihan; indeks 0 = jawaban. Urutan berikutnya = pengecoh dari yang paling mudah dibedakan. */
  options: VisualSpec[];
  /** Label teks pilihan (untuk usia 5-6 atau bila showLabels). */
  labels?: string[];
  showLabels?: boolean;
  /** Tanggapan khusus bila pilihan tertentu dipilih (mis. akibat dalam cerita). */
  optionSay?: (string | null)[];
  /** Kalimat setelah benar. */
  speakAlso?: string[];
  /** Efek Web Audio saat benar. */
  sfx?: string;
  /** Jumlah pilihan maksimum (bawaan: menurut usia). */
  maxOptions?: number;
  /** Jumlah pilihan minimum (mis. "cari yang beda" butuh 3). */
  minOptions?: number;
  /** Kelompok benda yang dihitung dengan mengetuk (tahap konkret), menggantikan cue. */
  countable?: { t: 'group'; k: ArtKey; n: number };
  layout?: 'grid' | 'bubbles';
}

/**
 * Mesin umum "lihat/dengar lalu pilih" berbasis visual deklaratif.
 * Dipakai banyak permainan; isi konten saja yang berbeda.
 */
export function OptionQuizRound({ item, ageGroup, onDone }: RoundProps<OptionQuizData>) {
  const d = item.data;
  const n = Math.min(
    d.options.length,
    d.maxOptions ?? 99,
    Math.max(d.minOptions ?? 2, ENGINE_CONFIG.choiceCount[ageGroup]),
  );
  const choices = useMemo(
    () =>
      shuffle(d.options.slice(0, n).map((v, i) => ({ v, i }))).map(({ v, i }) => ({
        id: String(i),
        ariaLabel: d.labels?.[i] ?? visualLabel(v),
        label: d.labels?.[i],
        node: <Visual v={v} />,
      })),
    [d.options, d.labels, n],
  );

  const prompt = useCallback(() => void speak(item.speak), [item.speak]);
  useEffect(() => {
    const t = window.setTimeout(prompt, 350);
    return () => window.clearTimeout(t);
  }, [prompt]);

  return (
    <div className="round">
      <InstructionBar
        text={item.label ?? item.speak}
        speakText={item.speak}
        cue={d.instr ? <Visual v={d.instr} /> : undefined}
      />
      {d.countable ? (
        <CountableGroup k={d.countable.k} n={d.countable.n} />
      ) : (
        d.cue && (
          <div className={`quiz-cue quiz-cue-${d.cue.t}`}>
            <Visual v={d.cue} />
          </div>
        )
      )}
      <div className={d.layout === 'bubbles' ? 'bubbles' : undefined}>
        <ChoiceGrid
          choices={choices}
          targetId="0"
          onDone={onDone}
          retryHint={item.speak}
          correctSay={d.speakAlso?.length ? d.speakAlso : undefined}
          onCorrect={() => d.sfx && playEffect(d.sfx)}
          onWrong={(id) => {
            const say = d.optionSay?.[Number(id)];
            if (!say) return false;
            sounds.tryAgain();
            void speakSequence([say]);
            return true;
          }}
          // Label hanya ditampilkan bila SEMUA pilihan berlabel, agar tidak membocorkan jawaban.
          showLabels={(d.showLabels || ageGroup === 'C') && (d.labels?.length ?? 0) >= n}
        />
      </div>
    </div>
  );
}
