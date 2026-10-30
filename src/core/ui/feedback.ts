import { PRAISE, TRY_AGAIN, sfx, speak, speakSequence } from '../audio';

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

export const feedback = {
  /** Selesai setelah pujian dibacakan, minimal ~1,1 detik agar animasi sempat terlihat. */
  correct(): Promise<unknown> {
    sfx.success();
    const minDelay = new Promise((r) => window.setTimeout(r, 1100));
    return Promise.all([speak(pick(PRAISE)), minDelay]);
  },
  /** Umpan balik lembut. Animasi goyang diatur oleh komponen permainan. */
  tryAgain(hint?: string): void {
    sfx.tryAgain();
    void speakSequence(hint ? [pick(TRY_AGAIN), hint] : [pick(TRY_AGAIN)]);
    navigator.vibrate?.(40);
  },
};
