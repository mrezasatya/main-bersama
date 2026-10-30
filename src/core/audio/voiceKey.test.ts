import { normalizeSpeech, voiceKey, voiceVersion } from './voiceKey';

describe('kunci rekaman', () => {
  it('stabil dan tidak peka spasi berlebih', () => {
    expect(voiceKey('Mana bola merah?')).toBe(voiceKey('  Mana  bola merah? '));
    expect(normalizeSpeech(' a \n b ')).toBe('a b');
  });

  it('berbeda untuk kalimat berbeda', () => {
    expect(voiceKey('Mana bola merah?')).not.toBe(voiceKey('Mana bola biru?'));
  });

  it('versi berubah bila pengaturan suara berubah', () => {
    expect(voiceVersion(['v1', 'm'])).not.toBe(voiceVersion(['v2', 'm']));
    expect(voiceVersion(['v1', 'm'])).toHaveLength(6);
  });
});
