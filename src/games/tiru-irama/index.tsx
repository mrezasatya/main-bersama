import { GameSession } from '../../core/ui';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';
import { Round } from './Round';
import type { IramaData } from './types';

const content = raw as ContentItem<IramaData>[];

export default function TiruIrama() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
