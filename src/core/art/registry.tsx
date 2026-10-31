import type { ComponentType } from 'react';
import { AnimalArt } from './animals/Animal';
import { ANIMALS, ANIMAL_KEYS } from './animals/specs';
import type { ArtKey, BasicKey } from './keys';
import { PersonArt } from './people/Person';
import { PEOPLE, PERSON_KEYS } from './people/specs';
import { ThingArt } from './things';
import { THING_KEYS } from './thingKeys';
import { VehicleArt } from './vehicles/Vehicle';
import { VEHICLES, VEHICLE_KEYS } from './vehicles/specs';
import { Balon, Bintang, Bola, Bunga, Ikan, type ArtProps } from './objects';

const BASIC: Record<BasicKey, ComponentType<ArtProps>> = {
  bola: Bola,
  bintang: Bintang,
  balon: Balon,
  bunga: Bunga,
  ikan: Ikan,
};

const fromSpecs = <K extends string, S>(
  keys: readonly K[],
  specs: Record<K, S>,
  R: ComponentType<{ spec: S; title?: string; className?: string }>,
) =>
  Object.fromEntries(
    keys.map((k) => [
      k,
      (p: ArtProps) => <R spec={specs[k]} title={p.title} className={p.className} />,
    ]),
  ) as Record<K, ComponentType<ArtProps>>;

export const ART: Record<ArtKey, ComponentType<ArtProps>> = {
  ...fromSpecs(ANIMAL_KEYS, ANIMALS, AnimalArt),
  ...fromSpecs(VEHICLE_KEYS, VEHICLES, VehicleArt),
  ...fromSpecs(PERSON_KEYS, PEOPLE, PersonArt),
  ...Object.fromEntries(
    THING_KEYS.map((k) => [
      k,
      (p: ArtProps) => <ThingArt k={k} title={p.title} className={p.className} />,
    ]),
  ),
  ...BASIC,
} as Record<ArtKey, ComponentType<ArtProps>>;

export function Art({ k, ...props }: ArtProps & { k: ArtKey }) {
  const C = ART[k];
  return <C {...props} />;
}
