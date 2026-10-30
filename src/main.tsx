import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-800.css';
import './app/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { registerPwa } from './app/pwa';
import { initVoices, loadClipManifest } from './core/audio';

// Cegah menu konteks (tekan lama) dan seret gambar di area anak.
document.addEventListener('contextmenu', (e) => {
  const t = e.target as HTMLElement | null;
  if (!t?.closest('input, textarea')) e.preventDefault();
});
document.addEventListener('dragstart', (e) => e.preventDefault());

initVoices();
void loadClipManifest();
void registerPwa();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
