import { useState } from 'react';
import { IconPlay, IconRepeat } from '../../core/art/icons';
import { NAMED_COLORS, type ColorName } from '../../core/art/colors';
import { sfx } from '../../core/audio';
import { BigButton, InstructionBar, feedback, useSpeakOnMount } from '../../core/ui';
import type { RoundProps } from '../../types';

export interface ColoringData {
  regions: { d: string }[];
  speakAlso?: string[];
}

/** Warna khas batik (soga, indigo, sogan) ditambah warna cerah. */
const PALETTE: ColorName[] = [
  'cokelat',
  'kuning',
  'biru',
  'merah',
  'hijau',
  'oranye',
  'ungu',
  'merah muda',
  'hitam',
  'putih',
];

/** Mewarnai bebas: pilih warna, ketuk bagian gambar. "Selesai" muncul setelah separuh bagian berwarna. */
export function Round({ item, onDone }: RoundProps<ColoringData>) {
  const { regions } = item.data;
  const [color, setColor] = useState<ColorName>('kuning');
  const [fills, setFills] = useState<Record<number, ColorName>>({});
  const [done, setDone] = useState(false);
  useSpeakOnMount(item.speak);
  const filled = Object.keys(fills).length;

  return (
    <div className="round coloring">
      <InstructionBar text={item.label ?? item.speak} speakText={item.speak} />
      <div className="coloring-board">
        <svg viewBox="0 0 100 100" aria-label={item.label}>
          {regions.map((r, i) => (
            <path
              key={i}
              d={r.d}
              fill={fills[i] ? NAMED_COLORS[fills[i]] : '#FFFFFF'}
              stroke="#3A302A"
              strokeWidth={0.8}
              strokeLinejoin="round"
              className="color-region"
              data-region={i}
              onClick={() => {
                if (done) return;
                sfx.tap();
                setFills((f) => ({ ...f, [i]: color }));
              }}
            />
          ))}
        </svg>
      </div>
      <div className="palette" role="radiogroup" aria-label="Pilih warna">
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={color === c}
            aria-label={c}
            className={`palette-color ${color === c ? 'is-active' : ''}`}
            style={{ background: NAMED_COLORS[c] }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <div className="btn-row">
        <BigButton
          variant="ghost"
          size="md"
          icon={<IconRepeat />}
          disabled={done || !filled}
          onClick={() => setFills({})}
        >
          Hapus semua
        </BigButton>
        {filled >= Math.ceil(regions.length / 2) && !done && (
          <BigButton
            size="md"
            icon={<IconPlay />}
            onClick={() => {
              setDone(true);
              void feedback
                .correct(item.data.speakAlso)
                .then(() => onDone({ firstTry: true, attempts: 1 }));
            }}
          >
            Selesai
          </BigButton>
        )}
      </div>
    </div>
  );
}
