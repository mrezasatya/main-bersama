import { z } from 'zod';
import type { AgeGroup, ContentItem, GameMeta } from '../src/types';

export const MIN_ITEMS = 40;
export const MAX_ITEMS = 50;
export const MIN_PER_AGE = 10;

const AGE = z.enum(['A', 'B', 'C']);

export const GameMetaSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'id harus kebab-case'),
    number: z.number().int().min(0).max(30),
    title: z.string().min(1),
    ageMin: z.number().int().min(2).max(6),
    ageMax: z.number().int().min(2).max(6),
    domain: z.enum([
      'bahasa',
      'matematika',
      'sensorik',
      'sains',
      'musik',
      'sosial',
      'motorik',
      'budaya',
    ]),
    curriculum: z.array(z.enum(['Montessori', 'Cambridge', 'Singapore Math', 'Finlandia'])).min(1),
    usesAudio: z.boolean(),
    phase: z.number().int().min(0).max(6),
  })
  .refine((m) => m.ageMin <= m.ageMax, 'ageMin harus <= ageMax');

export const ContentItemSchema = z.object({
  id: z.string().min(1),
  ageGroup: z.array(AGE).min(1),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  speak: z.string(),
  label: z.string().optional(),
  assetKey: z.string().optional(),
  data: z.record(z.unknown()),
  tags: z.array(z.string()),
  review: z.enum(['perlu-ditinjau', 'ditinjau']),
});

/** Kelompok usia yang dicakup rentang usia permainan. */
export function ageGroupsFor(meta: Pick<GameMeta, 'ageMin' | 'ageMax'>): AgeGroup[] {
  const groups: AgeGroup[] = [];
  if (meta.ageMin <= 3) groups.push('A');
  if (meta.ageMin <= 4 && meta.ageMax >= 4) groups.push('B');
  if (meta.ageMax >= 5) groups.push('C');
  return groups;
}

export interface Report {
  gameId: string;
  errors: string[];
  itemCount: number;
  perAge: Record<AgeGroup, number>;
  needsReview: number;
}

export function validateGame(meta: unknown, content: unknown, artKeys: readonly string[]): Report {
  const errors: string[] = [];
  const perAge: Record<AgeGroup, number> = { A: 0, B: 0, C: 0 };

  const m = GameMetaSchema.safeParse(meta);
  const gameId = m.success ? m.data.id : String((meta as { id?: unknown })?.id ?? '?');
  if (!m.success)
    errors.push(...m.error.issues.map((i) => `meta.${i.path.join('.')}: ${i.message}`));

  if (!Array.isArray(content)) {
    return {
      gameId,
      errors: [...errors, 'content.json harus berupa larik'],
      itemCount: 0,
      perAge,
      needsReview: 0,
    };
  }

  // 1. Jumlah item
  if (content.length < MIN_ITEMS || content.length > MAX_ITEMS)
    errors.push(`jumlah item ${content.length}, harus ${MIN_ITEMS}-${MAX_ITEMS}`);

  const items: ContentItem[] = [];
  content.forEach((raw, i) => {
    const r = ContentItemSchema.safeParse(raw);
    if (r.success) items.push(r.data);
    else
      errors.push(...r.error.issues.map((is) => `item[${i}].${is.path.join('.')}: ${is.message}`));
  });

  // 2. Duplikat id dan speak
  const dup = (key: 'id' | 'speak') => {
    const seen = new Set<string>();
    for (const it of items) {
      const v = it[key].trim().toLowerCase();
      if (!v) continue;
      if (seen.has(v)) errors.push(`${key} duplikat: "${it[key]}"`);
      seen.add(v);
    }
  };
  dup('id');
  dup('speak');

  // 3. assetKey valid
  for (const it of items)
    if (it.assetKey !== undefined && !artKeys.includes(it.assetKey))
      errors.push(`item ${it.id}: assetKey "${it.assetKey}" tidak ada di core/art`);

  // 4. Minimal per kelompok usia
  for (const it of items) for (const g of new Set(it.ageGroup)) perAge[g]++;
  if (m.success)
    for (const g of ageGroupsFor(m.data))
      if (perAge[g] < MIN_PER_AGE)
        errors.push(`kelompok usia ${g} hanya ${perAge[g]} item, minimal ${MIN_PER_AGE}`);

  // 5. speak wajib untuk permainan bersuara
  if (m.success && m.data.usesAudio)
    for (const it of items) if (!it.speak.trim()) errors.push(`item ${it.id}: speak kosong`);

  // Kalimat tambahan (data.speakAlso) harus berupa teks yang tidak kosong agar bisa direkam.
  for (const it of items) {
    const also = it.data.speakAlso;
    if (also === undefined) continue;
    if (!Array.isArray(also) || also.some((t) => typeof t !== 'string' || !t.trim()))
      errors.push(`item ${it.id}: data.speakAlso harus larik teks yang tidak kosong`);
  }

  // 6. Hitung yang perlu ditinjau
  const needsReview = items.filter((it) => it.review === 'perlu-ditinjau').length;

  return { gameId, errors, itemCount: content.length, perAge, needsReview };
}
