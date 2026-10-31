/**
 * Bank konten #14 Warna Batik: 40 templat mewarnai (batik, wayang, flora-fauna).
 * Templat dibangkitkan dari parameter; setiap area adalah jalur SVG (viewBox 100x100).
 */
import { writeContent } from './lib';

type Region = { d: string };
const r1 = (n: number) => Math.round(n * 10) / 10;
const rect = (x: number, y: number, w: number, h: number): Region => ({
  d: `M${x} ${y}H${x + w}V${y + h}H${x}Z`,
});
const poly = (pts: [number, number][]): Region => ({
  d: `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L')}Z`,
});
const ellipse = (cx: number, cy: number, rx: number, ry: number, rot = 0): Region => {
  const pts: [number, number][] = [];
  const a = (rot * Math.PI) / 180;
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 2;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    pts.push([cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]);
  }
  return poly(pts);
};
const circle = (cx: number, cy: number, r: number) => ellipse(cx, cy, r, r);
const BG = rect(2, 2, 96, 96);

const kawung = (n: number): Region[] => {
  const s = 96 / n;
  const out: Region[] = [BG];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const cx = 2 + s * (i + 0.5);
      const cy = 2 + s * (j + 0.5);
      out.push(
        ellipse(cx, cy - s * 0.24, s * 0.14, s * 0.22),
        ellipse(cx, cy + s * 0.24, s * 0.14, s * 0.22),
      );
      out.push(
        ellipse(cx - s * 0.24, cy, s * 0.22, s * 0.14),
        ellipse(cx + s * 0.24, cy, s * 0.22, s * 0.14),
      );
      out.push(circle(cx, cy, s * 0.06));
    }
  return out;
};
const parang = (bands: number): Region[] => {
  const out: Region[] = [BG];
  const w = 140 / bands;
  for (let i = 0; i < bands; i++) {
    const x = -40 + i * w;
    out.push(
      poly(
        [
          [x, 98],
          [x + w * 0.45, 98],
          [x + w * 0.45 + 60, 2],
          [x + 60, 2],
        ].map(([a = 0, b = 0]) => [Math.max(2, Math.min(98, a)), b] as [number, number]),
      ),
    );
  }
  return out;
};
const ceplok = (n: number): Region[] => {
  const s = 96 / n;
  const out: Region[] = [BG];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const cx = 2 + s * (i + 0.5);
      const cy = 2 + s * (j + 0.5);
      const k = s * 0.4;
      out.push(
        poly([
          [cx, cy - k],
          [cx + k * 0.35, cy - k * 0.35],
          [cx + k, cy],
          [cx + k * 0.35, cy + k * 0.35],
          [cx, cy + k],
          [cx - k * 0.35, cy + k * 0.35],
          [cx - k, cy],
          [cx - k * 0.35, cy - k * 0.35],
        ]),
      );
      out.push(circle(cx, cy, s * 0.1));
    }
  return out;
};
const truntum = (n: number): Region[] => {
  const s = 96 / n;
  const out: Region[] = [BG];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const cx = 2 + s * (i + 0.5);
      const cy = 2 + s * (j + 0.5);
      for (let p = 0; p < 6; p++) {
        const a = (p / 6) * Math.PI * 2;
        out.push(circle(cx + Math.cos(a) * s * 0.2, cy + Math.sin(a) * s * 0.2, s * 0.1));
      }
      out.push(circle(cx, cy, s * 0.09));
    }
  return out;
};
const megaMendung = (layers: number): Region[] => {
  const out: Region[] = [BG];
  for (let i = 0; i < layers; i++) {
    const k = 1 - i / (layers + 1);
    const cx = 50;
    const cy = 56;
    out.push(
      poly(
        Array.from({ length: 36 }, (_, t) => {
          const a = (t / 36) * Math.PI * 2;
          const bump = 1 + 0.18 * Math.cos(a * 5);
          return [cx + Math.cos(a) * 42 * k * bump, cy + Math.sin(a) * 30 * k * bump] as [
            number,
            number,
          ];
        }),
      ),
    );
  }
  return out;
};
const bunga = (petals: number, n = 1): Region[] => {
  const out: Region[] = [
    BG,
    rect(46, 60, 8, 36),
    ellipse(36, 78, 12, 5, -25),
    ellipse(64, 74, 12, 5, 25),
  ];
  const centers =
    n === 1
      ? [[50, 40]]
      : [
          [30, 38],
          [70, 38],
        ];
  for (const [cx, cy] of centers) {
    const pr = n === 1 ? 26 : 16;
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * 360;
      const rad = (a * Math.PI) / 180;
      out.push(
        ellipse(
          cx! + Math.cos(rad) * pr * 0.6,
          cy! + Math.sin(rad) * pr * 0.6,
          pr * 0.45,
          pr * 0.25,
          a,
        ),
      );
    }
    out.push(circle(cx!, cy!, pr * 0.28));
  }
  return out;
};
const kupu = (spots: boolean): Region[] => {
  const out: Region[] = [
    BG,
    ellipse(30, 36, 22, 16, -20),
    ellipse(70, 36, 22, 16, 20),
    ellipse(34, 64, 14, 12),
    ellipse(66, 64, 14, 12),
    ellipse(50, 50, 5, 26),
  ];
  if (spots) out.push(circle(28, 34, 6), circle(72, 34, 6), circle(34, 64, 4), circle(66, 64, 4));
  return out;
};
const ikan = (stripes: number): Region[] => {
  const out: Region[] = [
    BG,
    poly([
      [70, 50],
      [94, 30],
      [92, 70],
    ]),
    ellipse(44, 50, 34, 22),
    poly([
      [38, 28],
      [56, 16],
      [58, 30],
    ]),
    circle(22, 46, 5),
  ];
  for (let i = 0; i < stripes; i++) out.push(ellipse(40 + i * 10, 50, 3, 16));
  return out;
};
const rumah = (gadang: boolean): Region[] =>
  gadang
    ? [
        BG,
        poly([
          [6, 34],
          [26, 46],
          [38, 32],
          [50, 46],
          [62, 32],
          [74, 46],
          [94, 34],
          [80, 58],
          [20, 58],
        ]),
        rect(20, 58, 60, 24),
        rect(44, 64, 12, 18),
        rect(26, 64, 10, 8),
        rect(64, 64, 10, 8),
        rect(18, 82, 64, 6),
      ]
    : [
        BG,
        poly([
          [50, 12],
          [88, 44],
          [12, 44],
        ]),
        rect(18, 44, 64, 40),
        rect(44, 60, 14, 24),
        rect(24, 52, 12, 12),
        rect(64, 52, 12, 12),
        rect(10, 84, 80, 8),
      ];
