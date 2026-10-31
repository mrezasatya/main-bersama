/**
 * Bank konten #30 Peta Dunia Mini: 50 negara (bendera, sapaan, sedikit fakta).
 * Semua berstatus 'perlu-ditinjau'. Bendera digambar sederhana tanpa lambang kecil.
 */
import type { FlagKey } from '../../src/core/art/flagKeys';
import { pickFrom, seeded, writeContent } from './lib';

/** [kunci, nama, sapaan, fakta?, dikenal anak 4 tahun?] */
const ROWS: [FlagKey, string, string, string | null, boolean][] = [
  ['indonesia', 'Indonesia', 'Halo, selamat pagi!', 'Hewan khasnya komodo.', true],
  ['malaysia', 'Malaysia', 'Selamat pagi!', null, true],
  ['singapura', 'Singapura', 'Hello!', null, true],
  ['thailand', 'Thailand', 'Sawasdee!', 'Gajah adalah hewan yang disayang di Thailand.', true],
  ['vietnam', 'Vietnam', 'Xin chào!', null, true],
  ['filipina', 'Filipina', 'Kumusta!', null, true],
  ['myanmar', 'Myanmar', 'Mingalaba!', null, false],
  ['laos', 'Laos', 'Sabaidee!', null, false],
  ['timorLeste', 'Timor Leste', 'Bondia!', null, false],
  ['jepang', 'Jepang', 'Konnichiwa!', 'Makanan khasnya sushi.', true],
  ['koreaSelatan', 'Korea Selatan', 'Annyeonghaseyo!', 'Makanan khasnya kimchi.', true],
  ['tiongkok', 'Tiongkok', 'Nǐ hǎo!', 'Hewan khasnya panda.', true],
  ['india', 'India', 'Namaste!', 'Makanan khasnya kari.', true],
  ['turki', 'Turki', 'Merhaba!', null, false],
  ['uea', 'Uni Emirat Arab', 'Marhaba!', 'Di sana banyak unta dan gurun pasir.', false],
  ['amerikaSerikat', 'Amerika Serikat', 'Hello!', 'Hewan lambangnya burung elang.', true],
  ['inggris', 'Inggris', 'Hello!', 'Di kota London ada bus tingkat berwarna merah.', true],
  ['prancis', 'Prancis', 'Bonjour!', 'Makanan khasnya roti panjang bernama baguette.', true],
  ['italia', 'Italia', 'Ciao!', 'Makanan khasnya pizza.', true],
  ['jerman', 'Jerman', 'Hallo!', null, true],
  ['belanda', 'Belanda', 'Hallo!', 'Terkenal dengan kincir angin dan bunga tulip.', true],
  ['spanyol', 'Spanyol', 'Hola!', null, true],
  ['rusia', 'Rusia', 'Privet!', 'Rusia adalah negara paling luas di dunia.', true],
  ['swiss', 'Swiss', 'Grüezi!', 'Terkenal dengan gunung bersalju.', false],
  ['brasil', 'Brasil', 'Olá!', 'Di sana ada hutan Amazon yang sangat luas.', true],
  ['argentina', 'Argentina', 'Hola!', null, false],
  ['kolombia', 'Kolombia', 'Hola!', null, false],
  ['chile', 'Chile', 'Hola!', null, false],
  ['peru', 'Peru', 'Hola!', 'Hewan khasnya llama.', false],
  ['kuba', 'Kuba', 'Hola!', null, false],
  ['jamaika', 'Jamaika', 'Wah gwaan!', null, false],
  ['nigeria', 'Nigeria', 'Bawo!', null, false],
  ['mali', 'Mali', 'I ni ce!', null, false],
  ['afrikaSelatan', 'Afrika Selatan', 'Sawubona!', 'Di sana ada singa, gajah, dan zebra.', false],
  ['yunani', 'Yunani', 'Yassou!', null, false],
  ['irlandia', 'Irlandia', 'Dia duit!', null, false],
  ['belgia', 'Belgia', 'Hallo!', null, false],
  ['austria', 'Austria', 'Servus!', null, false],
  ['polandia', 'Polandia', 'Dzień dobry!', null, false],
  ['hungaria', 'Hungaria', 'Szia!', null, false],
  ['rumania', 'Rumania', 'Bună!', null, false],
  ['bulgaria', 'Bulgaria', 'Zdravei!', null, false],
  ['ukraina', 'Ukraina', 'Pryvit!', null, false],
  ['lituania', 'Lituania', 'Labas!', null, false],
  ['estonia', 'Estonia', 'Tere!', null, false],
  ['swedia', 'Swedia', 'Hej!', null, false],
  ['norwegia', 'Norwegia', 'Hei!', null, false],
  ['denmark', 'Denmark', 'Hej!', null, false],
  ['finlandia', 'Finlandia', 'Moi!', null, false],
  ['islandia', 'Islandia', 'Halló!', null, false],
];

const rng = seeded(30);
const known = ROWS.filter((r) => r[4]).map((r) => r[0]);
const all = ROWS.map((r) => r[0]);

const items = ROWS.map(([k, name, hi, fact, easy]) => {
  // Usia 4: pengecoh dari negara terkenal; usia 5-6: boleh negara mana pun.
  const d = [...pickFrom(rng, known, 2, new Set([k])), ...pickFrom(rng, all, 1, new Set([k]))];
  const unique = [...new Set(d)];
  while (unique.length < 3) unique.push(...pickFrom(rng, all, 1, new Set([k, ...unique])));
  return {
    id: k,
    ageGroup: easy ? ['B', 'C'] : ['C'],
    difficulty: easy ? 2 : 4,
    speak: `Mana bendera ${name}?`,
    label: `Mana bendera ${name}?`,
    data: {
      options: [k, ...unique].map((c) => ({ t: 'flag', c })),
      labels: [name],
      speakAlso: [`${name}! Orang di sana menyapa: ${hi}`, ...(fact ? [fact] : [])],
    },
    tags: ['negara'],
    review: 'perlu-ditinjau',
  };
});

await writeContent('peta-dunia', items);
