/**
 * Spesifikasi gambar hewan (data murni, tanpa React) agar bisa dibaca skrip validasi.
 * Setiap hewan digambar oleh satu "keluarga" renderer dengan parameter berbeda.
 */
export type Ear = 'runcing' | 'bulat' | 'terkulai' | 'lebar' | 'tegak' | 'kecil' | 'samping';
export type Horn = 'lengkung' | 'pendek' | 'lebar';
export type Tail = 'tipis' | 'lebat' | 'panjang' | 'pendek' | 'kuda' | 'jumbai';
export type Snout = 'panjang' | 'pendek' | 'belalai' | 'moncong' | 'lebar' | 'runcing';

export interface QuadSpec {
  kind: 'kaki4';
  color: string;
  belly?: string;
  bodyW?: number;
  bodyH?: number;
  legLen?: number;
  legW?: number;
  headR?: number;
  neck?: number;
  snout: Snout;
  muzzle?: string;
  ear: Ear;
  earColor?: string;
  horn?: Horn;
  tail: Tail;
  pattern?: 'belang' | 'totol' | 'wol';
  patternColor?: string;
  mane?: 'singa' | 'kuda';
  maneColor?: string;
  beard?: boolean;
  tusk?: boolean;
  face?: string;
  whisker?: boolean;
  scale?: number;
}

export interface PrimateSpec {
  kind: 'primata';
  color: string;
  face: string;
  arms?: 'naik' | 'dada' | 'turun';
  tail?: boolean;
  big?: boolean;
}

export interface BirdSpec {
  kind: 'burung';
  color: string;
  wing?: string;
  belly?: string;
  head?: string;
  beak: 'kerucut' | 'bebek' | 'kait' | 'runcing' | 'pendek';
  beakColor?: string;
  tail?: 'kipas' | 'ayam' | 'pendek' | 'panjang' | 'kalkun';
  tailColor?: string;
  comb?: 'besar' | 'kecil';
  crest?: string;
  wattle?: string;
  neck?: number;
  owl?: boolean;
  chick?: boolean;
  legColor?: string;
}

export interface ReptileSpec {
  kind: 'reptil';
  form: 'katak' | 'ular' | 'kadal';
  color: string;
  spots?: string;
  belly?: string;
  tongue?: boolean;
  big?: boolean;
}

export interface BugSpec {
  kind: 'serangga';
  form: 'lebah' | 'nyamuk' | 'jangkrik' | 'tonggeret';
}

export interface SeaSpec {
  kind: 'laut';
  form: 'lumba' | 'paus' | 'anjingLaut';
}

export type AnimalSpec = QuadSpec | PrimateSpec | BirdSpec | ReptileSpec | BugSpec | SeaSpec;

