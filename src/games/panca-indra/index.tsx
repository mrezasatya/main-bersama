import { GameSession } from '../../core/ui';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';
import { Round } from './Round';
import type { IndraData } from './types';

const content = raw as ContentItem<IndraData>[];

export default function PancaIndra() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
