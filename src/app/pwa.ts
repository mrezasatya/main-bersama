import { create } from 'zustand';

export type CheckStatus = 'idle' | 'memeriksa' | 'terbaru' | 'ada' | 'gagal' | 'tidak-didukung';

interface PwaState {
  needRefresh: boolean;
  offlineReady: boolean;
  status: CheckStatus;
  update: () => void;
  /** Periksa versi baru sekarang (tombol di halaman Pendamping). */
  check: () => Promise<void>;
}

let registration: ServiceWorkerRegistration | null = null;

/** Menunggu service worker yang sedang dipasang selesai, lalu melapor apakah ada versi baru. */
function waitInstalled(reg: ServiceWorkerRegistration): Promise<boolean> {
  const sw = reg.installing;
  if (!sw) return Promise.resolve(!!reg.waiting);
  return new Promise((resolve) => {
    const done = () => resolve(!!reg.waiting || sw.state === 'installed');
    sw.addEventListener('statechange', () => {
      if (sw.state === 'installed' || sw.state === 'redundant' || sw.state === 'activated') done();
    });
    window.setTimeout(done, 15_000);
  });
}

export const usePwa = create<PwaState>((set) => ({
  needRefresh: false,
  offlineReady: false,
  status: 'idle',
  update: () => window.location.reload(),
  check: async () => {
    if (!registration) {
      set({ status: 'tidak-didukung' });
      return;
    }
    set({ status: 'memeriksa' });
    try {
      await registration.update();
      const hasNew = !!registration.waiting || (await waitInstalled(registration));
      set(hasNew ? { status: 'ada', needRefresh: true } : { status: 'terbaru' });
    } catch {
      set({ status: 'gagal' });
    }
  },
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
      registration = reg;
      // Periksa versi baru tiap jam, dan setiap kali aplikasi kembali dibuka dari latar
      // (aplikasi terpasang di iPad sering hanya "tidur", tidak benar-benar ditutup).
      window.setInterval(() => void reg.update().catch(() => undefined), 60 * 60 * 1000);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') void reg.update().catch(() => undefined);
      });
    },
  });
  usePwa.setState({ update: () => void updateSW(true) });
}