const gunungan = (layers: number): Region[] => {
  const out: Region[] = [
    BG,
    poly([
      [50, 6],
      [80, 40],
      [86, 80],
      [50, 94],
      [14, 80],
      [20, 40],
    ]),
  ];
  for (let i = 1; i <= layers; i++) {
    const k = 1 - i * 0.18;
    out.push(
      poly([
        [50, 6 + 30 * (1 - k)],
        [50 + 30 * k, 40],
        [50 + 34 * k, 80 - 6 * (1 - k)],
        [50, 90 - 10 * (1 - k)],
        [50 - 34 * k, 80 - 6 * (1 - k)],
        [50 - 30 * k, 40],
      ]),
    );
  }
  out.push(rect(46, 56, 8, 30), circle(50, 46, 8));
  return out;
};
const wayang = (): Region[] => [
  BG,
  circle(50, 18, 9),
  poly([
    [42, 28],
    [58, 28],
    [64, 60],
    [36, 60],
  ]),
  poly([
    [36, 60],
    [64, 60],
    [60, 92],
    [40, 92],
  ]),
  poly([
    [42, 32],
    [20, 52],
    [24, 56],
    [44, 40],
  ]),
  poly([
    [58, 32],
    [80, 52],
    [76, 56],
    [56, 40],
  ]),
  rect(48, 92, 4, 6),
];
const daun = (veins: number): Region[] => {
  const out: Region[] = [
    BG,
    poly(
      Array.from({ length: 24 }, (_, t) => {
        const a = (t / 24) * Math.PI * 2;
        return [50 + Math.cos(a) * 26 * (1 + 0.1 * Math.sin(a)), 50 + Math.sin(a) * 42] as [
          number,
          number,
        ];
      }),
    ),
  ];
  for (let i = 1; i <= veins; i++) {
    const y = 14 + (i * 72) / (veins + 1);
    out.push(
      poly([
        [50, y],
        [72, y - 8],
        [72, y - 4],
        [50, y + 4],
      ]),
      poly([
        [50, y],
        [28, y - 8],
        [28, y - 4],
        [50, y + 4],
      ]),
    );
  }
  return out;
};
const matahari = (rays: number): Region[] => {
  const out: Region[] = [BG];
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const b = a + Math.PI / rays;
    const c = a - Math.PI / rays;
    out.push(
      poly([
        [50 + Math.cos(a) * 46, 50 + Math.sin(a) * 46],
        [50 + Math.cos(b) * 26, 50 + Math.sin(b) * 26],
        [50 + Math.cos(c) * 26, 50 + Math.sin(c) * 26],
      ]),
    );
  }
  out.push(circle(50, 50, 24), circle(42, 46, 3), circle(58, 46, 3));
  return out;
};
const pohon = (tiers: number): Region[] => {
  const out: Region[] = [BG, rect(44, 70, 12, 26)];
  for (let i = 0; i < tiers; i++) {
    const y = 14 + i * (56 / tiers);
    const w = 20 + i * 10;
    out.push(
      poly([
        [50, y],
        [50 + w, y + 30],
        [50 - w, y + 30],
      ]),
    );
  }
  return out;
};
const pelangi = (): Region[] => {
  const out: Region[] = [BG];
  for (let i = 0; i < 6; i++) {
    const R = 44 - i * 6;
    const pts: [number, number][] = [];
    for (let t = 0; t <= 12; t++)
      pts.push([50 - R * Math.cos((t / 12) * Math.PI), 80 - R * Math.sin((t / 12) * Math.PI)]);
    for (let t = 12; t >= 0; t--)
      pts.push([
        50 - (R - 6) * Math.cos((t / 12) * Math.PI),
        80 - (R - 6) * Math.sin((t / 12) * Math.PI),
      ]);
    out.push(poly(pts));
  }
  out.push(ellipse(16, 84, 12, 7), ellipse(84, 84, 12, 7));
  return out;
};
const mandala = (petals: number, rings: number): Region[] => {
  const out: Region[] = [BG];
  for (let r = rings; r >= 1; r--) {
    const R = 10 + r * 12;
    for (let p = 0; p < petals; p++) {
      const a = ((p + (r % 2) * 0.5) / petals) * 360;
      const rad = (a * Math.PI) / 180;
      out.push(ellipse(50 + Math.cos(rad) * R, 50 + Math.sin(rad) * R, 7, 4 + r, a));
    }
  }
  out.push(circle(50, 50, 9));
  return out;
};
const lurik = (n: number): Region[] =>
  Array.from({ length: n }, (_, i) => rect(2, 2 + (96 / n) * i, 96, 96 / n));
