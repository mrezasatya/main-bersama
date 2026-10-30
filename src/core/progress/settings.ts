import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AgeGroup } from '../../types';
import { safeStorage } from './storage';

export interface Settings {
  ageGroup: AgeGroup | null;
  /** 0-1, untuk ucapan dan nada. */
  volume: number;
  /** Kecepatan bicara; 0.8-0.9 nyaman untuk anak. */
  speechRate: number;
  /** voiceURI pilihan pendamping; null = pilih otomatis. */
  voiceURI: string | null;
  breakReminder: boolean;
  breakMinutes: number;
  /** Menampilkan daftar konten yang perlu ditinjau. */
  reviewMode: boolean;
}

interface SettingsStore extends Settings {
  update: (patch: Partial<Settings>) => void;
}

export const DEFAULT_SETTINGS: Settings = {
  ageGroup: null,
  volume: 0.8,
  speechRate: 0.85,
  voiceURI: null,
  breakReminder: true,
  breakMinutes: 20,
  reviewMode: false,
};

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      update: (patch) => set(patch),
    }),
    {
      name: 'mb-settings',
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      partialize: ({ update: _update, ...rest }) => rest,
    },
  ),
);

/** Nilai saat ini di luar komponen React (mis. dari core/audio). */
export const getSettings = (): Settings => useSettings.getState();
