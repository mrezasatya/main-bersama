import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconPlay } from '../../core/art';
import { playNote, scaleFreqs, speak, speakSequence } from '../../core/audio';
import { BigButton, InstructionBar, feedback } from '../../core/ui';
import type { RoundProps } from '../../types';
import { Instrument } from './Instrument';
import { PHRASES } from './phrases';
import type { NadaData } from './types';

/** Ketukan bebas sebelum tombol lanjut muncul (usia 2-3) atau sebelum tantangan menirukan (4-6). */
const FREE_TAPS = 6;
const STEP_MS = 650;

type Phase = 'bebas' | 'dengar' | 'tiru';

/**
 * Eksplorasi bebas dulu (Finlandia), lalu untuk usia 4-6: dengarkan 3-4 nada dan tirukan.
 * Salah nada tidak dihukum; melodi diulang, dan setelah dua kali muncul petunjuk.
 */
export function Round({ item, ageGroup, onDone }: RoundProps<NadaData>) {
  const d = item.data;
  const count = ageGroup === 'A' ? Math.min(d.count, 5) : d.count;
  const freqs = useMemo(() => scaleFreqs(d.scale, d.base, count), [d.scale, d.base, count]);
  const melody = useMemo(
    () => d.melody.filter((m) => m < count).slice(0, ageGroup === 'C' ? 4 : 3),
    [d.melody, count, ageGroup],
  );

  const [phase, setPhase] = useState<Phase>('bebas');
  const [taps, setTaps] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState(0);
  const [tries, setTries] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const sound = useCallback(
    (i: number) => {
      playNote(d.timbre, freqs[i]!);
      setActive(i);
      later(() => setActive((a) => (a === i ? null : a)), 220);
    },
    [d.timbre, freqs],
  );

  const intro = useCallback(() => {
    void speakSequence(ageGroup === 'A' ? [item.speak] : [item.speak, ...d.speakAlso]);
  }, [ageGroup, item.speak, d.speakAlso]);

  useEffect(() => {
    const t = window.setTimeout(intro, 350);
    return () => window.clearTimeout(t);
  }, [intro]);

  const demo = useCallback(async () => {
    setPhase('dengar');
    setPos(0);
    await speak(PHRASES.dengar);
    melody.forEach((m, k) => later(() => sound(m), 300 + k * STEP_MS));
    later(
      () => {
        setPhase('tiru');
        void speak(PHRASES.giliran);
      },
      300 + melody.length * STEP_MS,
    );
  }, [melody, sound]);

  const play = (i: number) => {
    if (done || phase === 'dengar') return;
    sound(i);
    if (phase === 'bebas') {
      const n = taps + 1;
      setTaps(n);
      if (n === FREE_TAPS && ageGroup !== 'A' && melody.length > 0) later(() => void demo(), 900);
      return;
    }
    if (i === melody[pos]) {
      if (pos + 1 < melody.length) {
        setPos(pos + 1);
        return;
      }
      setDone(true);
      later(() => {
        void feedback.correct().then(() => onDone({ firstTry: tries === 0, attempts: tries + 1 }));
      }, 400);
      return;
    }
    // Nada berbeda: lembut, ulangi contohnya.
    setTries(tries + 1);
    setPos(0);
    feedback.tryAgain();
    later(() => void demo(), 1600);
  };

  const showNext =
    phase === 'bebas' && taps >= FREE_TAPS && (ageGroup === 'A' || melody.length === 0);
  const hint = phase === 'tiru' && tries >= 2 ? (melody[pos] ?? null) : null;
  const text = phase === 'bebas' ? item.speak : phase === 'dengar' ? 'Dengarkan…' : PHRASES.giliran;

  return (
    <div className="round">
      <InstructionBar
        text={text}
        onReplay={phase === 'bebas' ? intro : () => void demo()}
        cue={<span className="note-cue">♪</span>}
      />
      <Instrument
        layout={d.layout}
        color={d.color}
        count={count}
        active={active}
        hint={hint}
        disabled={done}
        onPlay={play}
        name={d.nama}
      />
      {phase === 'tiru' && (
        <div className="melody-dots" aria-label={`${pos} dari ${melody.length} nada`}>
          {melody.map((_, k) => (
            <span key={k} className={k < pos ? 'is-done' : ''} />
          ))}
        </div>
      )}
      {showNext && !done && (
        <BigButton
          icon={<IconPlay />}
          onClick={() => {
            setDone(true);
            void feedback.correct().then(() => onDone({ firstTry: true, attempts: 1 }));
          }}
        >
          Lanjut
        </BigButton>
      )}
    </div>
  );
}
