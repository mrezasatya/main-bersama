import type { Organ, PartKey } from './parts';

export type IndraData =
  | { mode: 'tunjuk'; part: PartKey }
  | { mode: 'indra'; organ: Organ; distractors: Organ[]; speakAlso: string[] };
