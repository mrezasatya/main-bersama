import type { StateStorage } from 'zustand/middleware';

const memory = new Map<string, string>();

/** localStorage yang tidak melempar galat (mode privat, penyimpanan diblokir). */
export const safeStorage: StateStorage = {
  getItem: (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memory.get(key) ?? null;
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      memory.set(key, value);
    }
  },
  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      memory.delete(key);
    }
  },
};
