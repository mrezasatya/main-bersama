import { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { BreakReminder } from './BreakReminder';
import GamePage from './GamePage';
import { Loading } from './Loading';
import { useAppSession } from './session';
import { StartScreen } from './StartScreen';

const Album = lazy(() => import('../pages/Album'));
const Pendamping = lazy(() => import('../pages/Pendamping'));
const UjiSuara = lazy(() => import('../pages/UjiSuara'));
const Tinjau = lazy(() => import('../pages/Tinjau'));
const Galeri = import.meta.env.DEV ? lazy(() => import('../pages/Galeri')) : null;

export function App() {
  const started = useAppSession((s) => s.started);
  if (!started) return <StartScreen />;

  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main/:slug" element={<GamePage />} />
          <Route path="/album" element={<Album />} />
          <Route path="/pendamping" element={<Pendamping />} />
          <Route path="/pendamping/uji-suara" element={<UjiSuara />} />
          <Route path="/pendamping/tinjau" element={<Tinjau />} />
          {Galeri && <Route path="/dev/galeri" element={<Galeri />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <BreakReminder />
    </HashRouter>
  );
}
