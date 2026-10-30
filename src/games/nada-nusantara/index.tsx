import { GameSession } from '../../core/ui';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';
import { Round } from './Round';
import type { NadaData } from './types';

const content = raw as ContentItem<NadaData>[];

export default function NadaNusantara() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
