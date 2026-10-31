import { Visual } from '../core/visual/Visual';
import type { Visual as VisualSpec } from '../core/visual/types';

export default function CoverArt({ v }: { v: VisualSpec }) {
  return <Visual v={v} />;
}
