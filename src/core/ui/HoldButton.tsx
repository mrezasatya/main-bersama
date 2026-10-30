import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Props {
  onHold: () => void;
  /** Lama menahan (ms) sebelum aksi terjadi. */
  duration?: number;
  icon?: ReactNode;
  label: string;
  hint?: string;
}

/**
 * Gerbang pendamping: tombol harus ditekan lama agar anak tidak masuk
 * ke pengaturan secara tidak sengaja.
 */
export function HoldButton({ onHold, duration = 1500, icon, label, hint = 'Tekan lama' }: Props) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef(0);

  const stop = () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    setProgress(0);
  };

  const tick = () => {
    const p = Math.min(1, (performance.now() - start.current) / duration);
    setProgress(p);
    if (p >= 1) {
      stop();
      onHold();
      return;
    }
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => stop, []);

  return (
    <button
      type="button"
      className="btn btn-ghost btn-md hold-btn"
      style={{ '--hold': progress } as React.CSSProperties}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        start.current = performance.now();
        raf.current = requestAnimationFrame(tick);
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onHold();
      }}
      aria-label={`${label} (${hint.toLowerCase()})`}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">
        {label}
        <small>{hint}</small>
      </span>
    </button>
  );
}
