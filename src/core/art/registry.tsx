import type { ComponentType } from 'react';
import type { ArtKey } from './keys';
import { Balon, Bintang, Bola, Bunga, Ikan, type ArtProps } from './objects';

export const ART: Record<ArtKey, ComponentType<ArtProps>> = {
  bola: Bola,
  bintang: Bintang,
  balon: Balon,
  bunga: Bunga,
  ikan: Ikan,
};

export function Art({ k, ...props }: ArtProps & { k: ArtKey }) {
  const C = ART[k];
  return <C {...props} />;
}
