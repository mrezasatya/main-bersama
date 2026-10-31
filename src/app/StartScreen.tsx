import { IconPlay } from '../core/art/icons';
import { Bintang } from '../core/art/objects';
import { PHRASE, primeSpeech, speak, unlockAudio } from '../core/audio';
import { useSettings } from '../core/progress';
import { BigButton } from '../core/ui';
import { AgePicker } from './AgePicker';
import { useAppSession } from './session';

/** Layar "Ayo Mulai": interaksi pertama yang membuka audio di browser. */
export function StartScreen() {
  const needsAge = useSettings((s) => s.ageGroup === null);
  const setStarted = useAppSession((s) => s.setStarted);

  const begin = () => {
    // Keduanya dipanggil langsung di dalam gestur agar iOS mengizinkan suara.
    void unlockAudio();
    primeSpeech();
    void speak(PHRASE.start);
    setStarted(true);
  };

  return (
    <div className="start">
      <div className="start-logo">
        <Bintang color="#FFC83A" />
      </div>
      <h1>Main Bersama</h1>
      {needsAge ? (
        <AgePicker onPicked={begin} />
      ) : (
        <BigButton size="xl" icon={<IconPlay />} onClick={begin}>
          Ayo Mulai
        </BigButton>
      )}
    </div>
  );
}
