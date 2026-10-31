import { GameSession } from '../../core/ui';
import { Round, type PasangData } from './Round';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<PasangData>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
