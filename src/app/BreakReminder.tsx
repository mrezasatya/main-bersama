import { useEffect, useRef, useState } from 'react';
import { PHRASE, speak } from '../core/audio';
import { STICKER_ART } from '../core/art/stickers';
import { useSettings } from '../core/progress';
import { BigButton } from '../core/ui';

const CHECK_MS = 15_000;

/** Pengingat lembut setelah N menit bermain (hanya menghitung saat layar terlihat). */
export function BreakReminder() {
  const enabled = useSettings((s) => s.breakReminder);
  const minutes = useSettings((s) => s.breakMinutes);
  const [show, setShow] = useState(false);
  const played = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const t = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      played.current += CHECK_MS;
      if (played.current >= minutes * 60_000) {
        played.current = 0;
        setShow(true);
        void speak(PHRASE.breakReminder);
      }
    }, CHECK_MS);
    return () => window.clearInterval(t);
  }, [enabled, minutes]);

  if (!show) return null;
  const Sun = STICKER_ART.matahari!;
  return (
    <div className="overlay" role="dialog" aria-label="Pengingat istirahat">
      <div className="overlay-card">
        <div className="overlay-art">
          <Sun />
        </div>
        <h2>Yuk, istirahat sebentar</h2>
        <p>Minum air, lihat ke luar jendela, dan gerakkan badan.</p>
        <BigButton onClick={() => setShow(false)}>Oke</BigButton>
      </div>
    </div>
  );
}
