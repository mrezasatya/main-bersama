/** Figur profesi (data murni). Pembeda utama: warna seragam, penutup kepala, aksesori. */
export type Hat =
  | 'none'
  | 'koki'
  | 'polisi'
  | 'helmPemadam'
  | 'caping'
  | 'pilot'
  | 'astronaut'
  | 'helmProyek'
  | 'blangkon'
  | 'perawat'
  | 'baret'
  | 'topiPet'
  | 'kerudung';
export type Accessory =
  | 'stetoskop'
  | 'dasi'
  | 'celemek'
  | 'rompi'
  | 'jasLab'
  | 'lencana'
  | 'kacamata'
  | 'kamera'
  | 'none';

export interface PersonSpec {
  outfit: string;
  pants?: string;
  hat: Hat;
  hatColor?: string;
  acc?: Accessory;
  skin?: string;
  hair?: string;
}

export const PEOPLE = {
  dokter: { outfit: '#FFFFFF', pants: '#3B7BF5', hat: 'none', acc: 'stetoskop' },
  perawat: { outfit: '#E8F4FF', pants: '#E8F4FF', hat: 'perawat', acc: 'none', skin: '#D9A07A' },
  guru: {
    outfit: '#9A62DD',
    pants: '#3A3A44',
    hat: 'kerudung',
    hatColor: '#F2B233',
    acc: 'kacamata',
  },
  polisi: {
    outfit: '#8C6B4A',
    pants: '#4A3A2A',
    hat: 'polisi',
    hatColor: '#4A3A2A',
    acc: 'lencana',
  },
  petugasPemadam: {
    outfit: '#D83A34',
    pants: '#3A3A44',
    hat: 'helmPemadam',
    hatColor: '#FFC83A',
    acc: 'rompi',
  },
  petani: { outfit: '#5E8C4A', pants: '#3A3A44', hat: 'caping', hatColor: '#E3B877' },
  nelayan: {
    outfit: '#2F8FD8',
    pants: '#5A4A40',
    hat: 'caping',
    hatColor: '#C98F4E',
    skin: '#C88A5A',
  },
  koki: { outfit: '#FFFFFF', pants: '#3A3A44', hat: 'koki', acc: 'celemek' },
  pilot: { outfit: '#FFFFFF', pants: '#22314F', hat: 'pilot', hatColor: '#22314F', acc: 'dasi' },
  masinis: { outfit: '#22314F', pants: '#22314F', hat: 'topiPet', hatColor: '#22314F' },
  tukangKayu: { outfit: '#C98F4E', pants: '#3B5A8A', hat: 'none', acc: 'celemek', skin: '#C88A5A' },
  montir: { outfit: '#3B5A8A', pants: '#3B5A8A', hat: 'topiPet', hatColor: '#E5484D' },
  penjahit: {
    outfit: '#FF8DB8',
    pants: '#5A4A40',
    hat: 'kerudung',
    hatColor: '#9A62DD',
    acc: 'kacamata',
  },
  pelukis: {
    outfit: '#FFF3D6',
    pants: '#3B7BF5',
    hat: 'baret',
    hatColor: '#E5484D',
    acc: 'celemek',
  },
  penyanyi: { outfit: '#E5484D', pants: '#2B2B33', hat: 'none', hair: '#5A3A22' },
  penari: { outfit: '#FFC83A', pants: '#B5442E', hat: 'none', acc: 'none', hair: '#2B2420' },
  dokterGigi: { outfit: '#BFE3F7', pants: '#BFE3F7', hat: 'none', acc: 'jasLab' },
  dokterHewan: { outfit: '#34B865', pants: '#2F5FA8', hat: 'none', acc: 'stetoskop' },
  tukangPos: { outfit: '#FF8A33', pants: '#3A3A44', hat: 'topiPet', hatColor: '#FF8A33' },
  satpam: {
    outfit: '#FFFFFF',
    pants: '#2B2B33',
    hat: 'polisi',
    hatColor: '#2B2B33',
    acc: 'lencana',
  },
  astronaut: { outfit: '#F5F7FA', pants: '#F5F7FA', hat: 'astronaut' },
  arsitek: {
    outfit: '#5A5560',
    pants: '#3A3A44',
    hat: 'helmProyek',
    hatColor: '#FFFFFF',
    acc: 'kacamata',
  },
  fotografer: {
    outfit: '#2B2B33',
    pants: '#5A4A40',
    hat: 'baret',
    hatColor: '#5A4A40',
    acc: 'kamera',
  },
  petugasKebersihan: {
    outfit: '#FF8A33',
    pants: '#FF8A33',
    hat: 'topiPet',
    hatColor: '#FF8A33',
    acc: 'rompi',
  },
  pedagang: {
    outfit: '#2F9E5B',
    pants: '#5A4A40',
    hat: 'kerudung',
    hatColor: '#E5484D',
    acc: 'celemek',
  },
  tukangRoti: { outfit: '#FFFFFF', pants: '#9C6239', hat: 'koki', acc: 'celemek', skin: '#D9A07A' },
  peternak: { outfit: '#C4552F', pants: '#3B5A8A', hat: 'caping', hatColor: '#C98F4E' },
  nakhoda: {
    outfit: '#FFFFFF',
    pants: '#FFFFFF',
    hat: 'pilot',
    hatColor: '#FFFFFF',
    acc: 'lencana',
  },
  pustakawan: {
    outfit: '#C98F4E',
    pants: '#3A3A44',
    hat: 'none',
    acc: 'kacamata',
    hair: '#9AA1AB',
  },
  ilmuwan: { outfit: '#FFFFFF', pants: '#3A3A44', hat: 'none', acc: 'jasLab', hair: '#9AA1AB' },
  pemrogram: { outfit: '#3B7BF5', pants: '#3A3A44', hat: 'none', acc: 'kacamata' },
  pemainBola: { outfit: '#E5484D', pants: '#FFFFFF', hat: 'none' },
  wasit: { outfit: '#2B2B33', pants: '#2B2B33', hat: 'none', acc: 'lencana' },
  musisi: { outfit: '#9A62DD', pants: '#2B2B33', hat: 'none', hair: '#2B2420' },
  dalang: { outfit: '#2B2B33', pants: '#9C6239', hat: 'blangkon', hatColor: '#9C6239' },
  pembatik: { outfit: '#B5442E', pants: '#9C6239', hat: 'kerudung', hatColor: '#FFC83A' },
  tukangCukur: { outfit: '#FFFFFF', pants: '#2B2B33', hat: 'none', acc: 'celemek' },
  kasir: { outfit: '#E5484D', pants: '#2B2B33', hat: 'kerudung', hatColor: '#E5484D' },
  sopir: { outfit: '#3B7BF5', pants: '#3A3A44', hat: 'topiPet', hatColor: '#3B7BF5' },
  penjualSayur: {
    outfit: '#FFC83A',
    pants: '#5A4A40',
    hat: 'caping',
    hatColor: '#E3B877',
    acc: 'celemek',
  },
  pembuatGerabah: {
    outfit: '#9C6239',
    pants: '#5A4A40',
    hat: 'none',
    acc: 'celemek',
    skin: '#C88A5A',
  },
  penjagaPantai: { outfit: '#E5302B', pants: '#FFC83A', hat: 'topiPet', hatColor: '#FFC83A' },
} as const satisfies Record<string, PersonSpec>;

export type PersonKey = keyof typeof PEOPLE;
export const PERSON_KEYS = Object.keys(PEOPLE) as PersonKey[];
