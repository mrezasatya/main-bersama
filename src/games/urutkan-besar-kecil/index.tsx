import { GameSession } from '../../core/ui';
import { SequenceRound, type SequenceData } from '../../core/ui/SequenceRound';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<SequenceData>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={SequenceRound} />;
}
