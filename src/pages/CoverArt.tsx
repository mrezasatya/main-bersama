import { Art, NAMED_COLORS, type ArtKey, type ColorName } from '../core/art';

export default function CoverArt({ art, color }: { art: ArtKey; color?: ColorName }) {
  return <Art k={art} color={color && NAMED_COLORS[color]} />;
}
