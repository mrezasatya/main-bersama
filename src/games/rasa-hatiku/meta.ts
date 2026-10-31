import type { CompanionGuide, GameMeta } from '../../types';

export const meta: GameMeta = {
  id: 'rasa-hatiku',
  number: 12,
  title: 'Rasa Hatiku',
  ageMin: 4,
  ageMax: 6,
  domain: 'sosial',
  curriculum: ['Finlandia'],
  usesAudio: true,
  phase: 3,
};

export const guide: CompanionGuide = {
  tujuan:
    'Mengenali dan menamai emosi (senang, sedih, marah, takut, terkejut, malu, tenang, bangga), lalu mengenal cara sehat menghadapinya.',
  aktivitas: [
    'Main cermin ekspresi: tirukan wajah senang, sedih, marah, dan terkejut bergantian, lalu tebak emosinya.',
    'Saat membaca buku cerita, berhenti sejenak dan tanyakan: "Menurutmu tokoh ini merasa apa? Kenapa?"',
    'Buat "pojok tenang" dengan bantal dan boneka. Latih napas balon: tarik napas pelan, embuskan pelan.',
  ],
};
