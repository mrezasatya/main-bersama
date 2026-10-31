import { useRef, useState, type ReactNode } from 'react';
import { sfx } from '../audio';

export interface DragPiece {
  id: string;
  node: ReactNode;
  label: string;
}

export interface DropTarget {
  id: string;
  /** Tampilan sasaran sebelum diisi (mis. siluet). */
  node: ReactNode;
  /** id keping yang cocok. */
  accepts: string;
  label: string;
}

interface Props {
  pieces: DragPiece[];
  targets: DropTarget[];
  /** Dipanggil saat semua keping terpasang; mistakes = jumlah keping yang dilepas di sasaran salah. */
  onComplete: (mistakes: number) => void;
  onPlaced?: (pieceId: string) => void;
  /** Dipanggil saat keping dilepas di sasaran yang tidak cocok. */
  onMiss?: () => void;
  boardClass?: string;
  /** Tata letak sasaran sebagai kisi (puzzle). */
  grid?: { cols: number; rows: number };
  /** Gambar samar di belakang papan puzzle sebagai petunjuk. */
  ghost?: ReactNode;
}

/**
 * Seret-lepas dengan Pointer Events (bukan HTML5 DnD) agar andal di layar sentuh.
 * Alternatif tanpa menyeret: ketuk keping, lalu ketuk sasarannya.
 */
export function DragBoard({
  pieces,
  targets,
  onComplete,
  onPlaced,
  onMiss,
  boardClass = '',
  grid,
  ghost,
}: Props) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ id: string; dx: number; dy: number } | null>(null);
  const [bounce, setBounce] = useState<string | null>(null);
  const origin = useRef<{ x: number; y: number; moved: boolean }>({ x: 0, y: 0, moved: false });
  const mistakes = useRef(0);
  const placedPieces = new Set(Object.values(placed));

  const tryPlace = (pieceId: string, targetId: string | null) => {
    if (!targetId || placed[targetId]) return false;
    const t = targets.find((x) => x.id === targetId);
    if (!t) return false;
    if (t.accepts !== pieceId) {
      mistakes.current += 1;
      setBounce(pieceId);
      window.setTimeout(() => setBounce(null), 500);
      onMiss?.();
      return false;
    }
    sfx.tap();
    const next = { ...placed, [targetId]: pieceId };
    setPlaced(next);
    setSelected(null);
    onPlaced?.(pieceId);
    if (Object.keys(next).length === targets.length) onComplete(mistakes.current);
    return true;
  };

  const targetAt = (x: number, y: number) =>
    document
      .elementsFromPoint(x, y)
      .map((el) => (el as HTMLElement).dataset?.drop)
      .find(Boolean) ?? null;

  return (
    <div className={`dnd ${boardClass}`}>
      <div
        className={`dnd-targets ${grid ? 'is-grid' : ''}`}
        style={
          grid ? ({ '--cols': grid.cols, '--rows': grid.rows } as React.CSSProperties) : undefined
        }
      >
        {ghost && <div className="dnd-ghost">{ghost}</div>}
        {targets.map((t) => {
          const filled = placed[t.id];
          const piece = filled ? pieces.find((p) => p.id === filled) : null;
          return (
            <button
              key={t.id}
              type="button"
              className={`dnd-target ${filled ? 'is-filled' : ''} ${selected && !filled ? 'is-armed' : ''}`}
              data-drop={t.id}
              aria-label={t.label}
              onClick={() => selected && tryPlace(selected, t.id)}
            >
              {piece ? piece.node : t.node}
            </button>
          );
        })}
      </div>
      <div className="dnd-tray">
        {pieces
          .filter((p) => !placedPieces.has(p.id))
          .map((p) => {
            const isDrag = drag?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={[
                  'dnd-piece',
                  selected === p.id && 'is-selected',
                  isDrag && 'is-dragging',
                  bounce === p.id && 'is-shaking',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={isDrag ? { transform: `translate(${drag.dx}px, ${drag.dy}px)` } : undefined}
                aria-label={p.label}
                aria-pressed={selected === p.id}
                data-piece={p.id}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture?.(e.pointerId);
                  origin.current = { x: e.clientX, y: e.clientY, moved: false };
                  setDrag({ id: p.id, dx: 0, dy: 0 });
                }}
                onPointerMove={(e) => {
                  if (drag?.id !== p.id) return;
                  const dx = e.clientX - origin.current.x;
                  const dy = e.clientY - origin.current.y;
                  if (Math.hypot(dx, dy) > 8) origin.current.moved = true;
                  setDrag({ id: p.id, dx, dy });
                }}
                onPointerUp={(e) => {
                  if (drag?.id !== p.id) return;
                  setDrag(null);
                  if (!origin.current.moved) {
                    // Ketuk: pilih keping, lalu ketuk sasaran.
                    setSelected((s) => (s === p.id ? null : p.id));
                    sfx.tap();
                    return;
                  }
                  tryPlace(p.id, targetAt(e.clientX, e.clientY));
                }}
                onPointerCancel={() => setDrag(null)}
              >
                {p.node}
              </button>
            );
          })}
      </div>
    </div>
  );
}
