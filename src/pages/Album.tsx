import { useNavigate } from 'react-router-dom';
import { IconBack, IconStar } from '../core/art';
import { PHRASE } from '../core/audio';
import { STICKERS, starsToNextSticker, unlockedCount, useTotalStars } from '../core/progress';
import { BigButton, StickerCard, useSpeakOnMount } from '../core/ui';

export default function Album() {
  const navigate = useNavigate();
  const stars = useTotalStars();
  const open = unlockedCount(stars);
  const toNext = starsToNextSticker(stars);

  useSpeakOnMount(open > 0 ? PHRASE.albumHas : PHRASE.albumEmpty);

  return (
    <div className="page album">
      <header className="page-bar">
        <BigButton variant="ghost" size="md" icon={<IconBack />} onClick={() => navigate('/')}>
          Kembali
        </BigButton>
        <h1>Album Stiker</h1>
        <div className="star-count">
          <IconStar />
          <span>{stars}</span>
        </div>
      </header>
      <p className="album-note">
        {toNext === null
          ? 'Semua stiker sudah terkumpul!'
          : `${toNext} bintang lagi untuk stiker berikutnya.`}
      </p>
      <div className="sticker-grid">
        {STICKERS.map((s, i) => (
          <StickerCard key={s.id} sticker={s} locked={i >= open} />
        ))}
      </div>
    </div>
  );
}
