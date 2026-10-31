import { useEffect, useRef, useState } from 'react';
import { GRID, markVisited, score, type TraceScore } from './trace';

export interface TraceTarget {
  /** Huruf/angka yang ditelusuri (digambar dengan font Nunito). */
  glyph?: string;
  /** Jalur SVG (koordinat 0-100). */
  path?: string;
}

interface Props {
  target: TraceTarget;
  /** Dipanggil tiap jari diangkat. */
  onStroke: (s: TraceScore) => void;
  done: boolean;
  /** Ubah nilai ini untuk menghapus coretan. */
  resetKey: number;
}

const SAND = '#F3E3C3';
const GROOVE = '#C9A97A';
const TRAIL = '#3B7BF5';

function drawTarget(ctx: CanvasRenderingContext2D, size: number, t: TraceTarget, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  if (t.glyph) {
    ctx.font = `800 ${size * (t.glyph.length > 1 ? 0.55 : 0.78)}px Nunito, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.glyph, size / 2, size * 0.53);
  }
  if (t.path) {
    ctx.scale(size / 100, size / 100);
    ctx.lineWidth = 11;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke(new Path2D(t.path));
  }
  ctx.restore();
}

/** Papan "pasir": target timbul, jari anak meninggalkan jejak; penilaian di grid kasar. */
export function TraceBoard({ target, onStroke, done, resetKey }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mask = useRef(new Uint8Array(GRID * GRID));
  const visited = useRef(new Uint8Array(GRID * GRID));
  const drawing = useRef(false);
  const last = useRef<[number, number] | null>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const measure = () => setSize(Math.round(el.getBoundingClientRect().width) || 300);
    measure();
    // ResizeObserver tidak ada di Safari lama; cadangan: event resize jendela.
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = canvas.current;
    if (!el || size === 0) return;
    let cancelled = false;
    const paint = () => {
      if (cancelled) return;
      const dpr = window.devicePixelRatio || 1;
      el.width = size * dpr;
      el.height = size * dpr;
      const ctx = el.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = SAND;
      ctx.fillRect(0, 0, size, size);
      // Butiran pasir.
      ctx.fillStyle = 'rgba(160,120,60,0.18)';
      for (let i = 0; i < 500; i++)
        ctx.fillRect(
          (((i * 97) % 1000) / 1000) * size,
          (((i * 389) % 1000) / 1000) * size,
          1.5,
          1.5,
        );
      drawTarget(ctx, size, target, GROOVE);

      // Mask target di grid kasar.
      const off = document.createElement('canvas');
      off.width = GRID;
      off.height = GRID;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;
      drawTarget(octx, GRID, target, '#000');
      const px = octx.getImageData(0, 0, GRID, GRID).data;
      const m = new Uint8Array(GRID * GRID);
      for (let i = 0; i < m.length; i++) m[i] = px[i * 4 + 3]! > 100 ? 1 : 0;
      mask.current = m;
      visited.current = new Uint8Array(GRID * GRID);
    };
    // Tunggu font agar huruf tergambar dengan Nunito.
    void (document.fonts?.load(`800 100px Nunito`) ?? Promise.resolve()).then(paint, paint);
    return () => {
      cancelled = true;
    };
  }, [size, target, resetKey]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  const line = (from: [number, number], to: [number, number]) => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = TRAIL;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = Math.max(14, size * 0.06);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(...from);
    ctx.lineTo(...to);
    ctx.stroke();
    ctx.globalAlpha = 1;
    // Tandai grid sepanjang garis.
    const steps = Math.max(1, Math.ceil(Math.hypot(to[0] - from[0], to[1] - from[1]) / 4));
    for (let i = 0; i <= steps; i++) {
      const x = from[0] + ((to[0] - from[0]) * i) / steps;
      const y = from[1] + ((to[1] - from[1]) * i) / steps;
      markVisited(visited.current, (x / size) * GRID, (y / size) * GRID, 2);
    }
  };

  return (
    <canvas
      ref={canvas}
      className="trace-board"
      aria-label="Papan menelusuri"
      onPointerDown={(e) => {
        if (done) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        drawing.current = true;
        const p = pos(e);
        last.current = p;
        line(p, p);
      }}
      onPointerMove={(e) => {
        if (!drawing.current || !last.current) return;
        const p = pos(e);
        line(last.current, p);
        last.current = p;
      }}
      onPointerUp={() => {
        if (!drawing.current) return;
        drawing.current = false;
        last.current = null;
        onStroke(score(mask.current, visited.current));
      }}
      onPointerCancel={() => {
        drawing.current = false;
        last.current = null;
      }}
    />
  );
}
