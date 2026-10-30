/**
 * Daftar kunci aset yang valid untuk `assetKey` pada content.json.
 * Berkas ini tanpa React agar bisa dibaca skrip validasi.
 */
export const ART_KEYS = ['bola', 'bintang', 'balon', 'bunga', 'ikan'] as const;
export type ArtKey = (typeof ART_KEYS)[number];

export const isArtKey = (v: unknown): v is ArtKey =>
  typeof v === 'string' && (ART_KEYS as readonly string[]).includes(v);
