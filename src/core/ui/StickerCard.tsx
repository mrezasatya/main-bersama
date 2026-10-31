import { lazy, Suspense } from 'react';
import { IconLock } from '../art/icons';
import { STICKER_ART } from '../art/stickers';
import type { Sticker } from '../progress';

const StickerArtFull = lazy(() => import('./StickerArtFull'));

export function StickerCard({ sticker, locked = false }: { sticker: Sticker; locked?: boolean }) {
  const Custom = sticker.artKey ? STICKER_ART[sticker.artKey] : undefined;
  return (
    <figure className={`sticker ${locked ? 'is-locked' : ''} cat-${sticker.category}`}>
      <div className="sticker-art">
        {locked ? (
          <IconLock />
        ) : Custom ? (
          <Custom />
        ) : (
          <Suspense fallback={null}>
            <StickerArtFull sticker={sticker} />
          </Suspense>
        )}
      </div>
      <figcaption>{locked ? '?' : sticker.name}</figcaption>
    </figure>
  );
}
