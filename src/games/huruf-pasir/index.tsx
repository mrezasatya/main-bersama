import { GameSession } from '../../core/ui';
import { TraceRound, type TraceData } from '../../core/ui/TraceRound';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<TraceData>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={TraceRound} />;
}
