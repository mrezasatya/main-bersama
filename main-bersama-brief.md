# BRIEF PROYEK: "Main Bersama"

> Dokumen ini adalah sumber kebenaran (single source of truth) untuk membangun seluruh web app dengan Claude Code, fase demi fase.
> Salin bagian "Konteks Global" (Bagian 1-9) ke `CLAUDE.md` di root repositori. Gunakan Bagian 11 sebagai prompt per fase.

---

## 1. RINGKASAN PROYEK

| Item | Keputusan |
|---|---|
| Nama aplikasi | Main Bersama |
| Alamat | `main-bersama.vercel.app` (jika sudah terpakai: `main-bersama-anak.vercel.app`) |
| Jenis | Satu web app berisi menu 30 permainan edukatif |
| Pengguna | Anak usia 2-6 tahun, didampingi orang tua (pemilik proyek, anaknya, dan anak teman-teman) |
| Tujuan | Edukasi dan hiburan sekaligus; aspek kognitif, motorik, bahasa, dan sosial-emosional |
| Bahasa | Bahasa Indonesia saja |
| Perangkat | Tablet (portrait dan landscape); tetap berfungsi di ponsel dan laptop |
| Konektivitas | Online, dan bisa diinstal untuk dimainkan offline (PWA) |
| Data pribadi | Tidak ada akun, tidak ada iklan, tidak ada pelacak. Progres hanya di localStorage perangkat |
| Monetisasi | Belum ada rencana |
| Hosting | Vercel (situs statis), kode di GitHub, deploy otomatis tiap push ke `main` |

---

## 2. KELOMPOK USIA

| Kode | Usia | Karakter | Implikasi desain |
|---|---|---|---|
| A | 2-3 tahun | Motorik halus belum matang, rentang perhatian pendek | Target sentuh sangat besar, 1 instruksi, 2-3 pilihan, tanpa membaca |
| B | 4 tahun | Mulai mengenal simbol dan aturan sederhana | 3-4 pilihan, instruksi 1-2 langkah |
| C | 5-6 tahun | Siap huruf, angka, dan logika sederhana | 4-6 pilihan, boleh 2-3 langkah, teks pendek pendukung |

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
type AgeGroup = 'A' | 'B' | 'C';          // A: 2-3, B: 4, C: 5-6
type ReviewStatus = 'perlu-ditinjau' | 'ditinjau';

interface GameMeta {
  id: string;                 // mis. "suara-hewan"
  number: number;             // 1-30 sesuai katalog
  title: string;
  ageMin: number;
  ageMax: number;
  domain: 'bahasa' | 'matematika' | 'sensorik' | 'sains' | 'musik' | 'sosial' | 'motorik' | 'budaya';
  curriculum: ('Montessori' | 'Cambridge' | 'Singapore Math' | 'Finlandia')[];
  usesAudio: boolean;
  phase: number;
}

