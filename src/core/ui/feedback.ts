import { sfx, speak } from '../audio';

/** Pujian untuk usaha, bukan untuk "pintar". */
export const PRAISE = [
  'Hore, kamu menemukannya!',
  'Kamu berhasil!',
  'Bagus sekali usahamu!',
  'Yeay, betul!',
  'Hebat, kamu terus mencoba!',
] as const;

export const TRY_AGAIN = ['Ayo coba lagi', 'Hampir! Coba lagi, ya', 'Ayo cari lagi'] as const;

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
    void speak(hint ? `${pick(TRY_AGAIN)}. ${hint}` : pick(TRY_AGAIN));
    navigator.vibrate?.(40);
  },
};
