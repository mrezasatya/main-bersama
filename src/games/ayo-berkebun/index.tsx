import { GameSession } from '../../core/ui';
import { MixedRound, type MixedData } from '../../core/ui/MixedRound';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<MixedData>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={MixedRound} />;
}
