/** Spesifikasi gambar kendaraan (data murni). */
export type VehicleForm =
  | 'sedan'
  | 'van'
  | 'angkot'
  | 'jip'
  | 'jeepney'
  | 'bus'
  | 'busTingkat'
  | 'trem'
  | 'truk'
  | 'pemadam'
  | 'molen'
  | 'kereta'
  | 'keretaUap'
  | 'keretaCepat'
  | 'motor'
  | 'skuter'
  | 'sepeda'
  | 'becak'
  | 'bajaj'
  | 'delman'
  | 'gerobakSapi'
  | 'ekskavator'
  | 'traktor'
  | 'buldoser'
  | 'sampan'
  | 'perahuLayar'
  | 'pinisi'
  | 'jukung'
  | 'gondola'
  | 'speedboat'
  | 'feri'
  | 'kapalSelam'
  | 'jet'
  | 'balingBaling'
  | 'helikopter'
  | 'balonUdara'
  | 'roket'
  | 'keretaGantung';

export interface VehicleSpec {
  form: VehicleForm;
  color: string;
  accent?: string;
  /** Tanda khusus: taksi, polisi, ambulans, sampah. */
  mark?: 'taksi' | 'polisi' | 'ambulans' | 'sampah' | 'sekolah';
}

export const VEHICLES = {
  mobil: { form: 'sedan', color: '#E5484D' },
  taksi: { form: 'sedan', color: '#3B7BF5', mark: 'taksi' },
  mobilPolisi: { form: 'sedan', color: '#FFFFFF', accent: '#22314F', mark: 'polisi' },
  ambulans: { form: 'van', color: '#FFFFFF', accent: '#E5484D', mark: 'ambulans' },
  angkot: { form: 'angkot', color: '#2F8FD8', accent: '#FFC83A' },
  jip: { form: 'jip', color: '#5E8C4A' },
  jeepney: { form: 'jeepney', color: '#C9D4DF', accent: '#E5484D' },
  bus: { form: 'bus', color: '#34B865', accent: '#FFFFFF' },
  busSekolah: { form: 'bus', color: '#FFC83A', accent: '#2B2B33', mark: 'sekolah' },
  busTingkat: { form: 'busTingkat', color: '#D83A34' },
  trem: { form: 'trem', color: '#E5484D', accent: '#FFF3D6' },
  truk: { form: 'truk', color: '#3B7BF5', accent: '#E9E2D2' },
  trukSampah: { form: 'truk', color: '#2F9E5B', accent: '#9AA1AB', mark: 'sampah' },
  pemadam: { form: 'pemadam', color: '#E03A2F', accent: '#C9CED6' },
  trukMolen: { form: 'molen', color: '#F28C1A', accent: '#D7DCE3' },
  keretaApi: { form: 'kereta', color: '#F5F7FA', accent: '#2C6ED5' },
  keretaUap: { form: 'keretaUap', color: '#2B2B33', accent: '#D83A34' },
  keretaCepat: { form: 'keretaCepat', color: '#F5F7FA', accent: '#E5484D' },
  motor: { form: 'motor', color: '#E5484D' },
  skuter: { form: 'skuter', color: '#7FD1C6' },
  sepeda: { form: 'sepeda', color: '#3B7BF5' },
  becak: { form: 'becak', color: '#2F8FD8', accent: '#E5484D' },
  bajaj: { form: 'bajaj', color: '#F28C1A', accent: '#2B2B33' },
  tukTuk: { form: 'bajaj', color: '#34B865', accent: '#FFC83A' },
  delman: { form: 'delman', color: '#C4552F', accent: '#FFC83A' },
  gerobakSapi: { form: 'gerobakSapi', color: '#9C6239', accent: '#E3B877' },
  ekskavator: { form: 'ekskavator', color: '#FFC83A', accent: '#2B2B33' },
  traktor: { form: 'traktor', color: '#D83A34', accent: '#2B2B33' },
  buldoser: { form: 'buldoser', color: '#F2B233', accent: '#2B2B33' },
  sampan: { form: 'sampan', color: '#9C6239' },
  perahuLayar: { form: 'perahuLayar', color: '#FFFFFF', accent: '#E5484D' },
  pinisi: { form: 'pinisi', color: '#8A5A33', accent: '#F5EEDC' },
  jukung: { form: 'jukung', color: '#E5484D', accent: '#FFC83A' },
  gondola: { form: 'gondola', color: '#22222A', accent: '#C9A13A' },
  speedboat: { form: 'speedboat', color: '#FFFFFF', accent: '#3B7BF5' },
  kapalFeri: { form: 'feri', color: '#FFFFFF', accent: '#2C6ED5' },
  kapalSelam: { form: 'kapalSelam', color: '#FFC83A', accent: '#2B2B33' },
  pesawat: { form: 'jet', color: '#F5F7FA', accent: '#2C6ED5' },
  pesawatBaling: { form: 'balingBaling', color: '#FFC83A', accent: '#E5484D' },
  helikopter: { form: 'helikopter', color: '#E5484D', accent: '#2B2B33' },
  balonUdara: { form: 'balonUdara', color: '#E5484D', accent: '#FFC83A' },
  roket: { form: 'roket', color: '#F5F7FA', accent: '#E5484D' },
  keretaGantung: { form: 'keretaGantung', color: '#E5484D', accent: '#FFFFFF' },
} as const satisfies Record<string, VehicleSpec>;

export type VehicleKey = keyof typeof VEHICLES;
export const VEHICLE_KEYS = Object.keys(VEHICLES) as VehicleKey[];
