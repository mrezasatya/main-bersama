import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AgeGroup, ContentItem, GameMeta, RoundProps, RoundResult } from '../../types';
import { stopSpeaking } from '../audio';
import { IconHome } from '../art/icons';
import { ENGINE_CONFIG, pickNext } from '../engine';
import {
  newlyUnlocked,
  sessionStars,
  totalStars,
  useProgress,
  useSettings,
  type Sticker,
} from '../progress';
import { BigButton } from './BigButton';
import { RewardScreen } from './RewardScreen';

interface Props<D> {
  meta: GameMeta;
  content: ContentItem<D>[];
  Round: ComponentType<RoundProps<D>>;
}

interface Reward {
  stars: number;
  stickers: Sticker[];
}

/**
 * Kerangka sesi yang sama untuk semua permainan: memilih item lewat mesin adaptif,
 * mencatat hasil, menampilkan layar hadiah, dan menyediakan tombol Berhenti.
 */
export function GameSession<D>({ meta, content, Round }: Props<D>) {
  const navigate = useNavigate();
  const age: AgeGroup = useSettings((s) => s.ageGroup) ?? 'A';
  const sessionLength = ENGINE_CONFIG.sessionLength[age];

  const [item, setItem] = useState<ContentItem<D> | null>(null);
  const [round, setRound] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [reward, setReward] = useState<Reward | null>(null);
  const level = useProgress((s) => s.getAdaptive(meta.id, age).level);
  const finished = useRef(false);

  const next = useCallback(() => {
    const st = useProgress.getState();
    const { level: lvl } = st.getAdaptive(meta.id, age);
    const picked = pickNext(content, age, lvl, st.games[meta.id]?.seen ?? []);
    st.setSeen(meta.id, picked.seen);
    setItem(picked.item);
    setRound((r) => r + 1);
  }, [content, age, meta.id]);

  const start = useCallback(() => {
    finished.current = false;
    setCompleted(0);
    setReward(null);
    next();
  }, [next]);

  useEffect(() => {
    start();
    return () => stopSpeaking();
  }, [start]);

  const finish = (done: number) => {
    if (finished.current) return null;
    finished.current = true;
    const st = useProgress.getState();
    const stars = sessionStars(done, sessionLength);
    const before = totalStars(st.games);
    st.finishSession(meta.id, stars);
    return { stars, stickers: newlyUnlocked(before, before + stars) };
  };

  const onDone = (result: RoundResult) => {
    useProgress.getState().recordRound(meta.id, age, result);
    const done = completed + 1;
    setCompleted(done);
    if (done >= sessionLength) {
      const r = finish(done);
      if (r) setReward(r);
    } else {
      next();
    }
  };

  const stop = () => {
    // Berhenti kapan saja tanpa rasa bersalah: usaha yang sudah dilakukan tetap dihitung.
    if (completed > 0) finish(completed);
    stopSpeaking();
    navigate('/');
  };

  return (
    <div className="game">
      <header className="game-bar">
        <BigButton variant="ghost" size="md" icon={<IconHome />} onClick={stop}>
          Berhenti
        </BigButton>
        <h1 className="game-title">{meta.title}</h1>
        <div className="progress-dots" aria-label={`${completed} dari ${sessionLength}`}>
          {Array.from({ length: sessionLength }, (_, i) => (
            <span key={i} className={i < completed ? 'is-done' : ''} />
          ))}
        </div>
      </header>
      <main className="game-stage">
        {item && !reward && (
          <Round
            key={`${round}-${item.id}`}
            item={item}
            ageGroup={age}
            level={level}
            onDone={onDone}
          />
        )}
      </main>
      {reward && (
        <RewardScreen
          stars={reward.stars}
          newStickers={reward.stickers}
          onPlayAgain={start}
          onHome={() => navigate('/')}
        />
      )}
    </div>
  );
}
