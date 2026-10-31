import { GameSession } from '../../core/ui';
import { OptionQuizRound, type OptionQuizData } from '../../core/ui/OptionQuiz';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<OptionQuizData>[];

export default function Game() {
  return <GameSession meta={meta} content={content} Round={OptionQuizRound} />;
}
