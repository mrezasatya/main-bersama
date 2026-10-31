import { GameSession } from '../../core/ui';
import { Round, type MemoryData } from './Round';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<MemoryData>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
