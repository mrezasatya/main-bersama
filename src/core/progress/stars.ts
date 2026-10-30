/**
 * Bintang usaha 1-3 per sesi, dari penyelesaian (bukan jawaban benar).
 * Setiap item yang diselesaikan sudah melewati percobaan, jadi semua usaha dihitung.
 */
export function sessionStars(completed: number, total: number): number {
  if (completed <= 0 || total <= 0) return 0;
  if (completed >= total) return 3;
  return completed / total >= 0.5 ? 2 : 1;
}
