import { useEffect, useState } from 'react';
import { rewardStars, sfx, speakSequence, stickerLine } from '../audio';
import { IconHome, IconRepeat } from '../art/icons';
import type { Sticker } from '../progress';
import { BigButton } from './BigButton';
import { StarRow } from './StarRow';
import { StickerCard } from './StickerCard';

/** Layar hadiah tampil maksimal 4 detik, lalu berganti ke pilihan berikutnya. */
export const REWARD_MS = 4000;

interface Props {
  stars: number;
  newStickers: Sticker[];
  onPlayAgain: () => void;
  onHome: () => void;
}

export function RewardScreen({ stars, newStickers, onPlayAgain, onHome }: Props) {
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    sfx.star();
    void speakSequence([rewardStars(stars), ...newStickers.map((s) => stickerLine(s.name))]);
    const t = window.setTimeout(() => setShowChoices(true), REWARD_MS);
    return () => window.clearTimeout(t);
  }, [stars, newStickers]);

  return (
    <div className="reward" role="dialog" aria-label="Hadiah" onClick={() => setShowChoices(true)}>
      <div className="reward-card">
        <h2>Hore! Kamu sudah mencoba!</h2>
        <StarRow earned={stars} animate />
        {newStickers.length > 0 && (
          <div className="reward-stickers">
            <p>Stiker baru!</p>
            <div className="reward-sticker-list">
              {newStickers.map((s) => (
                <StickerCard key={s.id} sticker={s} />
              ))}
            </div>
          </div>
        )}
        {showChoices ? (
          <div className="reward-actions">
            <BigButton icon={<IconRepeat />} onClick={onPlayAgain}>
              Main lagi
            </BigButton>
            <BigButton variant="soft" icon={<IconHome />} onClick={onHome}>
              Pilih permainan
            </BigButton>
          </div>
        ) : (
          <p className="reward-skip">Ketuk untuk lanjut</p>
        )}
      </div>
    </div>
  );
}
