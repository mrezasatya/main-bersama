import { useSettings } from '../core/progress';
import type { AgeGroup } from '../types';

const OPTIONS: { group: AgeGroup; label: string; note: string }[] = [
  { group: 'A', label: '2-3 tahun', note: '2-3 pilihan, tanpa membaca' },
  { group: 'B', label: '4 tahun', note: '3-4 pilihan' },
  { group: 'C', label: '5-6 tahun', note: '4-6 pilihan, teks pendek' },
];

/** Dipilih oleh pendamping. Hanya preferensi tampilan, disimpan di perangkat. */
export function AgePicker({ onPicked }: { onPicked?: (g: AgeGroup) => void }) {
  const current = useSettings((s) => s.ageGroup);
  const update = useSettings((s) => s.update);
  return (
    <div className="age-picker">
      <p className="age-picker-title">Untuk pendamping: berapa usia anak?</p>
      <div className="age-options">
        {OPTIONS.map((o) => (
          <button
            key={o.group}
            type="button"
            className={`age-option ${current === o.group ? 'is-active' : ''}`}
            aria-pressed={current === o.group}
            onClick={() => {
              update({ ageGroup: o.group });
              onPicked?.(o.group);
            }}
          >
            <strong>{o.label}</strong>
            <small>{o.note}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
