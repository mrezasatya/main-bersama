import type { Layout } from './types';

interface Props {
  layout: Layout;
  color: string;
  count: number;
  /** Pad yang sedang berbunyi (umpan balik visual). */
  active: number | null;
  /** Pad yang diberi petunjuk (berdenyut). */
  hint: number | null;
  disabled?: boolean;
  onPlay: (i: number) => void;
  name: string;
}

/** Permukaan alat musik yang bisa diketuk; satu tombol per nada, dari rendah ke tinggi. */
export function Instrument({ layout, color, count, active, hint, disabled, onPlay, name }: Props) {
  return (
    <div className={`instrument inst-${layout}`} style={{ '--c': color } as React.CSSProperties}>
      {layout === 'lubang' && <div className="inst-tube" />}
      {Array.from({ length: count }, (_, i) => {
        // Bilah/tabung memendek seiring nada makin tinggi.
        const h = count > 1 ? 100 - (i / (count - 1)) * 40 : 100;
        const cls = ['pad', active === i && 'is-on', hint === i && 'is-hint']
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={i}
            type="button"
            className={cls}
            style={{ '--h': h } as React.CSSProperties}
            disabled={disabled}
            onPointerDown={(e) => {
              e.preventDefault();
              onPlay(i);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onPlay(i);
            }}
            aria-label={`${name} nada ${i + 1}`}
            data-pad={i}
          />
        );
      })}
    </div>
  );
}
