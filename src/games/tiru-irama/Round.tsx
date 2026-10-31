import { useCallback, useEffect, useRef, useState } from 'react';
import { speak } from '../../core/audio';
import { InstructionBar, feedback } from '../../core/ui';
import type { RoundProps } from '../../types';
import { PHRASES } from './phrases';
import { matchRhythm, units } from './rhythm';
import { playBeat } from './playBeat';
import { BeatArt } from './sound';
import type { IramaData } from './types';

/** Setelah sekian percobaan, usaha anak tetap diterima (tidak ada "gagal"). */
const MAX_TRIES = 3;
const IDLE_MS = 2600;

type Phase = 'dengar' | 'tiru' | 'selesai';

export function Round({ item, ageGroup, onDone }: RoundProps<IramaData>) {
  const { beats, sound } = item.data;
  const unit = ageGroup === 'A' ? 620 : 500;
  const [phase, setPhase] = useState<Phase>('dengar');
  const [lit, setLit] = useState<number | null>(null);
  const [tapped, setTapped] = useState(0);
  const [hit, setHit] = useState(false);
  const times = useRef<number[]>([]);
  const tries = useRef(0);
  const timers = useRef<number[]>([]);
  const idle = useRef<number | null>(null);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearAll = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (idle.current) window.clearTimeout(idle.current);
  };
  useEffect(() => clearAll, []);

  const demo = useCallback(
    async (withIntro: boolean) => {
      clearAll();
      setPhase('dengar');
      setTapped(0);
      times.current = [];
      if (withIntro) await speak(item.speak);
      let t = 400;
      beats.forEach((b, i) => {
        later(() => {
          playBeat(sound);
          setLit(i);
        }, t);
        later(() => setLit((l) => (l === i ? null : l)), t + 250);
        t += units(b) * unit;
      });
      later(() => {
        setPhase('tiru');
        void speak(PHRASES.giliran);
      }, t + 200);
    },
    [beats, sound, unit, item.speak],
  );

  useEffect(() => {
    const t = window.setTimeout(() => void demo(true), 350);
    return () => window.clearTimeout(t);
  }, [demo]);

  const finish = (ok: boolean) => {
    tries.current += 1;
    if (ok || tries.current >= MAX_TRIES) {
      setPhase('selesai');
      void feedback
        .correct()
        .then(() => onDone({ firstTry: ok && tries.current === 1, attempts: tries.current }));
      return;
    }
    feedback.tryAgain(PHRASES.dengarLagi);
    later(() => void demo(false), 2200);
  };

  const tap = () => {
    if (phase !== 'tiru') return;
    playBeat(sound);
    setHit(true);
    window.setTimeout(() => setHit(false), 120);
    times.current.push(performance.now());
    const n = times.current.length;
    setTapped(n);
    if (idle.current) window.clearTimeout(idle.current);
    if (n >= beats.length) {
      later(() => finish(matchRhythm(beats, times.current, ageGroup !== 'A')), 300);
      return;
    }
    // Berhenti di tengah jalan: anggap selesai mencoba, ulangi contohnya.
    idle.current = window.setTimeout(() => finish(false), IDLE_MS);
  };

  return (
    <div className="round">
      <InstructionBar
        text={phase === 'tiru' ? PHRASES.giliran : item.speak}
        onReplay={() => void demo(true)}
        cue={<span className="note-cue">♫</span>}
      />
      <div className="beats" aria-label={`${beats.length} ketukan`}>
        {beats.map((b, i) => (
          <span
            key={i}
            className={[
              'beat',
              b === 'taa' && 'is-long',
              lit === i && 'is-lit',
              phase !== 'dengar' && i < tapped && 'is-done',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {ageGroup === 'C' ? b : ''}
          </span>
        ))}
      </div>
      <button
        type="button"
        className={`drum ${hit ? 'is-hit' : ''} ${phase === 'tiru' ? 'is-ready' : ''}`}
        onPointerDown={(e) => {
          e.preventDefault();
          tap();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') tap();
        }}
        aria-label="Ketuk di sini"
        disabled={phase === 'selesai'}
      >
        <BeatArt sound={sound} />
      </button>
    </div>
  );
}
