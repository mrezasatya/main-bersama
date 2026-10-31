# CLAUDE.md — Main Bersama

Bagian 1-9 di bawah adalah salinan dari `main-bersama-brief.md` (sumber kebenaran).
Katalog permainan (Bagian 10) dan urutan fase (Bagian 11) ada di berkas brief.

## Perintah

| Perintah                                                      | Fungsi                                                                       |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`                                                 | Server pengembangan                                                          |
| `npm run validate`                                            | Validasi semua `content.json` (juga jalan otomatis di `build`)               |
| `npm test`                                                    | Vitest (engine, progres, audio, validasi, permainan)                         |
| `npm run test:e2e`                                            | Playwright smoke test portrait/landscape/ponsel (butuh `npm run build` dulu) |
| `npm run lint` / `npm run typecheck` / `npm run format:check` | Wajib lolos sebelum commit (hook `.githooks/pre-commit`)                     |
| `npm run check`                                               | Semua pemeriksaan + build                                                    |
| `npm run icons`                                               | Membuat ulang ikon PNG dari `public/favicon.svg`                             |
| `npm run content`                                             | Membangkitkan ulang `content.json` dari tabel di `scripts/content/*.ts`      |
| `npm run voice`                                               | Membuat rekaman ElevenLabs untuk kalimat baru (lihat README)                 |

## Keputusan implementasi (Fase 0)

- **Router:** `HashRouter` (aman offline, tanpa rewrite). `vercel.json` hanya berisi header cache.
- **Kontrak permainan:** `src/games/<slug>/` berisi `index.tsx` (default export memanggil
  `<GameSession meta content Round />`), `Round.tsx` (komponen satu item, `RoundProps`),
  `meta.ts` (ekspor `meta: GameMeta` dan `guide: CompanionGuide` untuk halaman Pendamping),
  dan `content.json`. Daftarkan di `src/games/registry.ts` (dimuat lazy).
- **Tambahan kontrak di luar Bagian 6:** `CompanionGuide` (panduan aktivitas pendamping per permainan),
  `RoundProps`/`RoundResult` (antarmuka ronde ↔ sesi), dan `meta.number = 0` untuk permainan contoh.
- **Mesin adaptif** (`src/core/engine`): parameter di `config.ts`. Item "berhasil" = benar pada percobaan
  pertama; "kesulitan" = butuh >= 3 percobaan. Level dan riwayat disimpan per permainan per kelompok usia.
- **Bintang:** sesi selesai = 3; berhenti lebih awal = 1-2 (>= setengah sesi = 2). Tidak pernah berkurang.
- **Stiker:** stiker pertama di 3 bintang, lalu tiap 4 bintang (`core/progress/stickers.ts`).
- **Suara:** semua ucapan lewat `src/core/audio` (ESLint melarang `speechSynthesis` di luar modul ini).
  Bila tidak ada suara id-ID, aplikasi tidak berbicara (suara bahasa lain akan salah lafal); teks dan ikon tetap tampil.
- **PWA:** `registerType: 'prompt'`. Versi baru aktif otomatis saat aplikasi dibuka ulang, atau lewat tombol
  "Perbarui" di halaman Pendamping. Mode `autoUpdate` tidak dipakai karena memuat ulang halaman secara paksa
  dan bisa memotong permainan anak.
- **Rekaman suara (ElevenLabs):** `npm run voice` membuat MP3 untuk semua kalimat (`content.json` → `speak`,
  `src/core/audio/phrases.ts`, judul permainan, nama stiker) ke `public/voice/` + `manifest.json`.
  Nama berkas = `voiceKey(teks)-versiSuara`. `speak()` memutar rekaman bila ada, lalu jatuh ke suara perangkat.
  **Setiap kalimat baru yang dibacakan harus berasal dari `content.json` atau `phrases.ts`** (jangan merangkai
  angka/nama bebas di komponen), lalu jalankan `npm run voice`. `npm run validate` melaporkan cakupan rekaman.
- **Konten (Fase 1+):** `content.json` dibangkitkan dari tabel data di `scripts/content/<slug>.ts`
  (`npm run content`); ubah tabelnya, bukan JSON-nya. Pengecoh pilihan disimpan di `data.distractors`
  (id item lain di bank yang sama) dan dipilih otomatis: pengecoh pertama selalu cocok untuk usia 2-3.
- **Kalimat tambahan:** `data.speakAlso` (larik) untuk kalimat setelah benar, dan ekspor `phrases` di
  `meta.ts` untuk kalimat tetap permainan. Keduanya ikut divalidasi dan dibuatkan rekaman.
- **Komponen bersama:** `ChoiceGrid` (pilihan bergambar dengan kontrol kesalahan), `PictureQuiz`
  (impor langsung dari `core/ui/PictureQuiz`, tidak dari barrel, agar registri gambar tidak masuk bundle awal),
  `core/audio/effects.ts` (efek hewan/kendaraan) dan `core/audio/instruments.ts` (timbre + tangga nada).
- **Gambar:** keluarga SVG parametrik di `core/art/animals`, `core/art/vehicles`, `core/art/things.tsx`;
  spesifikasi data murni terpisah dari renderer agar validasi bisa membaca kuncinya. Galeri semua gambar:
  `#/dev/galeri` (hanya `npm run dev`).
- **Mesin ronde bersama (Fase 2-6)** di `src/core/ui/` (impor langsung, bukan dari barrel, bila memakai gambar):
  `OptionQuiz` (lihat/dengar lalu pilih; `minOptions`, `countable`, `optionSay`), `SequenceRound` (ketuk urutan),
  `MixedRound` (pilih + urutkan, `data.mode = 'urut'`), `TraceRound`/`TraceBoard` (menelusuri huruf/jalur di grid kasar),
  `DragBoard` (seret-lepas Pointer Events + ketuk-lalu-ketuk; wadah multi-isi untuk mengelompokkan),
  `CountableGroup` (menghitung dengan mengetuk). Ronde khas permainan ada di `src/games/<slug>/Round.tsx`
  (kartu memori, puzzle, laboratorium warna, mewarnai, kasir, buat pola).
- **Visual deklaratif** (`src/core/visual`): konten menulis `{ t: 'num' | 'group' | 'tenframe' | 'bond' | 'bar' |
'clock' | 'flag' | 'face' | 'shape' | 'money' | 'scene' | 'len' | 'neraca' | 'gelas' | 'row' | ... }`;
  `validate-content` memeriksa semua visual (gambar, bendera, bentuk, nilai uang) secara otomatis.
- **Album:** 60 stiker; stiker baru memakai gambar registri (`art`) atau bendera (`flag`), dimuat lazy.
- **Menu:** permainan yang cocok untuk usia anak tampil dulu; sisanya di bagian "Permainan untuk usia lain".
- **Usia di luar rentang permainan:** `effectiveAge()` memakai kelompok usia terdekat yang tersedia.
- **Gerbang pendamping:** tombol "Pendamping" di menu harus ditekan lama 1,5 detik.
- **Framer Motion** belum dipakai; animasi Fase 0 cukup dengan CSS (menghormati `prefers-reduced-motion`).

---

## 1. RINGKASAN PROYEK

| Item          | Keputusan                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------- |
| Nama aplikasi | Main Bersama                                                                                |
| Alamat        | `main-bersama.vercel.app` (jika sudah terpakai: `main-bersama-anak.vercel.app`)             |
| Jenis         | Satu web app berisi menu 30 permainan edukatif                                              |
| Pengguna      | Anak usia 2-6 tahun, didampingi orang tua (pemilik proyek, anaknya, dan anak teman-teman)   |
| Tujuan        | Edukasi dan hiburan sekaligus; aspek kognitif, motorik, bahasa, dan sosial-emosional        |
| Bahasa        | Bahasa Indonesia saja                                                                       |
| Perangkat     | Tablet (portrait dan landscape); tetap berfungsi di ponsel dan laptop                       |
| Konektivitas  | Online, dan bisa diinstal untuk dimainkan offline (PWA)                                     |
| Data pribadi  | Tidak ada akun, tidak ada iklan, tidak ada pelacak. Progres hanya di localStorage perangkat |
| Monetisasi    | Belum ada rencana                                                                           |
| Hosting       | Vercel (situs statis), kode di GitHub, deploy otomatis tiap push ke `main`                  |

---

## 2. KELOMPOK USIA

| Kode | Usia      | Karakter                                             | Implikasi desain                                                    |
| ---- | --------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| A    | 2-3 tahun | Motorik halus belum matang, rentang perhatian pendek | Target sentuh sangat besar, 1 instruksi, 2-3 pilihan, tanpa membaca |
| B    | 4 tahun   | Mulai mengenal simbol dan aturan sederhana           | 3-4 pilihan, instruksi 1-2 langkah                                  |
| C    | 5-6 tahun | Siap huruf, angka, dan logika sederhana              | 4-6 pilihan, boleh 2-3 langkah, teks pendek pendukung               |

Setiap permainan mengatur tingkat kesulitan **otomatis per kelompok usia**. Pemilihan kelompok usia dilakukan oleh pendamping di layar awal (bukan data pribadi, hanya preferensi tampilan yang disimpan di perangkat).

---

## 3. PRINSIP PEDAGOGI (WAJIB DIPATUHI)

Kurikulum rujukan: **Montessori, Cambridge Early Years, Singapore Math, Finlandia**. Filosofinya tidak seluruhnya searah, sehingga aturan berikut berlaku:

1. **Belajar lewat bermain.** Tidak ada ujian, tidak ada layar "kalah" atau "gagal".
2. **Isolasi satu konsep per permainan** (Montessori). Jangan menjejalkan banyak konsep dalam satu layar.
3. **Kontrol kesalahan mandiri** (Montessori). Anak menyadari kesalahan lewat umpan balik visual lembut, bukan hukuman.
4. **Concrete → Pictorial → Abstract** (Singapore Math) untuk semua permainan berhitung: benda dulu, lalu gambar/ten-frame/bar model, baru simbol angka.
5. **Eksplorasi dan kreativitas bebas** (Finlandia, Cambridge) pada permainan musik, mewarnai, dan cerita.
6. **Motivasi dari usaha, bukan persaingan.** Poin/hadiah tetap ada (permintaan pemilik), tetapi:
   - Bintang diberikan karena **mencoba dan menyelesaikan sesi**, bukan karena benar semua.
   - Tidak ada papan peringkat, tidak ada pengurangan poin, tidak ada hitung mundur yang menekan.
   - Hadiah utama: **Album Stiker Nusantara & Dunia** (dibuka bertahap).
7. **Umpan balik salah:** getaran lembut/animasi goyang + "Ayo coba lagi", tanpa bunyi buzzer, tanpa warna merah mengancam.
8. **Pendamping dilibatkan.** Halaman "Untuk Pendamping" berisi ide aktivitas fisik Montessori (misalnya menghitung biji asli) sebagai pelengkap karena versi digital tidak menggantikan materi konkret.

---

## 4. STACK TEKNIS (KEPUTUSAN FINAL)

- **Vite + React + TypeScript** (tanpa Next.js, karena tidak ada server atau akun).
- **React Router** (HashRouter agar aman di PWA/offline tanpa konfigurasi rewrite) atau BrowserRouter + `vercel.json` rewrite; pilih satu dan konsisten.
- **State:** Zustand (ringan) dengan persist ke localStorage.
- **Validasi konten:** Zod, dijalankan pada skrip validasi saat build.
- **PWA:** `vite-plugin-pwa` (Workbox), precache seluruh aset dan JSON.
- **Grafis:** SVG orisinal parametrik (komponen React). Jangan memakai emoji sebagai grafis utama karena tampilannya berbeda tiap perangkat. Jangan memakai karakter atau merek berhak cipta.
- **Animasi:** CSS dan Framer Motion seperlunya; hormati `prefers-reduced-motion`.
- **Suara ucapan:** Web Speech API `speechSynthesis` dengan `lang = "id-ID"`.
- **Suara musik/efek:** Web Audio API (sintesis, tanpa berkas audio berhak cipta). Alat musik dunia disintesis sederhana atau memakai sampel berlisensi bebas yang dicatat di `CREDITS.md`.
- **Drag and drop:** Pointer Events (bukan HTML5 DnD, karena buruk di layar sentuh).
- **Pengujian:** Vitest (logika, mesin adaptif, validasi konten) dan Playwright (smoke test portrait/landscape).
- **Linting:** ESLint + Prettier + `tsc --noEmit` wajib lolos sebelum commit.

---

## 5. ARSITEKTUR

```
/
├─ CLAUDE.md                  # salinan Bagian 1-9 brief ini
├─ CREDITS.md                 # lisensi aset/suara
├─ vercel.json
├─ public/
├─ scripts/
│  └─ validate-content.ts     # cek otomatis bank konten
├─ src/
│  ├─ app/                    # shell, router, menu, layout
│  ├─ core/
│  │  ├─ engine/              # mesin adaptif + pemilih konten tanpa pengulangan
│  │  ├─ audio/               # speak(), tone(), pengecekan suara id-ID
│  │  ├─ progress/            # bintang, level, stiker (store + persist)
│  │  ├─ ui/                  # tombol besar, kartu, umpan balik, layar hadiah
│  │  └─ art/                 # komponen SVG parametrik (buah, hewan, bentuk, motif)
│  ├─ games/
│  │  └─ <slug>/
│  │     ├─ index.tsx         # komponen permainan (lazy loaded)
│  │     ├─ content.json      # bank 40-50 unit konten
│  │     └─ meta.ts           # metadata permainan
│  ├─ pages/
│  │  ├─ Home.tsx             # menu permainan
│  │  ├─ Album.tsx            # album stiker
│  │  └─ Pendamping.tsx       # halaman untuk pendamping
│  └─ types/
```

**Aturan arsitektur**

- Setiap permainan = **satu mesin + satu berkas `content.json`**. Menambah konten tidak boleh mengubah kode.
- Permainan dimuat dengan `React.lazy` agar bundle awal kecil.
- Semua permainan memakai kontrak yang sama (lihat Bagian 6).
- Fungsi suara hanya dipanggil dari `core/audio`, tidak boleh memanggil `speechSynthesis` langsung dari permainan.

---

## 6. SKEMA KONTEN DAN KONTRAK PERMAINAN

```ts
type AgeGroup = 'A' | 'B' | 'C'; // A: 2-3, B: 4, C: 5-6
type ReviewStatus = 'perlu-ditinjau' | 'ditinjau';

interface GameMeta {
  id: string; // mis. "suara-hewan"
  number: number; // 1-30 sesuai katalog
  title: string;
  ageMin: number;
  ageMax: number;
  domain:
    'bahasa' | 'matematika' | 'sensorik' | 'sains' | 'musik' | 'sosial' | 'motorik' | 'budaya';
  curriculum: ('Montessori' | 'Cambridge' | 'Singapore Math' | 'Finlandia')[];
  usesAudio: boolean;
  phase: number;
}

interface ContentItem {
  id: string; // unik per permainan
  ageGroup: AgeGroup[]; // kelompok usia yang cocok
  difficulty: 1 | 2 | 3 | 4 | 5;
  speak: string; // teks yang dibacakan (ejaan fonetik bila perlu)
  label?: string; // teks tampilan
  assetKey?: string; // kunci komponen SVG
  data: Record<string, unknown>; // data khusus permainan
  tags: string[];
  review: ReviewStatus; // konten budaya/fakta awalnya 'perlu-ditinjau'
}
```

**Mesin adaptif (`core/engine`)**

- Memilih item sesuai kelompok usia dan level saat ini.
- **Tidak mengulang item sampai seluruh bank terpakai** (shuffle-bag), lalu reset.
- Level naik setelah 3 keberhasilan beruntun, turun setelah 3 kesulitan beruntun (nilai bisa dikonfigurasi). Turun level tidak pernah ditampilkan sebagai kegagalan.
- Satu sesi = 5-8 item, lalu layar hadiah (bintang + kemungkinan stiker baru).
- Kemajuan disimpan per permainan: level, item yang sudah dilihat, bintang.

**Validasi konten otomatis (`scripts/validate-content.ts`, dijalankan saat `npm run build` dan CI)**

1. Tiap `content.json` berisi **40-50 item**.
2. Tidak ada `id` atau `speak` duplikat.
3. Semua `assetKey` mengarah ke komponen SVG yang ada.
4. Tiap kelompok usia yang dicakup permainan punya minimal 10 item.
5. Tidak ada item tanpa `speak` pada permainan `usesAudio`.
6. Laporan jumlah item berstatus `perlu-ditinjau` per permainan.

---

## 7. SISTEM MOTIVASI

- **Bintang usaha:** 1-3 bintang per sesi berdasarkan penyelesaian dan keberanian mencoba, tidak pernah berkurang.
- **Album Stiker Nusantara & Dunia:** minimal 60 stiker (wayang, angklung, ondel-ondel, rumah adat, hewan khas, makanan, alat musik dunia, bendera, dst.), dibuka bertahap dari akumulasi bintang. Ilustrasi orisinal.
- **Level** per permainan, naik otomatis.
- **Layar hadiah** singkat (maks 4 detik), bisa dilewati.
- Tombol "Berhenti" selalu terlihat, tanpa rasa bersalah.
- Opsional: pengingat lembut setelah 20 menit bermain ("Yuk istirahat"), dapat dimatikan pendamping.

---

## 8. SUARA (RISIKO UTAMA, DIVALIDASI PERTAMA)

Kualitas suara `id-ID` bawaan browser berbeda di tiap tablet (iPad Safari, Chrome Android) dan bisa terdengar kaku. Ketentuan:

1. Buat modul `core/audio` dengan `speak(text, opts)` yang memilih suara `id-ID` terbaik yang tersedia, mengatur `rate` sekitar 0.8-0.9 untuk anak, dan jatuh balik ke teks+ikon bila suara tidak tersedia.
2. Peringatan di Pengaturan Pendamping bila perangkat tidak punya suara `id-ID`, disertai panduan menginstal suara dari pengaturan perangkat.
3. Browser mensyaratkan interaksi pengguna sebelum audio, sehingga sediakan layar "Ayo Mulai" yang membuka konteks audio.
4. Bunyi hewan memakai **tiruan bunyi yang dibacakan** ("mbeek", "kukuruyuk") dan efek tambahan dari Web Audio, bukan rekaman asli.
5. Setiap instruksi **selalu tampil juga sebagai ikon dan teks** agar permainan tetap bisa dimainkan jika suara buruk.
6. Sediakan halaman **"Uji Suara"** (tersembunyi di menu pendamping) berisi: daftar suara yang terdeteksi, tombol uji kalimat, uji nada Web Audio, uji kecepatan bicara. Halaman ini dipakai pemilik untuk validasi di tablet.

---

## 9. KUALITAS, KEAMANAN, DAN AKSESIBILITAS

- **Privasi:** tanpa analitik, tanpa pihak ketiga, tanpa font/CDN eksternal saat runtime (font di-bundle).
- **Keamanan anak:** tidak ada tautan keluar di area permainan; tautan apa pun hanya di halaman Pendamping.
- **Sentuhan:** area sentuh minimal 64 px untuk kelompok A; cegah zoom ganda, seret-pilih teks, dan menu konteks.
- **Responsif:** uji portrait dan landscape tablet (mis. 820x1180 dan 1180x820), plus ponsel (390x844).
- **Performa:** bundle awal < 250 KB gzip; permainan dimuat lazy; target Lighthouse Performance >= 90 di tablet menengah.
- **Akurasi konten:** konten budaya dan fakta diberi `review: 'perlu-ditinjau'` sampai pemilik memeriksa. Halaman Pendamping dapat menampilkan daftar item yang belum ditinjau (hanya untuk dev/mode peninjauan).
- **Hak cipta:** semua ilustrasi orisinal; tidak ada karakter, logo, atau lagu berhak cipta. Lagu tradisional hanya bila berstatus domain publik dan harus dicatat.
- **Bahasa:** kalimat pendek, kata sederhana, konsisten, dan ramah ("Ayo coba lagi", bukan "Salah").

---