interface ContentItem {
  id: string;                 // unik per permainan
  ageGroup: AgeGroup[];       // kelompok usia yang cocok
  difficulty: 1 | 2 | 3 | 4 | 5;
  speak: string;              // teks yang dibacakan (ejaan fonetik bila perlu)
  label?: string;             // teks tampilan
  assetKey?: string;          // kunci komponen SVG
  data: Record<string, unknown>;  // data khusus permainan
  tags: string[];
  review: ReviewStatus;       // konten budaya/fakta awalnya 'perlu-ditinjau'
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

## 10. KATALOG 30 PERMAINAN

Setiap permainan memiliki **40-50 unit konten**. Kolom Fase mengikuti urutan baru (sound-first, Bagian 11).

| # | Permainan | Usia | Isi bank konten (40-50 unit) | Rujukan | Fase |
|---|---|---|---|---|---|
| 1 | Pasang Bentuk | 2-4 | 45 siluet: bentuk dasar, motif batik, rumah adat, hewan | Montessori | 4 |
| 2 | Campur Warna | 2-5 | 40 percobaan: warna primer, sekunder, gelap/terang, warna benda alam | Cambridge | 4 |
| 3 | Urutkan Besar-Kecil | 2-5 | 45 set: ukuran, tinggi, tebal, jumlah 3-10 benda | Montessori | 4 |
| 4 | Suara Hewan Nusantara & Dunia | 2-4 | 50 hewan beserta nama, bunyi tiruan, habitat | Cambridge | 1 |
| 5 | Hitung Buah | 3-6 | 50 level: hitung 1-10, banyak/sedikit, tambah, kurang | Singapore Math | 5 |
| 6 | Kebun Angka | 5-6 | 45 level: ten-frame, pasangan bilangan, bar model | Singapore Math | 5 |
| 7 | Huruf Pasir | 3-6 | 46 huruf dan angka: telusuri, bunyi, kata awalan | Montessori | 2 |
| 8 | Rangkai Suku Kata | 5-6 | 50 kata bergambar (2-3 suku kata) | Montessori | 2 |
| 9 | Pasangan Budaya | 3-6 | 50 pasang kartu: rumah adat, pakaian, makanan, alat musik | Finlandia | 4 |
| 10 | Pola Batik | 4-6 | 45 pola: AB, ABC, AAB, pola tumbuh, buat sendiri | Singapore Math | 6 |
| 11 | Nada Nusantara | 2-6 | 40 alat musik dan tangga nada (angklung, kolintang, gamelan, dunia) | Finlandia | 1 |
| 12 | Rasa Hatiku | 4-6 | 45 situasi: kenali emosi dan pilih tindakan | Finlandia | 3 |
| 13 | Jalan Garis | 2-6 | 45 jalur: lurus, zigzag, lengkung, spiral, huruf, angka | Montessori | 6 |
| 14 | Warna Batik | 3-6 | 40 templat mewarnai: batik, wayang, flora-fauna | Finlandia | 6 |
| 15 | Cari yang Beda | 3-6 | 45 level: beda warna, bentuk, jumlah, kategori | Cambridge | 5 |
| 16 | Kelompokkan | 3-6 | 45 aturan: warna, bentuk, hewan darat/air/udara, buah/sayur | Montessori | 5 |
| 17 | Puzzle Gambar | 2-6 | 40 puzzle 2-20 keping: hewan, rumah adat, tempat dunia | Montessori | 4 |
| 18 | Gelembung Angka | 3-6 | 50 level: kenali angka, urutan, lebih besar/kecil, loncat bilangan | Singapore Math | 2 |
| 19 | Jam dan Hari | 4-6 | 40 soal: kegiatan harian, hari, bulan, jam bulat | Cambridge | 3 |
| 20 | Rumah Bentuk | 3-6 | 40 level: bentuk 2D, 3D, cari bentuk di sekitar | Singapore Math | 5 |
| 21 | Toko Kecil | 5-6 | 40 transaksi: kenali rupiah, tukar, hitung belanja kecil | Singapore Math | 6 |
| 22 | Ukur dan Bandingkan | 4-6 | 40 soal: panjang, berat, isi (satuan tak baku) | Singapore Math | 6 |
| 23 | Ayo Berkebun | 3-6 | 40 aktivitas: tahap tumbuh, kebutuhan tanaman, merawat | Cambridge | 3 |
| 24 | Dari Mana Asalnya? | 4-6 | 40 soal: asal makanan, cuaca, siang-malam, musim | Cambridge | 3 |
| 25 | Profesi dan Alatnya | 3-6 | 45 profesi beserta alat, tempat kerja, dan manfaatnya | Finlandia | 2 |
| 26 | Kendaraan dan Suaranya | 2-4 | 40 kendaraan darat, laut, udara, tradisional dan dunia | Cambridge | 1 |
| 27 | Panca Indra dan Tubuhku | 2-5 | 40 kegiatan: bagian tubuh, rasa, bau, suara, tekstur | Montessori | 1 |
| 28 | Cerita Pilihanku | 4-6 | 40 cerita pendek bercabang tentang nilai (berbagi, jujur, sabar) | Finlandia | 3 |
| 29 | Tiru Irama | 3-6 | 45 pola ritme dan tepuk, 2-6 ketukan | Finlandia | 1 |
| 30 | Peta Dunia Mini | 4-6 | 50 negara: bendera, makanan, hewan khas, sapaan | Cambridge | 2 |

---

## 11. FASE PEMBANGUNAN (URUTAN SOUND-FIRST)

Alasan urutan: pemilik ingin memvalidasi kualitas suara lebih dulu karena suara bawaan browser adalah risiko terbesar. Fase 1 sengaja memuat permainan yang inti interaksinya adalah bunyi (rekaman ucapan dan Web Audio), sehingga **kedua teknologi suara** (TTS dan Web Audio) teruji sebelum permainan lain dibangun di atasnya.

| Fase | Tema | Permainan | Yang divalidasi pemilik |
|---|---|---|---|
| **0** | Fondasi + Uji Suara | 1 permainan contoh (kerangka) | Aplikasi terbuka dan terinstal di tablet; halaman "Uji Suara" menunjukkan suara id-ID layak |
| **1** | Bunyi dan Musik | #4 Suara Hewan, #26 Kendaraan dan Suaranya, #11 Nada Nusantara, #29 Tiru Irama, #27 Panca Indra | Kualitas TTS dan Web Audio di tablet; reaksi anak terhadap bunyi |
| **2** | Bahasa Lisan dan Huruf | #7 Huruf Pasir, #8 Rangkai Suku Kata, #18 Gelembung Angka, #30 Peta Dunia Mini, #25 Profesi dan Alatnya | Pelafalan huruf, angka, suku kata, dan sapaan |
| **3** | Narasi dan Nilai | #12 Rasa Hatiku, #28 Cerita Pilihanku, #19 Jam dan Hari, #24 Dari Mana Asalnya, #23 Ayo Berkebun | Kenyamanan kalimat panjang yang dibacakan |
| **4** | Sensorik Visual | #1 Pasang Bentuk, #2 Campur Warna, #9 Pasangan Budaya, #17 Puzzle Gambar, #3 Urutkan Besar-Kecil | Interaksi seret dan lepas di layar sentuh |
| **5** | Berhitung dan Logika | #5 Hitung Buah, #6 Kebun Angka, #20 Rumah Bentuk, #15 Cari yang Beda, #16 Kelompokkan | Alur Concrete → Pictorial → Abstract |
| **6** | Kreativitas dan Pengukuran | #10 Pola Batik, #13 Jalan Garis, #14 Warna Batik, #21 Toko Kecil, #22 Ukur dan Bandingkan + penyempurnaan akhir | Kualitas keseluruhan, album stiker lengkap |

**Aturan tiap fase:** bangun → uji otomatis → deploy ke Vercel → pemilik menguji bersama anak → revisi → baru lanjut fase berikutnya.

### Definition of Done (berlaku untuk setiap permainan)
- [ ] 40-50 unit konten, lolos `validate-content`.
- [ ] Mesin adaptif memilih per kelompok usia A/B/C tanpa pengulangan sebelum bank habis.
- [ ] Instruksi tampil sebagai suara **dan** ikon/teks.
- [ ] Tidak ada layar "kalah"; umpan balik salah lembut.
- [ ] Berfungsi di portrait dan landscape tablet.
- [ ] Sesi berakhir dengan layar hadiah; bintang tersimpan.
- [ ] Lazy loaded; tidak membengkakkan bundle awal.
- [ ] Item budaya/fakta bertanda `perlu-ditinjau`.
- [ ] `npm run lint`, `tsc --noEmit`, `npm test`, `npm run build` lolos.
- [ ] Panduan aktivitas fisik pendamping untuk permainan itu ditambahkan ke halaman Pendamping.

---

## 12. HALAMAN "UNTUK PENDAMPING"

- Tanpa data anak. Isinya: cara menginstal ke layar utama (iPad Safari dan Chrome Android), cara memasang suara id-ID, tips mendampingi, dan **ide aktivitas fisik pendamping per permainan** (misalnya menghitung biji asli, mencocokkan benda nyata, bermain peran).
- Pengaturan: pengingat istirahat, volume, kecepatan bicara, tombol setel ulang progres (dengan konfirmasi ganda).
- Tautan ke halaman Uji Suara.

---

## 13. DEPLOY DI VERCEL

1. Repositori GitHub baru `main-bersama`; branch `main` = produksi, PR/branch = preview deployment.
2. Proyek Vercel: framework preset Vite, build `npm run build`, output `dist`.
3. Nama proyek `main-bersama` agar mendapat `main-bersama.vercel.app`. Jika sudah dipakai orang lain, gunakan alternatif di Bagian 1.
4. `vercel.json` hanya untuk rewrite SPA (jika memakai BrowserRouter) dan header cache aset statis.
5. Service worker harus memperbarui diri dengan aman (strategi `autoUpdate` + notifikasi "Versi baru tersedia" di halaman Pendamping, bukan pop-up di area anak).
6. Pemilik yang menghubungkan GitHub ke Vercel (butuh otorisasi akun); Claude Code menyiapkan seluruh konfigurasi di repositori.

---

## 14. TEMPLAT PROMPT UNTUK CLAUDE CODE (PER FASE)

### Prompt awal (sekali saja, untuk Fase 0)
```
Baca CLAUDE.md dan main-bersama-brief.md secara menyeluruh. Kerjakan Fase 0 saja:
kerangka aplikasi (Vite + React + TS), router, menu, core/engine, core/audio (speak + tone +
pemilihan suara id-ID), core/progress (bintang, level, stiker), core/ui, PWA, skrip
validate-content, halaman Pendamping dan halaman Uji Suara, serta satu permainan contoh
dengan content.json berisi 40 item. Jangan membangun permainan lain.
Sebelum menulis kode, tampilkan rencana singkat dan struktur folder. Setelah selesai,
jalankan lint, tsc, test, dan build, lalu laporkan hasilnya dan apa yang perlu saya uji di tablet.
```

### Prompt untuk Fase 1-6 (ganti angka dan daftar permainan)
```
Baca CLAUDE.md dan main-bersama-brief.md. Fase 0 sudah selesai dan sudah di-deploy.
Kerjakan Fase <N> saja: permainan #<a>, #<b>, #<c>, #<d>, #<e> (lihat Bagian 10).
Untuk tiap permainan:
1. Buat mesin permainan di src/games/<slug>/ memakai kontrak di Bagian 6.
2. Buat content.json berisi 40-50 unit sesuai kolom "Isi bank konten" di katalog,
   terbagi untuk kelompok usia A/B/C. Tandai konten budaya/fakta 'perlu-ditinjau'.
3. Tambahkan komponen SVG baru ke core/art bila perlu (orisinal, parametrik).
4. Tambahkan ide aktivitas fisik pendamping ke halaman Pendamping.
5. Patuhi Definition of Done (Bagian 11) dan prinsip pedagogi (Bagian 3).
Jangan membangun permainan di luar fase ini dan jangan mengubah kontrak core tanpa
menjelaskan alasannya lebih dulu. Jalankan lint, tsc, test, validate-content, dan build,
lalu laporkan: apa yang dibangun, hasil uji, dan hal yang perlu saya uji bersama anak.
```

### Prompt revisi setelah uji bersama anak
```
Berikut hasil uji saya bersama anak usia <usia> untuk Fase <N>: <catatan>.
Revisi hanya yang disebutkan, jangan mengubah bagian lain. Jelaskan akar masalah sebelum
memperbaiki, lalu jalankan ulang seluruh pemeriksaan.
```

---

## 15. RISIKO DAN KEPUTUSAN TERBUKA

| Risiko | Mitigasi |
|---|---|
| Suara id-ID bawaan browser kaku atau tidak tersedia | Uji di Fase 0-1; selalu sediakan ikon+teks; panduan instal suara; bila tidak memadai, pertimbangkan rekaman suara sendiri sebagai pengganti (keputusan pemilik) |
| Skala 1.350 konten | Konten dibangkitkan dari aturan/parameter; validasi otomatis; dikerjakan bertahap per fase |
| Akurasi budaya dan fakta | Status `perlu-ditinjau`; pemilik meninjau sebelum rilis akhir |
| Anak 2 tahun hanya memakai sebagian konten | Level per kelompok usia; item sulit tidak muncul untuk A |
| Poin/hadiah bertentangan dengan Montessori dan Finlandia | Hadiah berbasis usaha, tanpa persaingan dan tanpa hukuman |
| Nama `main-bersama.vercel.app` mungkin sudah dipakai | Cek saat membuat proyek; siapkan nama alternatif |
| Lisensi sampel suara alat musik dunia | Utamakan sintesis Web Audio; catat setiap aset di `CREDITS.md` |

**Keputusan terbuka yang diambil pemilik di tengah jalan:**
1. Bila suara browser tidak memuaskan di Fase 0-1: lanjut dengan TTS, atau beralih ke rekaman suara sendiri untuk teks yang paling sering dipakai?
2. Apakah album stiker cukup 60 stiker atau ditambah seiring fase?
3. Apakah pengingat istirahat diaktifkan secara bawaan?
