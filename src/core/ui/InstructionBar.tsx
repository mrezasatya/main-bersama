import type { ReactNode } from 'react';
import { speak, useVoiceStatus } from '../audio';
import { IconSpeaker, IconSpeakerOff } from '../art/icons';

interface Props {
  /** Teks instruksi; selalu tampil walau suara tersedia. */
  text: string;
  /** Kalimat yang dibacakan; bawaan sama dengan text. */
  speakText?: string;
  /** Ikon/gambar petunjuk agar instruksi bisa dipahami tanpa suara dan tanpa membaca. */
  cue?: ReactNode;
}

export function InstructionBar({ text, speakText, cue }: Props) {
  const hasVoice = useVoiceStatus((s) => s.hasIndonesian || !s.ready);
  return (
    <div className="instruction">
      {cue && <div className="instruction-cue">{cue}</div>}
      <p className="instruction-text">{text}</p>
      <button
        type="button"
        className="btn btn-soft btn-md instruction-speak"
        onClick={() => void speak(speakText ?? text)}
        aria-label="Dengar lagi"
      >
        <span className="btn-icon">{hasVoice ? <IconSpeaker /> : <IconSpeakerOff />}</span>
      </button>
    </div>
  );
}