export const ANIMALS = {
  kambing: {
    kind: 'kaki4',
    color: '#F2EEE6',
    snout: 'panjang',
    muzzle: '#E6DFD2',
    ear: 'samping',
    horn: 'lengkung',
    tail: 'pendek',
    beard: true,
    legLen: 22,
  },
  domba: {
    kind: 'kaki4',
    color: '#FBF8F1',
    pattern: 'wol',
    face: '#3A3330',
    snout: 'pendek',
    ear: 'samping',
    earColor: '#3A3330',
    tail: 'pendek',
    legLen: 18,
  },
  sapi: {
    kind: 'kaki4',
    color: '#FFFFFF',
    pattern: 'totol',
    patternColor: '#2E2B2B',
    snout: 'lebar',
    muzzle: '#F6B7C2',
    ear: 'samping',
    horn: 'pendek',
    tail: 'jumbai',
    bodyW: 32,
    bodyH: 19,
  },
  kerbau: {
    kind: 'kaki4',
    color: '#5E5C63',
    snout: 'lebar',
    muzzle: '#4A484E',
    ear: 'samping',
    horn: 'lebar',
    tail: 'jumbai',
    bodyW: 32,
    bodyH: 19,
  },
  kuda: {
    kind: 'kaki4',
    color: '#9B5A2E',
    snout: 'panjang',
    muzzle: '#7A4422',
    ear: 'tegak',
    tail: 'kuda',
    mane: 'kuda',
    maneColor: '#3B2414',
    legLen: 28,
    neck: 1.4,
  },
  keledai: {
    kind: 'kaki4',
    color: '#9C9AA0',
    belly: '#D9D7DB',
    snout: 'panjang',
    muzzle: '#E8E6E9',
    ear: 'tegak',
    earColor: '#55535A',
    tail: 'jumbai',
    mane: 'kuda',
    maneColor: '#55535A',
    legLen: 24,
  },
  kucing: {
    kind: 'kaki4',
    color: '#F2A55A',
    pattern: 'belang',
    patternColor: '#D9822B',
    belly: '#FFE9CF',
    snout: 'pendek',
    ear: 'runcing',
    tail: 'panjang',
    whisker: true,
    legLen: 16,
    bodyW: 24,
    bodyH: 13,
    headR: 14,
  },
  anjing: {
    kind: 'kaki4',
    color: '#D49A5A',
    belly: '#F4DDBB',
    snout: 'moncong',
    muzzle: '#F4DDBB',
    ear: 'terkulai',
    earColor: '#8E5A2B',
    tail: 'lebat',
    legLen: 19,
    bodyW: 26,
    bodyH: 15,
  },
  singa: {
    kind: 'kaki4',
    color: '#E3AE52',
    belly: '#F2D398',
    snout: 'moncong',
    muzzle: '#F6E2B8',
    ear: 'bulat',
    mane: 'singa',
    maneColor: '#A35A1E',
    tail: 'jumbai',
    legLen: 20,
  },
  harimau: {
    kind: 'kaki4',
    color: '#F08A24',
    belly: '#FFF3E0',
    pattern: 'belang',
    patternColor: '#2B2320',
    snout: 'moncong',
    muzzle: '#FFF3E0',
    ear: 'bulat',
    tail: 'panjang',
    whisker: true,
    legLen: 19,
  },
  serigala: {
    kind: 'kaki4',
    color: '#8D96A3',
    belly: '#E3E7EC',
    snout: 'runcing',
    muzzle: '#E3E7EC',
    ear: 'runcing',
    tail: 'lebat',
    legLen: 22,
    bodyW: 27,
    bodyH: 15,
  },
  beruang: {
    kind: 'kaki4',
    color: '#7A4B2A',
    snout: 'moncong',
    muzzle: '#C69B6D',
    ear: 'bulat',
    tail: 'pendek',
    legLen: 16,
    legW: 10,
    bodyW: 32,
    bodyH: 21,
    headR: 16,
  },
  tikus: {
    kind: 'kaki4',
    color: '#A7A2A8',
    belly: '#E4E0E5',
    snout: 'runcing',
    muzzle: '#F3B9C6',
    ear: 'bulat',
    earColor: '#F3B9C6',
    tail: 'tipis',
    whisker: true,
    legLen: 9,
    legW: 5,
    bodyW: 25,
    bodyH: 15,
    headR: 12,
    scale: 0.85,
  },
  gajah: {
    kind: 'kaki4',
    color: '#9AA1AB',
    snout: 'belalai',
    ear: 'lebar',
    earColor: '#868D97',
    tail: 'tipis',
    tusk: true,
    legLen: 22,
    legW: 12,
    bodyW: 34,
    bodyH: 23,
    headR: 18,
  },
  kudaNil: {
    kind: 'kaki4',
    color: '#8C7B9A',
    belly: '#D9A9B5',
    snout: 'lebar',
    muzzle: '#B79AB0',
    ear: 'kecil',
    tail: 'pendek',
    legLen: 12,
    legW: 11,
    bodyW: 35,
    bodyH: 21,
    headR: 16,
  },
  monyet: { kind: 'primata', color: '#8B5A33', face: '#E9C29A', arms: 'turun', tail: true },
  gorila: { kind: 'primata', color: '#2F2C33', face: '#5A5560', arms: 'dada', big: true },
  owa: { kind: 'primata', color: '#8F8A86', face: '#2F2C33', arms: 'naik' },
  ayamJago: {
    kind: 'burung',
    color: '#C2462C',
    wing: '#7A2A1A',
    head: '#E58B35',
    beak: 'pendek',
    tail: 'ayam',
    tailColor: '#1F3A2E',
    comb: 'besar',
    wattle: '#E5302B',
  },
  ayamBetina: {
    kind: 'burung',
    color: '#C89060',
    wing: '#9E6A3E',
    beak: 'pendek',
    tail: 'pendek',
    tailColor: '#9E6A3E',
    comb: 'kecil',
    wattle: '#E5302B',
  },
  anakAyam: { kind: 'burung', color: '#FFD84A', wing: '#F2C230', beak: 'pendek', chick: true },
  bebek: {
    kind: 'burung',
    color: '#FFFFFF',
    wing: '#E7E3DA',
    beak: 'bebek',
    beakColor: '#FF9F1C',
    tail: 'pendek',
    legColor: '#FF9F1C',
  },
  angsa: {
    kind: 'burung',
    color: '#FFFFFF',
    wing: '#ECE8E0',
    beak: 'bebek',
    beakColor: '#FF7A1A',
    tail: 'pendek',
    neck: 2.2,
    legColor: '#3A3330',
  },
  kalkun: {
    kind: 'burung',
    color: '#5B4232',
    wing: '#3E2C21',
    head: '#D9B8A6',
    beak: 'pendek',
    tail: 'kalkun',
    tailColor: '#8A6446',
    wattle: '#E5302B',
  },
  pipit: {
    kind: 'burung',
    color: '#9C6B43',
    wing: '#6E4A2E',
    belly: '#F0DEC6',
    head: '#7A4F2E',
    beak: 'kerucut',
    tail: 'pendek',
  },
  burungHantu: {
    kind: 'burung',
    color: '#9B7A57',
    wing: '#6E5238',
    belly: '#E8D6BC',
    beak: 'kait',
    owl: true,
  },
  gagak: {
    kind: 'burung',
    color: '#2A2A33',
    wing: '#1C1C24',
    beak: 'runcing',
    beakColor: '#2A2A33',
    tail: 'panjang',
  },
  merpati: {
    kind: 'burung',
    color: '#A7ADBA',
    wing: '#8A91A0',
    head: '#7F8796',
    belly: '#C4C9D3',
    beak: 'kerucut',
    beakColor: '#5A5560',
    tail: 'pendek',
    legColor: '#E5615A',
  },
  perkutut: {
    kind: 'burung',
    color: '#B4AA9A',
    wing: '#8C8070',
    head: '#9FA6B0',
    belly: '#E3D8C6',
    beak: 'kerucut',
    beakColor: '#5A6A80',
    tail: 'panjang',
  },
  tekukur: {
    kind: 'burung',
    color: '#B58E74',
    wing: '#8B6A55',
    head: '#A9A0A4',
    belly: '#D9BBA4',
    beak: 'kerucut',
    beakColor: '#3A3330',
    tail: 'panjang',
    wattle: '#2A2A33',
  },
  kakatua: {
    kind: 'burung',
    color: '#FFFFFF',
    wing: '#EFEFEF',
    beak: 'kait',
    beakColor: '#2A2A33',
    tail: 'pendek',
    crest: '#FFD23F',
  },
  beo: {
    kind: 'burung',
    color: '#1E2026',
    wing: '#2B4A3E',
    beak: 'kait',
    beakColor: '#FF9A1F',
    tail: 'pendek',
    wattle: '#FFD23F',
  },
  elang: {
    kind: 'burung',
    color: '#8C4A22',
    wing: '#6B3618',
    head: '#FFFFFF',
    belly: '#FFFFFF',
    beak: 'kait',
    beakColor: '#F2C230',
    tail: 'pendek',
    legColor: '#F2C230',
  },
  pelatuk: {
    kind: 'burung',
    color: '#2A2A33',
    wing: '#FFFFFF',
    head: '#E5302B',
    belly: '#FFFFFF',
    beak: 'runcing',
    beakColor: '#5A5560',
    tail: 'panjang',
  },
  merak: {
    kind: 'burung',
    color: '#1C6FB8',
    wing: '#2A8C6E',
    beak: 'kerucut',
    tail: 'kipas',
    tailColor: '#2A8C6E',
    crest: '#1C6FB8',
    neck: 1.4,
  },
  katak: { kind: 'reptil', form: 'katak', color: '#5DBB4A', belly: '#D8F0B8' },
  tokek: { kind: 'reptil', form: 'kadal', color: '#7C8FB0', spots: '#F28C38' },
  cicak: { kind: 'reptil', form: 'kadal', color: '#E7DCC7', spots: '#CDBFA6' },
  ular: { kind: 'reptil', form: 'ular', color: '#5FAE3E', spots: '#3E7F28', tongue: true },
  komodo: {
    kind: 'reptil',
    form: 'kadal',
    color: '#7E7A5A',
    spots: '#615D42',
    tongue: true,
    big: true,
  },
  lebah: { kind: 'serangga', form: 'lebah' },
  nyamuk: { kind: 'serangga', form: 'nyamuk' },
  jangkrik: { kind: 'serangga', form: 'jangkrik' },
  tonggeret: { kind: 'serangga', form: 'tonggeret' },
  lumbaLumba: { kind: 'laut', form: 'lumba' },
  paus: { kind: 'laut', form: 'paus' },
  anjingLaut: { kind: 'laut', form: 'anjingLaut' },
} as const satisfies Record<string, AnimalSpec>;

export type AnimalKey = keyof typeof ANIMALS;
export const ANIMAL_KEYS = Object.keys(ANIMALS) as AnimalKey[];
