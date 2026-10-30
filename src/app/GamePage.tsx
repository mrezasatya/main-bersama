import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { findGame } from '../games/registry';
import { Loading } from './Loading';

const cache = new Map<string, LazyExoticComponent<ComponentType>>();

export default function GamePage() {
  const { slug = '' } = useParams();
  const game = findGame(slug);
  if (!game) return <Navigate to="/" replace />;

  let Game = cache.get(slug);
  if (!Game) {
    Game = lazy(game.load);
    cache.set(slug, Game);
  }
  return (
    <Suspense fallback={<Loading />}>
      <Game />
    </Suspense>
  );
}
