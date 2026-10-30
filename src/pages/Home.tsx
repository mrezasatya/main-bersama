import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconAlbum, IconParent, IconStar } from '../core/art/icons';
import { speak } from '../core/audio';
import { useTotalStars } from '../core/progress';
import { BigButton, HoldButton } from '../core/ui';
import { GAMES } from '../games/registry';

// Gambar sampul dimuat terpisah agar registri semua gambar tidak masuk bundle awal.
const CoverArt = lazy(() => import('./CoverArt'));

export default function Home() {
  const navigate = useNavigate();
  const stars = useTotalStars();

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

      <main className="game-grid">
        {GAMES.map(({ meta, cover }) => (
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
                <CoverArt art={cover.art} color={cover.color} />
              </Suspense>
            </div>
            <span className="game-card-title">{meta.title}</span>
          </button>
        ))}
      </main>
    </div>
  );
}
