import { IconLock } from '../art/icons';
import { STICKER_ART } from '../art/stickers';
import type { Sticker } from '../progress';

export function StickerCard({ sticker, locked = false }: { sticker: Sticker; locked?: boolean }) {
  const Art = STICKER_ART[sticker.artKey];
  return (
    <figure className={`sticker ${locked ? 'is-locked' : ''} cat-${sticker.category}`}>
      <div className="sticker-art">{locked ? <IconLock /> : Art ? <Art /> : null}</div>
      <figcaption>{locked ? '?' : sticker.name}</figcaption>
    </figure>
  );
}
