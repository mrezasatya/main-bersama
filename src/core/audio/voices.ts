/** Info suara yang cukup untuk peringkat (bisa dibuat di tes tanpa browser). */
export interface VoiceLike {
  name: string;
  lang: string;
  localService: boolean;
  voiceURI: string;
  default?: boolean;
}

export function normalizeLang(lang: string): string {
  return lang.replace('_', '-').toLowerCase();
}

/** Android lama memakai kode "in-ID" untuk Bahasa Indonesia. */
export function isIndonesian(v: Pick<VoiceLike, 'lang'>): boolean {
  const l = normalizeLang(v.lang);
  return l === 'id' || l.startsWith('id-') || l === 'in' || l.startsWith('in-');
}

/** Skor lebih tinggi = lebih layak. Mengembalikan -1 untuk suara non-Indonesia. */
export function scoreVoice(v: VoiceLike, online = true): number {
  if (!isIndonesian(v)) return -1;
  let score = normalizeLang(v.lang) === 'id-id' ? 100 : 80;
  if (/premium|enhanced|natural|neural/i.test(v.name)) score += 25;
  if (/google/i.test(v.name)) score += 20;
  if (/damayanti/i.test(v.name)) score += 10;
  // Suara lokal tetap jalan saat offline; suara jaringan bisa senyap tanpa internet.
  if (v.localService) score += online ? 5 : 40;
  else if (!online) score -= 60;
  return score;
}

export function rankIndonesianVoices<T extends VoiceLike>(
  voices: readonly T[],
  online = true,
): T[] {
  return voices
    .filter((v) => scoreVoice(v, online) >= 0)
    .sort((a, b) => scoreVoice(b, online) - scoreVoice(a, online));
}

export function pickVoice<T extends VoiceLike>(
  voices: readonly T[],
  preferredURI: string | null,
  online = true,
): T | null {
  if (preferredURI) {
    const chosen = voices.find((v) => v.voiceURI === preferredURI);
    if (chosen) return chosen;
  }
  return rankIndonesianVoices(voices, online)[0] ?? null;
}
