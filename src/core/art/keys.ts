/**
 * Daftar kunci aset yang valid untuk `assetKey` pada content.json.
 * Berkas ini tanpa React agar bisa dibaca skrip validasi.
 */
import { ANIMAL_KEYS, type AnimalKey } from './animals/specs';
import { PERSON_KEYS, type PersonKey } from './people/specs';
import { THING_KEYS, type ThingKey } from './thingKeys';
import { VEHICLE_KEYS, type VehicleKey } from './vehicles/specs';

export const BASIC_KEYS = ['bola', 'bintang', 'balon', 'bunga', 'ikan'] as const;
export type BasicKey = (typeof BASIC_KEYS)[number];

export type ArtKey = BasicKey | AnimalKey | VehicleKey | ThingKey | PersonKey;
export const ART_KEYS: readonly ArtKey[] = [
  ...BASIC_KEYS,
  ...ANIMAL_KEYS,
  ...VEHICLE_KEYS,
  ...THING_KEYS,
  ...PERSON_KEYS,
];

export const isArtKey = (v: unknown): v is ArtKey =>
  typeof v === 'string' && (ART_KEYS as readonly string[]).includes(v);
