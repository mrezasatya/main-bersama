import { GameSession } from '../../core/ui';
import { makePictureQuiz, type PictureQuizData } from '../../core/ui/PictureQuiz';
import type { ContentItem } from '../../types';
import raw from './content.json';
import { meta } from './meta';

const content = raw as ContentItem<PictureQuizData>[];
const Round = makePictureQuiz(content);

export default function Kendaraan() {
  return <GameSession meta={meta} content={content} Round={Round} />;
}
