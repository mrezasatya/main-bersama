/** A: 2-3 tahun, B: 4 tahun, C: 5-6 tahun */
export type AgeGroup = 'A' | 'B' | 'C';
export type ReviewStatus = 'perlu-ditinjau' | 'ditinjau';
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type Domain =
  'bahasa' | 'matematika' | 'sensorik' | 'sains' | 'musik' | 'sosial' | 'motorik' | 'budaya';

export type Curriculum = 'Montessori' | 'Cambridge' | 'Singapore Math' | 'Finlandia';

export interface GameMeta {
  id: string;
  /** 1-30 sesuai katalog; 0 = permainan contoh di luar katalog */
  number: number;
  title: string;
  ageMin: number;
  ageMax: number;
  domain: Domain;
  curriculum: Curriculum[];
  usesAudio: boolean;
  phase: number;
}

export interface ContentItem<D = Record<string, unknown>> {
  id: string;
  ageGroup: AgeGroup[];
  difficulty: Difficulty;
  speak: string;
  label?: string;
  assetKey?: string;
  data: D;
  tags: string[];
  review: ReviewStatus;
}

/** Panduan untuk halaman Pendamping, satu per permainan. */
export interface CompanionGuide {
  /** Satu kalimat: konsep apa yang dilatih. */
  tujuan: string;
  /** Ide aktivitas fisik dengan benda nyata. */
  aktivitas: string[];
}

/** Hasil satu item (ronde) permainan. */
export interface RoundResult {
  /** Benar pada percobaan pertama. */
  firstTry: boolean;
  /** Jumlah percobaan sampai selesai (>= 1). */
  attempts: number;
}

/** Kontrak komponen ronde: merender satu item, lalu memanggil onDone sekali. */
export interface RoundProps<D = Record<string, unknown>> {
  item: ContentItem<D>;
  ageGroup: AgeGroup;
  level: number;
  onDone: (result: RoundResult) => void;
}
