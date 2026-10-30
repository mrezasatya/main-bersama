export {
  speak,
  speakSequence,
  stopSpeaking,
  primeSpeech,
  isSpeaking,
  initVoices,
  currentVoice,
} from './speech';
export type { SpeakOptions, SpeakOutcome } from './speech';
export { tone, sfx, noteFreq, unlockAudio, audioState } from './tone';
export { useVoiceStatus } from './voiceStore';
export { scoreVoice, rankIndonesianVoices, pickVoice, isIndonesian } from './voices';
export type { VoiceLike } from './voices';
export { loadClipManifest, preloadClip, clipFor, clipInfo } from './clips';
export { voiceKey, normalizeSpeech, voiceVersion, EMPTY_MANIFEST } from './voiceKey';
export type { VoiceManifest } from './voiceKey';
export * from './phrases';
export { playEffect, isEffectName, EFFECT_NAMES } from './effects';
export type { EffectName } from './effects';
export { playNote, scaleFreqs, isTimbre, isScaleName, TIMBRES, SCALES } from './instruments';
export type { Timbre, ScaleName } from './instruments';
