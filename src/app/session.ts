import { create } from 'zustand';

/** Status sesi yang tidak disimpan: audio harus dibuka ulang setiap aplikasi dimuat. */
export const useAppSession = create<{ started: boolean; setStarted: (v: boolean) => void }>(
  (set) => ({ started: false, setStarted: (started) => set({ started }) }),
);
