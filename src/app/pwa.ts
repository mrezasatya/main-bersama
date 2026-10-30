import { create } from 'zustand';

interface PwaState {
  needRefresh: boolean;
  offlineReady: boolean;
  update: () => void;
}

export const usePwa = create<PwaState>(() => ({
  needRefresh: false,
  offlineReady: false,
  update: () => window.location.reload(),
}));

/** Mendaftarkan service worker. Pemberitahuan versi baru hanya tampil di halaman Pendamping. */
export async function registerPwa(): Promise<void> {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const { registerSW } = await import('virtual:pwa-register');
  const updateSW = registerSW({
    onNeedRefresh: () => usePwa.setState({ needRefresh: true }),
    onOfflineReady: () => usePwa.setState({ offlineReady: true }),
    onRegisteredSW: (_url, reg) => {
      if (!reg) return;
      // Periksa versi baru tiap jam selama aplikasi terbuka.
      window.setInterval(() => void reg.update(), 60 * 60 * 1000);
    },
  });
  usePwa.setState({ update: () => void updateSW(true) });
}