const kotak = (n: number): Region[] => {
  const s = 96 / n;
  const out: Region[] = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) out.push(rect(2 + i * s, 2 + j * s, s, s));
  return out;
};
const balon = (): Region[] => [
  BG,
  ellipse(30, 36, 14, 18),
  ellipse(52, 30, 14, 18),
  ellipse(72, 40, 14, 18),
  rect(29, 54, 1.5, 36),
  rect(51, 48, 1.5, 42),
  rect(71, 58, 1.5, 32),
];
const perahu = (): Region[] => [
  BG,
  poly([
    [50, 10],
    [50, 62],
    [84, 62],
  ]),
  poly([
    [46, 18],
    [46, 62],
    [20, 62],
  ]),
  poly([
    [10, 66],
    [90, 66],
    [78, 82],
    [22, 82],
  ]),
  rect(2, 84, 96, 14),
];
const burung = (): Region[] => [
  BG,
  ellipse(52, 56, 26, 18),
  circle(28, 40, 12),
  poly([
    [16, 38],
    [6, 42],
    [16, 46],
  ]),
  ellipse(58, 52, 16, 9, -15),
  poly([
    [76, 54],
    [96, 44],
    [94, 64],
  ]),
  circle(25, 37, 2.5),
];
const kucing = (): Region[] => [
  BG,
  circle(50, 54, 30),
  poly([
    [26, 34],
    [24, 10],
    [44, 28],
  ]),
  poly([
    [74, 34],
    [76, 10],
    [56, 28],
  ]),
  circle(40, 50, 5),
  circle(60, 50, 5),
  poly([
    [46, 62],
    [54, 62],
    [50, 67],
  ]),
];
const mobil = (): Region[] => [
  BG,
  poly([
    [10, 70],
    [10, 56],
    [26, 54],
    [36, 38],
    [66, 38],
    [78, 54],
    [90, 56],
    [90, 70],
  ]),
  poly([
    [39, 42],
    [50, 42],
    [50, 54],
    [31, 54],
  ]),
  poly([
    [54, 42],
    [64, 42],
    [73, 54],
    [54, 54],
  ]),
  circle(28, 72, 9),
  circle(72, 72, 9),
];

