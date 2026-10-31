import { GameSession } from '../../core/ui';
import { Round } from './Round';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<Parameters<typeof Round>[0]['item']['data']>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
