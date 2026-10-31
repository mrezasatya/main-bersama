/** Bagian tubuh yang bisa ditunjuk, dengan area sentuh pada gambar (data murni). */
export type View = 'wajah' | 'badan';

export interface Spot {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface Part {
  name: string;
  view: View;
  spots: Spot[];
}

const s = (cx: number, cy: number, rx: number, ry = rx): Spot => ({ cx, cy, rx, ry });

/** Koordinat dalam viewBox wajah 100x100 dan badan 100x140. */
export const PARTS = {
  rambut: { name: 'rambut', view: 'wajah', spots: [s(50, 12, 30, 9)] },
  dahi: { name: 'dahi', view: 'wajah', spots: [s(50, 28, 16, 6)] },
  alis: { name: 'alis', view: 'wajah', spots: [s(35, 37, 8, 4), s(65, 37, 8, 4)] },
  mata: { name: 'mata', view: 'wajah', spots: [s(35, 47, 10, 9), s(65, 47, 10, 9)] },
  hidung: { name: 'hidung', view: 'wajah', spots: [s(50, 60, 9, 8)] },
  pipi: { name: 'pipi', view: 'wajah', spots: [s(27, 63, 8, 7), s(73, 63, 8, 7)] },
  mulut: { name: 'mulut', view: 'wajah', spots: [s(50, 75, 12, 7)] },
  telinga: { name: 'telinga', view: 'wajah', spots: [s(8, 54, 9, 12), s(92, 54, 9, 12)] },
  dagu: { name: 'dagu', view: 'wajah', spots: [s(50, 87, 10, 5)] },
  kepala: { name: 'kepala', view: 'badan', spots: [s(50, 20, 15, 16)] },
  leher: { name: 'leher', view: 'badan', spots: [s(50, 39, 6, 4)] },
  bahu: { name: 'bahu', view: 'badan', spots: [s(33, 46, 7, 5), s(67, 46, 7, 5)] },
  dada: { name: 'dada', view: 'badan', spots: [s(50, 54, 11, 6)] },
  perut: { name: 'perut', view: 'badan', spots: [s(50, 70, 12, 8)] },
  siku: { name: 'siku', view: 'badan', spots: [s(23, 66, 6, 6), s(77, 66, 6, 6)] },
  tangan: { name: 'tangan', view: 'badan', spots: [s(17, 87, 10, 10), s(83, 87, 10, 10)] },
  lutut: { name: 'lutut', view: 'badan', spots: [s(41, 108, 7, 6), s(59, 108, 7, 6)] },
  kaki: { name: 'kaki', view: 'badan', spots: [s(37, 131, 11, 8), s(63, 131, 11, 8)] },
} as const satisfies Record<string, Part>;

export type PartKey = keyof typeof PARTS;
export const PART_KEYS = Object.keys(PARTS) as PartKey[];

export const ORGANS = ['mata', 'telinga', 'hidung', 'lidah', 'tangan'] as const;
export type Organ = (typeof ORGANS)[number];

/** Kalimat setelah anak memilih indra yang tepat. */
export const ORGAN_SAY: Record<Organ, string> = {
  mata: 'Mata! Kita melihat dengan mata.',
  telinga: 'Telinga! Kita mendengar dengan telinga.',
  hidung: 'Hidung! Kita mencium bau dengan hidung.',
  lidah: 'Lidah! Kita merasakan makanan dengan lidah.',
  tangan: 'Tangan! Kulit kita bisa merasakan sentuhan.',
};

export const ORGAN_LABEL: Record<Organ, string> = {
  mata: 'Mata',
  telinga: 'Telinga',
  hidung: 'Hidung',
  lidah: 'Lidah',
  tangan: 'Tangan',
};

/** "Itu telinga." saat anak menunjuk bagian lain: tetap belajar nama bagian itu. */
export const thatIs = (k: PartKey) => `Itu ${PARTS[k].name}.`;