const T: [string, string, () => Region[], string[]][] = [
  ['kawung', 'batik kawung', () => kawung(2), ['A', 'B', 'C']],
  ['kawung-3', 'batik kawung kecil', () => kawung(3), ['C']],
  ['parang-3', 'batik parang', () => parang(3), ['A', 'B', 'C']],
  ['parang-5', 'batik parang rapat', () => parang(5), ['B', 'C']],
  ['ceplok', 'batik ceplok', () => ceplok(2), ['A', 'B', 'C']],
  ['ceplok-3', 'batik ceplok kecil', () => ceplok(3), ['C']],
  ['truntum', 'batik truntum', () => truntum(2), ['B', 'C']],
  ['truntum-3', 'batik truntum kecil', () => truntum(3), ['C']],
  ['mega-mendung', 'batik mega mendung', () => megaMendung(3), ['A', 'B', 'C']],
  ['mega-mendung-5', 'mega mendung berlapis', () => megaMendung(5), ['B', 'C']],
  ['bunga-5', 'bunga', () => bunga(5), ['A', 'B', 'C']],
  ['bunga-8', 'bunga besar', () => bunga(8), ['B', 'C']],
  ['bunga-dua', 'dua bunga', () => bunga(6, 2), ['B', 'C']],
  ['melati', 'bunga melati', () => bunga(6), ['A', 'B', 'C']],
  ['kupu', 'kupu-kupu', () => kupu(false), ['A', 'B', 'C']],
  ['kupu-totol', 'kupu-kupu bertotol', () => kupu(true), ['B', 'C']],
  ['ikan', 'ikan', () => ikan(0), ['A', 'B', 'C']],
  ['ikan-belang', 'ikan belang', () => ikan(3), ['B', 'C']],
  ['rumah', 'rumah', () => rumah(false), ['A', 'B', 'C']],
  ['rumah-gadang', 'rumah gadang', () => rumah(true), ['B', 'C']],
  ['gunungan', 'gunungan wayang', () => gunungan(1), ['B', 'C']],
  ['gunungan-3', 'gunungan wayang berlapis', () => gunungan(3), ['C']],
  ['wayang', 'wayang', wayang, ['B', 'C']],
  ['daun', 'daun', () => daun(2), ['A', 'B', 'C']],
  ['daun-4', 'daun besar', () => daun(4), ['B', 'C']],
  ['matahari', 'matahari', () => matahari(8), ['A', 'B', 'C']],
  ['matahari-12', 'matahari bersinar', () => matahari(12), ['B', 'C']],
  ['pohon', 'pohon cemara', () => pohon(2), ['A', 'B', 'C']],
  ['pohon-3', 'pohon cemara tinggi', () => pohon(3), ['B', 'C']],
  ['pelangi', 'pelangi', pelangi, ['A', 'B', 'C']],
  ['mandala-6', 'bunga mandala', () => mandala(6, 2), ['C']],
  ['mandala-8', 'mandala besar', () => mandala(8, 3), ['C']],
  ['lurik', 'kain lurik', () => lurik(6), ['A', 'B', 'C']],
  ['lurik-10', 'kain lurik rapat', () => lurik(10), ['B', 'C']],
  ['kotak', 'kotak-kotak', () => kotak(3), ['A', 'B', 'C']],
  ['kotak-4', 'kotak-kotak kecil', () => kotak(4), ['C']],
  ['balon', 'balon', balon, ['A', 'B', 'C']],
  ['perahu', 'perahu layar', perahu, ['A', 'B', 'C']],
  ['burung', 'burung', burung, ['B', 'C']],
  ['kucing', 'kucing', kucing, ['A', 'B', 'C']],
  ['mobil', 'mobil', mobil, ['B', 'C']],
];

const items = T.map(([id, name, make, age]) => {
  const regions = make();
  return {
    id,
    ageGroup: age,
    difficulty: Math.min(5, Math.max(1, Math.round(regions.length / 8))),
    speak: `Ayo warnai ${name}! Pilih warna, lalu ketuk bagian gambarnya.`,
    label: `Warnai ${name}`,
    data: { regions, speakAlso: [`Indah sekali, ${name} buatanmu!`] },
    tags: ['mewarnai', id.split('-')[0]!],
    review:
      id.startsWith('gunungan') || id === 'wayang' || id === 'rumah-gadang'
        ? 'perlu-ditinjau'
        : 'ditinjau',
  };
});

await writeContent('warna-batik', items);
