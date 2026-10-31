import { PRAISE, TRY_AGAIN, sfx, speakSequence } from '../audio';

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

export const feedback = {
  /**
   * Selesai setelah kalimat dibacakan, minimal ~1,1 detik agar animasi sempat terlihat.
   * `say` (mis. "Kambing berbunyi mbeek!") menggantikan pujian acak; bisa beberapa kalimat.
   */
  correct(say?: string | readonly string[]): Promise<unknown> {
    sfx.success();
    const minDelay = new Promise((r) => window.setTimeout(r, 1100));
    const lines = say === undefined ? [pick(PRAISE)] : typeof say === 'string' ? [say] : say;
    return Promise.all([speakSequence(lines), minDelay]);
  },
  /** Umpan balik lembut. Animasi goyang diatur oleh komponen permainan. */
  tryAgain(hint?: string): void {
    sfx.tryAgain();
    void speakSequence(hint ? [pick(TRY_AGAIN), hint] : [pick(TRY_AGAIN)]);
    navigator.vibrate?.(40);
  },
};
