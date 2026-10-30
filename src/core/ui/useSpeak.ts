import { useEffect } from 'react';
import { speak, stopSpeaking } from '../audio';

/** Membacakan teks sekali saat komponen tampil; berhenti saat komponen hilang. */
export function useSpeakOnMount(text: string, delayMs = 350): void {
  useEffect(() => {
    const t = window.setTimeout(() => void speak(text), delayMs);
    return () => {
      window.clearTimeout(t);
      stopSpeaking();
    };
  }, [text, delayMs]);
}
