import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconAlbum, IconParent, IconStar } from '../core/art/icons';
import { speak } from '../core/audio';
import { useSettings, useTotalStars } from '../core/progress';
import type { AgeGroup } from '../types';
import { BigButton, HoldButton } from '../core/ui';
import { GAMES } from '../games/registry';

// Gambar sampul dimuat terpisah agar registri semua gambar tidak masuk bundle awal.
const CoverArt = lazy(() => import('./CoverArt'));

const AGE_YEARS: Record<AgeGroup, [number, number]> = { A: [2, 3], B: [4, 4], C: [5, 6] };

export default function Home() {
  const navigate = useNavigate();
  const stars = useTotalStars();
  const age = useSettings((s) => s.ageGroup) ?? 'A';
  const [lo, hi] = AGE_YEARS[age];
  const fits = (g: (typeof GAMES)[number]) => g.meta.ageMin <= hi && g.meta.ageMax >= lo;
  const mine = GAMES.filter(fits);
  const others = GAMES.filter((g) => !fits(g));
  const card = ({ meta, cover }: (typeof GAMES)[number]) => (
    <button
      key={meta.id}
      type="button"
      className="game-card"
      onClick={() => {
        void speak(meta.title);
        navigate(`/main/${meta.id}`);
      }}
    >
      <div className="game-card-art">
        <Suspense fallback={null}>
          <CoverArt v={cover} />
        </Suspense>
      </div>
      <span className="game-card-title">{meta.title}</span>
    </button>
  );

  return (
    <div className="page home">
      <header className="home-bar">
        <div className="star-count" aria-label={`${stars} bintang`}>
          <IconStar />
          <span>{stars}</span>
        </div>
        <h1 className="home-title">Main Bersama</h1>
        <div className="home-actions">
          <BigButton
            variant="soft"
            size="md"
            icon={<IconAlbum />}
            onClick={() => navigate('/album')}
          >
            Album
          </BigButton>
          <HoldButton
            icon={<IconParent />}
            label="Pendamping"
            onHold={() => navigate('/pendamping')}
          />
        </div>
      </header>

      <main className="game-grid">{mine.map(card)}</main>
      {others.length > 0 && (
        <>
          <h2 className="home-section">Permainan untuk usia lain</h2>
          <div className="game-grid is-other">{others.map(card)}</div>
        </>
      )}
    </div>
  );
}
