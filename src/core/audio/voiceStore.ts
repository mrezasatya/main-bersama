import { create } from 'zustand';

export interface VoiceStatus {
  supported: boolean;
  /** Daftar suara sudah dimuat (atau waktu tunggu habis). */
  ready: boolean;
  voices: SpeechSynthesisVoice[];
  hasIndonesian: boolean;
}

export const useVoiceStatus = create<VoiceStatus>(() => ({
  supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  ready: false,
  voices: [],
  hasIndonesian: false,
}));
