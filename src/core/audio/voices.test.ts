import { noteFreq } from './tone';
import { isIndonesian, pickVoice, rankIndonesianVoices, type VoiceLike } from './voices';

const v = (name: string, lang: string, localService = true): VoiceLike => ({
  name,
  lang,
  localService,
  voiceURI: name,
});

const voices = [
  v('Samantha', 'en-US'),
  v('Damayanti', 'id-ID'),
  v('Google Bahasa Indonesia', 'id-ID', false),
  v('Indonesian (Android)', 'in_ID'),
];

describe('pemilihan suara id-ID', () => {
  it('mengenali kode bahasa Indonesia termasuk in_ID', () => {
    expect(isIndonesian({ lang: 'id-ID' })).toBe(true);
    expect(isIndonesian({ lang: 'in_ID' })).toBe(true);
    expect(isIndonesian({ lang: 'en-US' })).toBe(false);
  });

  it('tidak pernah memilih suara bahasa lain', () => {
    expect(pickVoice([v('Samantha', 'en-US')], null)).toBeNull();
    expect(rankIndonesianVoices(voices).every((x) => isIndonesian(x))).toBe(true);
  });

  it('online: mengutamakan suara Google; offline: mengutamakan suara lokal', () => {
    expect(pickVoice(voices, null, true)?.name).toBe('Google Bahasa Indonesia');
    expect(pickVoice(voices, null, false)?.localService).toBe(true);
  });

  it('menghormati pilihan manual pendamping', () => {
    expect(pickVoice(voices, 'Damayanti', true)?.name).toBe('Damayanti');
    expect(pickVoice(voices, 'tidak-ada', true)?.name).toBe('Google Bahasa Indonesia');
  });

  it('menghitung frekuensi nada', () => {
    expect(noteFreq('A4')).toBeCloseTo(440);
    expect(noteFreq('C4')).toBeCloseTo(261.63, 1);
  });
});
