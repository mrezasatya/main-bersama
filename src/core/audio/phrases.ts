/**
 * Semua kalimat antarmuka yang dibacakan, di luar content.json.
 * Skrip generate-voice membaca berkas ini, jadi setiap kalimat yang diucapkan aplikasi
 * harus berasal dari sini atau dari content.json agar punya rekaman.
 * Hindari kalimat yang dirangkai dengan angka/nama bebas; pecah menjadi beberapa kalimat tetap.
 */

/** Pujian untuk usaha, bukan untuk "pintar". */
export const PRAISE = [
  'Hore, kamu menemukannya!',
  'Kamu berhasil!',
  'Bagus sekali usahamu!',
  'Yeay, betul!',
  'Hebat, kamu terus mencoba!',
] as const;

export const TRY_AGAIN = ['Ayo coba lagi.', 'Hampir! Coba lagi, ya.', 'Ayo cari lagi.'] as const;

export const PHRASE = {
  start: 'Ayo main bersama!',
  breakReminder: 'Yuk, istirahat sebentar. Minum air dan gerakkan badan.',
  albumHas: 'Ini album stikermu!',
  albumEmpty: 'Ayo main untuk mengumpulkan stiker!',
} as const;

export const rewardStars = (stars: number) => `Hore! Kamu dapat ${stars} bintang!`;
export const REWARD_STAR_COUNTS = [1, 2, 3] as const;

export const stickerLine = (name: string) => `Stiker baru: ${name}!`;

/** Contoh kalimat halaman Uji Suara (dibandingkan antara rekaman dan suara perangkat). */
export const VOICE_SAMPLES = [
  { label: 'Sapaan', text: 'Halo! Ayo main bersama. Siapa namamu?' },
  {
    label: 'Angka',
    text: 'Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.',
  },
  {
    label: 'Bunyi hewan',
    text: 'Kambing berbunyi mbeek. Ayam berkokok kukuruyuk. Kucing mengeong meong.',
  },
  { label: 'Suku kata', text: 'Ba, bi, bu, be, bo. Bola. Ku-da. Ma-ta-ha-ri.' },
  { label: 'Instruksi', text: 'Mana bola merah? Ayo coba lagi. Hore, kamu berhasil!' },
  {
    label: 'Cerita',
    text: 'Pagi itu, Kancil berjalan ke tepi sungai. Ia ingin menyeberang, tetapi airnya dalam. Apa yang harus dilakukan Kancil?',
  },
  { label: 'Kecepatan', text: 'Mana bola merah? Ayo cari bersama.' },
] as const;

/** Bilangan 0-20 dalam kata, dibacakan saat anak menghitung dengan mengetuk. */
export const NUMBER_WORDS = [
  'nol',
  'satu',
  'dua',
  'tiga',
  'empat',
  'lima',
  'enam',
  'tujuh',
  'delapan',
  'sembilan',
  'sepuluh',
  'sebelas',
  'dua belas',
  'tiga belas',
  'empat belas',
  'lima belas',
  'enam belas',
  'tujuh belas',
  'delapan belas',
  'sembilan belas',
  'dua puluh',
] as const;

/** Kalimat tetap di luar konten permainan, judul permainan, dan nama stiker. */
export function uiPhrases(): string[] {
  return [
    ...NUMBER_WORDS.slice(1),
    ...PRAISE,
    ...TRY_AGAIN,
    ...Object.values(PHRASE),
    ...REWARD_STAR_COUNTS.map(rewardStars),
    ...VOICE_SAMPLES.map((s) => s.text),
  ];
}
