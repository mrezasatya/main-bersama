import { FlagArt } from '../art/Flag';
import { Art } from '../art/registry';
import type { Sticker } from '../progress';

/** Gambar stiker dari registri gambar umum (dimuat lazy agar tidak masuk bundle awal). */
export default function StickerArtFull({ sticker }: { sticker: Sticker }) {
  if (sticker.flag) return <FlagArt k={sticker.flag} />;
  if (sticker.art) return <Art k={sticker.art} />;
  return null;
}
